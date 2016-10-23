module.exports = function(config) {
	config.set({
		basePath: '../',
		frameworks: [ 'jasmine' ],
		files: [
		  'libs/jquery/dist/jquery.js',
		  'libs/angular/angular.js',
		  'libs/angular-mocks/angular-mocks.js',
		  'app/**/*.js',
		  'tests/**/*.js'
		],
		reporters: [ 'progress' ],
		colors: true,
		autoWatch: false,
		browsers: [ 'Chrome'],
		customLaunchers: {
		  Chrome_without_security: {
			base: 'Chrome',
			flags: ['--disable-web-security']
		  }
		},
		singleRun: true,
		plugins: [
		  'karma-chrome-launcher',
		  'karma-jasmine'
		]
	});
};