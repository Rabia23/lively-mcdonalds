angular.module( 'livefeed', [
  'templates-app',
  'templates-common',
  'livefeed.dashboard',
  'livefeed.login',
  'livefeed.coupon',
  'ui.router',
  'livefeed.offline'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.constant('_',
    window._
)

.run( function run () {

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, offlineService ) {
  $rootScope.main = {
    brand: "LiveFeed"
  };

  console.log(offlineService.init());

});
