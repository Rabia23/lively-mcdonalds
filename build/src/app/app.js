angular.module( 'livefeed', [
  'templates-app',
  'templates-common',
  'livefeed.dashboard',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.constant('_',
    window._
)

.run( function run () {
  
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope ) {
  $rootScope.main = {
    brand: "LiveFeed"
  };
})

;

