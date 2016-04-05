(function () {
  'use strict';

  angular.module('citymap', []);
  angular.module('starter', [
    'ionic',
    'firebase',
    'leaflet-directive',
    'citymap.maps',
    'citymap.weather',
    'citymap.config',
    'instagram']
  );


})();
