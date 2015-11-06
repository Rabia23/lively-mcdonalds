angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories' 
])

.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, _ , Graphs,chartService, Global ) {

  $scope.overall_feedback_data = Graphs.overall_feedback().$promise.then(function(feedback_data){

    var overall_feedback = _.map(feedback_data.feedbacks,  function(data){ 
      return {
        name: data.option__text, 
        percentage: ((data.count/feedback_data.feedback_count)*100),
        rounded_percentage: Math.round( ((data.count/feedback_data.feedback_count)*100)* 10 ) / 10,
        columns: _.range(0,Math.round(((data.count/feedback_data.feedback_count)*100)/10)),
        class: Global.overallFeedbackClass[data.option__text],
        priority: Global.overallFeedbackPriority[data.option__text]
      };
    });


    $scope.overall_feedback = _.sortBy(overall_feedback, function(value){ return value.priority; });


    console.log($scope.overall_feedback);
  
  }); 

  

});

