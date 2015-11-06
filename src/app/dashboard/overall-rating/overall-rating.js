angular.module( 'livefeed.dashboard.overall_rating', [
  'factories',
  'livefeed.chart',
  "helper_factories",
  'angular-flot'
])

.controller( 'OverallRatingCtrl', function DashboardController( $scope, _, chartService, Graphs, Global ) {

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
      $scope.labels = _.map(data[0].data.feedbacks ,function(value){
        return {parent_id: value.option__parent_id, id: value.option_id, value: value.option__text, color: Global.optionsColorScheme[value.option__text]};
      });   
    });
  }

  function colors(index, parent_id, parent_color, option__text){
    if(parent_id){
      return Global.optionsColorScheme[option__text];
    }
    else{
      return Global.childColor(index, parent_color);
    }
  }

  mainRating();


  $scope.optionClick = function (event, pos, item){
    var option = $scope.labels[item.seriesIndex];
    if(option.parent_id == null){
      $scope.show_loading = true; 
      var parent_color = option.color;
      Graphs.overall_rating(option.id).$promise.then(function(data){
        $scope.show_loading = false; 
        $scope.mainView = false;
        $scope.line1 = chartService.getLineChart(data, parent_color);
        $scope.labels = _.map(data[0].data.feedbacks ,function(value, index){
          return {parent_id: value.option__parent_id,id: value.option_id, value: value.option__text, color: colors(index, option.parent_id, parent_color, value.option__text)};
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
        $scope.line1 = chartService.getLineChart(data, parent_color);
        $scope.labels = _.map(data[0].data.feedbacks ,function(value, index){
          return {parent_id: value.option__parent_id,id: value.option_id, value: value.option__text, color: colors(index, option.parent_id, parent_color, value.option__text)};
        });
      });
    }
  };

  $scope.backToMain = function(){
    mainRating();
  };

});
