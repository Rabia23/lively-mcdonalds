angular.module( 'livefeed.live.business_segment', [
  'ui.router',
  'factories',
  'flash',
  'livefeed.chart'
])



.controller( 'BusinessSegmentCtrl', function BusinessSegmentCtrl( $scope, _, chartService, Graphs, Global ) {
  
  Graphs.segmentation_rating().$promise.then(function(data){
    $scope.segmentation_rating = [];
    console.log(data);
    _.each(data.segments, function(value, index){
      $scope.segmentation_rating.push({"category":value.segment, "column-1": value.option_data[0].count, "column-2":value.option_data[1].count,"column-3":value.option_data[2].count});
    });
  });

  //     $scope.segmentation_rating =[
  //   {
  //     "category": "BREAKFAST",
  //     "column-1": "15",
  //     "column-2": "80",
  //     "column-3": "10"
  //   },
  //   {
  //     "category": "LUNCH",
  //     "column-1": "28",
  //     "column-2": "40",
  //     "column-3": "12"
  //   },
  //   {
  //     "category": "SNACK",
  //     "column-1": "100",
  //     "column-2": "30",
  //     "column-3": "20"
  //   },
  //   {
  //     "category": "DINNER",
  //     "column-1": "30",
  //     "column-2": "30",
  //     "column-3": "10"
  //   },
  //   {
  //     "category": "LATE NIGHT",
  //     "column-1": "15",
  //     "column-2": "5",
  //     "column-3": "10"
  //   }
  // ];
})

.directive('businessSegment', function() {
  return {
    restrict: 'A',
    scope: {
      data: '='
    },
    link: function(scope, ele, attrs) {

      scope.$watch('data', function(watchedData) {
        if(watchedData !== undefined){
          console.log("in the if");
          var data = scope.data;
          console.log(data);
          // AmCharts.makeChart("stackchart",{
          //   "type": "serial",
          //   "categoryField": "category",
          //   "angle": 15,
          //   "depth3D": 30,
          //   "startDuration": 1,
          //   "autoDisplay": true,
          //   "color": "#FFF",
          //   "fontFamily": "'Oswald', sans-serif",
          //   "fontSize": 16,
          //   "theme": "default",
          //   "categoryAxis": {
          //     "gridPosition": "start",
          //     "axisAlpha": 0.39,
          //     "axisColor": "#FFFE6E",
          //     "gridAlpha": 0.37,
          //     "gridColor": "#FFFE6E",
          //     "gridCount": 10,
          //     "tickLength": 0
          //   },
          //   "trendLines": [],
          //   "graphs": [
          //     {
          //       "fillAlphas": 0.76,
          //       "fillColors": "#3498DB",
          //       "id": "AmGraph-1",
          //       "labelPosition": "middle",
          //       "labelText": "[[value]]",
          //       "lineThickness": 0,
          //       "title": "",
          //       "type": "column",
          //       "valueField": "column-1",
          //       "visibleInLegend": false
          //     },
          //     {
          //       "fillAlphas": 0.77,
          //       "fillColors": "#FFEA00",
          //       "id": "AmGraph-2",
          //       "labelPosition": "middle",
          //       "labelText": "[[value]]",
          //       "title": "graph 2",
          //       "type": "column",
          //       "valueField": "column-2",
          //       "visibleInLegend": false
          //     },
          //     {
          //       "fillAlphas": 0.76,
          //       "fillColors": "#E90000",
          //       "id": "AmGraph-3",
          //       "labelPosition": "middle",
          //       "labelText": "[[value]]",
          //       "lineThickness": 0,
          //       "title": "graph 3",
          //       "type": "column",
          //       "valueField": "column-3",
          //       "visibleInLegend": false
          //     }
          //   ],
          //   "guides": [],
          //   "valueAxes": [
          //     {
          //       "id": "ValueAxis-1",
          //       "stackType": "regular",
          //       "axisAlpha": 0.38,
          //       "axisColor": "#FFFE6E",
          //       "fillColor": "#FFF",
          //       "gridAlpha": 0.39,
          //       "gridColor": "#FFFE6E",
          //       "minHorizontalGap": 20,
          //       "minVerticalGap": 20,
          //       "tickLength": 0,
          //       "title": ""
          //     }
          //   ],
          //   "allLabels": [],
          //   "balloon": {},
          //   "legend": {
          //     "enabled": true,
          //     "useGraphSettings": true
          //   },
          //   "titles": [
          //     {
          //       "id": "Title-1",
          //       "size": 15,
          //       "text": ""
          //     }
          //   ],
          //   "data-provider": data
          // });
        }
      });
    }
  };
});

