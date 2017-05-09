/**
 * Created by crist on 08/05/2017.
 */
(function () {
  'use strict';

  angular
    .module('authApp')
    .component('toolbar', toolbar);

  function toolbar() {
    return {
      templateUrl: 'components/toolbar/toolbar.tpl.html',
      controller: toolbarController,
      controllerAs: 'toolbar'
    }
  }

  function toolbarController(auth, store, $location) {
    const vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.auth = auth;

    function login() {
      auth.signin({}, (profile, token) => {
        store.set('profile', profile);
        store.set('id_token', token);
        $location.path('/home');
      }, error => {
        console.log(error);
      });
    }

    function logout() {
      store.remove('profile');
      store.remove('id_token');
      auth.signout();
      $location.path('/home');
    }
  }
})();