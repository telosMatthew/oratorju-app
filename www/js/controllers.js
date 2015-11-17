angular.module('app.controllers', ['ionic','app.services'])

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

.controller('HomeCtrl', ['$scope', 'Readings', function ($scope, Readings){

    //to be able to read the data retrieve, since a promise is used, we need
    //access the data through a callback function, hence the anonymous function in query()
    $scope.readings = Readings.query(function () {

      for (var i = 0; i < $scope.readings.length; i++) {

        var reading =
          {
            r_date: $scope.readings[i].r_date,
            r_friendlyDate: $scope.readings[i].r_friendlyDate,
            r_content: $scope.readings[i].r_content
          }
        //console.log($scope.readings[i].r_date);
        window.localStorage.setItem([$scope.readings[i].r_date], JSON.stringify(reading));
      }
     });

    //$scope.orderProp = 'date';
  }])

.controller('KelmaCtrl',  function($scope) {
    var currentReading = '16/11/2015'

    $scope.reading = (JSON.parse(window.localStorage[currentReading] || '{}'));
    //console.log($scope.markdown);
   // console.log($scope.reading);
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


