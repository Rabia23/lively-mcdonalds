angular.module( 'livefeed.live.business_segment', [
  'ui.router',
  'factories',
  'flash'
])



.controller( 'BusinessSegmentCtrl', function BusinessSegmentCtrl( $scope, _, Graphs, Global, $rootScope ) {
  
  function business_segment(){
    var qsc = {quality: [], service: [], cleanliness: []};
    Graphs.segmentation_rating().$promise.then(function(data){
      $scope.segmentation_rating = [];
      _.each(data.segments, function(value, index){
         _.each(value.option_data, function(item){
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
        $scope.segmentation_rating.push({"category":value.segment, "column-1": qsc.cleanliness[index], "column-2":qsc.service[index],"column-3":qsc.quality[index]});
      });
    });
  }

  business_segment();

   $rootScope.$on('web-socket-message', function (event, data) {
    business_segment();
  });

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
          var data = scope.data;

          AmCharts.makeChart("stackchart",{
            "type": "serial",
            "categoryField": "category",
            "angle": 20,
            "depth3D": 50,
            //"startDuration": 1,
            "fontFamily": "'Oswald', sans-serif",
            "fontSize": 16,
            "theme": "default",
            "categoryAxis": {
              "gridPosition": "start",
              "axisAlpha": 0.37,
              "axisColor": "#FFFE6E",
              "color": "#FFFFFF",
              "gridAlpha": 0.38,
              "gridColor": "#FFFE6E",
              "tickLength": 0
            },
            "trendLines": [],
            "graphs": [
              {
                "color": "#FFFFFF",
                "fillAlphas": 0.8,
                "fillColors": "#3498DB",
                "fontSize": 20,
                "id": "AmGraph-1",
                "labelText": "[[value]]",
                "lineThickness": 0,
                "title": "graph 1",
                "type": "column",
                "valueField": "column-1"
              },
              {
                "color": "#FFFFFF",
                "fillAlphas": 0.8,
                "fillColors": "#FFEA00",
                "fontSize": 20,
                "id": "AmGraph-2",
                "labelPosition": "middle",
                "labelText": "[[value]]",
                "lineThickness": 0,
                "title": "graph 2",
                "type": "column",
                "valueField": "column-2"
              },
              {
                "color": "#FFFFFF",
                "fillAlphas": 0.8,
                "fillColors": "#E90000",
                "fontSize": 20,
                "id": "AmGraph-3",
                "labelText": "[[value]]",
                "lineThickness": 0,
                "title": "graph 3",
                "type": "column",
                "valueField": "column-3"
              }
            ],
            "guides": [],
            "valueAxes": [
              {
                "id": "ValueAxis-1",
                "stackType": "regular",
                "axisAlpha": 0.37,
                "axisColor": "#FFFE6E",
                "color": "#FFFFFF",
                "gridAlpha": 0.39,
                "gridColor": "#FFFE6E",
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
        }
      });
    }
  };
});

