'use strict';

angular.module('myApp.controllers', ['myApp.services']).
	controller('PasswordListCtrl', ['Passwords', '$scope', '$location', '$routeParams', function(Passwords, $scope, $location, $routeParams) {
		$scope.passwords = Passwords.query({}, function ok(){
			if ($routeParams.id){
				$scope.selected = _.find($scope.passwords, function(p){
					return p.id == $routeParams.id;
				});
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

		$scope.remove = function(p){
			$scope.passwords = _.reject($scope.passwords, function(pp){
				return pp.id === p.id;
			});

			if ($scope.selected && $scope.selected.id === p.id) {
				$scope.selected = undefined;
			}

			p.$delete();
		};
	}]).
	controller('UserCtrl', ['Users', '$scope', '$location', '$routeParams', function(Users, $scope, $location, $routeParams) {
		$scope.users = Users.query({}, function ok(){
			if ($routeParams.id){
				$scope.selected = _.find($scope.users, function(p){
					return p.id == $routeParams.id;
				});
			}
		});

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

		$scope.remove = function(p){
			$scope.users = _.reject($scope.users, function(pp){
				return pp.id === p.id;
			});

			if ($scope.selected && $scope.selected.id === p.id) {
				$scope.selected = undefined;
			}

			p.$delete();
		};
	}]).
	controller('GroupCtrl', ['Parties', '$scope', '$location', '$routeParams', function(Parties, $scope, $location, $routeParams) {
		$scope.groups = Parties.query({}, function ok(){
			if ($routeParams.id){
				$scope.selected = _.find($scope.groups, function(p){
					return p.id == $routeParams.id;
				});
			}
		});

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

		$scope.remove = function(p){
			$scope.groups = _.reject($scope.groups, function(pp){
				return pp.id === p.id;
			});

			if ($scope.selected && $scope.selected.id === p.id) {
				$scope.selected = undefined;
			}

			p.$delete();
		};
	}]);
