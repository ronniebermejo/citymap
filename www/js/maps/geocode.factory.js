(function () {
  'use strict';
  angular.module('citymap.maps').factory('GeoCode', GeoCode);

  GeoCode.$inject = ['$q', '$window'];
  function GeoCode($q, $window) {

    var service = {
      getLocation: getLocation,
      getCurrentLocation: getCurrentLocation,
      getAddress: getAddress
    };

    var userData = {};

    return service;


    function getCurrentLocation(opts) {

      var deferred = $q.defer();

      // Mock response on test env
      if (userData.env === 'test') {
        deferred.resolve({
          coords: {
            latitude: 0.0,
            longitude: 0.0
          }
        });
        return deferred.promise;
      }

      var geolocation_errors = {
        'errors.location.unsupportedBrowser': 'Browser does not support location services',
        'errors.location.permissionDenied': 'You have rejected access to your location',
        'errors.location.positionUnavailable': 'Unable to determine your location',
        'errors.location.timeout': 'Service timeout has been reached'
      };

      if ($window.navigator && $window.navigator.geolocation) {
        $window.navigator.geolocation.getCurrentPosition(function (position) {
          deferred.resolve(position);
        }, function (error) {
          switch (error.code) {
            case 1:
              deferred.reject(geolocation_errors['errors.location.permissionDenied']);
              break;
            case 2:
              deferred.reject(geolocation_errors['errors.location.positionUnavailable']);
              break;
            case 3:
              deferred.reject(geolocation_errors['errors.location.timeout']);
              break;
          }
        }, opts);
      }
      else {
        deferred.reject(geolocation_errors['errors.location.unsupportedBrowser']);
      }
      return deferred.promise;
    }

    function getLocation(address, referenceLatLng) {
      var location = {route: '', postal_code: ''};
      var geocoder = new google.maps.Geocoder();
      var deferred = $q.defer();
      var LatLng = new google.maps.LatLng(referenceLatLng.latitude, referenceLatLng.longitude);
      geocoder.geocode({'address': address, latLng: LatLng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var result = results[0];
          location = results[0].geometry.location;

          location.country = _.find(result.address_components, function (component) {
            return _.contains(component.types, 'country');
          });

          location.city = _.find(result.address_components, function (component) {
            return _.contains(component.types, 'administrative_area_level_2');
          });

          location.route = _.find(result.address_components, function (component) {
            return _.contains(component.types, 'route');
          });

          location.postal_code = _.find(result.address_components, function (component) {
            return _.contains(component.types, 'postal_code');
          });

          location.street_number = _.find(result.address_components, function (component) {
            return _.contains(component.types, 'street_number');
          });

          return deferred.resolve(location);
        }
        return deferred.reject();
      });
      return deferred.promise;
    }

    function getAddress(lat, lon) {
      var geocoder = new google.maps.Geocoder();
      var deferred = $q.defer();
      var latlng = new google.maps.LatLng(lat, lon);
      geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            return deferred.resolve(results[0].formatted_address);
          } else {
            return deferred.reject();
          }
        } else {
          return deferred.reject();
        }
      });
      return deferred.promise;
    }
  }
})();
