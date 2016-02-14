angular.module('app.routes', [])

// Defines routes and states for the different pages
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
    .state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})
    .state('app.home', {
    cache: false,// when cache is false, homeCtrl is called everytime the screen is accessed
		url: '/home',
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
    })
    .state('app.kelma', {
		url: '/kelma',
		templateUrl: 'templates/kelma.html',
		controller: 'KelmaCtrl'
    })
    .state('app.ahseb', {
		url: '/ahseb',
		templateUrl: 'templates/ahseb.html',
		controller: 'AhsebCtrl'
    })
    .state('app.rizorsi', {
		url: '/rizorsi',
		templateUrl: 'templates/rizorsi.html',
		controller: 'RizorsiCtrl'
	})
    .state('app.dettalji', {
		url: '/dettalji',
		templateUrl: 'templates/dettalji.html',
		controller: 'DettaljiCtrl'
    })

  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

  // Remove the text from showing next to back button
  $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);
});
