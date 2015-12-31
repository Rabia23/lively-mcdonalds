angular.module( 'livefeed', [
  'templates-app',
  'templates-common',
  'livefeed.dashboard',
  'livefeed.authService',
  'ui.router',
  'livefeed.offline'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.constant('_',
    window._
)

.run( function run ($rootScope, Auth, $state) {



})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, offlineService ) {


  //console.log("Offline service: "+offlineService.init());

});
