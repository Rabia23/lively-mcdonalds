angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.overall_feedback.chart',
  'helper_factories',
  'chart.js'
])


.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, Graphs, Global, overallFeedbackChartService ) {

  $scope.show_loading = true;
  $scope.show_labels = true;

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

    },
    opens: "left"
  };

  function show_graph(start_date, end_date){
     Graphs.overall_feedback(start_date, end_date).$promise.then(function(graph_data){
        $scope.show_labels = graph_data.feedback_count === 0 ? false : true;
        $scope.labels = _.map(graph_data.feedbacks ,function(value){
          return {option_name: value.option__text, color: Global.mainRatingColorScheme[value.option__text]};
        });
        $scope.show_canvas = graph_data.feedback_count === 0 ? false : true;
        $scope.maximum = _.max(graph_data.feedbacks, function(data){ return data.count; });
        $scope.bar = {};
        $scope.bar = overallFeedbackChartService.getBarChartData(graph_data,$scope.maximum.count);
        $scope.show_loading = false;
     });
  }
  show_graph("","");
});

// .directive('sameBarHeight', function() {
//   return {
//       restrict: 'A',
//       scope: {
//         data: '='
//       },
//       link: function(scope, ele, attrs) {
//         scope.$watch('data', function(watchedData) {
//           if(watchedData !== undefined){
//             window.initSameHeight();
//           }
//         });
//       }
//   };
// });
