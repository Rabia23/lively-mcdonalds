angular.module( 'livefeed.dashboard.category_performance_analysis', [
    'factories',
    'ui.bootstrap'
])

.controller('CategoryPerformanceAnalysisCtrl', function DashboardController($scope, _, Graphs, Global) {

  $scope.show_loading = false;
  $scope.class = '';
  $scope.option_id = null;

  $scope.today = new Date();


  function resetDates(){
    $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };
  }

  resetDates();

  $scope.start_date = null;
  $scope.end_date = null;

  $scope.datePickerOption = {
    eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          $scope.start_date = ev.model.startDate._i;
          $scope.end_date =  ev.model.endDate._i;
          $scope.showCategoryData("","","",$scope.option_id,$scope.class);
          $scope.showSegmentData("","","",$scope.option_id,$scope.class);
        },
        'cancel.daterangepicker': function(ev, picker){
          //$scope.datePicker.date.startDate = null;
          //$scope.datePicker.date.endDate = null;
        }

    }
  };
  
  $scope.showCategoryData = function(region_id,city_id,branch_id,option_id,string){
    $scope.show_loading = true;

    Graphs.category_performance(region_id,city_id,branch_id,option_id, $scope.start_date, $scope.end_date).$promise.then(function(performance_data){
      $scope.category_data = _.map(performance_data.feedbacks,  function(data){
        return {
          id: data.option_id,
          name: data.option__text,
          complaints: data.count,
          percentage: data.count === 0 ? 0 : Math.round((data.count/performance_data.feedback_count)*100),
          priority:  option_id == null? Global.qscPriority[data.option__text] : Global.qscSubCategoriesData[string][data.option__text].priority,
          colour: option_id == null? Global.categoryPerformanceClass[data.option__text] : Global.qscSubCategoriesData[string][data.option__text].color
        };
      });
      $scope.category_data = _.sortBy( $scope.category_data, function(value){ return value.priority; });

      if( option_id == null){
        $scope.QualityID = $scope.category_data[0].id;
        $scope.ServiceID = $scope.category_data[1].id;
        $scope.CleanlinessID = $scope.category_data[2].id;
      }
    });
  };

  $scope.showSegmentData = function(region_id,city_id,branch_id,option_id,string) {
    Graphs.segmentation_rating(region_id, city_id, branch_id, option_id, $scope.start_date, $scope.end_date).$promise.then(function (segment_data) {
      $scope.segments = _.map(segment_data.segments, function (data) {
        data.option_data = _.filter(data.option_data, function(dat){ return dat.count !== 0; });
        return {
          name: data.segment,
          segment_data: _.map(data.option_data, function (dat) {
              return {
                percentage: Math.round((dat.count / data.option_count) * 100),
                complaints: dat.count,
                class: Global.segmentationClass[dat.option__text],
                priority: option_id == null? Global.qscPriority[dat.option__text] : Global.qscSubCategoriesData[string][dat.option__text].priority,
                colour: option_id == null? Global.categoryPerformanceClass[dat.option__text] : Global.qscSubCategoriesData[string][dat.option__text].color
              };
          }),
          priority: Global.segmentationPriority[data.segment]
        };

      });
      $scope.segments = _.sortBy($scope.segments, function (value) {
        value.segment_data = _.sortBy(value.segment_data, function (data) {return data.priority;});
        return value.priority;
      });

      $scope.show_loading = false;
    });
  };

  $scope.onOptionSelect = function(string,option_id){
    if(string === 'All'){ 
      $scope.class = "";
      $scope.showCategoryData();
      $scope.showSegmentData();
    }
    else{ 
      $scope.class = string;
      $scope.showCategoryData("","","",option_id,string);
      $scope.showSegmentData("","","",option_id,string);
    }
  };

  $scope.onClick = function(option_id,string){
    $scope.option_id = option_id;
    $scope.onOptionSelect(string,option_id);
  };
  resetDates();
  $scope.showCategoryData();
  $scope.showSegmentData();

})

.directive('progressBarBackground', function() {
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

.directive('segmentProgressBarBackground', function($timeout) {
  return {
    restrict: 'A',

    scope: {
      data: '='
    },
    link: function(scope, ele, attrs) {
      scope.$watch('data', function(watchedData) {
        if(watchedData !== undefined){
          $timeout(function(){
            var bars = $(ele).find(".progress-bar");
            _.each(bars, function(value, index){
              var color = $(value).data("color");
              $(value).css("background-color", color);
            });
          }, 700);
        }
      });
    }
  };
});