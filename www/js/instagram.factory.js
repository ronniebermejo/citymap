'use strict';
angular.module('instagram', []);
app.factory('instagram', ['$http',
  function($http) {
    var base = "https://api.instagram.com/v1/";
    var auth_url = 'https://api.instagram.com/oauth/authorize/';
    var auth = "https://api.instagram.com/oauth/access_token/";
    // get your own client id http://instagram.com/developer/
    var clientId = 'e0cbc442969d442bb3b6de418783984a';
    var clientSecret = 'dcd0e9fcef8d45e08a921379908733f8';



    //var auth_url_config = {
    //  'params': {
    //    'client_id': clientId,
    //    'redirect_uri': 'http//:0.0.0.0:8010',
    //    'callback': 'JSON_CALLBACK'
    //  }
    //};
    //$http.jsonp(auth_url, auth_url_config);
    //
    //var auth_config = {
    //  'params': {
    //    'client_id': clientId,
    //    'client_secret': clientSecret,
    //    'grant_type': 'authorization_code',
    //    'count': 1,
    //    'callback': 'JSON_CALLBACK'
    //  }
    //};
    //$http.jsonp(auth, auth_config);


    function successAuth(response, code) {
      console.log(response);

    };



    return {
      'get': function() {
        //var request = '/tags/' + hashtag + '/media/recent';
        //var url = base + request;
        //var config = {
        //  'params': {
        //    'client_id': clientId,
        //    'count': count,
        //    'callback': 'JSON_CALLBACK'
        //  }
        //};
        //return $http.jsonp(url, config);

        var endPoint = "https://api.instagram.com/v1/locations/213006150/media/recent?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";
        return $http.jsonp(endPoint);
      }
    };
  }
]);
