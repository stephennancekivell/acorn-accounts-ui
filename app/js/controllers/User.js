app.controller('UserCtrl', ['Users', '$scope', '$location', '$routeParams', function(Users, $scope, $location, $routeParams) {
		'use strict';
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
					$location.search('id', data.id);
					$scope.selected = data;
					$scope.users.push(data);
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
				$location.url('/u');
			}

			p.$delete();
		};
	}]);