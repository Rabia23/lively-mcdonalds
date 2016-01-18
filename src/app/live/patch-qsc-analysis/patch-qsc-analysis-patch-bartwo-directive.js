(function() {

    angular.module('livefeed.live.patch_qsc_analysis')
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
    });

})();
