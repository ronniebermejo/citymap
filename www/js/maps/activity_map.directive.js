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
        items: '=',
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
    var INITIAL_ZOOM = 9;
    var pollingFunction;

    // Map center is later on adjusted by the directions API
    vm.center = {latitude: 0, longitude: 0, lat: 0, lng: 0};

    vm.control = {};
    vm.markers = [];
    vm.map = {center: vm.center, zoom: INITIAL_ZOOM};


    vm.map_options = MapsConfig.mapOptions();

    activate();

    function activate() {

      uiGmapIsReady.promise().then(function() {
        var displayedMap = vm.control.getGMap();
        var mapCenter = new google.maps.LatLng(0, 0);

        angular.forEach(vm.items, function (image) {
          //var m = new RichMarker({
          //  map: displayedMap,
          //  id: image.id,
          //  position: image.position,
          //  draggable: true,
          //  content: '<div class="my-marker"><div>This is a nice image</div>' +
          //  '<div><img src="https://farm4.static.flickr.com/3212/3012579547_' +
          //  '097e27ced9_m.jpg"/></div><div>You should drag it!</div></div>'
          //});
          //var m = new google.maps.Marker(
          //  image
          //);
          vm.markers.push(image);

        });

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
