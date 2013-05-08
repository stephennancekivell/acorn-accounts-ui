'use strict';

var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ui.event', 'ui.if', 'ui.bootstrap', 'btford.dragon-drop']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/p', {
			templateUrl: 'partials/Password.html',
			controller: 'PasswordListCtrl',
			reloadOnSearch: false
		});
		$routeProvider.when('/u/:id', {templateUrl: 'partials/User.html', controller: 'UserCtrl'});
		$routeProvider.when('/g/:id', {templateUrl: 'partials/Group.html', controller: 'GroupCtrl'});
		$routeProvider.otherwise({redirectTo: '/p'});
	}]);
