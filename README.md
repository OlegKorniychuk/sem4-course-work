# Anno - we`ll do your annotation

Text annotation is a major task in the ever growing AI text recognition industry. Every TR model starts with an annotated corpora - but what if the one that fits your needs does not exist? Just send us a file - and we will annotate it. As simple as that.

==================================================================

Anno is a tool for a company that makes annotated corpora for text recognition models learning. (Something like this). A client, who needs a file to be annotated, sends it to the company. For quicker annotation every file is broken down into pieces, every piece annotated by two people independently. As soon as both people have finished the task - it is sent to their team lead, who resolves conflicts, if any occur. When all pieces are annotated - the team lead marks the file as annotated and it is returned to the client.

## Installation

Disclaimer: testing anno on your computer is currently impossible. I'm sorry.

``npm i npm run devStart``

## Business actors

- Customer
- Manager
- Team Lead
- Editor

## Actions

- Customer: sends a text file to be annotated; receives the annotated file;
- Manager: receives a file from the Customer; delegates the task to one of the Team Leads;
- Team lead:  receives the task from the Manager; divides the file into parts; assembles a team of Editors, who are currently free, accordingly to the size of the file;  supervises the work of the Editors; resolves conflicts in annotation; finishes the task when it is done;
- Editor: receives a message when is added to a new project by a Team Lead; annotates their part of the file; sends their work to be checked by a Team Lead when it is done;

## Functionality Anno provides

- For Customer: to upload a file; to receive a notification, when the file is annotated; to download an annotated file;
- For Manager: to receive a notification about a new task and view info about it - date, Customer’s details, file size etc; to delegate a task to one f the currently free Teamleads; to see a list of all current employees, their roles, current statuses and work history; to see a list of all current tasks, their details and completion statuses;
- For Team Lead: to receive a notification about a new task; to break down the file into pieces using a built-in editor; to view currently free editors and assemble a team from them; to see status of the current project and all its editors’ progress; to resolve conflicts using a built-in tool; to mark the project as finished;
- For Editor: to get a notification when added to a new project and monitor their progress; to annotate the file using a built-in tool; to mark their part as completed;
- For Manager, Editor and Team Lead: authorisation;

## Technological stack

NodeJS, mongoDB, HTML/CSS

## Platform

desktop(linux-based server)

## Development progress

### Basic functionality (60%)

User (70%):
registration and login: 100%
cabinet: 75%
ordering markdown: 100%
viewing previous orders: 75%
receiving ready markdown: 0%

Manager (65%):
login: 100%
viewing previous projects: 60%
receiving new projects: 100%
assigning projects to teamleads: 100%
spectating ongoing projects: 20%
sending ready projects to customers: 0%

Teamlead (50%):
login: 100%
viewing previous projects: 70%
receiving new projects: 100%
assigning new projects to his team: 40%
managing team's work: 0%
resolving conflicts: 0%

Editor (15%):
login: 100%
everything else: 0%
