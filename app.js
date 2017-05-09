/**
 * Created by crist on 08/05/2017.
 */
'use strict';

angular
  .module('authApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
  .config(function ($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {

    authProvider.init({
      domain: 'learning-angularjs.auth0.com',
      clientID: 'Ber6lzFtBZnSg1qRUEddlteA4Esi8dWD'
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'components/home/home.tpl.html'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'components/profile/profile.tpl.html',
        controller: 'profileController as user'
      })
  });