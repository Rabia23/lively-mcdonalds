
angular.module( 'livefeed.login', [
  'ui.router',
  'livefeed.authService',
  'factories',
  'flash'

])

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
  $scope.show_loading = false;

  $rootScope.$on('app-online', function(event, args) {
    console.log("online in login");
  });

  $rootScope.$on('app-offline', function(event, args) {
    console.log("offline in login");
  });

  $scope.login = function(valid){
    $scope.show_loading = true;
    $scope.submitted = true;
    if(valid){
      Authentication.login($scope.authenticate).$promise.then(function(data){
        $scope.show_loading = false;
        if(data.status){
          $rootScope.token = data.token;
          TokenHandler.store_token(data.token, data.user.username, data.user.role);
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
