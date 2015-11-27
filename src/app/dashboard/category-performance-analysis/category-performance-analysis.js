angular.module( 'livefeed.dashboard.category_performance_analysis', [
    'factories',
    'ui.bootstrap'
])

.controller('CategoryPerformanceAnalysisCtrl', function DashboardController($scope, _, Graphs, Global) {
    $scope.showData = function(region_id,city_id,branch_id,option_id,string){
      $scope.category_data = [];
      Graphs.category_performance(region_id,city_id,branch_id,option_id).$promise.then(function(performance_data){
           $scope.category_data = _.map(performance_data.feedbacks,  function(data,index){
               return {
                 id: data.option_id,
                 name: data.option__text,
                 value: Math.round((data.count/performance_data.feedback_count)*100),
                 colour: option_id == null? Global.categoryPerformanceClass[data.option__text] : Global.categoryPerformanceChildCholorScheme[string][index]
                 //priority: Global.qscPriority[data.option__text]
               };
          });
          console.log("category performance data");
          console.log($scope.category_data);
          //$scope.category_performance = _.sortBy( $scope.category_performance, function(value){ return value.priority; });

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
    $scope.getQSC_ID = function(){


    };
    $scope.onClick = function(option_id,string){
        if(string === 'All'){
            $scope.showData();
        }
        else if(string === 'Quality'){
          $scope.showData("","","",8,string);
        }
        else if(string === 'Service'){
            $scope.showData("","","",15,string);
        }
        else if(string === 'Cleanliness'){
            $scope.showData("","","",1,string);
        }

    };
    $scope.showData();

});