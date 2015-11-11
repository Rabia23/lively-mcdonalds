angular.module( 'livefeed.dashboard.category_performance_analysis', [
    'factories',
    'ui.bootstrap'
])

.controller('CategoryPerformanceAnalysisCtrl', function DashboardController($scope, _, Graphs) {
    $scope.category_performance_analysis_data = Graphs.category_performance().$promise.then(function(performance_data){
      console.log("Category performance analysis data");
       console.log(performance_data);
        $scope.category_performance = _.map(performance_data.feedbacks,  function(data){
        return {
            name: data.option__text,
            percentage: Math.round((data.count/performance_data.feedback_count)*100)
        };
      });

       console.log("category performance");
       console.log(category_performance);

   });
  //$scope.max = 200;
  //
  //$scope.random = function() {
  //  var value = Math.floor((Math.random() * 100) + 1);
  //  var type;
  //
  //  if (value < 25) {
  //    type = 'success';
  //  } else if (value < 50) {
  //    type = 'info';
  //  } else if (value < 75) {
  //    type = 'warning';
  //  } else {
  //    type = 'danger';
  //  }
  //
  //  $scope.showWarning = (type === 'danger' || type === 'warning');
  //
  //  $scope.dynamic = value;
  //  $scope.type = type;
  //};
  //$scope.random();
  //
  //$scope.randomStacked = function() {
  //  $scope.stacked = [];
  //  var types = ['success', 'info', 'warning', 'danger'];
  //
  //  for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
  //      var index = Math.floor((Math.random() * 4));
  //      $scope.stacked.push({
  //        value: Math.floor((Math.random() * 30) + 1),
  //        type: types[index]
  //      });
  //  }
  //};
  //$scope.randomStacked();
});