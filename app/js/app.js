'use strict';

var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ui.event', 'ui.if', 'ui.bootstrap', 'btford.dragon-drop']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/p', {
			templateUrl: 'partials/Account.html',
			controller: 'AccountListCtrl',
			reloadOnSearch: false
		});
		$routeProvider.when('/u', {
			templateUrl: 'partials/User.html',
			controller: 'UserCtrl',
			reloadOnSearch: false
		});
		$routeProvider.when('/g', {
			templateUrl: 'partials/Group.html',
			controller: 'GroupCtrl',
			reloadOnSearch: false
		});
		$routeProvider.otherwise({redirectTo: '/p'});
	}]);
