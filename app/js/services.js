'use strict';

angular.module('myApp.services', ['ngResource']).
	factory('Accounts', ['$resource', function($resource){
		return $resource('/api/accounts/:id', {id:'@id'});
	}]).
	factory('AccountPasswords', ['$resource', function($resource){
		return $resource('/api/accounts/:id/password', {id:'@id'});
	}]).
	factory('Users', ['$resource', function($resource){
		return $resource('/api/users/:id', {id:'@id'});
	}]).
	factory('Groups', ['$resource', function($resource){
		return $resource('/api/groups/:id', {id:'@id'});
	}]).
	factory('Parties', ['$resource', function($resource){
		return $resource('/api/parties/:id', {id:'@id'});
	}]).
	factory('Permissions', ['$resource', function($resource){
		return $resource('/api/accounts/:accountID/permissions', {
			accountID:'@accountID'
		});
	}]);