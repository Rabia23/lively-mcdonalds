angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories',
  'chart.js'
])

.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, _ , Graphs,chartService, Global ) {
  
  $scope.show_loading = false;

   function resetDates(){
    $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };
  }

  resetDates();

  $scope.datePickerOption = {
    eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          $scope.show_loading = true;
          Graphs.overall_feedback(ev.model.startDate._i, ev.model.endDate._i).$promise.then(function(graph_data){
            $scope.show_canvas = graph_data.feedback_count === 0 ? false : true;
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
    $scope.show_canvas = graph_data.feedback_count === 0 ? false : true;
    $scope.maximum = _.max(graph_data.feedbacks, function(data){ return data.count; });
    $scope.bar = chartService.getBarChartData(graph_data,$scope.maximum.count);
  });

})

.directive('sameBarHeight', function() {
  return {
      restrict: 'A',
      scope: {
        mydata: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('mydata', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
  };
});

 


