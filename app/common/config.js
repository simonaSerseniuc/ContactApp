(function() {
	'use strict';

	var app = angular.module('contactsApp');
	var config = {
			url: 'http://www.mocky.io/v2/'
		};
		
	app.constant('config', config);
})();