/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'livefeed.manage_users', [
  'ui.router',
  'factories',
  'flash',
  'livefeed.authService'

])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'users', {
    url: '/users',
    views: {
      "": {
        controller: 'ManageUsersCtrl',
        templateUrl: 'manage-users/manage-users.tpl.html'
      },
      "sidebar@users":{
        templateUrl: 'common/sidebar.tpl.html'
      }

    },
    authenticate: true
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'ManageUsersCtrl', function DashboardController( $scope, $state, $rootScope, TokenHandler, Auth) {
  
  if (Auth.is_logged_in()) {
    $rootScope.show_username = true;
    $rootScope.username = TokenHandler.get_username();
  }
  $rootScope.logout = function(){
    Auth.is_logged_out();
    $rootScope.show_username = false;
    $state.go('login');
  };

  $rootScope.$on('app-online', function(event, args) {
    console.log("online in dashboard");
  });

  $rootScope.$on('app-offline', function(event, args) {
    console.log("offline in dashboard");
  });

});
