'use strict';

angular.module('myApp.controllers', ['myApp.services']).
	controller('PasswordListCtrl', ['Passwords', '$scope', '$location', '$routeParams', function(Passwords, $scope, $location, $routeParams) {
		$scope.passwords = Passwords.query({}, function ok(){
			if ($routeParams.id){
				$scope.selected = $scope.passwords[$routeParams.id];
				console.log('see', $routeParams.id);
			}
		});

		$scope.makeNew = function(){
			Passwords.save({id:-1, password:'', title:'new password', description:''},
				function ok(data){
					$location.url('/p/'+data.id);
				}, function fail(data){
					alert('Error to save.');
				});
		};

		$scope.select = function(e){
			$scope.selected = e;
		};
	}]).
	controller('UserCtrl', ['Users', '$scope', '$location', '$routeParams', function(Users, $scope, $location, $routeParams) {
		$scope.users = Users.query();

		$scope.makeNew = function(){
			Users.save({id:-1, name:'new user'},
				function ok(data){
					$location.url('/u/'+data.id);
				}, function fail(data){
					alert('Error to save.');
				});
		};

		$scope.select = function(e){
			$scope.selected = e;
		};
	}]).
	controller('GroupCtrl', ['Parties', '$scope', '$location', '$routeParams', function(Parties, $scope, $location, $routeParams) {
		$scope.groups = Parties.query();

		$scope.makeNew = function(){
			Parties.save({id:-1, name:'new group'},
				function ok(data){
					$location.url('/g/'+data.id);
				}, function fail(data){
					alert('Error to save.');
				});
		};

		$scope.select = function(e){
			$scope.selected = e;
		};
	}]);
