const fastify = require('fastify')
const path = require('path')
const fstatic = require('fastify-static')

global.XMLHttpRequest = require("xhr2");

const Elm = require('./worker');
const worker = Elm.Main.worker({
  githubOrg: process.env.GITHUB_ORG,
  githubToken: process.env.GITHUB_TOKEN
});

const app = fastify()
const port = process.env.PORT || 8000;

const data = {
  // list of all repositories
  repositories: [],

  // map from repositories to issues
  issues: {},

  // map from issues to timelines
  timelines: {}
}

worker.ports.setRepositories.subscribe(function(repositories) {
  console.log("repos refreshed");
  data.repositories = repositories;
});

worker.ports.setIssues.subscribe(function(args) {
  var id = args[0], issues = args[1];
  console.log("issues refreshed for repo", id);
  data.issues[id] = issues;
});

worker.ports.setTimeline.subscribe(function(args) {
  var id = args[0], timeline = args[1];
  console.log("timeline refreshed for issue", id);
  data.timelines[id] = timeline;
});

app.register(fstatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
});

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.get('/data', (req, res) => {
  res.send(data)
})

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`listening on ${port}`)
})
