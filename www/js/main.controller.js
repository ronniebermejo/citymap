(function() {
  'use strict';
  angular.module('citymap.maps').controller('mainController', MainController);

  MainController.$inject = ['MapsConfig','instagram', '$http', '$rootScope'];
  function MainController(MapsConfig, instagram, $http, $rootScope) {
    var vm = this;
    var nextUrl = 0;  // next max tag id - for fetching older photos
    var NewInsta = 0; // min tag id - for fetching newer photos

    vm.pickupLocation = { latitude: 20.6, longitude: -100.383333, id: 1};
    vm.deliveryLocation ={ latitude: 20.62, longitude: -100.383336, id: 2};
    vm.deliveryLocation2 ={ latitude: 20.622, longitude: -100.383336, id: 3};
    vm.mapOptions = MapsConfig.mapOptions();
    vm.markers = [ ];

    vm.images = [];
    vm.images_2 = [];
    vm.images_3 = [];
    vm.labels = [];
    vm.news = [];
    vm.trends = [];
    vm.places =[];


    vm.loadMore = loadMore;
    vm.doRefresh = doRefresh;

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
      instagram.getByLocation(QRO_CENTRO_HISTORICO, nextUrl).success(function(response) {
        nextUrl = response.pagination.next_max_tag_id;
        NewInsta = response.pagination.min_tag_id;
        vm.images.push(response.data);
      });
    }

    function activate() {
      getNews();
      getTrendTopics();



      //instagram.getByLocation(TULUM,nextUrl).success(function(response) {
      //  vm.images = response.data;
      //});

      //instagram.getByLocation(TULUM, nextUrl).success(function(response) {
      //  vm.images_2 = response.data;
      //});

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

    function getNews() {
      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?callback=JSON_CALLBACK&v=1.0&q=http://www.eluniversal.com.mx/rss/estados.xml').success(function (result) {
        console.log(result);
        vm.news = result.responseData.feed.entries;
      });
    }

    function getTrendTopics() {
      var TRENDS_URL ='http://ajax.googleapis.com/ajax/services/feed/load?callback=JSON_CALLBACK&v=1.0&q=http://www.google.com/trends/hottrends/atom/hourly?pn=p21';
      $http({method: 'jsonp', url: TRENDS_URL}).success(function(results){
        vm.trends = results.responseData.feed.entries;
      },function(error){
        console.log(error);
      })
    }



    function getImageInfo(imageUrl) {
        var http = new XMLHttpRequest();
        http.open("GET", imageUrl);
        http.responseType = "blob";

        http.onload = function (e) {
          if (this.status === 200) {
            var image = new Image();
            image.onload = function () {
              EXIF.getData(image, function (data) {
                console.log(EXIF.pretty(this));
                var log = EXIF.pretty(this);
                console.log("asdasdasdasdasdasas"+log);
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
