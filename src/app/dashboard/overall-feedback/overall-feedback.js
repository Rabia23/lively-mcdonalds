angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories',
  'chart.js'
])

.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, _ , Graphs,chartService, Global ) {
  
  $scope.datePicker = {};
  $scope.datePicker.date = {startDate: null, endDate: null};

  $scope.today = new Date();

  $scope.data = [];
  Graphs.overall_feedback().$promise.then(function(graph_data){
    $scope.labels = _.map(graph_data.feedbacks, function(data){return data.option__text;});
    //$scope.bar = chartService.getBarChartData(graph);
    var bar_data = _.map(graph_data.feedbacks, function(data){return data.count;});
    $scope.data.push(bar_data);
    $scope.series = ['Series A'];
    $scope.colours = [{fillColor: _.map(graph_data.feedbacks, function(data){return Global.mainRatingColorScheme[data.option__text];})}];
    $scope.options = {

      barShowStroke : false,
      barValueSpacing : 25,
      scaleShowVerticalLines: false
    };
  });

});

