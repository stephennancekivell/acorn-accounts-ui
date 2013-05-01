'use strict';

/* Controllers */

// app.controller('PasswordListCtrl',[function(){

// }]);

angular.module('myApp.controllers', ['myApp.services']).
	controller('PasswordListCtrl', ['Passwords', '$scope', '$location', '$routeParams', function(Passwords, $scope, $location, $routeParams) {
		$scope.passwords = Passwords.query();

		$scope.makeNew = function(){
			Passwords.save({id:-1, password:''},
				function ok(data){
					$location.url('password/'+data.id);
			});
		};

		$scope.selectedId = $routeParams.id;
		console.log($scope.selectedId)
	}])
	.controller('PasswordCtrl', ['$routeParams', '$scope', 'Passwords', function($routeParams, $scope, Passwords) {
		$scope.password = Passwords.get({id:$routeParams.id});
  }]);