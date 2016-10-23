(function() {
	'use strict';

	var app = angular.module('contactsApp'); 

	app.controller('contactListController', ['$scope', '$location', 'contactService', contactListController]);

	function contactListController($scope, $location, contactService) {
		$scope.contacts = [];

		getContacts();

		function getContacts() {

			contactService.getContacts(function(result) {		  
				$scope.contacts = result;
			});
		}

		$scope.moreDetails = function(index) {
			var selected = $scope.contacts[index];

			contactService.setContact(selected);

			$location.path('/contacts/' + index);
		};

		$scope.newContact = function() {

			contactService.setContact(null);

			$location.path('/contacts/empty');
		};
	}

})();