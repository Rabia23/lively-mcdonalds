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

  $scope.start_date = null;
  $scope.end_date = null;

  $scope.type = "1"; 
  
  function mainRating(){
    $scope.mainView = true;
    $scope.show_loading = true; 
    $scope.label_click_check = false;
    $scope.option_click_check = false; 
    Graphs.overall_rating($scope.type, null, $scope.start_date, $scope.end_date).$promise.then(function(data){
      $scope.show_loading = false; 
      $scope.labels = _.map(data[0].data.feedbacks ,function(value){
        return {parent_id: value.option__parent_id, id: value.option_id, value: value.option__text,
                color: Global.optionsColorScheme[value.option__text], priority: Global.qscPriority[value.option__text]};
      });
      $scope.line1 = chartService.getLineChart(data);
      $scope.dates = _.map(data, function(value){
        return value.date;
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

  $scope.datePickerOption = {
    eventHandlers: {
      'apply.daterangepicker': function(ev, picker){    
        if($scope.mainView){
          $scope.start_date = ev.model.startDate._i;
          $scope.end_date = ev.model.endDate._i;
          mainRating();
        }
        
      },
      'cancel.daterangepicker': function(ev, picker){
        $scope.datePicker.date.startDate = null;
        $scope.datePicker.date.endDate = null;
      }

    }
  };

  $scope.axisChanged = function(){
    mainRating();
  };


  $scope.optionClick = function (event, pos, item){
    var option = $scope.labels[item.seriesIndex];
    var date = $scope.dates[item.dataIndex];
    if(option.parent_id == null){
      $scope.type = "1";
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
      $scope.type = "1";
      $scope.show_loading = true;
      Graphs.overall_rating($scope.type, option.id).$promise.then(function(data){
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