(function () {
  'use strict';

  angular.module('citymap.weather',[])
    .factory('weather', weather);

  function weather($http) {
    var base = "https://api.forecast.io/forecast/";
    //var auth_url = 'https://api.instagram.com/oauth/authorize/';
    //var auth = "https://api.instagram.com/oauth/access_token/";

    // Ronnie instagram tokens
    //var clientId = 'e0cbc442969d442bb3b6de418783984a';
    //var clientSecret = 'dcd0e9fcef8d45e08a921379908733f8';

    //Stolen from the internet
    var key = 'd089a8e887c93cd332ebd6c362a53c45';

    var service = {
      getByLocation: getByLocation,
    };

    return service;

    function getByLocation() {
      var endPoint = base +
        key +
        '/20.62,-100.383333' +
        "/?&units=si" +"&callback=JSON_CALLBACK";
      return $http.jsonp(endPoint);
    }

  }

})();
