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
  'livefeed.queries',
  'chart.js',
  'livefeed.chart'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    views: {
      "main": {
        controller: 'DashboardCtrl',
        templateUrl: 'dashboard/dashboard.tpl.html'
      }
    },
    data:{ pageTitle: 'Dashboard' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'DashboardCtrl', function DashboardController( $scope, chartQueries, chartService, _ ) {

  
  // $scope.bar_data = [];

  // chartQueries.getCities().then(function(cities_data){
  //   chartQueries.getRegions().then(function(regions_data){
  //     $scope.regions_data = regions_data;
  //     console.log($scope.regions_data);
  //     var region_city_data = chartQueries.getRegionCities(regions_data,cities_data);
  //     console.log(region_city_data);
  //   });
  // });


  chartQueries.getMainRatingOptions().then(function(options_data){
    $scope.options_data = options_data;
    chartQueries.getUserFeedBack().then(function(feedback_data){
      $scope.feedback_data = feedback_data;
      
      var graph_data = chartService.getPieChartData(options_data, feedback_data);
      $scope.labels = _.map(graph_data, function(data){return data.title;});
      $scope.data = _.map(graph_data, function(data){return data.length;});

      // var bar_graph = chartService.getBarChartData(options_data, feedback_data);
      // $scope.bar_labels = _.map(bar_graph, function(data){return data.title;});
      // var bar_data = _.map(bar_graph, function(data){return data.length;});
      // $scope.bar_data.push(bar_data);
    });
  });


});

