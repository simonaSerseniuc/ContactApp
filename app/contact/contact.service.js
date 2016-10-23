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