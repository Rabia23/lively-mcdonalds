angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories',
  'chart.js'
])

.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, _ , Graphs,chartService, Global ) {
  $scope.show_loading = false;
  $scope.datePicker = {};
  $scope.datePicker.date = {startDate: null, endDate: null};
  $scope.today = new Date();

  $scope.datePickerOption = {
    eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          $scope.show_loading = true;
          Graphs.overall_feedback(ev.model.startDate._i, ev.model.endDate._i).$promise.then(function(graph_data){
             console.log($scope.show_loading);
            $scope.maximum = _.max(graph_data.feedbacks, function(data){ return data.count; });
            $scope.bar = chartService.getBarChartData(graph_data,$scope.maximum.count);
            $scope.show_loading = false;
          });
        },
        'cancel.daterangepicker': function(ev, picker){
          $scope.datePicker.date.startDate = null;
          $scope.datePicker.date.endDate = null;
        }

    }
  };

  Graphs.overall_feedback().$promise.then(function(graph_data){
    $scope.maximum = _.max(graph_data.feedbacks, function(data){ return data.count; });
    $scope.bar = chartService.getBarChartData(graph_data,$scope.maximum.count);
  });

});

