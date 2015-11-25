angular.module( 'livefeed.dashboard.top_concern', [
  'factories',
  'livefeed.chart',
  "helper_factories",
  'angular-flot'
])

.controller( 'TopConcernCtrl', function TopConcernController( $scope, _, chartService, Graphs, Global ) {

  Graphs.top_concerns().$promise.then(function(data){
    console.log("top concerns");
    console.log(data.concern_list);
    $scope.data = data.concern_list;
  });

  // $scope.data = [
  //   {
  //     "name": "Product 1",
  //     "weight": 4800
  //   },
  //   {
  //     "name": "Product 2",
  //     "weight": 4000
  //   },
  //   {
  //     "name": "Product 3",
  //     "weight": 2500
  //   }
  // ];

})
.directive('pykChart', function() {
  return {
    restrict: 'A',
    scope: {
      data: '='
    },
    link: function(scope, ele, attrs) {

      scope.$watch('data', function(watchedData) {

        if(watchedData !== undefined){
          var data = scope.data;

          console.log(data);
          var k = new PykCharts.oneD.bubble({
            "selector": "#bubble-chart",
            "data": data,
            "chart_width": 620,
            "chart_height": 400,
            "background_color": "#FFFFFF",
            "color_mode": "shade",
            "shade_color": "#8e44ad",
            "chart_color": [
                      "#8e44ad",
                      "#FFc300",
                      "#3498db"
            ],
            "highlight": "Internet Explorer",
            "label_size": 13,
            "label_weight": "normal",
            "label_family": "Helvetica Neue,Helvetica,Arial,sans-serif",
            "real_time_charts_last_updated_at_enable": "no",
            "real_time_charts_refresh_frequency": 0,
            "transition_duration": 4,
            "clubdata_enable": "yes",
            "clubdata_text": "Others",
            "clubdata_maximum_nodes": 15,
            "chart_onhover_highlight_enable": "yes",
            "tooltip_enable": "no",
            "credit_my_site_name": "false",
            "credit_my_site_url": "false",
            "map_code": "world"
          });

          k.execute();
        }
      });
      
    }
  };
});
