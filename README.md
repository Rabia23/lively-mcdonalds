# livefeed-web

Introduction

This app is a single page application built on AngularJs. The repository is based on ng-boilerplate and john papa app structure.

Dependencies

The app maintains bower.json and package.json files, which lists all the dependencies.


Quick Start

To compile scss you need to install ruby latest version and then install gem compass. Assuming git, npm and nodejs are already installed on your computer. To get started do following steps.

1. Clone: https://github.com/arbisoft/livefeed-web.git
2. cd livefeed-web
3. sudo npm -g install grunt-cli
4. sudo npm -g install bower
5. npm install
6. bower install
7. grunt watch
8. Open new terminal tab and run grunt server


Grunt Commands

1. grunt build. To build the src folder and put the files in build directory. Although this folder can be hosted on server the files are not compressed

2. grunt compile. To compile the project in min files and paste it in bin directory, Use this folder to host on server

3. grunt watch. To watch all the changes taking place in the html, scss and js files and auto build it.
