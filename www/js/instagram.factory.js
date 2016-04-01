(function () {
  'use strict';

  angular.module('instagram');
  app.factory('instagram', instagram);

  function instagram($http) {
    var base = "https://api.instagram.com/v1/";
    var auth_url = 'https://api.instagram.com/oauth/authorize/';
    var auth = "https://api.instagram.com/oauth/access_token/";
    // get your own client id http://instagram.com/developer/
    //var clientId = 'e0cbc442969d442bb3b6de418783984a';
    var clientId = '642176ece1e7445e99244cec26f4de1f';
    var clientSecret = 'dcd0e9fcef8d45e08a921379908733f8';


    var service = {
      getByLocation: getByLocation,
      getByHashTag: getByHashTag
    };

    return service;


    function getByLocation(locationId, NewInsta) {
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

      console.log(NewInsta);
      var tulum = 225838969;
      var qrp = 213006150;
      var centro_historico = 2489686;
      var endPoint = "https://api.instagram.com/v1/locations/"+locationId+"/media/recent?&min_tag_id="+NewInsta+"&client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";
      //var endPoint = "https://api.instagram.com/v1/tags/queretaro/media/recent?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";
      return $http.jsonp(endPoint);
    }

    function getByHashTag(hashtag) {
      var endPoint = "https://api.instagram.com/v1/tags/"+hashtag+"/media/recent?&client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";

      var request = '/tags/' + hashtag + '/media/recent';
      var url = base + request;
      var config = {
        'params': {
          'client_id': clientId,
          'count': 100,
          'callback': 'JSON_CALLBACK'
        }
      };
      return $http.jsonp(endPoint);

    }



  }

})();
