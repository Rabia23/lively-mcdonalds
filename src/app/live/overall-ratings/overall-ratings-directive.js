(function() {

  angular.module( 'livefeed.live.overall-ratings')


  .directive('overallRating', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {

        var graph_show = false;

        var live_overall_rating;
        
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            var data = scope.data;
            if(!graph_show){
              live_overall_rating = AmCharts.makeChart("barchart",{
                "type": "serial",
                "categoryField": "category",
                "angle": 20,
                "depth3D": 50,
                //"startDuration": 1,
                "autoGridCount": false,
                "fontFamily": "'Oswald', sans-serif",
                "fontSize": 16,
                "categoryAxis": {
                  "gridPosition": "start",
                  "axisAlpha": 0.37,
                  "axisColor": "#FFFE6E",
                  "color": "#FFFFFF",
                  "gridAlpha": 0.37,
                  "gridColor": "#FFFE6E",
                  "tickLength": 0
                },
                "trendLines": [],
                "graphs": [
                  {
                    "color": "#FFFFFF",
                    "colorField": "color",
                    "fillAlphas": 0.64,
                    "id": "AmGraph-1",
                    "legendAlpha": 0,
                    "legendColor": "#FFFFFF",
                    "lineAlpha": 0,
                    "lineThickness": 0,
                    "lineColor": "#FBE041",
                    "lineColorField": "color",
                    "negativeFillColors": "#9400D3",
                    "title": "graph 1",
                    "type": "column",
                    "valueField": "column-1",
                    "labelText": "[[value]]",
                    "labelPosition": "middle",
                    "fontSize": 15
                  }
                ],
                "guides": [],
                "valueAxes": [
                  {
                    "id": "ValueAxis-1",
                    "axisAlpha": 0.38,
                    "axisColor": "#FFFE6E",
                    "color": "#FFFFFF",
                    "gridAlpha": 0.38,
                    "gridColor": "#FFFE6E",
                    "title": "",
                    "autoGridCount": false,
                    "gridCount": 6,
                    "tickLength": 0,
                    "minimum": 0
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
              graph_show = true;
            }
            else{
              live_overall_rating.dataProvider = data;
              live_overall_rating.validateData();
            }
            
          }
        });
      }
    };
  });

})();

