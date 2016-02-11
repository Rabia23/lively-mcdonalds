angular.module( 'livefeed.dashboard.opportunities', [
  'factories',
  'helper_factories',
   'ngFlash'
])

.controller( 'OpportunitiesCtrl', function OpportunitiesCtrl( $scope, Graphs, Global, flashService ) {
    $scope.start_date = null;
    $scope.end_date = null;
    $scope.show_loading = true;

    $scope.show_error_message = false;

    Graphs.opportunity_analysis("","","",$scope.start_date, $scope.end_date).$promise.then(function(opportunity_data){
      $scope.show_loading = false;
      if(opportunity_data.success) {
        $scope.show_error_message = false;
        $scope.opportunity_data = _.map(opportunity_data.response.feedbacks, function (data, index) {
          return {
            id: data.option_id,
            name: data.option__text,
            complaints: data.count,
            percentage: data.count === 0 ? 0 : Math.round((data.count / opportunity_data.response.feedback_count) * 100),
            colour: Global.topConcernsColors(index),
            priority: Global.opportunityPriority[data.option__text]
          };
        });
        console.log($scope.opportunity_data);
        $scope.opportunity_data = _.sortBy($scope.opportunity_data, function (value) {
           return value.priority;
        });
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = opportunity_data.message;
        flashService.createFlash($scope.error_message, "danger");
      }
    });
})

.directive('opportunityBarBackground', function() {
  return {
      restrict: 'A',
      scope: {
        data: '=',
        color: "="
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            $(ele).find(".progress-bar").css("background-color", ('' + scope.color));
            $(ele).find(".progress-bar").css("color", ('' + scope.color));
          }
        });
      }
  };
});

//.directive('sameHeight', function() {
//  return {
//      restrict: 'A',
//      scope: {
//        mydata: '='
//      },
//      link: function(scope, ele, attrs) {
//        scope.$watch('mydata', function(watchedData) {
//          if(watchedData !== undefined){
//            window.initSameHeight();
//          }
//        });
//      }
//  };
//});
