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
angular.module( 'livefeed.home', [
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
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, chartQueries, chartService, _ ) {

      chartQueries.getCities().then(function(cities_data){
          $scope.cities_data = cities_data;
          console.log(cities_data);
        chartQueries.getRegions().then(function(regions_data){
          $scope.regions_data = regions_data;

          var region_city_data = chartQueries.getRegionCities(regions_data,cities_data);
        });
      });

  //    chartQueries.getMainRatingOptions().then(function(options_data){
  //    $scope.options_data = options_data;
  //    chartQueries.getUserFeedBack().then(function(feedback_data){
  //    $scope.feedback_data = feedback_data;
  //
  //    var graph_data = chartService.getPieChartData(options_data, feedback_data);
  //    $scope.labels = _.map(graph_data, function(data){return data.title;});
  //    console.log($scope.labels);
  //    $scope.data = _.map(graph_data, function(data){return data.length;});
  //    console.log($scope.data);
  //
  //
  //  });
  //});
  

  // $scope.clicked = function(e){
  //   console.log("clicked");
  //   console.log(e);
  // };

  // $scope.labels = ["Good", "Bad", "Very Bad"];
  // $scope.data = [300, 500, 100];


  // $scope.line_labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.series = ['Series A', 'Series B'];
  // $scope.line_data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };


});

