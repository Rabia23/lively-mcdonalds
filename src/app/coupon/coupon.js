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
angular.module( 'livefeed.coupon', [
  'ui.router',
  'livefeed.chart',
  'factories'

])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'coupon', {
    url: '/coupon',
    views: {
      "": {
        controller: 'CouponCtrl',
        templateUrl: 'coupon/coupon.tpl.html'
      }


    }
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'CouponCtrl', function CouponController( $scope,  _ , $rootScope) {

  //var regional_analysis_data = Graphs.regional_analysis();
  $rootScope.$on('app-online', function(event, args) {
    console.log("online in login");
  });

  $rootScope.$on('app-offline', function(event, args) {
    console.log("offline in login");
  });



});
