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
  'chart.js',
  'livefeed.chart',
  'factories', 
  'livefeed.helper',
  'livefeed.dashboard.regional_analysis',
  'livefeed.dashboard.feedback_map',
  'livefeed.dashboard.category_performance_analysis',
  'livefeed.dashboard.overall_rating',
  'livefeed.dashboard.overall_feedback',
  'livefeed.dashboard.statistics',
  'livefeed.dashboard.positive_negative_feedback'

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
      "category_performance_analysis@dashboard":{
        controller: "CategoryPerformanceAnalysisCtrl",
        templateUrl: 'dashboard/category-performance-analysis/category-performance-analysis.tpl.html'
      },
      "regional_analysis@dashboard":{
        controller: "RegionalAnalysisCtrl",
        templateUrl: 'dashboard/regional-analysis/regional-analysis.tpl.html'
      },
      "overall_rating@dashboard":{
        controller: "OverallRatingCtrl",
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
      }

    }
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'DashboardCtrl', function DashboardController( $scope, chartService, _ , $location, $anchorScroll, Filters, Graphs) {

  var regional_analysis_data = Graphs.regional_analysis();
  
  // $scope.filter_options = {
  //   region: null,
  //   city: null,
  //   branch: null,
  //   segment: null
  // };
  
  // $scope.regions = Filters.allRegions();
  
  // $scope.cities_disabled = true;
  // $scope.branches_disabled = true;

  // $scope.regionChanged = function(){
  //   if($scope.filter_options.region){
  //     $scope.cities = Filters.Cities($scope.filter_options.region.id);
  //   }
  //   else{
  //     $scope.filter_options.city = null;
  //     $scope.cities = [];
  //     $scope.brances = [];
  //   }
  // };

  // $scope.cityChanged = function(){
  //   if($scope.filter_options.city){
  //     $scope.branches = Filters.Branches($scope.filter_options.city.id);
  //   }
  //   else{
  //     $scope.filter_options.branch = null;
  //     $scope.branches = []; 
  //   }
  // };

  // $scope.branchChanged = function(){
  //   if(!$scope.filter_options.branch){
  //     $scope.filter_options.branch = null;
  //   }
  // };

  // var graph_data = Graphs.feedback_with_scores();




  // $scope.pie_chart_first_step = true;
  // $scope.show_detail_table = false;
  
  // $scope.colorScheme = chartService.decideColorScheme(graph_data);


  // $scope.pie_chart = chartService.getPieChartData(graph_data, $scope.colorScheme);
  // $scope.bar_chart = chartService.getBarChartData(graph_data, $scope.colorScheme);

  // $scope.backPieChart = function(){
  //   $scope.pie_chart_first_step = true;
  //   $scope.colorScheme = chartService.decideColorScheme(graph_data);
  //   $scope.pie_chart = chartService.getPieChartData(graph_data, $scope.colorScheme );
  //   $scope.bar_chart = chartService.getBarChartData(graph_data, $scope.colorScheme );

  // };

  // $scope.detailPieChart = function(){
  //   $scope.pie_chart_first_step = false;
    
  //   var detail_data = {
  //     total_feedback: 80, 
  //     feedback: [{label: "Services", count: 20}, {label: "Food", count: 50}, {label: "Cleanliness", count: 10}]};

  //   $scope.colorScheme = chartService.decideColorScheme(detail_data);
  //   $scope.pie_chart = chartService.getPieChartData(detail_data, $scope.colorScheme);
  //   $scope.bar_chart = chartService.getBarChartData(detail_data, $scope.colorScheme);


  
  // };


  

  //  Line Chart

  // $scope.total_line_chart_series = ['Series A', 'Series B'];
  // $scope.total_line_chart_data = [[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90]];
  
  // $scope.line_chart = {
  //   labels : ["January", "February", "March", "April", "May", "June", "July"],
  //   data: [[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90]],
  //   series: ['Series A', 'Series B'],
  //   options: {
  //     bezierCurve : false
  //   }
  // };

  // $scope.addRemoveSeries = function(series, index){
  //   if($scope.line_chart.series.indexOf(series) == -1){
  //     $scope.line_chart.series.push(series);
  //     $scope.line_chart.data.push($scope.total_line_chart_data[index]);
  //   }
  //   else{
  //     var ind = $scope.line_chart.series.indexOf(series);
  //     $scope.line_chart.series.splice(ind, 1);
  //     $scope.line_chart.data.splice(ind, 1);
  //   }
  // };

  // $scope.checkCheckBox = function(series){
  //   return ($scope.line_chart.series.indexOf(series) === -1)? false : true;
  // };

  // $scope.lineChartClicked = function(points, evt){
  //   console.log(points);
  //   console.log(evt);
  //   //$scope.show_detail_table = true;
  //   //$location.hash('details-table');
  //   //$anchorScroll();
  // };

});

