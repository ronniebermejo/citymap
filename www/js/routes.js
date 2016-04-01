(function() {
  'use strict';

  angular.module('citymap.config').config(routes);

  routes.$inject =
    ['$stateProvider',
      '$urlRouterProvider'];

  function routes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'mainController',
        controllerAs: 'vm'
      })

      .state('list', {
        url: '/list',
        templateUrl: 'js/templates/list.html',
        controller: 'mainController',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'js/templates/profile.html',
        controller: 'mainController',
        controllerAs: 'vm'
      });
    $urlRouterProvider.otherwise("/");

  }
})();
