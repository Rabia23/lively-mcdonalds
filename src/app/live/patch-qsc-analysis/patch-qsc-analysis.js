(function() {
  angular.module( 'livefeed.live.patch_qsc_analysis', [
  'ui.router',
  'helper_factories',
  'flash'
 ])



  .controller( 'PatchQscAnalysisCtrl', function PatchQscAnalysisController( $scope, Global, $rootScope ) {

    function region_data(action_analysis_data){
      var complaints = {unprocessed: [], processed: [], deferred: []};
       _.each(action_analysis_data, function(action){
          if (action.action_taken == 1) {
              complaints.unprocessed.push(action.count);
          }
          if (action.action_taken == 2) {
              complaints.processed.push(action.count);
          }
          if (action.action_taken == 3) {
              complaints.deferred.push(action.count);
          }
       });
       return complaints;
    }

    function patch_qsc_analysis() {
      var complaints = null;
      var pakistan_feedback_count = 0;
      $scope.pakistan_analysis = [];
      $scope.north_analysis = [];
      $scope.south_analysis = [];
      $scope.north_south_percentage = [];
      $scope.patch_qsc_labels = [];

      _.each($scope.complaint_view[0].data.action_analysis, function (value) {
         $scope.patch_qsc_labels.push({action_name: Global.complaintAnalysisAction[value.action_taken][0], action_class: Global.complaintAnalysisActionClass[value.action_taken]});
      });
      $scope.patch_qsc_labels = _.sortBy($scope.patch_qsc_labels, function (value) { return Global.complaintAnalysisActionPriority[value.action_name];});

      _.each($scope.complaint_view, function (value) {
         var region_name = value.object.name;
         if(region_name === "Pakistan") {
            pakistan_feedback_count = value.data.feedback_count;
            _.each(value.data.action_analysis,function(dat){
               $scope.pakistan_analysis.push({ "category": Global.complaintAnalysisAction[dat.action_taken][0], "column-1": dat.count, "color": Global.complaintAnalysisAction[dat.action_taken][1] });
            });
         }
         else if(region_name === "South") {
           complaints = region_data(value.data.action_analysis);
           $scope.south_analysis.push({ "category": region_name.toUpperCase(), "column-1": complaints.unprocessed[0], "column-2": complaints.processed[0], "column-3": complaints.deferred[0] });
           $scope.north_south_percentage.push({ "category": region_name.toUpperCase(), "column-1": Math.round((value.data.feedback_count / pakistan_feedback_count) * 100), "color": "#ff0f00" });
         }
         else if(region_name === "North") {
           complaints = region_data(value.data.action_analysis);
           $scope.north_analysis.push({ "category": region_name.toUpperCase(), "column-1": complaints.unprocessed[0], "column-2": complaints.processed[0], "column-3": complaints.deferred[0] });
           $scope.north_south_percentage.push({ "category": region_name.toUpperCase(), "column-1": Math.round((value.data.feedback_count / pakistan_feedback_count) * 100), "color":"#ff6600" });
         }
      });
      $scope.north_south_percentage = _.sortBy($scope.north_south_percentage, function (value) { return value.category; });
    }

    $rootScope.$on('live-data-received', function (event, data) {
       patch_qsc_analysis();
    });

  })

  .directive('patchPieChart', function() {
      return {
        restrict: 'A',
        scope: {
           data: '='
        },
        link: function(scope, ele, attrs) {
            var graph_drawn = false;
            var live_piechart;
            scope.$watch('data', function(watchedData) {

              if(watchedData !== undefined){
                var data = scope.data;
                if(!graph_drawn){
                  live_piechart = AmCharts.makeChart("piechart",
                  {
                      "type": "pie",
                      "startDuration": 0,
                      "angle": 25,
                      "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                      "depth3D": 55,
                      "labelRadius": -105,
                      "labelText":  "[[value]]",
                       "color": "#FFFFFF",
                      "fontSize": 25,
                      "marginTop":-75,
                      "marginRight":0,
                      "marginLeft":0,
                      "marginBottom":0,
                      "autoMargins":false,
                      "titleField": "category",
                      "valueField": "column-1",
                      "colorField": "color",
                      "allLabels": [],
                      "balloon": {},
                      "titles": [],
                      "dataProvider": data
                  });
                  graph_drawn = true;
                }
                else{
                  live_piechart.dataProvider = data;
                  live_piechart.validateData(); 
                }
                
              }
            });
        }
      };
  })

  .directive('patchBarOne', function() {
      return {
        restrict: 'A',
        scope: {
           data: '='
        },
        link: function(scope, ele, attrs) {
            var graph_drawn = false;
            var live_patch_bar;
            scope.$watch('data', function(watchedData) {
               if(watchedData !== undefined){
                 var data = scope.data;
                 if(!graph_drawn){
                  live_patch_bar = new AmCharts.makeChart("patch-bar",
                  {
                      "type": "serial",
                      "categoryField": "category",
                      "startDuration": 1,
                      "fontFamily": "'Oswald', sans-serif",
                      "fontSize": 16,
                      "columnSpacing": 18,
                      "columnWidth": 0.95,
                      "marginLeft": 10,
                      "marginRight": 10,
                      "marginTop": 10,
                      "marginBottom": 30,
                      "autoMargins": false,
                      "categoryAxis": {
                          "gridPosition": "start",
                          "axisThickness": 0,
                          "gridCount": 0,
                          "gridThickness": 0,
                          "tickLength": 0
                      },
                      "trendLines": [],
                      "graphs": [
                          {
                              "color": "#FFFFFF",
                              "fillAlphas": 1,
                              "fillColors": "#BD1515",
                              "id": "AmGraph-1",
                              "labelText": "[[value]]",
                              "lineThickness": 0,
                              "title": "graph 1",
                              "type": "column",
                              "valueField": "column-1"
                          },
                          {
                              "color": "#FFFFFF",
                              "fillAlphas": 1,
                              "fillColors": "#01C211",
                              "id": "AmGraph-6",
                              "labelText": "[[value]]",
                              "lineThickness": 0,
                              "newStack": true,
                              "title": "graph 6",
                              "type": "column",
                              "valueField": "column-2"
                          },
                          {
                              "fillAlphas": 1,
                              "fillColors": "#FFEE00",
                              "id": "AmGraph-7",
                              "labelText": "[[value]]",
                              "lineThickness": 0,
                              "newStack": true,
                              "title": "graph 7",
                              "type": "column",
                              "valueField": "column-3"
                          }
                      ],
                      "guides": [],
                      "valueAxes": [
                          {
                              "id": "ValueAxis-1",
                              "stackType": "regular",
                              "autoGridCount": false,
                              "axisThickness": 0,
                              "fontSize": 0,
                              "gridCount": 0,
                              "gridThickness": 0,
                              "tickLength": 0,
                              "title": ""
                          }
                      ],
                      "allLabels": [],
                      "balloon": {},
                      "titles": [
                          {
                              "id": "Title-1",
                              "size": 15,
                              "text": ""
                          }
                      ],
                      "dataProvider": data
                  });
                    graph_drawn = true;
                 }
                 else{
                   live_patch_bar.dataProvider = data;
                    live_patch_bar.validateData(); 
                 }
                 
               }
            });
        }
      };
  })

  .directive('patchBarTwo', function() {
      return {
        restrict: 'A',
        scope: {
           data: '='
        },
        link: function(scope, ele, attrs) {
            var graph_drawn = false;
            var live_patch_bar2;
             scope.$watch('data', function(watchedData) {
               if(watchedData !== undefined){
                  var data = scope.data;
                  if(!graph_drawn){
                    live_patch_bar2   =  new AmCharts.makeChart("patch-bar2",
                    {
                        "type": "serial",
                        "categoryField": "category",
                        "startDuration": 1,
                        "fontFamily": "'Oswald', sans-serif",
                        "fontSize": 16,
                        "columnSpacing": 18,
                        "columnWidth": 0.95,
                        "marginLeft": 10,
                        "marginRight": 10,
                        "marginTop": 10,
                        "marginBottom": 30,
                        "autoMargins": false,
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisThickness": 0,
                            "gridCount": 0,
                            "gridThickness": 0,
                            "tickLength": 0
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                "color": "#FFFFFF",
                                "fillAlphas": 1,
                                "fillColors": "#BD1515",
                                "id": "AmGraph-1",
                                "labelText": "[[value]]",
                                "lineThickness": 0,
                                "title": "graph 1",
                                "type": "column",
                                "valueField": "column-1"
                            },
                            {
                                "color": "#FFFFFF",
                                "fillAlphas": 1,
                                "fillColors": "#01C211",
                                "id": "AmGraph-6",
                                "labelText": "[[value]]",
                                "lineThickness": 0,
                                "newStack": true,
                                "title": "graph 6",
                                "type": "column",
                                "valueField": "column-2"
                            },
                            {
                                "fillAlphas": 1,
                                "fillColors": "#FFEE00",
                                "id": "AmGraph-7",
                                "labelText": "[[value]]",
                                "lineThickness": 0,
                                "newStack": true,
                                "title": "graph 7",
                                "type": "column",
                                "valueField": "column-3"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "stackType": "regular",
                                "autoGridCount": false,
                                "axisThickness": 0,
                                "fontSize": 0,
                                "gridCount": 0,
                                "gridThickness": 0,
                                "tickLength": 0,
                                "title": ""
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "titles": [
                            {
                                "id": "Title-1",
                                "size": 15,
                                "text": ""
                            }
                        ],
                        "dataProvider": data
                    });
                    graph_drawn = true;
                  }
                  else{
                    live_patch_bar2.dataProvider = data;
                    live_patch_bar2.validateData();  
                  }
                  
               }
            });
        }
      };
  })

  .directive('patchChartDiv', function() {
      return {
        restrict: 'A',
        scope: {
           data: '='
        },
        link: function(scope, ele, attrs) {
          var graph_drawn = false;
          var live_patch_chart; 
          
          scope.$watch('data', function(watchedData) {
            if(watchedData !== undefined){
              var data = scope.data;
              if(!graph_drawn){
                live_patch_chart=  AmCharts.makeChart("chartdiv",
                {
                    "type": "serial",
                    "categoryField": "category",
                    "columnWidth": 0.95,
                    "marginLeft": 10,
                    "marginRight": 10,
                    "marginTop": 10,
                    "marginBottom": 30,
                    "autoMargins": false,
                    "colors": [
                        "#ff6600",
                        "#ff0f00"
                    ],
                    "startDuration": 1,
                    "fontFamily": "'Oswald', sans-serif",
                    "fontSize": 22,
                    "handDrawScatter": 0,
                    "theme": "default",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "autoGridCount": false,
                        "axisThickness": 0,
                        "gridColor": "#FFFFFF",
                        "gridThickness": 0,
                        "tickLength": 0,
                        "titleBold": false,
                        "fontSize": 16
                    },
                    "trendLines": [],
                    "graphs": [
                        {
                            "color": "#FFFFFF",
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "labelAnchor": "middle",
                            "labelPosition": "middle",
                            "labelText": "[[value]]%",
                            "title": "graph 1",
                            "type": "column",
                            "valueField": "column-1",
                            "colorField": "color",
                            "balloonText": "[[value]]%"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                            "axisTitleOffset": 0,
                            "id": "ValueAxis-1",
                            "stackType": "regular",
                            "autoGridCount": false,
                            "axisThickness": 0,
                            "fontSize": 0,
                            "gridColor": "#E0ADAD",
                            "gridThickness": 0,
                            "showFirstLabel": false,
                            "showLastLabel": false,
                            "tickLength": 0,
                            "title": ""
                        }
                    ],
                    "allLabels": [],
                    "balloon": {},
                    "titles": [
                        {
                            "id": "Title-1",
                            "size": 15,
                            "text": ""
                        }
                    ],
                    "dataProvider": data
                });
                graph_drawn = true;
              }
              else{
                live_patch_chart.dataProvider = data;
                live_patch_chart.validateData();
              }
              
            }
          });
        }
      };
  });
})();
