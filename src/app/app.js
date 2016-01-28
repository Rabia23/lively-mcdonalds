angular.module( 'livefeed', [
  'templates-app',
  'templates-common',
  'livefeed.dashboard',
  'livefeed.login',
  'livefeed.coupon',
  'livefeed.live',
  'livefeed.manage_users',
  'livefeed.authService',
  'ui.router',
  'livefeed.offline'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/login' );
})

.constant('_',
    window._
)

.run( function run ($rootScope, Auth, $state) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.authenticate && !Auth.is_logged_in()) {
      event.preventDefault();
      $state.go('login');
    }

  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    $rootScope.currentState = toState.name;
  });

  $rootScope.logout = function(){
    Auth.is_logged_out();
    $rootScope.show_username = false;
    $state.go('login');
  };

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, offlineService ) {
  $rootScope.show_username = false;

  $rootScope.main = {
    brand: "LiveFeed"
  };

  //console.log("Offline service: "+offlineService.init());

})

.directive('customForm', function() {
  return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        window.initCustomForms();
      }
  };
});
