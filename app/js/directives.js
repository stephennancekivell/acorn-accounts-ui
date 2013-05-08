'use strict';

/* Directives */


angular.module('myApp.directives', [])
.
directive('isHovered', [function() {
	return function(scope, elm, attrs) {
		$(elm).bind('mouseenter', function(){
			scope.isHovered = true;
			scope.$apply();
		});
		$(elm).bind('mouseleave', function(){
			scope.isHovered = false;
			scope.$apply();
		});
	};
}]);
