(function() {

  angular.module( 'livefeed.live.patch_qsc_analysis')
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
                       "fontFamily": "'Oswald', sans-serif",
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

    .directive('patchBarOne', function($timeout) {
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
                              "id": "AmGraph-2",
                              "labelText": "[[value]]",
                              "lineThickness": 0,
                              "newStack": true,
                              "title": "graph 6",
                              "type": "column",
                              "valueField": "column-2"
                          },
                          {
                              "color": "#FFFFFF",
                              "fillAlphas": 1,
                              "fillColors": "#FFEE00",
                              "id": "AmGraph-3",
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
                   $timeout(function() {
                       window.initSameHeight();
                   }, 500);
                 }
                 else {
                     live_patch_bar.dataProvider = data;
                     live_patch_bar.validateData();
                 }
                 $timeout(function() {
                   var text_elements = $("#patch-bar").find("svg").find("text");
                   console.log(text_elements);
                   $.each(text_elements, function(index, value){
                     if($(value).find("tspan").html() == "NORTH"){
                       $(value).find("tspan").css("text-shadow", "none");
                     }

                   });
                 }, 1000);

               }
            });
        }
      };
    })

    .directive('patchBarTwo', function($timeout) {
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
                                "id": "AmGraph-4",
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
                                "id": "AmGraph-5",
                                "labelText": "[[value]]",
                                "lineThickness": 0,
                                "newStack": true,
                                "title": "graph 6",
                                "type": "column",
                                "valueField": "column-2"
                            },
                            {
                                "color": "#FFFFFF",
                                "fillAlphas": 1,
                                "fillColors": "#FFEE00",
                                "id": "AmGraph-6",
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
                    $timeout(function() {
                       window.initSameHeight();
                    }, 500);
                  }
                  else{
                    live_patch_bar2.dataProvider = data;
                    live_patch_bar2.validateData();
                  }
                  $timeout(function() {
                   var text_elements = $("#patch-bar2").find("svg").find("text");
                   $.each(text_elements, function(index, value){
                     if($(value).find("tspan").html() == "SOUTH"){
                        $(value).find("tspan").css("text-shadow", "none");
                     }

                   });
                  }, 1000);

               }

            });
        }
      };
    })

    .directive('patchChartDiv', function($timeout) {
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
                 $timeout(function() {
                   window.initSameHeight();
                 }, 500);
              }
              else{
                live_patch_chart.dataProvider = data;
                live_patch_chart.validateData();
              }
              $timeout(function() {
                var text_elements = $("#chartdiv").find("svg").find("text");
                $.each(text_elements, function(index, value){
                  if($(value).find("tspan").html() == "NORTH" || $(value).find("tspan").html() == "SOUTH" ){
                    $(value).find("tspan").css("text-shadow", "none");
                  }

                });
              }, 1000);

            }
          });
        }
      };
    });

})();

