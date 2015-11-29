angular.module('app',['ionic','app.controllers', 'app.routes', 'app.directives','hc.marked','ngCordova'])

.run(function($ionicPlatform, $cordovaSplashscreen) {

    setTimeout(function() {
      $cordovaSplashscreen.hide()
    })
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($ionicConfigProvider) {
	// Reset the controller each time it is accessed
    $ionicConfigProvider.views.maxCache(0);

	// Center align title on android
	$ionicConfigProvider.navBar.alignTitle('center');
});


