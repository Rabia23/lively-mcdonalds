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
  $scope.colors = [];

  Graphs.top_concerns().$promise.then(function(data){
    $scope.data = data.concern_list;
    _.each($scope.data, function(value, index){
      value.color = Global.bubbleColor(index);
      $scope.colors.push(value.color);
    });
  });

})
.directive('pykChart', function() {
  return {
    restrict: 'A',
    scope: {
      data: '=',
      colors: '='
    },
    link: function(scope, ele, attrs) {

      scope.$watch('data', function(watchedData) {

        if(watchedData !== undefined){
          var data = scope.data;
          var colors = scope.colors;
          var k = new PykCharts.oneD.bubble({
            "selector": "#bubble-chart",
            "data": data,
            "chart_width": 620,
            "chart_height": 320,
            "background_color": "#FFFFFF",
            "color_mode": "color",
            "chart_color": ["#BFA66E"],
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
            "chart_onhover_highlight_enable": "no",
            "tooltip_enable": "no",
            "credit_my_site_name": "false",
            "credit_my_site_url": "false"
          });

          k.execute();

          _.each($("circle"), function(value, index){
            $(value).attr("fill", colors[index]);
          });

          $("#bubble-chart").find("svg")[0].setAttribute("viewBox", "25 40 550 300");

        }
      });
      
    }
  };
});
