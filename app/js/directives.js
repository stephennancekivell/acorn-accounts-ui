'use strict';

/* Directives */
var app = app;


angular.module('myApp.directives', [])
.directive('isHovered', [function() {
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
}])
.directive('progressKnob', [function(){
	return {
		template: '<div></div>',
		link: function(scope, elm, iAttrs){
			console.log('progressKnob', iAttrs);
			$(elm).knob({
				min:0,
				max:30,
				fgColor:'#000000',
				width:'16',
				height:'16',
				readOnly:true
			});

			scope.$watch(iAttrs.p, function(){
				//console.log('watch p', scope[iAttrs.p]);
				$(elm).val(scope[iAttrs.p]).trigger('change');
			});
		}
	};
}])
;
