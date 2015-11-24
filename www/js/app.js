angular.module('app',['ionic','app.controllers', 'app.routes', 'app.directives','hc.marked'])

.run(function($ionicPlatform) {
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
  //reset the controller each time it is accessed
.config(function($ionicConfigProvider){
    $ionicConfigProvider.views.maxCache(0);
  });
