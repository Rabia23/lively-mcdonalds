angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.overall_feedback.chart',
  'helper_factories',
  'chart.js',
  'ngFlash'
])


.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, Graphs, Global, overallFeedbackChartService, flashService ) {

  $scope.show_loading = true;
  $scope.show_labels = true;

  $scope.today = new Date();

  $scope.show_error_message = false;



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
       if(graph_data.success) {
          $scope.show_error_message = false;
          $scope.show_labels = graph_data.response.feedback_count === 0 ? false : true;
          $scope.labels = _.map(graph_data.response.feedbacks, function (value) {
            return {option_name: value.option__text, color: Global.mainRatingColorScheme[value.option__text]};
          });
          $scope.show_canvas = graph_data.response.feedback_count === 0 ? false : true;
          $scope.maximum = _.max(graph_data.response.feedbacks, function (data) {
            return data.count;
          });
          $scope.bar = {};
          $scope.bar = overallFeedbackChartService.getBarChartData(graph_data.response, $scope.maximum.count);
          $scope.show_loading = false;
       }
       else {
         $scope.show_error_message = true;
         $scope.error_message = graph_data.message;
         flashService.createFlash($scope.error_message, "danger");
       }
     });
  }
  show_graph("","");



});
