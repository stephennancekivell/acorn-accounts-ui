'use strict';

/* Controllers */

// app.controller('PasswordListCtrl',[function(){

// }]);

angular.module('myApp.controllers', ['myApp.services']).
	controller('PasswordListCtrl', ['Passwords', '$scope', function(Passwords, $scope) {
		$scope.passwords = Passwords.query();
	}])
	.controller('PasswordCtrl', ['$routeParams', '$scope', 'Passwords', function($routeParams, $scope, Passwords) {
		$scope.password = Passwords.get({id:$routeParams.id});
  }]);