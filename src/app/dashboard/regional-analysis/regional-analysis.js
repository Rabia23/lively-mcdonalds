angular.module( 'livefeed.dashboard.regional_analysis', [
  'factories',
  'livefeed.chart' 

])

.controller( 'RegionalAnalysisCtrl', function DashboardController( $scope, _, Graphs, chartService ) {

  $scope.regional_view = true;
  $scope.city_view = false;

  var regional_analysis_data = Graphs.regional_analysis().$promise.then(function(data){
    $scope.donut_graph_data = chartService.getDonutChartData(data);
  });


  $scope.getRegionCities = function(region){
    $scope.selected_region = region;
    $scope.regional_view = false;
    $scope.city_view = true;
    Graphs.city_analysis(region.id).$promise.then(function(data){
      $scope.donut_cities_data = chartService.getDonutChartData(data);
    });
  };

  $scope.getCityBranches = function(city){
    $scope.selected_city = city;
    $scope.city_view = false;
    Graphs.branch_analysis(city.id).$promise.then(function(data){
      $scope.donut_branches_data = chartService.getDonutChartData(data);
    });
  };

  $scope.backToRegions = function(){
    $scope.selected_region = null;
    $scope.regional_view = true;
    $scope.city_view = false;
    $scope.donut_cities_data = [];
  };

  $scope.backToCities = function(){
    $scope.selected_city = null;
    $scope.city_view = true;
    $scope.regional_view = false;
    $scope.donut_branches_data = []; 
  };
  
})

.directive('morrisChart', function() {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        type: '=',
        options: '='
      },
      link: function(scope, ele, attrs) {
        var data, func, options, type;
        data = scope.data;
        type = scope.type;
        options = angular.extend({
          element: ele[0],
          data: data
        }, scope.options);
        if (options.formatter) {
          func = new Function('y', 'data', options.formatter);
          options.formatter = func;
        }
        morris_chart = new Morris.Donut(options);
        morris_chart.on('click', function(i, row){
          alert(row.label);
          console.log(i, row);
        });
        return morris_chart;
        
      }
  };
});

