const fastify = require('fastify')
const path = require('path')
const fstatic = require('fastify-static')
const compression = require('compression')

global.XMLHttpRequest = require("xhr2");

const Elm = require('./worker');
const worker = Elm.Main.worker({
  githubOrg: process.env.GITHUB_ORG,
  githubToken: process.env.GITHUB_TOKEN
});

const app = fastify()
const port = process.env.PORT || 8000;

const data = {
  // map from repositories to issues
  issues: {},

  // map from issue to issues that referenced it
  references: {},

  // map from issue to actors in timeline
  actors: {}
}

worker.ports.setIssues.subscribe(function(args) {
  var id = args[0], issues = args[1];
  console.log("issues refreshed for repo", id);
  data.issues[id] = issues;
});

worker.ports.setReferences.subscribe(function(args) {
  var id = args[0], issueIds = args[1];
  console.log("references refreshed for issue", id);
  data.references[id] = issueIds;
});

worker.ports.setActors.subscribe(function(args) {
  var id = args[0], actors = args[1];
  console.log("actors refreshed for issue", id);
  data.actors[id] = actors;
});

app.use(compression())

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
