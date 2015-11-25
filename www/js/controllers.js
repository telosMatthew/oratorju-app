angular.module('app.controllers', ['ionic', 'app.services'])

  .controller('AppCtrl', function ($scope, $ionicPopover) {
    // Load popover in scope
    $ionicPopover.fromTemplateUrl('templates/more.html', {
      scope: $scope,
    })
      .then(function (popover) {
        $scope.popover = popover;
      });

    // Open popover
    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };

    // Close popover
    $scope.closePopover = function () {
      $scope.popover.hide();
    };

    // Clean up on close
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });
  })

  .controller('HomeCtrl', ['$scope', 'Readings', function ($scope, Readings) {
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

  .controller('KelmaCtrl', function ($scope, $ionicSlideBoxDelegate) {

    //get today's date and create a unique key which will be stored in localStorage
    var today = new Date();
    var readingKey = "" + today.getFullYear() + (today.getMonth() + 1) + today.getDate();

    $scope.readingOfToday = {}; //will store all text of today's reading
    $scope.readings = []; //to place all readings in local storage in an array
    $scope.activeSlide = 0;
    $scope.activeReading = ""; //text currently shown to user

    //find today's reading and set at as the acive slide
    for (var i = 0; i < window.localStorage.length; i++) {
      var reading = (JSON.parse(window.localStorage.getItem(i) || '{}'));

      if (readingKey == reading.r_date) {
        $scope.activeSlide = i;
        reading.r_newfriendlyDate = "Illum, " + reading.r_friendlyDate;
      }
      else { //set the newFriendlyDate without the added text
        reading.r_newfriendlyDate = reading.r_friendlyDate;
      }

      window.localStorage.setItem(i, JSON.stringify(reading));//re-setting item with new property above
      $scope.readings.push(reading);
    }

    // Initialise active reading to the first reading and button state to the first button
    $scope.readingOfToday = (JSON.parse(window.localStorage[$scope.activeSlide] || '{}'));
    $scope.activeReading = $scope.readingOfToday.r_qari1;
    $scope.isSelected = '0';

    // Function to change reading
    $scope.touch = function (index) {
      // Set selected button
      $scope.isSelected = index;

      // Change reading
      switch (index) {
        case '0':
          $scope.activeReading = $scope.readingOfToday.r_qari1;
          break;
        case '1':
          $scope.activeReading = $scope.readingOfToday.r_salm;
          break;
        case '2':
          $scope.activeReading = $scope.readingOfToday.r_qari2;
          break;
        case '3':
          $scope.activeReading = $scope.readingOfToday.r_vangelu;
          break;
        default:
          $scope.activeReading = $scope.readingOfToday.r_qari1;
      }
    }

    // Function to show/hide the second reading according to the day
    if ($scope.readingOfToday.r_qari2 == "")
      $scope.showReading = false;
    else
      $scope.showReading = true;

    $scope.slideHasChangedUpper = function (index) {
      console.log('upper changed' + index);
    }

    $scope.slideHasChangedLower = function (index) {
      console.log("lower changed " + index);
    }

    //set contents according to the new day set
    $scope.slideHasChanged = function (index) {
      $scope.readingOfToday = (JSON.parse(window.localStorage[index] || '{}')); //set the reading object of the current day
      $scope.activeReading = $scope.readingOfToday.r_qari1; //set the current visible text to the first reading
      $scope.isSelected = '0'; //change the selected tab and its class
      $ionicSlideBoxDelegate.$getByHandle('slideBoxHandle').update(); //finally refresh contents on slidebox

      if ($scope.readingOfToday.r_qari2 == "")
        $scope.showReading = false;
      else
        $scope.showReading = true;
    }

  })

  .controller('AhsebCtrl', function ($scope) {

  })

  .controller('RizorsiCtrl', function ($scope) {

  })

  .controller('KelmaGurnataCtrl', function ($scope) {

  })

  .controller('KuntattCtrl', function ($scope) {

  })

  .controller('AhsebCtrl', function ($scope) {

  })


