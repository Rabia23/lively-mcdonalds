angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories',
  'chart.js'
])

.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, _ , Graphs,chartService, Global ) {
  
  $scope.show_loading = false;

  $scope.today = new Date();

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
          show_graph(ev.model.startDate._i, ev.model.endDate._i);
          $scope.show_loading = false;
        },
        'cancel.daterangepicker': function(ev, picker){
          //$scope.datePicker.date.startDate = null;
          //$scope.datePicker.date.endDate = null;
        }

    }
  };

  function show_graph(start_date, end_date){
     Graphs.overall_feedback(start_date, end_date).$promise.then(function(graph_data){
        $scope.show_canvas = graph_data.feedback_count === 0 ? false : true;
        $scope.maximum = _.max(graph_data.feedbacks, function(data){ return data.count; });
        $scope.bar = {};
        $scope.bar = chartService.getBarChartData(graph_data,$scope.maximum.count);
     });
  }
  show_graph("","");
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

 


