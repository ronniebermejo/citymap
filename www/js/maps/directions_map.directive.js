(function() {
  'use strict';
  angular
    .module('citymap.maps')
    .directive('directionsMap', DirectionsMap);

  /*
   // Options:  fuzzy, showDirectionsInstructions
   */
  function DirectionsMap() {
    var directive = {
      restrict: 'A',
      templateUrl: '/js/templates/directions_map.html',
      scope: {
        origin: '=',
        destination: '=',
        currentLocation: '=',
        options: '=',
        ngModel: '='
      },
      controller: DirectionsMapController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  DirectionsMapController.$inject = ['$interval', 'googleDirections',
    'uiGmapIsReady', 'MapsConfig'];
  function DirectionsMapController($interval, googleDirections,
                                   uiGmapIsReady, MapsConfig) {
    // https://developers.google.com/maps/documentation/javascript/directions
    var vm = this;
    var INITIAL_ZOOM = 15;
    var locationNum = 0;
    var pollingFunction;

    // Map center is later on adjusted by the directions API
    vm.center = { latitude: 0, longitude: 0};

    vm.control = {};
    vm.map = {center: vm.center, zoom: INITIAL_ZOOM};

    vm.markers = [];

    vm.marker = {
      options: {
        draggable: true,
        labelAnchor: '100 0',
        labelClass: 'labels'
      }
    };

    vm.map_options = MapsConfig.mapOptions();

    activate();

    function activate() {
      vm.originLocation = buildLocation(vm.origin);
      vm.destinationLocation = buildLocation(vm.destination);

      //If no directions for 'bicycling' we revert to 'driving'
      vm.travelMode = 'bicycling';
      drawDirections(vm.travelMode);

      vm.showDirectionsInstructions = false;

      // We add a marker to represent a current location
      if (vm.currentLocation) {
        var location = buildLocation(vm.currentLocation);
        vm.markers.push(location);
        startPolling();
      }
    }

    function drawDirections(travelMode) {
      var getDirectionsArgs = {
        origin: vm.originLocation,
        destination: vm.destinationLocation,
        travelMode: travelMode
      };
      uiGmapIsReady.promise().then(function() {
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var displayedMap = vm.control.getGMap();

        // Deal with directions and markers
        googleDirections.getDirections(getDirectionsArgs).
        then(function(directions) {
          var route = directions.routes[0].legs[0];
          var supressMarkers = false;
          // Fill ng-model
          vm.ngModel = {
            duration: route.duration.text,
            distance: route.distance.text
          };

          directionsDisplay = new google.maps.DirectionsRenderer({
            polylineOptions: { strokeColor: vm.map_options.routeColor }
          });
          directionsDisplay.setOptions({suppressMarkers: supressMarkers});
          directionsDisplay.setMap(displayedMap);
          directionsDisplay.setDirections(directions);
          directionsDisplay.setPanel(document.
          getElementById('directions-panel'));

          vm.ngModel.travelMode = vm.travelMode;
        }, function(){
          vm.travelMode = 'driving';
          drawDirections(vm.travelMode);
        });
      });
    }

    function showFuzzyMarkers() {
      var displayedMap = vm.control.getGMap();
      new google.maps.Marker({
        id: 1,
        position: vm.originLocation,
        map: displayedMap,
        icon: vm.map_options.icons.red_circle
      });
      new google.maps.Marker({
        id: 2,
        position: vm.destinationLocation,
        map: displayedMap,
        icon: vm.map_options.icons.green_circle
      });
    }

    function showDestinationMarker() {
      var displayedMap = vm.control.getGMap();
      var marker_end = new google.maps.Marker({
        id: 1,
        position: vm.destinationLocation,
        map: displayedMap,
        icon: vm.map_options.icons.destination_icon
      });
      vm.markers = [marker_end];
    }

    // This data structure is required for building the markers and ask for directions
    function buildLocation(address) {
      locationNum++;
      var loc = {};
      loc.marker = {
        options: {
          icon: vm.map_options.icons.small_transparent_icon,
          draggable: true,
          labelAnchor: '100 0',
          labelClass: 'labels'
        }
      };
      loc.id = locationNum;
      loc.coords = {
        id: locationNum,
        latitude: address.latitude,
        longitude: address.longitude
      };
      loc.lat = address.latitude;
      loc.lng = address.longitude;
      return loc;
    }

    function startPolling() {
      pollingFunction = $interval(function() {
        vm.markers = [buildLocation(vm.currentLocation)];
        vm.control.refresh();
      }, 5000);
    }
  }
})();
