(function () {
  'use strict';
  angular
    .module('instagram')
    .directive('instagramCard', InstagramCard);

  /*
   // Options:  fuzzy, showDirectionsInstructions
   */
  function InstagramCard() {
    var directive = {
      restrict: 'E',
      templateUrl: '/js/templates/instagram/_instagram_card.html',
      scope: {
        ngModel: '='
      },
      controller: InstagramCardController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  //InstagramCardController.$inject = [];
  function InstagramCardController() {
    var vm = this;
  }
})();
