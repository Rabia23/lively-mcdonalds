angular.module( 'livefeed.dashboard.overall_rating', [
  'factories',
  'livefeed.chart',
  "helper_factories"
])

.controller( 'OverallRatingCtrl', function DashboardController( $scope, _, chartService, Graphs, Global ) {

  $scope.line1 = {
    data: [],
    options: {}
  };
  Graphs.overall_rating().$promise.then(function(data){
    var graph_data = chartService.getLineChart(data);
    $scope.labels = _.map(data[0].data.feedbacks ,function(value){
      return {value: value.option__text, color: Global.optionsColorScheme[value.option__text]};
    });    
    $.plot($("#overall-rating-linechart")[0], graph_data.data, graph_data.options);

  });
});

// .directive('flotChart', [
//   function() {
//     return {
//       restrict: 'A',
//       scope: {
//         data: '=',
//         options: '='
//       },
//       link: function(scope, ele, attrs) {
//         var data, options, plot;
//         data = scope.data;
//         options = scope.options;
//         console.log(ele);
//         return plot = $.plot(ele[0], data, options);
//       }
//     };
//   }
// ]);

