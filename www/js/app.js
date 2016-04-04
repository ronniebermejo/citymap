(function () {
  'use strict';

  angular.module('citymap', []);
  angular.module('starter', [
    'ionic',
    'ngCordova',
    'ngCordovaOauth',
    'ngTwitter',
    'uiGmapgoogle-maps',
    'citymap.maps',
    'citymap.weather',
    'citymap.config',
    'instagram']
  );


})();
