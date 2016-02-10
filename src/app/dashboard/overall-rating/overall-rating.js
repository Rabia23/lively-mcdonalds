angular.module( 'livefeed.dashboard.overall_rating', [
  'factories',
  'livefeed.overall_rating.chart',
  'helper_factories',
  'flash'
])

.controller( 'TimeLineCtrl', function DashboardController( $scope, overallRatingChartService, Graphs, Global, Flash ) {
   $scope.today = new Date();

   $scope.show_error_message = false;

  function resetDates(){
    $scope.date = {
        startDate: moment().subtract(6, "days"),
        endDate: moment()
    };
  }

  $scope.datePickerOption = {
    eventHandlers: {
      'apply.daterangepicker': function(ev, picker){
        $scope.show_loading = true;
        $scope.type = "1";
        if($scope.mainView){
          $scope.start_date = ev.model.startDate._i;
          $scope.end_date = ev.model.endDate._i;
          mainRating();
        }

      },
      'cancel.daterangepicker': function(ev, picker){
        //resetDates();
      }
    },
    opens: "left"
  };

   $scope.start_date = null;
   $scope.end_date = null;

   $scope.type = "1";
   $scope.mainView = true;
   $scope.optionView = false;

   $scope.page = 1;
   $scope.max_page = 1;

   function drawGraph(data){
     $scope.overall_rating_data = [];
     var timeline_data = overallRatingChartService.getAreaChart(data);
     $scope.overall_rating_data = [$scope.labels, timeline_data];
   }

   function drawLabelGraph(data){
     $scope.overall_rating_data = [];
     var label_data =  overallRatingChartService.getAreaLabelChart(data);
     $scope.overall_rating_data = [$scope.labels, label_data];
   }

   function calculate_labels(feedbacks){
     $scope.labels = _.map(feedbacks, function (value, index) {
         return {
             option_id: value.option_id,
             option_name: value.option__text,
             parent_id: value.option__parent_id,
             color: Global.optionsColorScheme[value.option__text],
             priority: Global.qscPriority[value.option__text],
             lineColor: Global.optionsLineColorScheme[value.option__text],
             title: value.option__text,
             id: "column-" + Global.qscPriority[value.option__text] + "-id",
             valueField: "column-" + Global.qscPriority[value.option__text]
         };
     });
     $scope.labels = _.sortBy($scope.labels, function (value) {
         return value.priority;
     });
   }

   function calculate_option_labels(feedbacks){
     $scope.labels = _.map(feedbacks ,function(value, index){
        return {
           option_id: value.option_id,
           option_name: value.option__text,
           parent_id: value.option__parent_id,
           color: Global.subOptionsColorScheme[value.option__text].color,
           lineColor: Global.subOptionsColorScheme[value.option__text].color,
           title: value.option__text,
           id: "column-"+(index+1)+"-id",
           valueField: "column-"+(index+1)
        };
     });
     $scope.labels = _.sortBy($scope.labels, function (value) {
         return value.priority;
     });
   }

   function mainRating() {
       $scope.mainView = true;
       $scope.show_loading = true;
       $scope.optionView = false;
       Graphs.overall_rating(null, $scope.start_date, $scope.end_date).$promise.then(function (data) {
         if(data.success) {
           $scope.show_error_message = false;
           $scope.data_array = [];
           if (data.response.length > 7) {
             var sets = data.response.length / 7;
             while (data.response.length > 0) {
               $scope.data_array.push(data.response.splice(0, 7));
             }
           }
           else {
              $scope.data_array[0] = data.response;
           }
           $scope.max_page = $scope.data_array.length;

           calculate_labels($scope.data_array[0][0].data.feedbacks);
           $scope.page = 1;
           drawGraph($scope.data_array[0]);
           $scope.show_loading = false;
         }
         else{
           $scope.show_error_message = true;
           $scope.error_message = data.message;
           Flash.create('danger', $scope.error_message, 'custom-class');
         }
       });
   }

   $scope.optionClick = function (option_object){
     var option_id = option_object.item.dataContext[option_object.graph.id];
     var date = option_object.item.category;

     if(option_id !== undefined) {
       $scope.show_loading = true;

       Graphs.feedback_segmentation(date, option_id, $scope.type).$promise.then(function (data) {
         $scope.show_loading = false;
         if (data.success) {
            $scope.show_error_message = false;
            $scope.mainView = false;
            $scope.optionView = false;
            if (data.response.options !== undefined) {
              $scope.labels = _.map(data.response.options, function (value, index) {
                return {
                  option_name: value.option__text,
                  parent_id: "",
                  color: Global.subOptionsColorScheme[value.option__text].color,
                  lineColor: Global.subOptionsColorScheme[value.option__text].color,
                  title: value.option__text,
                  id: "column-" + (index + 1) + "-id",
                  valueField: "column-" + (index + 1)
                };
              });
              var qsc_suboptions_data = overallRatingChartService.getAreaSegmentChart(data.response);
              $scope.overall_rating_data = [$scope.labels, qsc_suboptions_data];
            }
         }
         else {
           $scope.show_error_message = true;
           $scope.error_message = data.message;
           Flash.create('danger', $scope.error_message, 'custom-class');
         }
       });
     }
   };

   $scope.labelClick = function(option){
      if(option.parent_id == null){
        $scope.show_loading = true;
        $scope.optionView = true;
        Graphs.overall_rating(option.option_id, $scope.start_date, $scope.end_date).$promise.then(function(data) {
          if(data.success) {
            $scope.show_error_message = false;
            $scope.mainView = false;
            $scope.data_array = [];
            if (data.response.length > 7) {
              var sets = data.response.length / 7;
              while (data.response.length > 0) {
                  $scope.data_array.push(data.response.splice(0, 7));
              }
            }
            else {
              $scope.data_array[0] = data.response;
            }
            $scope.max_page = $scope.data_array.length;
            calculate_option_labels($scope.data_array[0][0].data.feedbacks);
            $scope.page = 1;
            drawLabelGraph($scope.data_array[0]);
            $scope.show_loading = false;
          }
          else {
            $scope.show_error_message = true;
            $scope.error_message = data.message;
            Flash.create('danger', $scope.error_message, 'custom-class');
          }
        });
      }
   };

   $scope.axisChanged = function(){
     $scope.show_loading = true;
     mainRating();
   };

   $scope.Next = function(){
     if($scope.page < $scope.max_page){
       $scope.page = $scope.page + 1;
       drawGraph($scope.data_array[($scope.page -1 )]);
     }
   };

   $scope.labelNext = function(){
     if($scope.page < $scope.max_page){
       $scope.page = $scope.page + 1;
       drawLabelGraph($scope.data_array[($scope.page -1 )]);
     }
   };

   $scope.backToMain = function() {
     mainRating();
   };

   $scope.Prev = function(){
     if($scope.page > 1){
       $scope.page = $scope.page - 1;
       drawGraph($scope.data_array[($scope.page -1 )]);
     }
   };

   $scope.labelPrev = function(){
     if($scope.page > 1){
       $scope.page = $scope.page - 1;
       drawLabelGraph($scope.data_array[($scope.page -1 )]);
     }
   };

   resetDates();
   mainRating();
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

.directive('timeLine', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        action: '&'
      },
      link: function(scope, ele, attrs) {
          scope.$watch('data', function(watchedData) {
              var chart;
              if (watchedData !== undefined) {

                  var data = scope.data;
                  var graphs = [];
                  _.each(data[0],function(graph_data){
                      graphs.push({
                          "bullet": "round",
                          "bulletBorderAlpha": 1,
                          "bulletSize": 7,
                          "bulletBorderColor": graph_data.color,
                          "bulletColor": "#FFF",
                          "color": "#FFFFFF",
                          "fillAlphas": 0.84,
                          "fillColors": graph_data.color,
                          "id": graph_data.id,
                          "legendColor": graph_data.color,
                          "lineColor": graph_data.lineColor,
                          "lineThickness": 3,
                          "negativeFillAlphas": 0,
                          "title": graph_data.title,
                          "type": "smoothedLine",
                          "valueField": graph_data.valueField,
                          "visibleInLegend": false
                      });
                  });
                  chart = AmCharts.makeChart("chartdiv",
                  {
                      "type": "serial",
                      "marginTop": 15,
                      "marginLeft": 30,
                      "autoMargins": false,
                      //"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
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
                      "fontFamily": "'open Sans', open Sans",
                      "fontSize": 12,
                      "handDrawScatter": 0,
                      "handDrawThickness": 0,
                      "theme": "default",
                      "categoryAxis": {
                          "equalSpacing": true,
                          "firstDayOfWeek": 0,
                          "startOnAxis": false,
                          "gridPosition": "start",
                          //"twoLineMode": true,
                          "axisAlpha": 0.4,
                          "axisColor": "#CED4CE",
                          "color": "#808080",
                          "fillColor": "#A7AAA7",
                          "gridAlpha": 0.4,
                          "gridColor": "#CED4CE",
                          "gridCount": 20,
                          "minHorizontalGap": 0,
                          "minorGridAlpha": 0,
                          "minVerticalGap": 0,
                          "showFirstLabel": true,
                          "showLastLabel": true,
                          "tickLength": 0,
                          "fontSize": 12
                      },
                      "trendLines": [],
                      "graphs": graphs,
                      "guides": [],
                      "valueAxes": [
                          {
                              "id": "ValueAxis-1",
                              "synchronizationMultiplier": 0,
                              "axisAlpha": 0.4,
                              "axisColor": "#CED4CE",
                              "color": "#808080",
                              "fillColor": "#A7AAA7",
                              "gridAlpha": 0.4,
                              "gridColor": "#CED4CE",
                              "gridCount": 20,
                              "tickLength": 0,
                              "title": "",
                              "fontSize": 12

                          }
                      ],
                      "allLabels": [],
                      "balloon": {
                          "showBullet": true
                      },
                      "legend": {
                          "enabled": false,
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
                      "dataProvider": data[1]
                  });
                  //var width = $("#chartdiv").find("svg").width();
                  //console.log("inside chart directive");
                  //console.log(width);
                  //width = width + 50;
                  //$("#chartdiv").find("svg").css({width: width, left: '-5px', top: '-4px'});
                  window.initSameHeight();
                  chart.addListener("clickGraphItem", function(event){
                    scope.$apply(scope.action({option_object: event}));
                  });
              }

          });
      }
    };
  });
