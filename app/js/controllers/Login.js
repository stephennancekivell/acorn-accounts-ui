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

	app.LoginCtrlSc = $scope;

	console.log('LoginCtrl');

	var loginCount = 0;
	$rootScope.$on('event:auth-loginRequired', function(){
		loginCount += 1;

		if (loginCount > 30){
			alert('too many logins, somethings wrong');
		} else {
			if (_.isUndefined($cookies['x-remote-user'])){
				$scope.isModalOpen = true;
			} else {
				$http.defaults.headers.common['x-remote-user'] = $cookies['x-remote-user'];
				authService.loginConfirmed();
			}
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