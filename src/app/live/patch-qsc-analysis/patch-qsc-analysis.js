(function() {
  angular.module( 'livefeed.live.patch_qsc_analysis', [
  'ui.router',
  'factories',
  'helper_factories',
  'flash'
 ])



  .controller( 'PatchQscAnalysisCtrl', function PatchQscAnalysisController( $scope, Graphs, Global, $rootScope ) {
      function patch_qsc_analysis() {

          Graphs.complaint_analysis().$promise.then(function (data) {
              console.log(data);
              $scope.pakistan_analysis = [];
              $scope.north_analysis = [];
              $scope.south_analysis = [];
              $scope.north_south_percentage = [];

              _.each(data[0].data.action_analysis, function (value) {
                  $scope.pakistan_analysis.push({
                      "category": Global.complaintAnalysisActionStrings[value.action_taken],
                      "column-1": value.count
                  });
              });

              var north_analysis = data[2].data.action_analysis;
              $scope.north_analysis.push({
                  "category": data[2].object.name.toUpperCase(),
                  "column-1": north_analysis[0].count,
                  "column-2": north_analysis[1].count,
                  "column-3": north_analysis[2].count
              });

              var south_analysis = data[1].data.action_analysis;
              $scope.south_analysis.push({
                  "category": data[1].object.name.toUpperCase(),
                  "column-1": south_analysis[0].count,
                  "column-2": south_analysis[1].count,
                  "column-3": south_analysis[2].count
              });

              $scope.north_south_percentage.push(
                  {
                      "category": data[2].object.name.toUpperCase(),
                      "column-1": Math.round((data[2].data.feedback_count / data[0].data.feedback_count) * 100)
                  },
                  {
                      "category": data[1].object.name.toUpperCase(),
                      "column-1": Math.round((data[1].data.feedback_count / data[0].data.feedback_count) * 100)
                  }
              );
          });
      }
      patch_qsc_analysis();

     $rootScope.$on('web-socket-message', function (event, data) {
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
            scope.$watch('data', function(watchedData) {
                if(watchedData !== undefined){
                    var data = scope.data;

                    AmCharts.makeChart("piechart",
                    {
                        "type": "pie",
                        "startDuration": 0,
                        "angle": 30,
                        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                        "depth3D": 65,
                        //"labelRadius": -75,
                        "labelText": "",
                        "fontSize": 20,
                        "colors": [
                            "#bf1616",
                            "#01c211",
                            "#ffee00"
                        ],
                        "titleField": "category",
                        "valueField": "column-1",
                        "allLabels": [],
                        "balloon": {},
                        "titles": [],
                        "dataProvider": data
                    });
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
            scope.$watch('data', function(watchedData) {
               if(watchedData !== undefined){
                    var data = scope.data;

                    AmCharts.makeChart("patch-bar",
                    {
                        "type": "serial",
                        "categoryField": "category",
                        "startDuration": 1,
                        "fontFamily": "'Oswald', sans-serif",
                        "fontSize": 10,
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
             scope.$watch('data', function(watchedData) {
               if(watchedData !== undefined){
                    var data = scope.data;

                    AmCharts.makeChart("patch-bar2",
                    {
                        "type": "serial",
                        "categoryField": "category",
                        "startDuration": 1,
                        "fontFamily": "'Oswald', sans-serif",
                        "fontSize": 10,
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
            scope.$watch('data', function(watchedData) {
               if(watchedData !== undefined){
                    var data = scope.data;

                    AmCharts.makeChart("chartdiv",
                    {
                        "type": "serial",
                        "categoryField": "category",
                        "colors": [
                            "#ff6600",
                            "#ff0f00"
                        ],
                        "startDuration": 1,
                        "fontFamily": "'Oswald', sans-serif",
                        "fontSize": 16,
                        "handDrawScatter": 0,
                        "theme": "default",
                        "categoryAxis": {
                            "gridPosition": "start",
                            "autoGridCount": false,
                            "axisThickness": 0,
                            "gridColor": "#FFFFFF",
                            "gridThickness": 0,
                            "tickLength": 0,
                            "titleBold": false
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                "color": "#FFFFFF",
                                "fillAlphas": 1,
                                "fillColors": "#FF6600",
                                "id": "AmGraph-1",
                                "labelAnchor": "middle",
                                "labelPosition": "middle",
                                "labelText": "[[value]]%",
                                "title": "graph 1",
                                "type": "column",
                                "valueField": "column-1"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                "axisTitleOffset": 0,
                                "id": "ValueAxis-1",
                                "stackType": "3d",
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
               }
            });
        }
      };
  });
})();
