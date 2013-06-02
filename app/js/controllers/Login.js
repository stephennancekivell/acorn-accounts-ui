'use strict';

app.controller('LoginCtrl', [
	'$rootScope',
	'$scope',
	'$http',
	'authService',
	'$cookies',
	function(
		$rootScope,
		$scope,
		$http,
		authService,
		$cookies){
	$rootScope.$on('event:auth-loginRequired', function(){
		if (_.isUndefined($cookies['x-remote-user'])){
			$scope.isModalOpen = true;
		} else {
			$http.defaults.headers.common['x-remote-user'] = $cookies['x-remote-user'];
		}
	});

	$scope.submit = function(){
		$http.defaults.headers.common['x-remote-user'] = $scope.username;
		$cookies['x-remote-user'] = $scope.username;
		$scope.isModalOpen = false;
		authService.loginConfirmed();
	};

	$scope.modalOptions = {
		backdropFade: true,
		dialogFade:true
	};
}]);