angular.module( 'livefeed.dashboard.overall_rating', [
  'factories',
  'livefeed.overall_rating.chart',
  "helper_factories",
  'angular-flot'
])

.controller( 'TimeLineCtrl', function DashboardController( $scope, overallRatingChartService, Graphs, Global ) {
   $scope.today = new Date();

  function resetDates(){
    $scope.date = {
        startDate: moment().subtract(6, "days"),
        endDate: moment()
    };
  }

  $scope.datePickerOption = {
    eventHandlers: {
      'apply.daterangepicker': function(ev, picker){
        $scope.type = "1";
        $(".jcf-select-text").children("span").html("Daily");
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

   function mainRating() {
       $scope.mainView = true;
       Graphs.overall_rating($scope.type, null, $scope.start_date, $scope.end_date).$promise.then(function (data) {
           $scope.labels = _.map(data[0].data.feedbacks, function (value, index) {
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
           var timeline_data = overallRatingChartService.getAreaChart(data);
           $scope.overall_rating_data = [$scope.labels, timeline_data];

       });
   }

   $scope.optionClick = function (option_object){

       var option_id = option_object.item.dataContext[option_object.graph.id];
       var date = option_object.item.category;

       Graphs.feedback_segmentation(date, option_id, $scope.type).$promise.then(function(data){
           $scope.mainView = false;
           if(data.options !== undefined){
             $scope.labels =  _.map(data.options,function(value, index){
                return {
                   option_name: value.option__text,
                   parent_id: "",
                   color: Global.subOptionsColorScheme[value.option__text].color,
                   lineColor: Global.subOptionsColorScheme[value.option__text].color,
                   title: value.option__text,
                   id: "column-"+(index+1)+"-id",
                   valueField: "column-"+(index+1)
                };
             });
             var qsc_suboptions_data = overallRatingChartService.getAreaSegmentChart(data);
             $scope.overall_rating_data = [$scope.labels, qsc_suboptions_data];
           }
       });
   };

   $scope.labelClick = function(option){

      if(option.parent_id == null){
        Graphs.overall_rating($scope.type, option.option_id).$promise.then(function(data) {
           $scope.mainView = false;
           $scope.labels = _.map(data[0].data.feedbacks ,function(value, index){
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
           var label_data =  overallRatingChartService.getAreaLabelChart(data);
           $scope.overall_rating_data = [$scope.labels, label_data];
        });
      }
   };

   $scope.axisChanged = function(){
     mainRating();
   };

   $scope.backToMain = function(){
     mainRating();
     resetDates();
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

.directive('timeLine', function() {
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
                          "bulletBorderAlpha": 0.3,
                          "bulletSize": 7,
                          "bulletBorderColor": "#FFFFFF",
                          "bulletColor": "#FFFFFF",
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
                      "fontSize": 15,
                      "handDrawScatter": 0,
                      "handDrawThickness": 0,
                      "theme": "default",
                      "categoryAxis": {
                          "equalSpacing": true,
                          "firstDayOfWeek": 0,
                          "startOnAxis": true,
                          "twoLineMode": true,
                          "axisAlpha": 0.4,
                          "axisColor": "#CED4CE",
                          "color": "#A7AAA7",
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
                          "fontSize": 13
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
                              "color": "#A7AAA7",
                              "fillColor": "#A7AAA7",
                              "gridAlpha": 0.4,
                              "gridColor": "#CED4CE",
                              "gridCount": 20,
                              "tickLength": 0,
                              "title": "",
                              "fontSize": 13

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

                chart.addListener("clickGraphItem", function(event){
                  scope.$apply(scope.action({option_object: event}));
                });
              }

          });
      }
    };
  });
