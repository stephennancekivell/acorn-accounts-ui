'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/passwordList.html', controller: 'PasswordListCtrl'});
    $routeProvider.otherwise({redirectTo: '/list'});
  }]);
