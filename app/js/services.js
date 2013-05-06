'use strict';

var base_url = 'http://127.0.0.1/play/';

angular.module('myApp.services', ['ngResource']).
	factory('Passwords', ['$resource', function($resource){
		return $resource(base_url+'passwords/:id', {id:'@id'});
	}]).
	factory('Users', ['$resource', function($resource){
		return $resource(base_url+'users/:id', {id:'@id'});
	}]).
	factory('Groups', ['$resource', function($resource){
		return $resource(base_url+'groups/:id', {id:'@id'});
	}]).
	factory('Parties', ['$resource', function($resource){
		return $resource(base_url+'parties/:id', {id:'@id'});
	}]).
	factory('Permissions', ['$resource', function($resource){
		return $resource(base_url+'passwords/:passwordID/permissions', {
			passwordID:'@passwordID'
		});
	}]);