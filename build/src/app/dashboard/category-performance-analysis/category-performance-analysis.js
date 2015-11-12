angular.module( 'livefeed.dashboard.category_performance_analysis', [
    'factories',
    'ui.bootstrap'
])

.controller('CategoryPerformanceAnalysisCtrl', function DashboardController($scope, _, Graphs, Global) {
    $scope.category_performance_analysis_data = Graphs.category_performance().$promise.then(function(performance_data){
      console.log("Category performance analysis data");
       console.log(performance_data);
        $scope.category_performance = _.map(performance_data.feedbacks,  function(data){
        return {
            name: data.option__text,
            percentage: Math.round((data.count/performance_data.feedback_count)*100),
            class: Global.categoryPerformanceClass[data.option__text]
        };
      });

   });
});