'use strict';

angular.module('myApp.controllers', ['myApp.services']).
	controller('PasswordListCtrl', ['Passwords', '$scope', '$location', '$routeParams', function(Passwords, $scope, $location, $routeParams) {
		$scope.passwords = Passwords.query();

		$scope.makeNew = function(){
			Passwords.save({id:-1, password:''},
				function ok(data){
					$location.url('password/'+data.id);
				}, function fail(data){
					alert('Error to save.');
				});
		};

		$scope.selectedId = $routeParams.id;
	}]);
