angular.module( 'livefeed.live.business_segment', [
  'ui.router',
  'flash'
])



.controller( 'BusinessSegmentCtrl', function BusinessSegmentCtrl( $scope, _, Global, $rootScope ) {
  
  function business_segment(){
    var qsc = {quality: [], service: [], cleanliness: []};
    $scope.segmentation_rating = [];
    $scope.business_segments_labels = [];

     _.each($scope.segmentation_ratings.segments[0].option_data, function(value) {
         $scope.business_segments_labels.push({option_name: value.option__text, option_class: Global.qscClass[value.option__text]});
     });
     $scope.business_segments_labels = _.sortBy($scope.business_segments_labels, function (value) { return Global.qscPriority[value.option_name];});

    _.each($scope.segmentation_ratings.segments, function(value, index){
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
      $scope.segmentation_rating.push({"category":value.segment.toUpperCase(), "column-1": qsc.cleanliness[index], "column-2":qsc.service[index],"column-3":qsc.quality[index]});
    });
  }

   $rootScope.$on('live-data-received', function (event, data) {
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

      var graph_drawn = false;
      var live_segment_chart;

      scope.$watch('data', function(watchedData) {
        if(watchedData !== undefined){
          var data = scope.data;
          if(!graph_drawn){
            console.log("in the id");
            live_segment_chart =   AmCharts.makeChart("stackchart",{
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
            graph_drawn = true;
          }
          else{
            live_segment_chart.dataProvider = data;
            live_segment_chart.validateData();
          }

           
        }
      });
    }
  };
});

