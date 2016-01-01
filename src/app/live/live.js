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
angular.module( 'livefeed.live', [
  'ui.router',
  'livefeed.authService',
  'factories',
  'flash'

])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'live', {
    url: '/live',
    views: {
      "": {
        controller: 'LiveCtrl',
        templateUrl: 'live/live.tpl.html'
      }
    },
    authenticate: false
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'LiveCtrl', function LoginController( $scope,  _ , $rootScope, $state, Authentication, TokenHandler, Flash) {


  $scope.authenticate = {};

  $rootScope.$on('app-online', function(event, args) {
    console.log("online in login");
  });

  $rootScope.$on('app-offline', function(event, args) {
    console.log("offline in login");
  });

})


.directive('initSlide', function() {
  return {
    restrict: 'A',
    link: function(scope, ele, attrs) {
      window.initSlideShow();
    }
  };
});
