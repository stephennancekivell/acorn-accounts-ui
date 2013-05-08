app.controller('PasswordListCtrl', [
			'Passwords',
			'$scope',
			'$location',
			'$routeParams',
			'Groups',
			'Parties',
			'Permissions',
			function(Passwords,
				$scope,
				$location,
				$routeParams,
				Groups,
				Parties,
				Permissions) {
		'use strict';

		$scope.passwords = Passwords.query({}, function ok(){
			if ($routeParams.id){
				$scope.selected = _.find($scope.passwords, function(p){
					return p.id == $routeParams.id;
				});
			}
		});

		$scope.allGroups = Groups.query();

		$scope.$watch('selected', function(){
			if (_.isUndefined($scope.selected)){
				$scope.selectedGroups = undefined;
				$scope.selectedGroupIds = [];
			} else {
				$scope.selectedGroups = _.map($scope.selected.permissions, function(perm){
					return perm.party;
				});
				$scope.selectedGroupIds = _.map($scope.selectedGroups, function(g){
					return g.id;
				});
			}
		});

		$scope.isSelected = function(group){
			return !_.contains($scope.selectedGroupIds, group.id);
		};

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

		$scope.addPermission = function(group){
			if (_.isUndefined($scope.selected)) return;
			console.log('creating perm for '+group+' '+$scope.selected);
			var newPerm = Permissions.save({
				passwordID: $scope.selected.id,
				partyID: group.id,
				canRead: true,
				canWrite: false
			}, function ok(){
				$scope.selected.permissions.push(newPerm);
			});
		};
	}]);
