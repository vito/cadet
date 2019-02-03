things to visualize:

* [x] issue references
* [x] labels
* [x] how many reactions/comments
* [x] issues that are tied to a PR
* [x] last activity
* [x] who had last word
* [ ] issues that reference many closed issues (i.e. consolidated)
* [ ] subscribers? (is that the same as 'participants'?)
* [ ] has the author ever submitted a PR
* [ ] has the PR build passed?

features that i care about:

* [x] force-directed graph would probably be nice
* [x] search to select issues
* [x] see what's in flight
* [x] view by project
* [ ] break down by label (filter, not group)
* [ ] add to / prioritize backlog
* [ ] finding things to put into the next milestone
* [ ] keeping up to date with active conversations on PRs
* [ ] know if PR has been updated since last review
* [ ] reveal where issue is in graph
* [ ] assign to project
* [ ] view by milestone
* [ ] see where things are prioritized
* [ ] batch labeling
* [ ] ephemeral connection management (i.e. without having to leave comment)
* [ ] breaking/ignoring incidental references (i.e. a reference that is semantically meaningless)
* [ ] ~~dragging issues around (brownie points for persisting it)~~ recognizing via deterministic locations is good enough for now

release page:

for each repo
- # commits since last release
- get commits since last release (https://api.github.com/repos/concourse/docker-image-resource/compare/v1.1.0...HEAD)
- show PRs whose merge commits are in the comparison
- show issues in oldest open milestone
- group issues and PRs by documented/unreleased/left-undocumented/etc

- don't show readme changes?
- show issues closed by merged PRs???
