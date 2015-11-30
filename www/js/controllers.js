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

  .controller('HomeCtrl', ['$scope', 'Readings', 'Thoughts', function ($scope, Readings, Thoughts) {
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

        var key = "r" + i;
        window.localStorage.setItem(key, JSON.stringify(reading));
      }
    });
    //$scope.orderProp = 'date';

    $scope.thoughts = Thoughts.query(function () {

      for (var i = 0; i < $scope.thoughts.length; i++) {

        var thought =
        {
          t_date: $scope.thoughts[i].t_date,
          t_friendlyDate: $scope.thoughts[i].t_friendlyDate,
          t_content: $scope.thoughts[i].t_content,
          //t_image: $scope.thoughts[i].t_image
        }
        var key = "t" + i;
        window.localStorage.setItem(key, JSON.stringify(thought));
      }
    });

  }])

  .controller('KelmaCtrl', function ($scope, $ionicSlideBoxDelegate) {

    //get today's date and create a unique key which will be stored in localStorage
    var today = new Date();
    var readingKey = "" + today.getFullYear() + (today.getMonth() + 1) + today.getDate();
    var storageLength = window.localStorage.length;
    var maxReading = 0;//will display the latest reading for user if activeSlide remains zero
    var readingTodayFound = false; //indicates whether today's reading is found
    $scope.readingOfToday = {}; //will store all text of today's reading
    $scope.readings = []; //to place all readings in local storage in an array
    $scope.hasTomorrow = 0; // to check if there is tomorrow's reading
    $scope.hasYesterday = 0; // to check if there is yesterday's reading
    $scope.activeSlide = 0;
    $scope.activeReading = ""; //text currently shown to user


    //find today's reading and set at as the acive slide
    for (var i = 0; i < storageLength; i++) {
      var key = "r" + i;
      var reading = (JSON.parse(window.localStorage.getItem(key) || '{}'));

      //we may have six objects, however we can have r0,r1,r2 or t0,t1,t2
      //in this case when length == 4, r3 will not exist, this check
      //will help us be more space efficient and avoid creating empty objects in localStorage
      if (Object.keys(reading).length != 0) // if object not empty
      {
        maxReading = i;
        if (readingKey == reading.r_date) {
          readingTodayFound = true;
          $scope.activeSlide = i;
          reading.r_newfriendlyDate = "Illum, " + reading.r_friendlyDate;
        }
        else { //set the newFriendlyDate without the added text
          reading.r_newfriendlyDate = reading.r_friendlyDate;
        }

        window.localStorage.setItem(key, JSON.stringify(reading));//re-setting item with new property above
        $scope.readings.push(reading);
      }
    }

    //activeSlide may be zero and it may be today's reading, so we do this check
    if (!readingTodayFound && $scope.activeSlide == 0)
    {
      //set to most recent slide
      $scope.activeSlide = maxReading;
    }

    // Check if there is tomorrow's reading
    // TO DO - move to central controller
    if (JSON.parse(window.localStorage.getItem("r" + ($scope.activeSlide + 1)))) {
      $scope.hasTomorrow = 1;
    }
    else
      $scope.hasTomorrow = 0;

    // Check if there is today's reading
    // TO DO - move to central controller
    if (JSON.parse(window.localStorage.getItem("r" + ($scope.activeSlide - 1))) != null) {
      $scope.hasYesterday = 1;
    }
    else
      $scope.hasYesterday = 0;

    // Initialise active reading to the first reading and button state to the first button
    $scope.readingOfToday = (JSON.parse(window.localStorage["r" + $scope.activeSlide] || '{}'));
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

    //set contents according to the new day set
    $scope.slideHasChanged = function (index) {
      $scope.activeSlide = index;
      $scope.readingOfToday = (JSON.parse(window.localStorage["r" + index] || '{}')); //set the reading object of the current day
      $scope.hasTomorrow = 0; // to check if there is tomorrow's reading
      $scope.hasYesterday = 0; // to check if there is yesterday's reading
      $scope.activeReading = $scope.readingOfToday.r_qari1; //set the current visible text to the first reading
      $scope.isSelected = '0'; //change the selected tab and its class
      //$ionicSlideBoxDelegate.$getByHandle('slideBoxHandle').update(); //finally refresh contents on slidebox

      if ($scope.readingOfToday.r_qari2 == "")
        $scope.showReading = false;
      else
        $scope.showReading = true;

      // Check if there is tomorrow's reading
      // TO DO - move to central controller
      if (JSON.parse(window.localStorage.getItem("r" + ($scope.activeSlide + 1)))) {
        $scope.hasTomorrow = 1;
      }
      else
        $scope.hasTomorrow = 0;

      // Check if there is today's reading
      // TO DO - move to central controller
      if (JSON.parse(window.localStorage.getItem("r" + ($scope.activeSlide - 1))) != null) {
        $scope.hasYesterday = 1;
      }
      else
        $scope.hasYesterday = 0;
    }

    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    }

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    }

  })

  .controller('a', function ($scope, $ionicSlideBoxDelegate) {
    //get today's date and create a unique key which will be stored in localStorage
    var today = new Date();
    var thoughtKey = "" + today.getFullYear() + (today.getMonth() + 1) + today.getDate();
    var storageLength = window.localStorage.length;
    var maxThought = 0;//will display the latest thought for user if activeSlide remains zero
    var thoughtTodayFound = false; //indicates whether today's thought is found
    $scope.thoughtOfToday = {}; //will store all text of today's reading
    $scope.thoughts = []; //to place all thoughts in local storage in an array
    $scope.activeSlide = 0;
    $scope.hasTomorrow = 0;// to check if there is tomorrow's thought
    $scope.hasYesterday = 0;// to check if there is yesterday's thought
    $scope.activeThought = ""; //text currently shown to user


    //find today's thought and set at as the active slide
    for (var i = 0; i < storageLength; i++) {
      var key = "t" + i;
      var thought = (JSON.parse(window.localStorage.getItem(key) || '{}'));

      //we may have six objects, however we can have r0,r1,r2 or t0,t1,t2
      //in this case when length == 4, r3 will not exist, this check
      //will help us be more space efficient and avoid creating empty objects in localStorage
      if (Object.keys(thought).length != 0) // if object not empty
      {
        maxThought = i;
        if (thoughtKey == thought.t_date) {
          thoughtTodayFound = true;
          $scope.activeSlide = i;
          thought.t_newfriendlyDate = "Illum, " + thought.t_friendlyDate;
        }
        else { //set the newFriendlyDate without the added text
          thought.t_newfriendlyDate = thought.t_friendlyDate;
        }

        window.localStorage.setItem(key, JSON.stringify(thought));//re-setting item with new property above
        $scope.thoughts.push(thought);
      }
    }

    //activeSlide may be zero and it may be today's thought, so we do this check
    if (!thoughtTodayFound && $scope.activeSlide == 0)
    {
      //set to most recent slide
      $scope.activeSlide = maxThought;
    }

    // Check if there is tomorrow's thought
    // TO DO - move to central controller
    if (JSON.parse(window.localStorage.getItem("t" + ($scope.activeSlide + 1)))) {
      $scope.hasTomorrow = 1;
    }
    else
      $scope.hasTomorrow = 0;

    // Check if there is today's thought
    // TO DO - move to central controller
    if (JSON.parse(window.localStorage.getItem("t" + ($scope.activeSlide - 1))) != null) {
      $scope.hasYesterday = 1;
    }
    else
      $scope.hasYesterday = 0;

    // Initialise active reading to the first reading and button state to the first button
    $scope.thoughtOfToday = (JSON.parse(window.localStorage["t" + $scope.activeSlide] || '{}'));
    $scope.activeThought = $scope.thoughtOfToday.t_content;
    $scope.isSelected = '0';

    //set contents according to the new day set
    $scope.slideHasChanged = function (index) {
      $scope.activeSlide = index;
      $scope.thoughtOfToday = (JSON.parse(window.localStorage["t" + index] || '{}')); //set the reading object of the current day
      $scope.hasTomorrow = 0; // to check if there is tomorrow's reading
      $scope.hasYesterday = 0; // to check if there is yesterday's reading
      $scope.activeThought = $scope.thoughtOfToday.t_content; //set the current visible text to the first reading

      // Check if there is tomorrow's thought
      // TO DO - move to central controller
      if (JSON.parse(window.localStorage.getItem("t" + ($scope.activeSlide + 1)))) {
        $scope.hasTomorrow = 1;
      }
      else
        $scope.hasTomorrow = 0;

      // Check if there is today's reading
      // TO DO - move to central controller
      if (JSON.parse(window.localStorage.getItem("t" + ($scope.activeSlide - 1))) != null) {
        $scope.hasYesterday = 1;
      }
      else
        $scope.hasYesterday = 0;
    }

    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    }

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    }
  })

  .controller('RizorsiCtrl', function ($scope) {

  })

  .controller('KelmaGurnataCtrl', function ($scope) {

  })

  .controller('DettaljiCtrl', function ($scope) {

  })

  .controller('AhsebCtrl', function ($scope) {

  })


