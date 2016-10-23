This applications uses Angular 1, Node Package Manager, Bower and Grunt.

First, you need to have installed Node.js.
Open a cmd in directory where you extracted the project and run "npm install".
A "npm install -g bower --save-dev" command needs to run.


In the Gruntfile.js are defined multiple task:
- grunt style -> watch over less files
- grunt dev -> used while development, to install additional libraries, run the app over localhost:8080 
			   and what is defined in the wath:dev task
- grunt package -> used to package the entire app, ready for production
- grunt test -> used to run the test

The test are defined in the test directory, using Karma and Jasmine.

The application is found in the app directory. At the moment, the app modularised into:
- common: like the name says, common files. at the moment a cofig file used throught the app and Angular filters
- core: base elements, like headers, footers can be defined here. 
		less helpers are also defined here -> mixins, color variables.
- contact: the implemented module it has it's common files in the base directory, like the used service and less file
		   it's splited in pages/componets (list, details). each child folder has the less, html, controller files.

All the less files are compiled into one css file that is in assets/css.
The libraries installed with bower can be find in the libs directory.

