(function() {
  angular.module( 'livefeed.live.qsc', [
    'ui.router',
    'factories',
    'flash'

  ])



  .controller( 'QscCtrl', function TopConcernController( $scope, _, Graphs, Global ) {
    

    function qscfunc(){
      var qsc = {quality: [], service: [], cleanliness: []};
      Graphs.overall_rating(1).$promise.then(function(graph_data){
        $scope.overall_rating_data = [];
        _.each(graph_data, function(value,index){
          _.each(value.data.feedbacks, function(item, index2){
            if (item.option__text === 'Quality'){
              qsc.quality.push(item.count);
            }
            if (item.option__text === 'Service'){
              qsc.service.push(item.count);
            }
            if (item.option__text === 'Cleanliness'){
              qsc.cleanliness.push(item.count);
            }
          });
          
          $scope.overall_rating_data.push({
            "category": value.date,
            "column-1": qsc.quality[index],
            "column-2": qsc.service[index],
            "column-3": qsc.cleanliness[index]
          });
          
        });

      });
    }

    qscfunc();


  })

  .directive('qsc', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {

        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            var data = scope.data;
            AmCharts.makeChart("area-chart",
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
              // "startDuration": 0.5,
              // "startEffect": "easeOutSine",
              "borderColor": "#FFFE6E",
              "color": "#FFF",
              "fontFamily": "'Oswald', sans-serif",
              "fontSize": 20,
              "handDrawScatter": 0,
              "handDrawThickness": 0,
              "theme": "default",
              "categoryAxis": {
                "equalSpacing": true,
                "firstDayOfWeek": 0,
                "startOnAxis": true,
                "twoLineMode": true,
                "axisAlpha": 0.43,
                "axisColor": "#FFFE6E",
                "color": "#FFF",
                "fillColor": "#FFF",
                "gridAlpha": 0.39,
                "gridColor": "#FFFE6E",
                "gridCount": 20,
                "minHorizontalGap": 0,
                "minorGridAlpha": 0,
                "minVerticalGap": 0,
                "showFirstLabel": false,
                "showLastLabel": false,
                "tickLength": 22
              },
              "trendLines": [],
              "graphs": [
                {
                  "bullet": "round",
                  "bulletBorderAlpha": 1,
                  "bulletBorderColor": "#FFFFFF",
                  "bulletColor": "#FFFFFF",
                  "color": "#FFFFFF",
                  "fillAlphas": 0.75,
                  "fillColors": "#3498DB",
                  "id": "AmGraph-1",
                  "legendColor": "#3498DB",
                  "lineColor": "#12E9F0",
                  "lineThickness": 3,
                  "negativeFillAlphas": 0,
                  "title": "Quality",
                  "type": "smoothedLine",
                  "valueAxis": "ValueAxis-1",
                  "valueField": "column-1",
                  "visibleInLegend": false
                },
                {
                  "bullet": "round",
                  "bulletBorderAlpha": 1,
                  "bulletBorderColor": "#FFFFFF",
                  "bulletColor": "#FFFFFF",
                  "fillAlphas": 0.82,
                  "fillColors": "#E90000",
                  "id": "AmGraph-2",
                  "legendColor": "#E90000",
                  "lineColor": "#FF8800",
                  "lineThickness": 3,
                  "title": "Service",
                  "type": "smoothedLine",
                  "valueField": "column-2",
                  "visibleInLegend": false
                },
                {
                  "bullet": "round",
                  "bulletBorderAlpha": 1,
                  "bulletBorderColor": "#FFFFFF",
                  "bulletColor": "#FFFFFF",
                  "columnWidth": 0,
                  "fillAlphas": 0.84,
                  "fillColors": "#FFEA00",
                  "id": "AmGraph-3",
                  "legendColor": "#FFEA00",
                  "lineColor": "#FBE041",
                  "lineThickness": 3,
                  "markerType": "square",
                  "negativeFillAlphas": 1,
                  "negativeFillColors": "#FFFFFF",
                  "title": "CLEANLINESS",
                  "type": "smoothedLine",
                  "valueField": "column-3",
                  "visibleInLegend": false
                }
              ],
              "guides": [],
              "valueAxes": [
                {
                  "id": "ValueAxis-1",
                  "synchronizationMultiplier": 0,
                  "axisAlpha": 0.41,
                  "axisColor": "#FFFE6E",
                  "color": "#FFF",
                  "fillColor": "#FFF",
                  "gridAlpha": 0.42,
                  "gridColor": "#FFFE6E",
                  "gridCount": 20,
                  "tickLength": 0,
                  "title": ""
                }
              ],
              "allLabels": [],
              "balloon": {
                "showBullet": true
              },
              "legend": {
                "enabled": true,
                "color": "#FFFFFF",
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
              "dataProvider": data
            });
          }
        });
      }
    };
  });

})();

