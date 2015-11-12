angular.module( 'livefeed.dashboard.regional_analysis', [
  'factories',
  'livefeed.chart', 
  'ui.bootstrap'
])

.controller( 'RegionalAnalysisCtrl', function DashboardController( $scope, _, Graphs, chartService ) {
 console.log("ccc");
  $scope.regional_view = true;

  $scope.city_view = false;

  $scope.radioModel = 'Rating';

  $scope.show_loading = false;


  Graphs.regional_analysis().$promise.then(function(data){
    $scope.donut_graph_data = chartService.getDonutChartData(data);
    console.log($scope.donut_graph_data);
  });

  Graphs.regional_analysis(2).$promise.then(function(data){
    $scope.donut_graph_data_sqc = chartService.getDonutChartData(data);
    console.log($scope.donut_graph_data_sqc);

  });


  $scope.getRegionCities = function(region){
    $scope.selected_region = region;
    $scope.regional_view = false;
    $scope.city_view = true;
    $scope.show_loading = true;
    Graphs.city_analysis(region.id).$promise.then(function(data){
      $scope.donut_cities_data = chartService.getDonutChartData(data);
      $scope.show_loading = false;
    });
  };

  $scope.getCityBranches = function(city){
    $scope.selected_city = city;
    $scope.city_view = false;
    $scope.show_loading = true;
    Graphs.branch_analysis(city.id).$promise.then(function(data){
      $scope.donut_branches_data = chartService.getDonutChartData(data);
      $scope.show_loading = false;
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

  $scope.plotOptions = function(){
    console.log("function called");
    //console.log(region_id);
  };
  
})

.directive('morrisChart', function() {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        type: '=',
        options: '=',
        action: '&'
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
        console.log(options);
        morris_chart = new Morris.Donut(options);
        // morris_chart.on('click', function(i, row){         
        //   scope.$apply(scope.action); 
        // });
        return morris_chart;
        
      }
  };
});

