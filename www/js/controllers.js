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
            r_qari1: $scope.readings[i].r_qari1,
            r_salm: $scope.readings[i].r_salm,
            r_qari2: $scope.readings[i].r_qari2,
            r_vangelu: $scope.readings[i].r_vangelu
          }

        window.localStorage.setItem(i, JSON.stringify(reading));
      }
     });
    //$scope.orderProp = 'date';
  }])

.controller('KelmaCtrl', function($scope) {
    var today = new Date();
    var readingKey = "" + today.getFullYear() +  (today.getMonth()+1) + today.getDate();
    //var tempFriendlyDate = ""

    $scope.readings = []; //to place all readings in local storage in an array
    $scope.activeSlide = 0;

    for (var i = 0; i < window.localStorage.length; i++ )
    {
      var reading = (JSON.parse(window.localStorage.getItem(i) || '{}'));

      if (readingKey == reading.r_date)
      {
        //tempFriendlyDate = reading.r_friendlyDate;
        //reading.r_friendlyDate = "";

        $scope.activeSlide = i;
        reading.r_newfriendlyDate = "Illum, " + reading.r_friendlyDate;
      }

      $scope.readings.push(reading);



    }

    $scope.slideHasChangedUpper = function(index)
    {
      console.log('upper changed' + index);
    }

    $scope.slideHasChangedLower = function(index)
    {
      console.log("lower changed " + index);
    }

    $scope.touch = function(a)
    {
      console.log(a);
    }




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


