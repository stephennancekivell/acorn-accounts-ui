app.directive('secret', ['$timeout', function($timeout){
	'use strict';
	return {
		// show on click.
		// hide after timeout.
		// stop timer when editing.
		template: '<div>'+
						'<input ng-show="show" type="text" ng-model="secret"></input>'+
						'<button ng-show="!show" ng-click="click();" class="btn btn-link">show</button>'+
						'<button ng-show="show" ng-click="stopTimeout();show=false;" class="btn btn-link">hide</button>'+
						'<i ng-show="show" id="knob" />'+
					'</div>',
		scope: {
			secret:'='
		},
		link: function(scope, elm, attrs){
			scope.show = false;
			var knob = $(elm).find('#knob');
			var MAX_KNOB_VAL = 60;

			knob.knob({
				min:0,
				max:MAX_KNOB_VAL,
				fgColor:'#000000',
				width:'16',
				height:'16',
				readOnly:true
			});

			knob.knob().hide();

			scope.click = function(){
				if (scope.show){
					scope.show = false;
					scope.stopTimeout();
				} else {
					scope.show = true;
					scope.startTimeout();
				}
			};

			var progress = 0;
			scope.startTimeout = function(){
				knob.knob().show();

				progress=0;

				var d1 = function(){
					scope.timeout = $timeout(function(){
						progress += 1;

						knob.val(progress).trigger('change');

						if(progress > MAX_KNOB_VAL){
							scope.stopTimeout();
							scope.show = false;
						}

						d1();
					},100);
				};
				d1();
			};

			scope.stopTimeout = function(){
				knob.knob().hide();

				$timeout.cancel(scope.timeout);
				
				progress=0;
			};

			scope.$watch('secret', function(a,b){
				scope.stopTimeout();
			});
		}
	};
}]);