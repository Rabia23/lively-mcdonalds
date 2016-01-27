angular.module( 'livefeed.dashboard.opportunities', [
  'factories',
  "helper_factories"
])

.controller( 'OpportunitiesCtrl', function OpportunitiesCtrl( $scope, Graphs, Global ) {
    $scope.start_date = null;
    $scope.end_date = null;
    Graphs.opportunity_analysis("","","",$scope.start_date, $scope.end_date).$promise.then(function(opportunity_data){
      console.log("opportunity data");
      console.log(opportunity_data);
      $scope.opportunity_data = _.map(opportunity_data.feedbacks,  function(data,index){
          return {
              id: data.option_id,
              name: data.option__text,
              complaints: data.count,
              percentage: data.count === 0 ? 0 : Math.round((data.count/opportunity_data.feedback_count)*100),
              colour: Global.topConcernsColors(index)
          };
       });

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
