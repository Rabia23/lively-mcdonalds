angular.module( 'livefeed.dashboard.overall_feedback', [
  'factories',
  'livefeed.chart' 
])

.controller( 'OverallFeedbackCtrl', function DashboardController( $scope, _ , Graphs,chartService ) {

  $scope.overall_feedback_data = Graphs.overall_feedback().$promise.then(function(feedback_data){

    var getClass = function(name){
      if(name == "Few concerns"){
        return "negative";
      }
      else if(name == "Not happy enough"){
        return "neutral";
      }
      else if(name == "Everything is on track!"){
        return "good";
      }
      else{
        return "v-good";
      }

    };

    $scope.overall_feedback = _.map(feedback_data.feedbacks,  function(data){ 
      return {
        name: data.option__text, 
        percentage: ((data.count/feedback_data.feedback_count)*100),
        rounded_percentage: Math.round( ((data.count/feedback_data.feedback_count)*100)* 10 ) / 10,
        columns: _.range(0,Math.round(((data.count/feedback_data.feedback_count)*100)/10)),
        class: getClass(data.option__text)
      };
    });
  
  }); 

  

});

