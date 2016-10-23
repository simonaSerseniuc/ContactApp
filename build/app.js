(function () {
	'use strict';

	var app = angular.module('contactsApp', ['ui.bootstrap', 'ngRoute']);

	app.config(['$routeProvider', function ($routeProvider) {
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
	}]);
})();
(function() {
	'use strict';

	var app = angular.module('contactsApp');
	var config = {
			url: 'http://www.mocky.io/v2/'
		};
		
	app.constant('config', config);
})();
(function() {
	'use strict';

	var app = angular.module('contactsApp'); 

	app.filter('capitalize', function() {
	    
	    return function(input, all) {	      
	    	var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      		return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    	};  
	});

})();
(function() {
	'use strict';

	var app = angular.module('contactsApp'); 

	app.factory('contactService', ['$http', 'config', contactService]);

	function contactService($http, config) {
		var currentContact = null,
			contacts = [];

		function setContact(contact) {
			currentContact = contact;
		}

		function getCurrent() {
			return currentContact;
		}

		function addContact(contact) {
			contacts.push(contact);
		}
		
		function getContacts(callBackFn) {

			if(!contacts.length) {

				requestContacts(callBackFn);
					
			} else {

				callBackFn(contacts);
			}
		}

		function requestContacts(callBackFn) {			
			$http({
				method: 'GET',
				url: config.url + '58088826100000e9232b75b0',
				headers: {
					'Access-Control-Allow-Origin': '*'
				}
			}).success(function(result) {
				if(result.length){
					contacts = result;
					callBackFn(contacts);
				}

				
			}).error( function(result) {
				var status = result.status;					

				if(status.toString()[0] == 5){
					alert("An unexpected error occured on the server");
				} else {
					alert("An error occured. Please try again");
				}

				callBackFn([]);
				//TODO handle error
			});				
		}

		var factory = {
			getContacts: getContacts,
			setContact: setContact,
			getCurrent: getCurrent,
			addContact: addContact
		};

		return factory;
	}

})();
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