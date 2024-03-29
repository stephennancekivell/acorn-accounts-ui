app.controller('AccountListCtrl', [
			'Accounts',
			'$scope',
			'$location',
			'$routeParams',
			'Groups',
			'Parties',
			'Permissions',
			'$http',
			'$timeout',
			'AccountPasswords',
			function(Accounts,
				$scope,
				$location,
				$routeParams,
				Groups,
				Parties,
				Permissions,
				$http,
				$timeout,
				AccountPasswords) {
		'use strict';

		app.AccountListCtrlSc = $scope;

		$scope.accounts = Accounts.query({}, function ok(){
			if ($routeParams.id){
				$scope.selected = _.find($scope.accounts, function(p){
					return p.id == $routeParams.id;
				});
			}
		});

		$scope.allParties = Parties.query();

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

		var debounceSaveSelected = _.debounce(function(){
			$scope.selected.$save();
		}, 1000);

		$scope.$watch('selected', function(a,b){
			if (_.isUndefined(a) || _.isUndefined(b)) return;
			
			debounceSaveSelected();
		},true);

		$scope.isSelected = function(group){
			return !_.contains($scope.selectedGroupIds, group.id);
		};

		$scope.makeNew = function(){
			Accounts.save({id:-1,
				username: '',
				name:'new account',
				description:'',
				permissions: []},
				function ok(data){
					$location.search('/p',data.id);
					$scope.selected = data;
					$scope.accounts.push(data);
				}, function fail(data){
					alert('Error to save.');
				});
		};

		$scope.select = function(e){
			$scope.selected = e;
		};

		$scope.remove = function(p){
			$scope.accounts = _.reject($scope.accounts, function(pp){
				return pp.id === p.id;
			});

			if ($scope.selected && $scope.selected.id === p.id) {
				$scope.selected = undefined;
				$location.url('/p');
			}

			p.$delete();
		};

		$scope.addPermission = function(group, canWrite){
			if (_.isUndefined($scope.selected)) return;
			var newPerm = Permissions.save({
				accountID: $scope.selected.id,
				partyID: group.id,
				canRead: true,
				canWrite: canWrite,
				party: group
			}, function ok(){
				$scope.selected.permissions.push(newPerm);
			});
		};

		$scope.savePermission = function(permission){
			Permissions.save(permission);
		};

		$scope.removePermission = function(perm){
			$http.delete('/api/accounts/'+perm.accountID+
					'/permissions/'+perm.partyID)
				.success(function (){
					$scope.selected.permissions = _.reject(
						$scope.selected.permissions, function(p){
							return (p.partyID === perm.partyID) &&
								(p.accountID === perm.accountID);
						});
				});
		};

		$scope.passwordPermissionsHaveGroup = function(group){
			return !_.find($scope.selected.permissions, function(perm){
				return (perm.partyID === group.id);
			});
		};
	}]);
