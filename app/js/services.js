'use strict';

angular.module('myApp.services', ['ngResource']).
	factory('Accounts', ['$resource', function($resource){
		return $resource('/play/accounts/:id', {id:'@id'});
	}]).
	factory('AccountPasswords', ['$resource', function($resource){
		return $resource('/play/accounts/:id/password', {id:'@id'});
	}]).
	factory('Users', ['$resource', function($resource){
		return $resource('/play/users/:id', {id:'@id'});
	}]).
	factory('Groups', ['$resource', function($resource){
		return $resource('/play/groups/:id', {id:'@id'});
	}]).
	factory('Parties', ['$resource', function($resource){
		return $resource('/play/parties/:id', {id:'@id'});
	}]).
	factory('Permissions', ['$resource', function($resource){
		return $resource('/play/accounts/:accountID/permissions', {
			accountID:'@accountID'
		});
	}]);