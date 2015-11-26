angular.module( 'livefeed.dashboard.top_concern', [
  'factories',
  'livefeed.chart',
  "helper_factories",
  'angular-flot'
])

.controller( 'TopConcernCtrl', function TopConcernController( $scope, _, chartService, Graphs, Global ) {

  $scope.datePicker = {};
  $scope.datePicker.date = {startDate: null, endDate: null};

  $scope.today = new Date();

  Graphs.top_concerns().$promise.then(function(data){
    $scope.data = data.concern_list;
    _.each($scope.data, function(value, index){
      value.color = Global.bubbleColor(index);
    });
    console.log("sd");
    console.log($scope.data);
  });

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

          var k = new PykCharts.oneD.bubble({
            "selector": "#bubble-chart",
            "data": data,
            "chart_width": 620,
            "chart_height": 400,
            "background_color": "#FFFFFF",
            "color_mode": "color",
            "shade_color": "#8e44ad",
            "chart_color": [
                      "red",
                      "blue",
                      "orange",
                      "red",
                      "red",
                      "red"
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
            "credit_my_site_url": "false"
          });

          k.execute();
        }
      });
      
    }
  };
});