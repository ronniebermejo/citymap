(function () {
  'use strict';

  angular.module('citymap', []);
  angular.module('starter', [
    'ionic',
    'leaflet-directive',
    'uiGmapgoogle-maps',
    'citymap.maps',
    'citymap.weather',
    'citymap.config',
    'instagram']
  );


})();
