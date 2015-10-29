angular.module( 'livefeed.dashboard.regional_analysis', [
  'factories',
  'livefeed.chart' 

])

.controller( 'RegionalAnalysisCtrl', function DashboardController( $scope, _, Graphs, chartService ) {

  var regional_analysis_data = Graphs.regional_analysis().$promise.then(function(data){
    console.log(data);
    $scope.donut_graph_data = chartService.getRegionChartData(data);
    console.log($scope.donut_graph_data);
  });
   
   var donutColor = ["#222", "#eee", "#ded", "#444"];
    var donutData = [
      {
        label: "Download Sales",
        value: 12
      }, {
        label: "In-Store Sales",
        value: 30
      }, {
        label: "Mail-Order Sales",
        value: 20
      }, {
        label: "Online Sales",
        value: 19
      }
    ];
    $scope.donut2 = {
      data: donutData,
      type: 'donut',
      options: {
        xkey: "year",
        colors: donutColor
      }
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
        return new Morris.Donut(options);
        
      }
  };
});

