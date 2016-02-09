(function() {
    angular.module('livefeed.promotions')
    .directive('questionPieChart', function() {
      return {
        restrict: 'A',
        scope: {
          data: '='
        },
        link: function(scope, ele, attrs) {
          var chart;
          scope.$watch('data', function(watchedData) {
            if(watchedData !== undefined){
              var data = scope.data;
              console.log("inside directive");
              console.log(data);
              chart = AmCharts.makeChart("piechart",
              {
                "type": "pie",
                "pullOutDuration": 0,
                "pullOutRadius": 0,
                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b></span>",
                "innerRadius": "40%",
                "startDuration": 0,
                "color": "#FFF",
                "marginTop": 30,
                "autoMargins": false,
                "labelText": "[[title]] : [[value]]",
                "labelTickColor" : "#FFF",
                "labelRadius" : 8,
                "labelColorField": "color",
                "titleField": "category",
                "valueField": "column-1",
                "colorField": "color",
                "fontFamily": "'Open Sans', sans-serif;",
                "fontSize": 15,
                "allLabels": [],
                "balloon": { "fixedPosition": true },
                "legend": {},
                "titles": [],
                "dataProvider": data
              });
            }
          });
        }
      };
    });
})();