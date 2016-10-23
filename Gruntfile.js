module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		bower: {
		  install: {
			options: {	
			  copy: false,			
			  targetDir: './libs',
			  install: true,
			  cleanTargetDir: true
			}
		  }
		},
		
		less: {
		  development: {
		  	options: {
          	  compress: true,
          	  yuicompress: true,
              optimization: 2
        	},
			files: {
			  "assets/css/style.css": "app/style.less"
			}
		  }
		},
		
		jshint: {
		  all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
		},
		
		karma: {
		  options: {
			configFile: 'config/karma.conf.js'
		  },
		  unit: {
			singleRun: true
		  },
			  
		  continuous: {
			singleRun: false,
			autoWatch: true
		  }
		},
		
		concat: {
		  options: {
			separator: ' '
		  },
		  dist: {
			//src: [ 'app/app.js', 'app/**/*.js'],
			src: ['build/app-safe.js'],
			dest: 'build/app.js'
		  }
		},
		
		uglify: {
		  dist: {
			files: {
			  'build/app.min.js': [ 'build/app.js' ]
			},
			options: {
			  mangle: false
			}
		  }
		},
		
		clean: {
		  temp: {
			src: [ 'tmp' ]
		  }
		},
		
		ngAnnotate: {
		    options: {
		        singleQuotes: true
		    },
		    app: {
		        files: {
		        	'build/app-safe.js' : ['app/app.js', 'app/**/*.js']
		        }
		    }
		},

		watch: {
		  dev: {
			files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
			tasks: [ 'jshint', 'concat:dist', 'clean:temp' ],
			options: {
			  atBegin: true
			}
		  },
		  
		  styles: {
			files: ['app/**/*.less'], 
			tasks: ['less'],
			options: {
			  nospawn: true
			}
		  },
		  
		  min: {
			files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
			tasks: [ 'jshint', 'karma:unit', 'concat:dist', 'clean:temp', 'uglify:dist' ],
			options: {
			  atBegin: true
			}
		  }
		},
		
		connect: {
		  server: {
			options: {
			  hostname: 'localhost',
			  port: 8080
			}
		  }
		}

	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-ng-annotate'); 
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-karma');
	
	grunt.registerTask('style', [ 'watch:styles' ]);
	grunt.registerTask('dev', [ 'bower:install',  'connect:server', 'ngAnnotate', 'watch:dev' ]);
	grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
	grunt.registerTask('minified', [ 'bower', 'watch:min' ]);
	grunt.registerTask('package', [ 'bower', 'jshint', 'concat:dist', 'uglify:dist',
	  'clean:temp' ]);
	
};
