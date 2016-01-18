(function() {
  angular.module( 'livefeed.live.top_concerns')

  .directive('topConcern', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {

        var graph_show = false;
        var live_top_concerns;

        var width = screen.width;
        var marginRight = "-35%";
        var marginLeft = "-15%";  
        if(width < 1440){
          marginRight = "-18%";
          marginLeft = "10%";
        }

        var vertical_gap = 0;
        var ms_ie = false;
         var ua = window.navigator.userAgent;
         var old_ie = ua.indexOf('MSIE ');
         var new_ie = ua.indexOf('Trident/');

         if ((old_ie > -1) || (new_ie > -1)) {
           ms_ie = true;
         }

        if ( ms_ie ) {
            vertical_gap = -20;
        }
        scope.$watch('data', function(watchedData) {

          if(watchedData !== undefined){
            var data = scope.data;
            if(!graph_show){
              live_top_concerns = AmCharts.makeChart("container",{
                "type": "pie",
                "angle": 25,
                "startDuration": 0,
                "balloonText": "<span style='font-size:20px'>[[title]]</span><br><span style='font-size:16px'>[[value]]</span>",
                "depth3D": 55,
                "innerRadius": "35%",
                "marginRight": marginRight,
                "marginLeft": marginLeft,
                "marginTop": -95,
                "marginBottom": "-8%",
                "autoMargins":false,
                "labelRadius": -75,
                "labelText": "[[value]]",
                "color": "#FFFFFF",
                "labelsEnabled": true,
                "colors": [
                    "#cb1e24",
                    "#178aea",
                    "#434347",
                    "#f1d400",
                    "#90ec7c"
                ],
                "titleField": "category",
                "valueField": "column-1",
                "fontFamily": "'Oswald', sans-serif",
                "fontSize": 23,
                "allLabels": [],
                "balloon": {},
                "legend": {
                  "enabled": true,
                  "align": "center",
                  "equalWidths": false,
                  "markerLabelGap": 25,
                  "markerSize": 20,
                  "markerType": "circle",
                  "valueText": "",
                  "valueWidth": 0,
                  "position": "right",
                 "marginRight":200,
                  "marginTop": 50,
                 "autoMargins":false,
                  "fontSize": 45,
                  "verticalGap": vertical_gap
                },
                "titles": [],
                "dataProvider": data
              });
              graph_show = true;
            }
            else{
              live_top_concerns.dataProvider = data;
              live_top_concerns.validateData();
            }

            
          }
        });
      }
    };
  });

})();

