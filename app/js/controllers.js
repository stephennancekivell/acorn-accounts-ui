'use strict';

/* Controllers */

// app.controller('PasswordListCtrl',[function(){

// }]);

angular.module('myApp.controllers', ['myApp.services']).
	controller('PasswordListCtrl', ['Passwords', '$scope', '$location', function(Passwords, $scope, $location) {
		$scope.passwords = Passwords.query();

		$scope.makeNew = function(){
			Passwords.save({id:-1, password:''},
				function ok(data){
					$location.url('password/'+data.id);
			});
		};
	}])
	.controller('PasswordCtrl', ['$routeParams', '$scope', 'Passwords', function($routeParams, $scope, Passwords) {
		$scope.password = Passwords.get({id:$routeParams.id});
  }]);