/**
 * Created by crist on 08/05/2017.
 */
'use strict';

angular
  .module('authApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
  .config(function ($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {

    authProvider.init({
      domain: 'YOUR_AUTH0_DOMAIN',
      clientID: 'YOUR_AUTH0_CLIENTE_ID'
    });

    jwtInterceptorProvider.tokenGetter = store => store.get('id_token');

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
      });

    jwtOptionsProvider.config({
      whiteListedDomains: ['localhost']
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  }).run(function ($rootScope, $state, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', () => {
    const token = store.get('id_token');

    if (token && !jwtHelper.isTokenExpired(token) && !auth.isAuthenticated) auth.authenticate(store.get('profile'), token);
    else $location.path('/home');
  });
});