angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories',
  'chart.js'
])

.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, _ , Graphs,chartService, Global ) {
  $scope.data = [];
  Graphs.overall_feedback().$promise.then(function(graph_data){
    $scope.labels = _.map(graph_data.feedbacks, function(data){return data.option__text;});
    var bar_data = _.map(graph_data.feedbacks, function(data){return data.count;});
    $scope.data.push(bar_data);
    $scope.series = ['Series A'];
    $scope.colours = _.map(graph_data.feedbacks, function(data){return Global.mainRatingColorScheme[data.option__text];});
    $scope.options = {
      //scales: {
      //    xAxes: [{
      //        categorySpacing: 3
      //    }]
      //},
      //barStrokeWidth : 2
    };
  });

});

