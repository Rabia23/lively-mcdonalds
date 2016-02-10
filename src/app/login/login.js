
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
    $scope.submitted = true;
    if(valid){
      $scope.show_loading = true;
      Authentication.login($scope.authenticate).$promise.then(function(data){
        $scope.show_loading = false;
        if(data.success){
          $rootScope.token = data.response.token;
          $rootScope.fullname = data.response.user.first_name+" "+data.response.user.last_name;
          TokenHandler.store_token(data.response.token, data.response.user.username, data.response.user.role, data.response.user.first_name+" "+data.response.user.last_name);
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
