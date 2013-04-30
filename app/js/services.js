'use strict';

var base_url = 'http://127.0.0.1/play/';

angular.module('myApp.services', ['ngResource']).
	factory('Passwords', ['$resource', function($resource){
		return $resource(base_url+'passwords/:id');
	}]);