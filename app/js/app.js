'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'ui.event', 'ui.if']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/p/:id', {templateUrl: 'partials/passwordList.html', controller: 'PasswordListCtrl'});
    // $routeProvider.when('/p/:id', {templateUrl: 'partials/password.html', controller: 'PasswordCtrl'});
    $routeProvider.otherwise({redirectTo: '/p/'});
  }]);
