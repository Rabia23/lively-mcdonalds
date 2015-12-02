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

  $scope.datePickerOption = {
    eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          Graphs.overall_feedback(ev.model.startDate._i, ev.model.endDate._i).$promise.then(function(graph_data){
            $scope.bar = chartService.getBarChartData(graph_data);
          });
        },
        'cancel.daterangepicker': function(ev, picker){
          $scope.datePicker.date.startDate = null;
          $scope.datePicker.date.endDate = null;
        }

    }
  };

  Graphs.overall_feedback().$promise.then(function(graph_data){
    var maximum = _.max(graph_data.feedbacks, function(data){ return data.count; });
    $scope.bar = chartService.getBarChartData(graph_data,maximum.count);
  });

});

