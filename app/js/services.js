'use strict';

/* Services */

var base_url = 'http://127.0.0.1/play/';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
	factory('Passwords', ['$resource', function($resource){
		return $resource(base_url+'passwords');
	}]);