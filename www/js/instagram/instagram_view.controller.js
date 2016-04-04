(function () {
  'use strict';
  angular.module('citymap.maps').controller('instagramViewController', InstagramViewController);

  InstagramViewController.$inject = ['$stateParams', 'instagram' ];
  function InstagramViewController( $stateParams, instagram) {
    var vm = this;
    vm.imageId = null;
    instagram.getById($stateParams.imageId).success(function (result) {
      console.log(result);
      vm.image = result.data;
    });
  }

})();
