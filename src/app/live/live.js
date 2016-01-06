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
  'flash',
  'livefeed.live.top_concerns',
  'livefeed.live.overall-ratings',
  'livefeed.live.business_segment',
  'livefeed.live.qsc',
  'livefeed.live.patch_qsc_analysis'
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
      },
      "top_concern@live":{
        controller: "TopConcernCtrl",
        templateUrl: 'live/top-concerns/top-concern.tpl.html'
      },
      "overall_rating@live":{
        controller: "OverallRatingCtrl",
        templateUrl: 'live/overall-ratings/overall-rating.tpl.html'
      },
      "business_segment@live":{
        controller: "BusinessSegmentCtrl",
        templateUrl: 'live/business-segments/business-segment.tpl.html'
      },
      "qsc@live":{
        controller: "QscCtrl",
        templateUrl: 'live/qsc/qsc.tpl.html'
      },
      "patch_qsc_analysis@live":{
        controller: "PatchQscAnalysisCtrl",
        templateUrl: 'live/patch-qsc-analysis/patch-qsc-analysis.tpl.html'
      }
    },
    authenticate: false
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'LiveCtrl', function LiveController( $scope,  _ , $rootScope, $state, Authentication, Graphs) {


  $scope.authenticate = {};

  $rootScope.$on('app-online', function(event, args) {
    console.log("online in login");
  });

  $rootScope.$on('app-offline', function(event, args) {
    console.log("offline in login");
  });

  function top_rankings(){
    Graphs.top_rankings().$promise.then(function(data){
      console.log("top_rankings");
      console.log(data);
      $scope.top_ranking = data;
    });
  }
  top_rankings();

  

})


.directive('initSlide', function() {
  return {
    restrict: 'A',
    link: function(scope, ele, attrs) {
      window.initSlideShow();
    }
  };
});

