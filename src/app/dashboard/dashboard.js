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
angular.module( 'livefeed.dashboard', [
  'ui.router',
  'factories',
  'livefeed.dashboard.regional_analysis',
  'livefeed.dashboard.feedback_map',
  'livefeed.dashboard.category_performance_analysis',
  'livefeed.dashboard.overall_rating',
  'livefeed.dashboard.overall_feedback',
  'livefeed.dashboard.statistics',
  'livefeed.dashboard.positive_negative_feedback',
  'livefeed.dashboard.top_concern',
  'livefeed.dashboard.opportunities',
  'ngFlash',
  'livefeed.authService'

])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'dashboard', {
    url: '/dashboard',
    views: {
      "": {
        controller: 'DashboardCtrl',
        templateUrl: 'dashboard/dashboard.tpl.html'
      },
      "feedback_map@dashboard":{
        controller: "FeedbackMapCtrl",
        templateUrl: 'dashboard/feedback-map/feedback-map.tpl.html'
      },
      "sidebar@dashboard":{
        templateUrl: 'common/sidebar.tpl.html'
      },
      "header@dashboard":{
        templateUrl: 'common/header.tpl.html'
      },
      "footer@dashboard":{
        templateUrl: 'common/footer.tpl.html'
      },
      "category_performance_analysis@dashboard":{
        controller: "CategoryPerformanceAnalysisCtrl",
        templateUrl: 'dashboard/category-performance-analysis/category-performance-analysis.tpl.html'
      },
      "regional_analysis@dashboard":{
        controller: "RegionalAnalysisCtrl",
        templateUrl: 'dashboard/regional-analysis/regional-analysis.tpl.html'
      },
      "overall_rating@dashboard":{
        controller: "TimeLineCtrl",
        templateUrl: 'dashboard/overall-rating/overall-rating.tpl.html'
      },
      "overall_feedback@dashboard":{
        controller: "OverallFeedbackCtrl",
        templateUrl: 'dashboard/overall-feedback/overall-feedback.tpl.html'
      },
      "statistics@dashboard":{
        controller: "StatisticsCtrl",
        templateUrl: 'dashboard/statistics/statistics.tpl.html'
      },
      "positive_negative_feedback@dashboard":{
        controller: "PositiveNegativeFeedbackCtrl",
        templateUrl: 'dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html'
      },

      "top_concern@dashboard":{
        controller: "TopConcernsCtrl",
        templateUrl: 'dashboard/top-concern/top-concern.tpl.html'
      },

      "opportunities@dashboard":{
        controller: "OpportunitiesCtrl",
        templateUrl: 'dashboard/opportunities/opportunities.tpl.html'
      }



    },
    authenticate: true
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'DashboardCtrl', function DashboardController( $scope, $state, $rootScope, flashService, Graphs) {
  $scope.show_loading = true;

  $rootScope.$on('app-online', function(event, args) {
    console.log("online in dashboard");
  });

  $rootScope.$on('app-offline', function(event, args) {
    console.log("offline in dashboard");
  });

  Graphs.top_charts().$promise.then(function(data){
    if(data.success) {
      $scope.chart_data = data.response;
      $scope.show_loading = false;
    }
    else{
      flashService.createFlash(data.message, "danger");
    }
  });

  var $chart;
  $scope.$on('create', function (event, chart) {
    if(chart.chart.canvas.id === "bar"){
      if (typeof $chart !== "undefined") {
        $chart.destroy();
      }
      $chart = chart;
    }

  });

})

.directive('backGround', function() {
  return {
      restrict: 'A',
      scope: {
        color: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('color', function(watchedData) {
          if(watchedData !== undefined){
            $(ele).css("background-color", scope.color);
          }
        });
      }
  };
});
