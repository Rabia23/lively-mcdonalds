angular.module( 'livefeed.dashboard.positive_negative_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories' 
])

.controller( 'PositiveNegativeFeedbackCtrl', function DashboardController( $scope, _, Global, Graphs ) {

  Graphs.positive_negative_feedback().$promise.then(function(data){
    console.log(data);
    $scope.pos_feedbacks = data.positive_feedbacks;
    $scope.neg_feedbacks = data.negative_feedbacks;
    console.log($scope.pos_feedbacks);
    console.log($scope.neg_feedbacks);
  });

});

