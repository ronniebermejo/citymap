angular.module('citymap.maps', []);
var nameApp = angular.module('starter', ['ionic', 'uiGmapgoogle-maps', 'citymap.maps']);

nameApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'mainController',
      controllerAs: 'vm'
    });
  $urlRouterProvider.otherwise("/");

});


nameApp.controller('HomeCtrl', function($scope, uiGmapGoogleMapApi) {

  $scope.myLocation = {
    lng : '',
    lat: ''
  }

  $scope.options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0
  };

  $scope.drawMap = function(position) {

    //$scope.$apply is needed to trigger the digest cycle when the geolocation arrives and to update all the watchers
    $scope.$apply(function() {
      $scope.myLocation.lng = position.coords.longitude;
      $scope.myLocation.lat = position.coords.latitude;

      $scope.map = {
        center: {
          latitude:  20.6,
          longitude:-100.383333
        },
        zoom: 14,
        pan: 1
      };

      $scope.marker = {
        id: 0,
        coords: {
          latitude: $scope.myLocation.lat,
          longitude: $scope.myLocation.lng
        }
      };

      $scope.marker.options = {
        draggable: false,
        labelContent: "lat: " + $scope.marker.coords.latitude + '<br/> ' + 'lon: ' + $scope.marker.coords.longitude,
        labelAnchor: "80 120",
        labelClass: "marker-labels"
      };
    });
  }

  $scope.handleError = function(error) {
    console.warn('ERROR(' + error.code + '): ' + error.message);
  }

  navigator.geolocation.getCurrentPosition($scope.drawMap, $scope.handleError, $scope.options);

});
