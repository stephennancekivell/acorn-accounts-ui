app.controller('GroupCtrl', ['Groups', '$scope', '$location', '$routeParams', 'Users', '$http', function(Groups, $scope, $location, $routeParams, Users, $http) {
		'use strict';
		$scope.groups = Groups.query({}, function ok(){
			if ($routeParams.id){
				$scope.selected = _.find($scope.groups, function(p){
					return p.id == $routeParams.id;
				});
			}
		});

		$scope.allUsers = Users.query();

		$scope.$watch('selected', function(){
			if (_.isUndefined($scope.selected)) return;
			$http.post('/play/groups/'+$scope.selected.id+'/users', $scope.selected.users);
		},true);

		$scope.isSelected = function(user){
			return  !_.contains($scope.selected.users, user);
		};

		$scope.makeNew = function(){
			Groups.save({id:-1, name:'new group'},
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

		$scope.removeUser = function(user) {
			$scope.selected.users = _.reject($scope.selected.users, function(u){
				return u.id === user.id;
			});
		};
	}]);