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
          if( option_id == null){
              $scope.category_data = _.sortBy( $scope.category_data, function(value){ return value.priority; });
              $scope.QualityID = $scope.category_data[0].id;
              $scope.ServiceID = $scope.category_data[1].id;
              $scope.CleanlinessID = $scope.category_data[2].id;
          }

      });
      Graphs.segmentation_rating(region_id,city_id,branch_id,option_id).$promise.then(function(segment_data){
            $scope.segments = [];
            $scope.segments_data = _.map(segment_data.segments,  function(data){
                if(data.option_count !== 0){
                    return {
                        name: data.segment,
                        segment_data: _.map(data.option_data, function (dat) {
                            if(dat.count !== 0){
                                 return {percentage: Math.round((dat.count/data.option_count)*100), complaints: dat.count, class: Global.segmentationClass[dat.option__text]};
                            }
                        }),
                        priority: Global.segmentationPriority[data.segment]
                    };

                }

            });
            _.map($scope.segments_data, function (data) {
                if(data !== undefined){
                   data.segment_data =  _.reject(data.segment_data, function(dat) {return dat === undefined;});
                   $scope.segments.push(data);
                }
            });
            $scope.segments = _.sortBy( $scope.segments, function(value){return value.priority;});
      });
    };
    $scope.onClick = function(option_id,string){
        if(string === 'All'){
            $scope.class = "";
            $scope.showData();
        }
        else if(string === 'Quality'){
            $scope.class = string;
          $scope.showData("","","",option_id,string);
        }
        else if(string === 'Service'){
            $scope.class = string;
            $scope.showData("","","",option_id,string);
        }
        else if(string === 'Cleanliness'){
            $scope.class = string;
            $scope.showData("","","",option_id,string);
        }

    };
    $scope.showData();

});