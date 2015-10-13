angular.module( 'livefeed', [
  'templates-app',
  'templates-common',
  'livefeed.home',
  'ui.router',
  'parse-angular',
  'parse-angular.enhance',
  'livefeed.queries'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
  Parse.initialize("Sh3kxC6beypF4TjUkljjAi4NuDEm3ghkcvy12gL8", "Ms1UMG098qjYIZgvEaXTJeRtQSmVy9a0Tnw3b7Nh");
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | livefeed' ;
    }
  });
})

;

