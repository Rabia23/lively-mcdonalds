angular.module( 'livefeed.dashboard.top_concern', [
  'factories',
  "helper_factories"
])

.controller( 'TopConcernsCtrl', function TopConcernController( $scope, Graphs, Global ) {

  $scope.colors = [];
  $scope.labels = [];


  Graphs.top_concerns().$promise.then(function(data){
    var concern_list = data.concern_list;
    $scope.data = [];
    _.each(concern_list, function(value, index){
      //$scope.labels.push(value.name);
      $scope.data.push({"category": value.name, "column-1": value.weight});
     // $scope.colors.push(Global.bubbleColor(index));

    });
  });
})

 .directive('topConcerns', function() {
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
            console.log("top concerns");
            console.log(data);
            chart = AmCharts.makeChart("piechart",
              {
                "type": "pie",
                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b></span>",
                "innerRadius": "40%",
                "color": "#cb1e24",
                "labelText": "[[value]]",
                  "autoMargins":false,
                "labelTickColor" : "#FFFFFF",
                "colors": [
                  "#cb1e24",
                  "#178aea",
                  "#434347",
                  "#f1d400",
                  "#90ec7c"
                ],
                "titleField": "category",
                "valueField": "column-1",
                "labelColorField" : "#000000",
                "fontFamily": "'Oswald', sans-serif",
                "fontSize": 15,
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": false,
                    "align": "center",
                    "markerType": "circle"
                },
                "titles": [],
               "dataProvider": data
              });
              console.log("chart");
              console.log(chart);
          }
        });
      }
    };
  })

.directive('sameHeight', function() {
  return {
      restrict: 'A',
      scope: {
        mydata: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('mydata', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
  };
});
