(function () {
  'use strict';

  angular.module('citymap', []);
  angular.module('starter', [
    'ionic',
    'leaflet-directive',
    'citymap.maps',
    'citymap.weather',
    'citymap.config',
    'instagram']
  );


})();
