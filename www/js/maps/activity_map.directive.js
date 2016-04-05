(function () {
  'use strict';
  angular
    .module('citymap.maps')
    .directive('activityMap', ActivityMap);

  /*
   // Options:  fuzzy, showDirectionsInstructions
   */
  function ActivityMap() {
    var directive = {
      restrict: 'A',
      templateUrl: 'js/templates/activity_map.html',
      scope: {
        currentLocation: '=',
        options: '=',
        ngModel: '='
      },
      controller: ActivityMapController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  ActivityMapController.$inject = ['$interval', 'googleDirections',
    'uiGmapIsReady', 'MapsConfig'];
  function ActivityMapController($interval,
                                  MapsConfig) {
    // https://developers.google.com/maps/documentation/javascript/directions
    var vm = this;
    var INITIAL_ZOOM = 6;
    vm.initialLocation = {lat: 20.6, lng: -100.383333, zoom: 12};
    vm.downtown = {lat: 20.6, lng: -100.383333, id: 1, latitude: 20.6, longitude: -100.383333};

    // Map center is later on adjusted by the directions API
    vm.center = {latitude: 0, longitude: 0, lat: 0, lng: 0};

    vm.control = {};
    vm.markers = [];
    vm.map = {center: vm.center, zoom: INITIAL_ZOOM};


    vm.map_options = MapsConfig.mapOptions();

    activate();

    function activate() {
    }

    function getPlaces() {
      var mapCenter = new google.maps.LatLng(0, 0);

      var request = {
        location: vm.downtown,
        radius: '13500',
        types: ['restaurant', 'cinema', 'bar', 'cafe', 'night_club', 'hotel']
      };



      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var options = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
            console.log(options);
            var marker = new L.marker(options);
            vm.ngModel.push(marker);
          }
          console.log(place);
        } else {
          console.log(status);
        }
      });
    }

  }
})();
