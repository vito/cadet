const express = require('express')
const path = require('path')
const compression = require('compression')
const passport = require('passport')
const session = require('express-session')

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
  issues: {},
  prs: {},
  references: {},
  actors: {},
  projects: [],
  cards: {}
}

function queueRefresh(field, id, res) {
  if (!(id in refreshing[field])) {
    refreshing[field][id] = [];
  }

  refreshing[field][id].push(res);
}

function popRefresh(field, id, data) {
  var waiting = refreshing[field][id];
  if (waiting === undefined) {
    return;
  }

  delete refreshing[field][id];

  var res;
  while (res = waiting.pop()) {
    res.send(data);
  }
}

function hydrate(field, args) {
  var id = args[0];
  var val = args[1];
  data[field][id] = val;
  popRefresh(field, id, val);
}

worker.ports.setProjects.subscribe(function(args) {
  data.projects = args;
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

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

const publicDir = path.join(__dirname, 'public');

app.get('/me', (req, res) => {
  res.send(JSON.stringify(req.user))
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

app.use('/public', express.static(publicDir))

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

app.get('/*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
})

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`listening on ${port}`)
})
