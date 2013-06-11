app.directive('richList', ['$location', function($location){
	'use strict';
	return {
		template: '<div class="span2 well">' +
					'<input type="text" class="search-query input-small" ng-model="searchQuery" />'+
					'<ul class="rich-list">'+
						'<li ng-repeat="thing in richList | filter:searchQuery">'+
							'<a ng-href="#{{path}}?id={{thing.id}}" ng-click="select(thing)">{{thing.title}}</a>'+
						'</li>'+
					'</ul>'+
					'<button class="btn pull-right"'+
						'ng-click="$parent.makeNew()">'+
							'Add '+
							'<i class="icon-plus" />'+
					'</button>'+
				'</div>',
		scope:{
			richList:'='
		},
		link: function(scope){
			scope.select = function(thing){
				scope.$parent.selected = thing;
			};
			scope.location = $location;
			scope.path = $location.path();
		}
	};
}]);