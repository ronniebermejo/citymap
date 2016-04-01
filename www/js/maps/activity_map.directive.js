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
      templateUrl: '/js/templates/activity_map.html',
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
  function ActivityMapController($interval, googleDirections,
                                 uiGmapIsReady, MapsConfig) {
    // https://developers.google.com/maps/documentation/javascript/directions
    var vm = this;
    var INITIAL_ZOOM = 6;
    var pollingFunction;
    vm.downtown = { lat: 20.6, lng: -100.383333, id: 1,latitude: 20.6, longitude:  -100.383333};

    // Map center is later on adjusted by the directions API
    vm.center = {latitude: 0, longitude: 0, lat: 0, lng: 0};

    vm.control = {};
    vm.markers = [];
    vm.map = {center: vm.center, zoom: INITIAL_ZOOM};


    vm.map_options = MapsConfig.mapOptions();

    activate();

    function activate() {
      uiGmapIsReady.promise().then(function() {
        getPlaces();
      });
    }

    function getPlaces() {
      var marker = new google.maps.Marker(
         vm.downtown
      );
      vm.markers.push(marker);
      var request = {
        location:  vm.downtown,
        radius: '500',
        types: ['restaurant', 'cinema', 'bar','cafe', 'night_club']
      };

      var service = new google.maps.places.PlacesService(vm.control.getGMap());
      service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            vm.ngModel.push(place);
            var marker = new google.maps.Marker({
              map: vm.control.getGMap(),
              id: i,
              position: place.geometry.location
            });
            console.log(place);

          }
        } else {
          console.log(status);
        }
      });
    }


    function startPolling() {
      pollingFunction = $interval(function () {
        vm.markers = [buildLocation(vm.currentLocation)];
        vm.control.refresh();
      }, 5000);
    }
  }
})();
