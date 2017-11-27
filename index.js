const express = require('express')
const path = require('path')
const compression = require('compression')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')

const GitHubStrategy = require('passport-github').Strategy

global.XMLHttpRequest = require("xhr2")

const Elm = require('./worker');
const worker = Elm.Main.worker({
  githubOrg: process.env.GITHUB_ORG,
  githubToken: process.env.GITHUB_TOKEN
});

const app = express()
const port = process.env.PORT || 8000;

const data = {
  // map from repositories to issues
  issues: {},

  // map from repositories to prs
  prs: {},

  // map from issue to issues that referenced it
  references: {},

  // map from issue to actors in timeline
  actors: {},

  // projects
  projects: [],

  // map from column id to cards
  cards: {}
}

// map from data set to object id to client requests waiting on it
var refreshing = {
  repo: {},
  issues: {},
  prs: {},
  references: {},
  actors: {},
  projects: [],
  cards: {}
}

function queueRefresh(field, id, res) {
  var reqs = refreshing[field];
  if (reqs === undefined) {
    return;
  }

  if (!(id in reqs)) {
    reqs[id] = [];
  }

  reqs[id].push(res);
}

function popRefresh(field, id, data) {
  var reqs = refreshing[field];
  if (reqs === undefined) {
    return;
  }

  var waiting = reqs[id];
  if (waiting === undefined) {
    return;
  }

  delete reqs[id];

  var res;
  while (res = waiting.pop()) {
    res.send(JSON.stringify(data));
  }
}

var polling = [];

function queuePoll(res) {
  polling.push(res);
}

function popPoll() {
  var res;
  while (res = polling.pop()) {
    res.send(JSON.stringify(data));
  }
}

setInterval(popPoll, 30 * 1000);

function hydrate(field, args) {
  var id = args[0];
  var val = args[1];
  data[field][id] = val;
  popRefresh(field, id, val);
  popPoll();
}

worker.ports.setRepos.subscribe(function(repos) {
  data.repos = repos;
  popPoll();
});

worker.ports.setRepo.subscribe(function(repo) {
  for (var i = 0; i < data.repos.length; i++) {
    if (data.repos[i].id == repo.id) {
      data.repos[i] = repo;
      popRefresh("repo", repo.owner+"/"+repo.name, repo);
    }
  }
});

worker.ports.setProjects.subscribe(function(projects) {
  data.projects = projects;
  popPoll();
});

worker.ports.setIssues.subscribe(function(args) {
  hydrate("issues", args);
});

worker.ports.setPullRequests.subscribe(function(args) {
  hydrate("prs", args);
});

worker.ports.setReferences.subscribe(function(args) {
  hydrate("references", args);
});

worker.ports.setActors.subscribe(function(args) {
  hydrate("actors", args);
});

worker.ports.setCards.subscribe(function(args) {
  hydrate("cards", args);
});

app.use(compression())
app.use(bodyParser.json())

if (process.env.GITHUB_CLIENT_ID) {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_AUTH_CALLBACK_URL,
      scope: "repo"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, {
        token: accessToken,
        user: profile._json
      });
    }
  ));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}

const publicDir = path.join(__dirname, 'public');

app.get('/me', (req, res) => {
  res.send(JSON.stringify(req.user || null))
})

app.get('/data', (req, res) => {
  res.send(JSON.stringify(data))
})

app.get('/refresh', (req, res) => {
  for (const field in req.query) {
    var id = req.query[field];
    queueRefresh(field, id, res);
    worker.ports.refresh.send([field, id]);
  }
})

app.get('/poll', (req, res) => {
  queuePoll(res);
})

app.use('/public', express.static(publicDir))

app.post('/hook', (req, res) => {
  worker.ports.hook.send([req.get('X-GitHub-Event'), req.body]);
  res.send("ok")
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
})

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`listening on ${port}`)
})
