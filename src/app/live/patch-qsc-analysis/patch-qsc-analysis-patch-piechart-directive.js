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
                else {
                  live_piechart.dataProvider = data;
                  live_piechart.validateData();
                }

              }
            });
        }
      };
    });
})();