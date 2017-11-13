const express = require('express')
const path = require('path')
const compression = require('compression')

global.XMLHttpRequest = require("xhr2");

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

worker.ports.setIssues.subscribe(function(args) {
  data.issues[args[0]] = args[1];
});

worker.ports.setPullRequests.subscribe(function(args) {
  data.prs[args[0]] = args[1];
});

worker.ports.setReferences.subscribe(function(args) {
  data.references[args[0]] = args[1];
});

worker.ports.setActors.subscribe(function(args) {
  data.actors[args[0]] = args[1];
});

worker.ports.setProjects.subscribe(function(args) {
  data.projects = args;
});

worker.ports.setCards.subscribe(function(args) {
  data.cards[args[0]] = args[1];
});

app.use(compression())

const publicDir = path.join(__dirname, 'public');

app.get('/data', (req, res) => {
  res.send(data)
})

app.use('/public', express.static(publicDir))

app.get('/*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
})

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`listening on ${port}`)
})
