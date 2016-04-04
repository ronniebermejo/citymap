(function () {
  'use strict';
  angular.module('citymap.maps').controller('mainController', MainController);

  MainController.$inject = ['$scope', '$state', 'MapsConfig', 'instagram', 'weather', '$http'];
  function MainController($scope, $state, MapsConfig, instagram, weather, $http) {
    var vm = this;
    var nextUrl = 0;  // next max tag id - for fetching older photos
    var NewInsta = 0; // min tag id - for fetching newer photos
    vm.initialLocation = {
      lat: 20.6, lng: -100.383333, zoom: 12, icon: {
        iconUrl: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
        iconSize: [32]
      }
    };
    vm.mapOptions = MapsConfig.mapOptions();
    vm.markers = [];

    vm.images = [];
    vm.labels = [];
    vm.news = [];
    vm.trends = [];
    vm.places = [];
    vm.foursquare = [];
    vm.weather = 0;

    vm.loadMore = loadMore;
    vm.doRefresh = doRefresh;

    var nextUrl=0;
    var NewInsta=0;

    vm.date = new Date();


    var TULUM = 225838969;
    var QRO = 213006150;
    var QRO_CENTRO_HISTORICO = 213006150;
    var UAQ = 296294540;
    var ZONA_CENTRO = 224035373;
    var PENA_BERNAL = 213877840;
    var PRQ_2000 = 234644670;
    var ANTEA = 218420318;
    var MARIA_BICI = 2343565;
    vm.placesToLook = [QRO, QRO_CENTRO_HISTORICO, UAQ, ZONA_CENTRO, PENA_BERNAL, PRQ_2000, ANTEA, MARIA_BICI];

    activate();

    function loadMore() {
      getInstagram();
    }

    function doRefresh() {
      vm.images = [];
      vm.labels = [];
      vm.news = [];
      vm.trends = [];
      vm.places = [];
      vm.date = new Date();
      activate();
      $scope.$broadcast('scroll.refreshComplete');
    }

    function activate() {
      getInstagram();
      getWeather();
      getNews();
      getTrendTopics();
      getFourSquare();
    }

    function getInstagram() {

      var hashToLook = ['queretaro', 'queretarock', 'anteaqro', 'qromex', 'instaqro', 'queretarotravel'];


      _.each(hashToLook, function (hash) {
        instagram.getByHashTag(hash).success(function (response) {
          var images = response.data;
          vm.images.push(images);
          vm.images = _.flatten(vm.images);
          _.each(images, function (image) {
            if (image.location) {
              var marker = {
                lat: image.location.latitude, lng: image.location.longitude, zoom: 12, imageId: image.id, icon: {
                  iconUrl: image.images.low_resolution.url,
                  iconSize: [32]
                }
              };
              vm.markers.push(marker);
            }
          })
        });
      });


      console.log(vm.placesToLook);
      _.each(vm.placesToLook, function (place) {
        console.log(place);
        console.log("Adasdadadasasdasdsa");
        instagram.getByLocation(place, nextUrl).success(function (response) {
          nextUrl = response.pagination.next_max_tag_id;
          NewInsta = response.pagination.min_tag_id;
          var images = response.data;
          vm.images.push(images);
          vm.images = _.flatten(vm.images);
          _.each(images, function (image) {
            if (image.location) {
              var marker = {
                lat: image.location.latitude, lng: image.location.longitude, zoom: 12, imageId: image.id, icon: {
                  iconUrl: image.images.low_resolution.url,
                  iconSize: [32]
                }
              };
              vm.markers.push(marker);
            }
          });
        });
      })
    }


    function getWeather() {
      weather.getByLocation().success(function (response) {
        vm.weather = response;
      }, function (error) {
        console.log(error);
      });
    }

    function getNews() {
      //http://aristeguinoticias.com/canales-rss-en-aristegui-noticias/
      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?' +
        'callback=JSON_CALLBACK&v=1.0&' + '' +
        'q=http://aristeguinoticias.com/feed/').success(function (result) {
        var news = _.filter(result.responseData.feed.entries, function (entry) {
          return entry.title.match(/quer.taro/i)
        });
        vm.news.push(news);
        vm.news = _.flatten(vm.news);
      });

      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?' +
        'callback=JSON_CALLBACK&v=1.0&' + '' +
        'q=http://www.jornada.unam.mx/rss/estados.xml').success(function (result) {
        console.log(result);
        var news = _.filter(result.responseData.feed.entries, function (entry) {
          return entry.title.match(/quer.taro/i)
        });
        vm.news.push(news);
        vm.news = _.flatten(vm.news);
      });

      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?' +
        'callback=JSON_CALLBACK&v=1.0&' + '' +
        'q=http://www.jornada.unam.mx/rss/deportes.xml').success(function (result) {
        var news = _.filter(result.responseData.feed.entries, function (entry) {
          return entry.title.match(/quer.taro/i)
        });
        vm.news.push(news);
        vm.news = _.flatten(vm.news);
      });

      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?' +
        'callback=JSON_CALLBACK&v=1.0&' + '' +
        'q=http://www.20minutos.com.mx/rss/minuteca/queretaro/').success(function (result) {
        vm.news.push(result.responseData.feed.entries);
        vm.news = _.flatten(vm.news);
      });

    }

    function getTrendTopics() {
      var TRENDS_URL = 'http://ajax.googleapis.com/ajax/services/feed/load?' +
        'callback=JSON_CALLBACK&v=1.0&' +
        'q=http://www.google.com/trends/hottrends/atom/hourly?pn=p21';
      $http({method: 'jsonp', url: TRENDS_URL}).success(function (results) {
        vm.trends = results.responseData.feed.entries;
      }, function (error) {
        console.log(error);
      });
    }

    function getFourSquare() {
      var url = 'https://api.foursquare.com/v2/venues/search?' +
        'client_id=KX3DUHLUNAVDUMWNPAQHWNRWKFBYBJQIC5WVHXJZ0FFRZ0LF&' +
        'client_secret=FK0OROYAHGJ4VP1A1SNL30GONFWIPQDTP0FRENJWDIVL1GGS&v=20130815&' +
        'll=20.6,-100.383333&' +
        'query=coffee?' +
        'callback=JSON_CALLBACK';

      $http.jsonp(url)
        .success(function (data) {
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

    $scope.$on('leafletDirectiveMarker.map.click', function (event, args) {
      $state.go('instagram_image', {'imageId': args.model.imageId});
    })

  }
})();
