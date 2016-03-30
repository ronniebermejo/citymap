(function() {
  'use strict';
  angular.module('citymap.maps').controller('mainController', MainController);

  MainController.$inject = ['GeoCode'];
  function MainController(GeoCode) {
    var vm = this;
    vm.pickupLocation = { latitude: 20.6, longitude: -100.383333};
    vm.deliveryLocation ={ latitude: 20.62, longitude: -100.383336};

  }
})();
