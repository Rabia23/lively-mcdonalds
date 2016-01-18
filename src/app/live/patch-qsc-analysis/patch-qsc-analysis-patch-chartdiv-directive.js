(function() {

    angular.module('livefeed.live.patch_qsc_analysis')
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
