angular.module( 'livefeed.dashboard.opportunities', [
  'factories',
  "helper_factories"
])

.controller( 'OpportunitiesCtrl', function OpportunitiesCtrl( $scope, Graphs, Global ) {
    $scope.start_date = null;
    $scope.end_date = null;
    Graphs.category_performance("","","","", $scope.start_date, $scope.end_date).$promise.then(function(performance_data){
       $scope.category_data = _.map(performance_data.feedbacks,  function(data){
          return {
              id: data.option_id,
              name: data.option__text,
              complaints: data.count,
              percentage: data.count === 0 ? 0 : Math.round((data.count/performance_data.feedback_count)*100),
              priority: Global.qscPriority[data.option__text],
              colour: Global.categoryPerformanceClass[data.option__text]
          };
       });
       $scope.category_data = _.sortBy( $scope.category_data, function(value){ return value.priority; });

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
})

.directive('sameHeight', function() {
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
