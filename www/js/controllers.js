angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicPopover) {
	// Load popover in scope
	$ionicPopover.fromTemplateUrl('templates/more.html', {
		scope: $scope,
	})
	.then(function(popover) {
		$scope.popover = popover;
	});

	// Open popover
	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};
	
	// Close popover
	$scope.closePopover = function() {
		$scope.popover.hide();
	};
	
	// Clean up on close
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
})		
  
.controller('HomeCtrl', function($scope) {

})
   
.controller('KelmaCtrl', function($scope) {

})
   
.controller('AhsebCtrl', function($scope) {

})
   
.controller('RizorsiCtrl', function($scope) {  

})
   
.controller('KelmaGurnataCtrl', function($scope) {

})
   
.controller('KuntattCtrl', function($scope) {

})
   
.controller('AhsebCtrl', function($scope) {

})


 