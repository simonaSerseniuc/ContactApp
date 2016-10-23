(function () {
	'use strict';

	var app = angular.module('contactsApp', ['ui.bootstrap', 'ngRoute']);

	app.config(function ($routeProvider) {
		$routeProvider
		.when('/contacts', {
            controller: 'contactListController',
            templateUrl: 'app/contact/list/contact.list.html'
        })
		.when('/contacts/:index', {
			controller: 'contactDetailsController',
			templateUrl: 'app/contact/details/contact.details.html'			
		})  
		.otherwise({ redirectTo: '/contacts' });
	});
})();