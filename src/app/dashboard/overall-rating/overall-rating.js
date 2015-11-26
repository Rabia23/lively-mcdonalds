angular.module( 'livefeed.dashboard.overall_rating', [
  'factories',
  'livefeed.chart',
  "helper_factories",
  'angular-flot'
])

.controller( 'OverallRatingCtrl', function DashboardController( $scope, _, chartService, Graphs, Global ) {

  $scope.datePicker = {};
  $scope.datePicker.date = {startDate: null, endDate: null};

  $scope.today = new Date();

  $scope.line1 = {
    data: [],
    options: {}
  };
  $scope.mainView = true;

  $scope.show_loading = false; 
  
  function mainRating(){
    $scope.mainView = true;
    $scope.show_loading = true; 

    Graphs.overall_rating().$promise.then(function(data){
      $scope.show_loading = false; 
      $scope.line1 = chartService.getLineChart(data);
      $scope.dates = _.map(data, function(value){
        return value.date;
      });
      $scope.labels = _.map(data[0].data.feedbacks ,function(value){
        return {parent_id: value.option__parent_id, id: value.option_id, value: value.option__text,
                color: Global.optionsColorScheme[value.option__text], priority: Global.sqcPriority[value.option__text]};
      });
      //$scope.labels = _.sortBy($scope.labels, function(value){ return value.priority; });
    });
  }

  function colors(index, parent_id, parent_color, option__text, parent_value){
    if(parent_id){
      return Global.optionsColorScheme[option__text];
    }
    else{
      return Global.childColor(index, parent_color, parent_value);
    }
  }

  mainRating();


  $scope.optionClick = function (event, pos, item){
    var option = $scope.labels[item.seriesIndex];
    var date = $scope.dates[item.dataIndex];
    if(option.parent_id == null){
      var parent_color = option.color;
      var parent_value = option.value;
      $scope.show_loading = true;
      Graphs.feedback_segmentation(date, option.id).$promise.then(function(data){
        $scope.show_loading = false;
        $scope.mainView = false;
        $scope.line1 = chartService.getSegmentLineChart(data, parent_color, parent_value);
        $scope.labels =  _.map(data.options,function(value, index){
          return {value: value.option__text, parent_id: option.id, color: colors(index, option.parent_id, parent_color, value.option__text, parent_value)};
        });
      }); 
    }
      
  };

  $scope.labelClick = function(option){
    if(option.parent_id == null){
      $scope.show_loading = true; 
      Graphs.overall_rating(option.id).$promise.then(function(data){
        $scope.show_loading = false;
        $scope.mainView = false;
        var parent_color = option.color;
        var parent_value = option.value;
        $scope.line1 = chartService.getLineChart(data, parent_color, parent_value);
        $scope.labels = _.map(data[0].data.feedbacks ,function(value, index){
          return {parent_id: value.option__parent_id,id: value.option_id, value: value.option__text, color: colors(index, option.parent_id, parent_color, value.option__text, parent_value)};
        });
      });
    }
  };

  $scope.backToMain = function(){
    mainRating();
  };

});
