'use strict';

var base_url = 'http://127.0.0.1/play/';

angular.module('myApp.services', ['ngResource']).
	factory('Accounts', ['$resource', function($resource){
		return $resource(base_url+'accounts/:id', {id:'@id'});
	}]).
	factory('AccountPasswords', ['$resource', function($resource){
		return $resource(base_url+'accounts/:id/password', {id:'@id'});
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
		return $resource(base_url+'accounts/:passwordID/permissions', {
			passwordID:'@passwordID'
		});
	}]);