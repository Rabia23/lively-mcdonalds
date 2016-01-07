angular.module( 'livefeed.live.overall-ratings', [
  'ui.router',
  'factories',
  'helper_factories',
  'flash'

])



.controller( 'OverallRatingCtrl', function OverallRatingCtrl( $scope, _, Graphs, Global, $rootScope ) {
  
  function rating(){
    Graphs.overall_feedback().$promise.then(function(graph_data){
      $scope.overall_rating_data = [];
      //var maximum = _.max(graph_data.feedbacks, function(data){ return data.count; });
      _.each(graph_data.feedbacks, function(data){
        $scope.overall_rating_data.push({"category": data.option__text,"column-1": data.count, "color": Global.mainRatingColorScheme[data.option__text]});
      });
    });
  }
  rating();

  $rootScope.$on('web-socket-message', function (event, data) {
    rating();
  });
})

.directive('overallRating', function() {
  return {
    restrict: 'A',
    scope: {
      data: '='
    },
    link: function(scope, ele, attrs) {

      scope.$watch('data', function(watchedData) {
        if(watchedData !== undefined){
          var data = scope.data;
          AmCharts.makeChart("barchart",{
            "type": "serial",
            "categoryField": "category",
            "angle": 15,
            "depth3D": 30,
            //"startDuration": 1,
            "fontFamily": "'Oswald', sans-serif",
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

