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
angular.module( 'livefeed.login', [
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
  .state( 'login', {
    url: '/login',
    views: {
      "": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    authenticate: false
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'LoginCtrl', function LoginController( $scope,  _ , $rootScope, $state, Authentication, TokenHandler, Flash) {

  $scope.submitted = false;

  $scope.authenticate = {};

  $scope.login = function(valid){
    $scope.submitted = true;
    if(valid){   
      Authentication.login($scope.authenticate).$promise.then(function(data){
        if(data.status){
          TokenHandler.store_token(data.token, data.username);
          $state.go("dashboard");
        }
        else{
          var message = data.message;
          Flash.create('danger', message, 'show-alert');
        }
      
      });
    }
  };



});
