angular.module( 'livefeed.dashboard.category_performance_analysis', [
    'factories',
    'ui.bootstrap'
])

.controller('CategoryPerformanceAnalysisCtrl', function DashboardController($scope, _, Graphs, Global) {
    $scope.radioModel = 'All';
    $scope.showData = function(region_id,city_id,branch_id,option_id){
      var category_performance_analysis_data = Graphs.category_performance(region_id,city_id,branch_id,option_id).$promise.then(function(performance_data){
       var category_performance = _.map(performance_data.feedbacks,  function(data){
       return {
         id: data.option_id,
         name: data.option__text,
         value: Math.round((data.count/performance_data.feedback_count)*100),
         class: Global.categoryPerformanceClass[data.option__text],
         priority: Global.qscPriority[data.option__text]
       };
      });
      $scope.category_performance = _.sortBy(category_performance, function(value){ return value.priority; });

      });

    };
    $scope.segmentation_rating_data = Graphs.segmentation_rating().$promise.then(function(segment_data){
        $scope.segments = _.map(segment_data.segments,  function(data){
            return {
                name: data.segment,
                segment_data: _.map(data.option_data, function (dat) {
                    if(data.option_count === 0){
                        return {value: 0};
                    }
                    else {
                        return {value: Math.round((dat.count/data.option_count)*100), class: Global.segmentationClass[dat.option__text]};
                    }
                })
            };
        });
    });
    $scope.getData = function(option_id){

        console.log(option_id);
        console.log($scope.radioModel);

    };
    $scope.showData();
  // $scope.randomStacked = function() {
  //  $scope.stacked = [];
  //  var types = ['success', 'info', 'warning', 'danger'];
  //  var values = [20,30,25];
  //  for (var i = 0; i < 3; i++) {
  //      $scope.stacked.push({
  //        value: values[i],
  //        type: types[i]
  //      });
  //  }
  //};
  //$scope.randomStacked();

});