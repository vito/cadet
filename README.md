# Customs

A dashboard optimizing management of GitHub issues and their progression
through Tracker to completion.

## Columns

The UI is comprised of 3 columns representing their progress:

### Triaged (feature or bug)

    +--------------------------------------------------+
    | concourse/concourse#123 Running out of disk      |
    | concourse/concourse#450 No more subnets          |
    +--------------------------------------------------+
    | `fly volumes` should show volume size    started |
    | optimize container use when ...        scheduled |
    +--------------------------------------------------+

* Backlog
  * GitHub issues that have progressed into scheduled stories in the backlog.
* Icebox
  * GitHub issues that have been turned into a feature or bug in the backlog,
    which we plan to do someday.
* Help Wanted
  * GitHub issues that we've labeled 'help wanted', which will not have a
    corresponding Tracker story.

### Engaged (chore in-flight)

    +--------------------------------------------------+
    | concourse/concourse#123 Push notifications       |
    +--------------------------------------------------+

* Pending Reply from Us
* Pending Reply from Them

### Inbox (chore in icebox):

    +--------------------------------------------------+
    | concourse/concourse#123 My CI burned down        |
    +--------------------------------------------------+

* New Issues (new -> old)
* Active Issues (by activity (reactions + comments))
* Inactive Issues (old -> new)
