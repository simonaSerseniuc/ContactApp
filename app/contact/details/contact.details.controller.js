(function() {
	'use strict';

	var app = angular.module('contactsApp'); 

	app.controller('contactDetailsController', ['$scope', '$location', '$routeParams', 'contactService', contactDetailsController]);

	function contactDetailsController($scope, $location, $routeParams, contactService) {
		$scope.contact = {
			name: "",
			job: "",
			email: "",
			location: "",
			avatar: "",
			tag: ""
		};

		var param = $routeParams.index;

		init();

		function init() {
			var current = contactService.getCurrent();
								

			if(current !== null) {
				$scope.contact = current;
			} else if(param != "empty") {
				
				contactService.getContacts(function(result) {		  
					$scope.contact = result[param];
				});
			} 
		}

		$scope.saveContact = function() {
			var contact = $scope.contact;

			//TODO check valid contact

			if(param == "empty") {				
				contact.avatar = "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png";

				contactService.addContact(contact);
			} else {
				//TODO overwrite contact
			}

			$location.path('/contacts');
		};

		$scope.newContact = function() {
			contactService.setContact(null);

			$location.path('/contacts/empty');
		};
	}

})();