(function() {
  'use strict';
  angular.module('citymap.maps').controller('mainController', MainController);

  MainController.$inject = ['$scope', '$ionicPlatform', '$cordovaOauth', 'MapsConfig','instagram','weather', '$http' ];
  function MainController($scope, $ionicPlatform, $cordovaOauth, MapsConfig, instagram, weather, $http ) {
    var vm = this;
    var nextUrl = 0;  // next max tag id - for fetching older photos
    var NewInsta = 0; // min tag id - for fetching newer photos

    var clientId = '';
    var clientSecret = '';

    $ionicPlatform.ready(function() {
      $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
        console.log('twitter succ');
        $twitterApi.configure(clientId, clientSecret, succ);
      },
      function(error) {
        console.log('twitter: ' + error);
      });
    });

    vm.initialLocation = { latitude: 20.6, longitude: -100.383333, id: 1};
    vm.mapOptions = MapsConfig.mapOptions();
    vm.markers = [ ];

    vm.images = [];
    vm.images_2 = [];
    vm.images_3 = [];
    vm.labels = [];
    vm.news = [];
    vm.trends = [];
    vm.places =[];
    vm.foursquare = [];
    vm.weather = 0;

    vm.loadMore = loadMore;
    vm.doRefresh = doRefresh;

    vm.date = new Date();

    activate();

    var TULUM = 225838969;
    var QRO = 213006150;
    var QRO_CENTRO_HISTORICO = 213006150;

    function loadMore(){
      instagram.getByLocation(QRO_CENTRO_HISTORICO, nextUrl).success(function(response) {
        nextUrl = response.pagination.next_max_tag_id;
        NewInsta = response.pagination.min_tag_id;
        vm.images.push(response.data);
      });
    }

    function doRefresh(){
      vm.images = [];
      vm.images_2 = [];
      vm.images_3 = [];
      vm.labels = [];
      vm.news = [];
      vm.trends = [];
      vm.places =[];
      vm.date = new Date();
      activate();
      $scope.$broadcast('scroll.refreshComplete');
    }

    function activate() {
      getWeather();
      getNews();
      getTrendTopics();
      getFourSquare();

      instagram.getByHashTag('queretaro').success(function(response) {
        console.log(response);
        vm.images_2 = response.data;
      });

      instagram.getByHashTag('queretarock').success(function(response) {
        console.log(response);
        vm.images_3 = response.data;
      });

      instagram.getByLocation(QRO_CENTRO_HISTORICO, nextUrl).success(function(response) {
        vm.images = response.data;
        nextUrl = response.pagination.next_max_tag_id;
        NewInsta = response.pagination.min_tag_id;
      });
    }

    function getWeather(){
      weather.getByLocation().success(function(response){
        vm.weather = response;
        console.log(response);
      },function(error){
        console.log(error);
      });
    }

    function getNews() {
      //http://aristeguinoticias.com/canales-rss-en-aristegui-noticias/
      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?'+
        'callback=JSON_CALLBACK&v=1.0&'+'' +
        'q=http://aristeguinoticias.com/feed/').success(function (result) {
        var news = _.filter(result.responseData.feed.entries, function(entry){
          return entry.title.match(/quer.taro/i)
        });
        vm.news.push(news);
        vm.news = _.flatten(vm.news);
      });

      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?'+
        'callback=JSON_CALLBACK&v=1.0&'+'' +
        'q=http://www.jornada.unam.mx/rss/estados.xml').success(function (result) {
        console.log(result);
        var news = _.filter(result.responseData.feed.entries, function(entry){
          return entry.title.match(/quer.taro/i)
        });
        vm.news.push(news);
        vm.news = _.flatten(vm.news);
      });

      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?'+
        'callback=JSON_CALLBACK&v=1.0&'+'' +
        'q=http://www.jornada.unam.mx/rss/deportes.xml').success(function (result) {
        var news = _.filter(result.responseData.feed.entries, function(entry){
          return entry.title.match(/quer.taro/i)
        });
        vm.news.push(news);
        vm.news = _.flatten(vm.news);
      });

      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?'+
        'callback=JSON_CALLBACK&v=1.0&'+'' +
        'q=http://www.20minutos.com.mx/rss/minuteca/queretaro/').success(function (result) {
        vm.news.push(result.responseData.feed.entries);
        vm.news = _.flatten(vm.news);
      });

    }

    function getTrendTopics() {
      var TRENDS_URL ='http://ajax.googleapis.com/ajax/services/feed/load?'+
        'callback=JSON_CALLBACK&v=1.0&'+
        'q=http://www.google.com/trends/hottrends/atom/hourly?pn=p21';
      $http({method: 'jsonp', url: TRENDS_URL}).success(function(results){
        vm.trends = results.responseData.feed.entries;
      },function(error){
        console.log(error);
      });
    }

    function getFourSquare(){
      var url = 'https://api.foursquare.com/v2/venues/search?'+
        'client_id=KX3DUHLUNAVDUMWNPAQHWNRWKFBYBJQIC5WVHXJZ0FFRZ0LF&'+
        'client_secret=FK0OROYAHGJ4VP1A1SNL30GONFWIPQDTP0FRENJWDIVL1GGS&v=20130815&'+
        'll=20.6,-100.383333&'+
        'query=coffee?'+
        'callback=JSON_CALLBACK';

      $http.jsonp(url)
        .success(function(data){
          console.log(data);
        });
    }

    function getImageInfo(imageUrl) {
        var http = new XMLHttpRequest();
        http.open("GET", imageUrl);
        http.responseType = "blob";

        http.onload = function (e) {
          if (this.status === 200) {
            var image = new Image();
            image.onload = function () {
              EXIF.getData(image, function () {
                console.log(EXIF.pretty(this));
                var log = EXIF.pretty(this);
                console.log(log);
              });
            };
            image.src = URL.createObjectURL(http.response);
          } else {
            console.log(e);
          }
        };
        http.send();
    }

  }
})();
