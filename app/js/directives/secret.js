app.directive('secret', ['$timeout', '$http', function($timeout, $http){
	'use strict';
	return {
		// show on click.
		// hide after timeout.
		// stop timer when editing.
		template: '<div>'+
						'<input ng-show="show" type="text" ng-model="secret"></input>'+
						'<button ng-show="!show" ng-click="click();" class="btn btn-link">show</button>'+
						'<button ng-show="show" ng-disabled="savePending" ng-click="stopTimeout();hide();" class="btn btn-link">hide</button>'+
						'<i ng-show="show" id="knob" />'+
					'</div>',
		scope: {
			src:'@'
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
				$http.get(scope.src).
					success(function(data){
						scope.secret = data.password;
						scope.show = true;
						scope.startTimeout();
					}).
					error(function(data){
						alert('error getting password\n'+data);
					});
			};

			var progress = 0;
			scope.savePending = false;
			scope.startTimeout = function(){
				knob.knob().show();

				scope.unwatchSecret = scope.$watch('secret', function(a,b){
					if (_.isUndefined(a) || a === b) return;
					
					console.log('watch secret',a,b, a===b);
					scope.stopTimeout();
					scope.saveDebounce();
					scope.savePending = true;
				});

				progress=0;

				var d1 = function(){
					scope.timeout = $timeout(function(){
						progress += 1;

						knob.val(progress).trigger('change');

						if(progress > MAX_KNOB_VAL){
							scope.stopTimeout();
							scope.show = false;
						} else {
							d1();
						}
					},100);
				};
				d1();
			};

			scope.stopTimeout = function(){
				knob.knob().hide();

				$timeout.cancel(scope.timeout);
				
				progress=0;
			};

			scope.hide = function(){
				if (scope.savePending) return;
				scope.show = false;

				delete scope.secret;
				scope.unwatchSecret();
			};

			scope.save = function(){
				scope.savePending = false;
				$http.post(scope.src, {password:scope.secret}).
					success(function(){
						console.log('password saved');
					}).
					error(function(data){
						console.log('error saving '+data);
					});
			};

			scope.saveDebounce = _.debounce(scope.save, 500);
		}
	};
}]);