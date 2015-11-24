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

    //get today's date and create a unique key which will be stored in localStorage
    var today = new Date();
    var readingKey = "" + today.getFullYear() +  (today.getMonth()+1) + today.getDate();

    $scope.readingOfToday = {}; //will store all readings for today
    $scope.readings = []; //to place all readings in local storage in an array
    $scope.activeSlide = 0;
    $scope.activeReading = ""; //text currently shown to user

    //find today's reading and set at as the acive slide
    for (var i = 0; i < window.localStorage.length; i++ )
    {
      var reading = (JSON.parse(window.localStorage.getItem(i) || '{}'));

      if (readingKey == reading.r_date)
      {
        //tempFriendlyDate = reading.r_friendlyDate;
        //reading.r_friendlyDate = "";

        $scope.activeSlide = i;
        $scope.readingOfToday = reading;
        reading.r_newfriendlyDate = "Illum, " + reading.r_friendlyDate;
      }

      $scope.readings.push(reading);
    }
  console.log($scope.readingOfToday);
    // Initialise active reading
    $scope.activeReading = $scope.readingOfToday.r_qari1;

    // Function to change reading
    $scope.touch = function(index) {
      console.log(index);
      switch (index) {
        case 'First Reading':
          $scope.activeReading = $scope.readingOfToday.r_qari1;
          break;
        case 'Psalm':
          $scope.activeReading = $scope.readingOfToday.r_salm;
          break;
        case 'Second Reading':
          $scope.activeReading = $scope.readingOfToday.r_qari2;
          break;
        case 'Gospel':
          $scope.activeReading = $scope.readingOfToday.r_vangelu;
          break;
        default:
          $scope.activeReading = $scope.readingOfToday.r_qari1;
      }
    }

    if ($scope.readingOfToday.r_qari2 == "")
      $scope.showReading = false;
    else
      $scope.showReading = true;


    $scope.slideHasChangedUpper = function(index)
    {
      console.log('upper changed' + index);
    }

    $scope.slideHasChangedLower = function(index)
    {
      console.log("lower changed " + index);
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


