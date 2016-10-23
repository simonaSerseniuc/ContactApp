"use strict";


describe("Contact Service", function() {

    if('demonstrate using when 200 status', inject( function($http){
        var $scope = {};


        $http({
            method: 'GET',
            url: 'http://www.mocky.io/v2/58088826100000e9232b75b0',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function(result) {
            $scope.valid = true;
            $scope.result = result.data;                
        }).error( function(result) {
            
            $scope.valid = false;
        });     

        $httpBackend
        .when('GET', 'http://www.mocky.io/v2/58088826100000e9232b75b0')
        .responde(200, [{name: "aa"}, {name: "bbb"}]);

        $httpBackend.flush();

        expect($scope.valid).toBe(true);
        expect($scope.result.length).toEqual(2);
    }));

});
  
