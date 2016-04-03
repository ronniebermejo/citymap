(function () {
  'use strict';

  angular.module('instagram',[])
    .factory('instagram', instagram);

  function instagram($http) {
    var base = "https://api.instagram.com/v1/";
    //var auth_url = 'https://api.instagram.com/oauth/authorize/';
    //var auth = "https://api.instagram.com/oauth/access_token/";

    // Ronnie instagram tokens
    //var clientId = 'e0cbc442969d442bb3b6de418783984a';
    //var clientSecret = 'dcd0e9fcef8d45e08a921379908733f8';

    //Stolen from the internet
    var clientId = '642176ece1e7445e99244cec26f4de1f';

    var service = {
      getByLocation: getByLocation,
      getByHashTag: getByHashTag
    };

    return service;

    function getByLocation(locationId, NewInsta) {

      var endPoint = "https://api.instagram.com/v1/locations/" +
        locationId +
        "/media/recent?&min_tag_id=" +
        NewInsta +
        "&client_id="+
        clientId +
        "&callback=JSON_CALLBACK";

      return $http.jsonp(endPoint);
    }

    function getByHashTag(hashtag) {
      var endPoint = "https://api.instagram.com/v1/tags/" +
        hashtag +
        "/media/recent?&client_id=" +
        clientId  +
        "&callback=JSON_CALLBACK";
      return $http.jsonp(endPoint);

    }

  }

})();
