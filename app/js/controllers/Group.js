app.controller('GroupCtrl', ['Parties', '$scope', '$location', '$routeParams', function(Parties, $scope, $location, $routeParams) {
		'use strict';
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