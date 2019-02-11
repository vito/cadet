const express = require('express')
const path = require('path')
const compression = require('compression')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const enforceSsl = require('express-enforces-ssl')
const helmet = require('helmet')

const GitHubStrategy = require('passport-github').Strategy

global.XMLHttpRequest = require("xhr2")

const elmApp = require('./worker');
const worker = elmApp.Elm.Main.init({
  flags: {
    githubOrg: process.env.GITHUB_ORG,
    githubToken: process.env.GITHUB_TOKEN,
    skipTimeline: process.env.SKIP_TIMELINE == "true",
    noRefresh: process.env.NO_REFRESH == "true"
  }
});

const app = express()
const port = process.env.PORT || 8000;


// mononically increasing numbers for every update made to the data
var dataIndex = 1;
var graphIndex = 0;

const data = {
  // repos by id
  repos: {},

  // issues by id
  issues: {},

  // prs by id
  prs: {},

  // repo comparisons to last release, by repo id
  comparisons: {},

  // map from issue/pr id to issues/pr ids that referenced it
  references: {},

  // map from issue/pr id to actors in timeline
  actors: {},

  // map from pr to review states per user
  reviewers: {},

  // projects by id
  projects: {},

  // cards by column id
  columnCards: {}
}

// list of graphs for all issues
var graphs = []

// map from data set to object id to client requests waiting on it
var refreshing = {}

function queueRefresh(field, id, res) {
  console.log("queue refresh", field, id);

  var reqs = refreshing[field];
  if (reqs === undefined) {
    reqs = {};
    refreshing[field] = reqs;
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
    console.log("sending refreshed data for", field, id);
    res.set('X-Data-Index', dataIndex.toString());
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
    res.set('X-Data-Index', dataIndex.toString());
    res.send(JSON.stringify(data));
  }
}

setInterval(popPoll, 30 * 1000);

worker.ports.setGraphs.subscribe(function(gs) {
  console.log("got graphs", gs.length);
  graphs = gs;
  graphIndex++;
});

worker.ports.setRepos.subscribe(function(repos) {
  for (var i = 0; i < repos.length; i++) {
    var repo = repos[i];
    data.repos[repo.id] = repo;
    dataIndex++;
    popRefresh("repo", repo.owner+"/"+repo.name, repo);
    popRefresh("repo", repo.id, repo);
  }

  popPoll();
});

worker.ports.setRepo.subscribe(function(repo) {
  data.repos[repo.id] = repo;
  dataIndex++;
  popRefresh("repo", repo.owner+"/"+repo.name, repo);
  popRefresh("repo", repo.id, repo);
  popPoll();
});

worker.ports.setProjects.subscribe(function(projects) {
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    data.projects[project.id] = project;
    dataIndex++;
    popRefresh("project", project.name, project);
    popRefresh("project", project.id, project);
  }

  popPoll();
});

worker.ports.setIssues.subscribe(function(issues) {
  for (var i = 0; i < issues.length; i++) {
    var issue = issues[i];
    data.issues[issue.id] = issue;
    dataIndex++;
    popRefresh("issue", issue.id, issue);
  }

  popPoll();

});

var needsRefresh = true;

setInterval(function() {
  if (!needsRefresh) {
    console.log("not refreshing graph");
    return;
  }

  console.log("refreshing graph");
  needsRefresh = false;

  var references = [];
  for (var i in data.references) {
    references.push([i, data.references[i]]);
  }

  var cardIds = [];
  for (var i in data.issues) {
    var issue = data.issues[i];
    if (issue.state == "OPEN") {
      cardIds.push(i);
    }
  }

  for (var p in data.prs) {
    var pr = data.prs[p];
    if (pr.state == "OPEN") {
      cardIds.push(i);
    }
  }

  worker.ports.refreshGraph.send([cardIds, references]);
}, 1 * 1000);

function refreshGraph() {
  needsRefresh = true;
}

worker.ports.setIssue.subscribe(function(issue) {
  data.issues[issue.id] = issue;
  dataIndex++;
  popRefresh("issue", issue.id, issue);
  popPoll();

  refreshGraph();
});

worker.ports.setPullRequests.subscribe(function(prs) {
  for (var i = 0; i < prs.length; i++) {
    var pr = prs[i];
    data.prs[pr.id] = pr;
    dataIndex++;
    popRefresh("pr", pr.id, pr);
  }

  popPoll();

  refreshGraph();
});

worker.ports.setPullRequest.subscribe(function(pr) {
  data.prs[pr.id] = pr;
  dataIndex++;
  popRefresh("pr", pr.id, pr);
  popPoll();

  refreshGraph();
});

worker.ports.setComparison.subscribe(function(args) {
  var id = args[0];
  var val = args[1];
  data.comparisons[id] = val;
  dataIndex++;
  popPoll();
});

worker.ports.setReferences.subscribe(function(args) {
  var id = args[0];
  var val = args[1];
  data.references[id] = val;
  dataIndex++;
  popPoll();

  refreshGraph();
});

worker.ports.setActors.subscribe(function(args) {
  var id = args[0];
  var val = args[1];
  data.actors[id] = val;
  dataIndex++;
  popPoll();
});

worker.ports.setReviewers.subscribe(function(args) {
  var id = args[0];
  var val = args[1];
  data.reviewers[id] = val;
  dataIndex++;
  popPoll();
});

worker.ports.setCards.subscribe(function(args) {
  var id = args[0];
  var val = args[1];

  var newColumnCards = [];
  for (var i = 0; i < val.length; i++) {
    var card = val[i];
    if (card.content) {
      var issue = card.content.issue;
      if (issue) {
        data.issues[issue.id] = issue;
        dataIndex++;
        popRefresh("issue", issue.id, issue);

        newColumnCards.push({
          id: card.id,
          contentId: issue.id
        });
      }

      var pr = card.content.pull_request;
      if (pr) {
        data.prs[pr.id] = pr;
        dataIndex++;
        popRefresh("pr", pr.id, pr);

        newColumnCards.push({
          id: card.id,
          contentId: pr.id
        });
      }
    } else {
      newColumnCards.push({
        id: card.id,
        note: card.note
      });
    }
  }

  data.columnCards[id] = newColumnCards;
  dataIndex++;
  popRefresh("columnCards", id, newColumnCards);
  popPoll();

  refreshGraph();
});

app.use(compression())
app.use(bodyParser.json())

if (app.get('env') === 'production') {
  app.set('trust proxy', true);
  app.use(enforceSsl());
  app.use(helmet());
}


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

  app.use(session({
    name: 'sessionId',
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: app.get('env') === 'production',
      httpOnly: true
    }
  }));

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
  res.set('X-Data-Index', dataIndex.toString());
  res.send(JSON.stringify(data))
})

app.get('/graphs', (req, res) => {
  res.set('X-Data-Index', dataIndex.toString());
  res.send(JSON.stringify(graphs))
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
