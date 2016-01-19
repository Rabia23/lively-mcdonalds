angular.module( 'livefeed.dashboard.overall_rating', [
  'factories',
  'livefeed.overall_rating.chart',
  "helper_factories",
  'angular-flot'
])

.controller( 'TimeLineCtrl', function DashboardController( $scope, overallRatingChartService, Graphs, Global ) {
  $scope.start_date = null;
  $scope.end_date = null;

  $scope.type = "1";
   Graphs.overall_rating($scope.type, null, $scope.start_date, $scope.end_date).$promise.then(function(data) {
       console.log("timeline data");
       console.log(data);
       var qsc = {quality: [], service: [], cleanliness: []};
       $scope.timeline_data = [];
        _.each(data, function(value,index){
            _.each(value.data.feedbacks, function(item){
              if (item.option__text === 'Quality'){
                qsc.quality.push(item.count);
              }
              if (item.option__text === 'Service'){
                qsc.service.push(item.count);
              }
              if (item.option__text === 'Cleanliness'){
                qsc.cleanliness.push(item.count);
              }
            });

            $scope.timeline_data.push({
              "category": value.date,
              "column-1": qsc.quality[index],
              "column-2": qsc.service[index],
              "column-3": qsc.cleanliness[index]
            });
        });
        console.log("timeline array");
        console.log($scope.timeline_data);
   });
  //$scope.today = new Date();
  //
  //function resetDates(){
  //  $scope.date = {
  //      startDate: moment().subtract(6, "days"),
  //      endDate: moment()
  //  };
  //}
  //
  //resetDates();
  //
  //$scope.line1 = {
  //  data: [],
  //  options: {}
  //};
  //$scope.mainView = true;
  //
  //$scope.show_loading = false;
  //
  //$scope.start_date = null;
  //$scope.end_date = null;
  //
  //$scope.type = "1";
  //
  //function mainRating(){
  //  $scope.mainView = true;
  //  $scope.show_loading = true;
  //  $scope.label_click_check = false;
  //  $scope.option_click_check = false;
  //  Graphs.overall_rating($scope.type, null, $scope.start_date, $scope.end_date).$promise.then(function(data){
  //    $scope.show_loading = false;
  //    $scope.labels = _.map(data[0].data.feedbacks ,function(value){
  //      return {parent_id: value.option__parent_id, id: value.option_id, value: value.option__text,
  //              color: Global.optionsColorScheme[value.option__text], priority: Global.qscPriority[value.option__text]};
  //    });
  //    $scope.line1 = overallRatingChartService.getLineChart(data, $scope.type);
  //    $scope.dates = _.map(data, function(value){
  //      return value.date;
  //    });
  //    $scope.qsc_labels = $scope.labels;
  //    $scope.qsc_labels = _.sortBy($scope.qsc_labels, function(value){ return value.priority; });
  //  });
  //}
  //
  //function colors(index, parent_id, parent_color, option__text, parent_value){
  //  if(parent_id){
  //    return Global.optionsColorScheme[option__text];
  //  }
  //  else{
  //    return Global.childColor(index, parent_color, parent_value);
  //  }
  //}
  //
  //mainRating();
  //
  //$scope.datePickerOption = {
  //  eventHandlers: {
  //    'apply.daterangepicker': function(ev, picker){
  //      $scope.type = "1";
  //      // Chaepi
  //      $(".jcf-select-text").children("span").html("Daily");
  //      if($scope.mainView){
  //        $scope.start_date = ev.model.startDate._i;
  //        $scope.end_date = ev.model.endDate._i;
  //        mainRating();
  //      }
  //
  //    },
  //    'cancel.daterangepicker': function(ev, picker){
  //      //resetDates();
  //    }
  //  }
  //};
  //
  //$scope.axisChanged = function(){
  //  mainRating();
  //};
  //
  //
  //$scope.optionClick = function (event, pos, item){
  //  var option = $scope.labels[item.seriesIndex];
  //  var date = $scope.dates[item.dataIndex];
  //  if(option.parent_id == null){
  //    var parent_color = option.color;
  //    var parent_value = option.value;
  //    $scope.show_loading = true;
  //    resetDates();
  //    Graphs.feedback_segmentation(date, option.id, $scope.type).$promise.then(function(data){
  //      $scope.show_loading = false;
  //      $scope.mainView = false;
  //      $scope.line1 = overallRatingChartService.getSegmentLineChart(data, parent_color, parent_value);
  //      $scope.labels =  _.map(data.options,function(value, index){
  //        return {value: value.option__text, parent_id: option.id, color: colors(index, option.parent_id, parent_color, value.option__text, parent_value)};
  //      });
  //      $scope.qsc_labels = $scope.labels;
  //    });
  //  }
  //};
  //
  //$scope.labelClick = function(option){
  //  if(option.parent_id == null){
  //    $scope.show_loading = true;
  //    Graphs.overall_rating($scope.type, option.id).$promise.then(function(data){
  //      $scope.show_loading = false;
  //      $scope.mainView = false;
  //      var parent_color = option.color;
  //      var parent_value = option.value;
  //      $scope.line1 = overallRatingChartService.getLineChart(data, $scope.type, parent_color, parent_value);
  //      $scope.labels = _.map(data[0].data.feedbacks ,function(value, index){
  //        return {parent_id: value.option__parent_id,id: value.option_id, value: value.option__text, color: colors(index, option.parent_id, parent_color, value.option__text, parent_value)};
  //      });
  //      $scope.qsc_labels = $scope.labels;
  //    });
  //  }
  //};
  //
  //$scope.backToMain = function(){
  //  mainRating();
  //  resetDates();
  //};

})

.directive('sameRatingHeight', function() {
  return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
  };
})

.directive('timeLine', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
          scope.$watch('data', function(watchedData) {
              var chart;
              console.log("watched data..");
              if (watchedData !== undefined) {
                  var data = scope.data;
                  console.log("link..");
                  console.log(data);
                  chart = AmCharts.makeChart("chartdiv",
                  {
                      "type": "serial",
                      "balloonDateFormat": "",
                      "categoryField": "category",
                      "plotAreaBorderColor": "#FFFE6E",
                      "colors": [
                          "#FF6600",
                          "#FCD202",
                          "#B0DE09",
                          "#0D8ECF",
                          "#2A0CD0",
                          "#CD0D74",
                          "#CC0000",
                          "#00CC00",
                          "#0000CC",
                          "#DDDDDD",
                          "#999999",
                          "#333333",
                          "#990000"
                      ],
                      "startDuration": 0.5,
                      "startEffect": "easeOutSine",
                      "borderColor": "#FFFE6E",
                      "color": "#FFF",
                      "fontFamily": "'Oswald', sans-serif",
                      "fontSize": 20,
                      "handDrawScatter": 0,
                      "handDrawThickness": 0,
                      "theme": "default",
                      "categoryAxis": {
                          "equalSpacing": true,
                          "firstDayOfWeek": 0,
                          "startOnAxis": true,
                          "twoLineMode": true,
                          "axisAlpha": 0.43,
                          "axisColor": "#000000",
                          "color": "#000000",
                          "fillColor": "#000000",
                          "gridAlpha": 0.39,
                          "gridColor": "#000000",
                          "gridCount": 20,
                          "minHorizontalGap": 0,
                          "minorGridAlpha": 0,
                          "minVerticalGap": 0,
                          "showFirstLabel": true,
                          "showLastLabel": true,
                          "tickLength": 0,
                          "fontSize": 15
                      },
                      "trendLines": [],
                      "graphs": [
                          {
                              "bullet": "round",
                              "bulletBorderAlpha": 0.3,
                              "bulletSize": 7,
                              "bulletBorderColor": "#FFFFFF",
                              "bulletColor": "#FFFFFF",
                              "color": "#FFFFFF",
                              "fillAlphas": 0.75,
                              "fillColors": "#3498DB",
                              "id": "AmGraph-1",
                              "legendColor": "#3498DB",
                              "lineColor": "#12E9F0",
                              "lineThickness": 3,
                              "negativeFillAlphas": 0,
                              "title": "Quality",
                              "type": "smoothedLine",
                              "valueAxis": "ValueAxis-1",
                              "valueField": "column-1",
                              "visibleInLegend": false
                          },
                          {
                              "bullet": "round",
                              "bulletBorderAlpha": 0.3,
                              "bulletSize": 7,
                              "bulletBorderColor": "#FFFFFF",
                              "bulletColor": "#FFFFFF",
                              "fillAlphas": 0.82,
                              "fillColors": "#E90000",
                              "id": "AmGraph-2",
                              "legendColor": "#E90000",
                              "lineColor": "#FF8800",
                              "lineThickness": 3,
                              "title": "Service",
                              "type": "smoothedLine",
                              "valueField": "column-2",
                              "visibleInLegend": false
                          },
                          {
                              "bullet": "round",
                              "bulletBorderAlpha": 0.3,
                              "bulletSize": 7,
                              "bulletBorderColor": "#FFFFFF",
                              "bulletColor": "#FFFFFF",
                              "columnWidth": 0,
                              "fillAlphas": 0.84,
                              "fillColors": "#FFEA00",
                              "id": "AmGraph-3",
                              "legendColor": "#FFEA00",
                              "lineColor": "#FBE041",
                              "lineThickness": 3,
                              "markerType": "square",
                              "negativeFillAlphas": 1,
                              "negativeFillColors": "#FFFFFF",
                              "title": "CLEANLINESS",
                              "type": "smoothedLine",
                              "valueField": "column-3",
                              "visibleInLegend": false
                          }
                      ],
                      "guides": [],
                      "valueAxes": [
                          {
                              "id": "ValueAxis-1",
                              "synchronizationMultiplier": 0,
                              "axisAlpha": 0.41,
                              "axisColor": "#000000",
                              "color": "#000000",
                              "fillColor": "#000000",
                              "gridAlpha": 0.42,
                              "gridColor": "#000000",
                              "gridCount": 20,
                              "tickLength": 0,
                              "title": "",
                              "fontSize": 15

                          }
                      ],
                      "allLabels": [],
                      "balloon": {
                          "showBullet": true
                      },
                      "legend": {
                          "enabled": true,
                          "color": "#000000",
                          "rollOverGraphAlpha": 0.79
                      },
                      "titles": [
                          {
                              "color": "#FFFFFF",
                              "id": "Title-1",
                              "size": 15,
                              "text": ""
                          }
                      ],
                      "dataProvider": data
                  });
              }
              chart.addListener("clickGraphItem", handleClick);

              function handleClick(event) {
                  alert(event.item.category + ": " + event.item.values.value);
              }
          });
      }
    };
  });



