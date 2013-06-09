app.controller('HeaderCtrl', [
	'$scope',
	'Users',
	'$rootScope',
	'$http',
	'$location',
	'$window',
	'$cookies',
	function(
		$scope,
		Users,
		$rootScope,
		$http,
		$location,
		$window,
		$cookies){
	'use strict';
	app.HeaderSc = $scope;
	$scope.currentUser = Users.get({id:-1});

	$scope.logout = function(){
		$http.defaults.headers.common['x-remote-user'] = undefined;
		$cookies['x-remote-user'] = undefined;
		$window.location.reload();
	};
}]);