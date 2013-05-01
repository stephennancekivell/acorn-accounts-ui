'use strict';

var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'ui.event', 'ui.if', 'ui.bootstrap']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/p/:id', {templateUrl: 'partials/passwordList.html', controller: 'PasswordListCtrl'});
		$routeProvider.otherwise({redirectTo: '/p/'});
	}]);
