# Moviething

Primary function of this project is allowing a user to search for titles using the OMDb database, store the titles in a "watch list", and rate the movies after viewing.

==============================

- Viewing/Downloading Project
    - [To View Hosted Project](#to-view-hosted-project)
    - [Installation](#installation)
    - [To Run](#torun)
- Specifications and Project Information
    - [Languages] (#languages)
    - [Tools] (#tools)
    - [Specifications] (#specifications)
    - [Contributors] (#contributors)

==============================

## Viewing/Downloading Project

### To View Hosted Project

[Moviething](https://mb-nss-exercises.firebaseapp.com/Moviething)

### Installation

Clone the repository from GitHub:

`git clone https://github.com/mattbruton/Moviething.git`

Navigate to the project from the directory it was cloned into:

`cd Moviething/`

### To Run

If you need a command line http server, to install http-server globally:

`npm install http-server -g`

Install project dependencies:
`npm install` 
then:
`bower install`

Then:

`http-server` or `http-server -p XXXX` (the X's represent the port of your choice)

You should now be able to open your browser and type `localhost:8080` to view the project.

## Specs and Project Information

### Languages

1. JavaScript
1. HTML
1. CSS

### Tools / Frameworks

1. [AngularJS](https://angularjs.org/)
1. [Sass](http://sass-lang.com/)
1. [gulp](http://gulpjs.com/)
1. [Git](https://git-scm.com/)
1. [Atom](https://atom.io/)
1. [NPM http-server](https://www.npmjs.com/package/http-server)

==============================
### Specifications
==============================
### Requirements
1. Must have the ability to register a user in Firebase
1. Must have the ability to log in
1. You must use Firebase to store movies
1. You must be able to add movies
1. You must be able to remove movies
1. Each movie must have the following properties
   1. Movie name
   1. Year released
   1. An integer rating of 1-5
   1. A boolean value that, if true, means that you have watched the movie
1. You must be using an automation tool to automate JavaScript testing
1. You must be using an automation tool to automate SASS compilation
1. It must be written with Angular

### Contributors
1. [Zach Parris] (https://github.com/ZachParris)
1. [Ben Copeland] (https://github.com/BenCopeland)