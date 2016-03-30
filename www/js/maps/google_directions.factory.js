(function () {
  'use strict';
  angular.module('citymap.maps').
  factory('googleDirections', googleDirections);

  googleDirections.$inject = ['$q'];
  function googleDirections($q) {

    var service = {
      getDirections: getDirections
    };

    return service;

    function getDirections(args) {

      var travelModes = {};
      travelModes.driving = google.maps.TravelMode.DRIVING;
      travelModes.bicycling = google.maps.TravelMode.BICYCLING;
      travelModes.transit = google.maps.TravelMode.TRANSIT;
      travelModes.walking = google.maps.TravelMode.WALKING;

      var _args = angular.copy(args);
      _args.travelMode = travelModes[_args.travelMode] || google.maps.TravelMode.DRIVING;
      _args.unitSystem = google.maps.UnitSystem.METRIC;
      var deferred = $q.defer();

      var directionsService = new google.maps.DirectionsService();
      directionsService.route(_args, function (results, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          return deferred.resolve(results);
        } else {
          return deferred.reject(status);
        }
      });
      return deferred.promise;
    }
  }
})();
