angular.module( 'livefeed.dashboard.regional_analysis', [
  'factories',
  'livefeed.chart' 

])

.controller( 'RegionalAnalysisCtrl', function DashboardController( $scope, _, Graphs, chartService ) {

  var regional_analysis_data = Graphs.regional_analysis().$promise.then(function(data){
    $scope.donut_graph_data = chartService.getRegionChartData(data);
    console.log($scope.donut_graph_data);
  });
  
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
        return new Morris.Donut(options);
        
      }
  };
});

