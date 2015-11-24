angular.module('app.directives', [])

app.directive('setActive', function(){
  return function(scope, element, attrs){
    element.on('click', function () {
      $(this)

        .siblings()
    });
  };
});



