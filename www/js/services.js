'use strict';

var serv = angular.module('app.services',['ngResource']);

var url = 'http://oratorjumssp-001-site1.btempurl.com/OratorjuMssp.svc/';

serv.factory('Readings',['$resource',
  function($resource){

    //setting default date to today - 14days
    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate()-10);

    var tempUrl = url + 'readingsFrom/' + fromDate.getFullYear() +  (fromDate.getMonth()+1) + fromDate.getDate();

    return $resource(tempUrl, {},{
      query: {
        method: 'GET',
        isArray:true
      }
    });
  }]);

serv.factory('Thoughts',['$resource',
  function($resource){
    //setting default date to today - 14days
    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate()-10);

    var tempUrl = url + 'thoughtsFrom/' + fromDate.getFullYear() +  (fromDate.getMonth()+1) + fromDate.getDate();

    return $resource(tempUrl, {},{
      query: {
        method: 'GET',
        isArray:true
      }
    });
  }]);

serv.factory('Articles',['$resource',
  function($resource){
    //setting default date to today - 14days
    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate()-10);

    var tempUrl = url + 'articlesFrom/' + fromDate.getFullYear() +  (fromDate.getMonth()+1) + fromDate.getDate();

    return $resource(tempUrl, {},{
      query: {
        method: 'GET',
        isArray:true
      }
    });
  }]);

/*
angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);
*/
