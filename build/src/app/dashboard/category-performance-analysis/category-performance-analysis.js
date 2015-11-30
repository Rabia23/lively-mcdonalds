angular.module( 'livefeed.dashboard.category_performance_analysis', [
    'factories',
    'ui.bootstrap'
])

.controller('CategoryPerformanceAnalysisCtrl', function DashboardController($scope, _, Graphs, Global) {
    $scope.showData = function(region_id,city_id,branch_id,option_id,string){
      Graphs.category_performance(region_id,city_id,branch_id,option_id).$promise.then(function(performance_data){
           $scope.category_data = _.map(performance_data.feedbacks,  function(data,index){
               return {
                 id: data.option_id,
                 name: data.option__text,
                 complaints: data.count,
                 percentage: Math.round((data.count/performance_data.feedback_count)*100),
                 colour: option_id == null? Global.categoryPerformanceClass[data.option__text] : Global.categoryPerformanceChildCholorScheme[string][index],
                 priority:  option_id == null? Global.qscPriority[data.option__text] : " "
               };
          });
          if( option_id == null){ $scope.category_data = _.sortBy( $scope.category_data, function(value){ return value.priority; }); }

      });
      Graphs.segmentation_rating(region_id,city_id,branch_id,option_id).$promise.then(function(segment_data){

            $scope.segments = _.map(segment_data.segments,  function(data){
                return {
                    name: data.segment,
                    segment_data: _.map(data.option_data, function (dat) {
                        if(data.option_count === 0){
                            return {percentage: 0};
                        }
                        else {
                            return {percentage: Math.round((dat.count/data.option_count)*100), complaints: dat.count, class: Global.segmentationClass[dat.option__text]};
                        }
                    }),
                    priority: Global.segmentationPriority[data.segment]
                };
            });
            $scope.segments = _.sortBy( $scope.segments, function(value){ return value.priority; });
      });
    };
    $scope.onClick = function(option_id,string){

        if(string === 'All'){
            $scope.showData();
        }
        else if(string === 'Quality'){
            $scope.class = string;
          $scope.showData("","","",8,string);
        }
        else if(string === 'Service'){
            $scope.class = string;
            $scope.showData("","","",15,string);
        }
        else if(string === 'Cleanliness'){
            $scope.class = string;
            $scope.showData("","","",1,string);
        }

    };
    $scope.showData();

});