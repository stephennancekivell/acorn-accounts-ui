app.controller('PasswordListCtrl', ['Passwords', '$scope', '$location', '$routeParams', function(Passwords, $scope, $location, $routeParams) {
		'use strict';
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
	}])
	
	;
