(function() {
  angular.module( 'livefeed.live.top_concerns', [
    'ui.router',
    'factories',
    'flash'

  ])



  .controller( 'TopConcernCtrl', function TopConcernController( $scope, _, Graphs, Global, $rootScope ) {
    
    function top_concern(){
      Graphs.top_concerns().$promise.then(function(data){
        var concern_list = data.concern_list;
        $scope.top_concern_data = [];
        _.each(concern_list, function(value, index){
          
          $scope.top_concern_data.push({"category": value.name.toUpperCase(), "column-1": value.weight});
        });
      });
    }

    top_concern();

    $rootScope.$on('web-socket-message', function (event, data) {
      top_concern();
    });
    
  })

  .directive('topConcern', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {

        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            var data = scope.data;
            AmCharts.makeChart("container",{
              "type": "pie",
              "angle": 12,
              "balloonText": "[[title]]<br><span style='font-size:14px'>[[value]]</span>",
              "depth3D": 15,
              "innerRadius": "40%",
              "labelText": "",
              "labelsEnabled": false,
              "titleField": "category",
              "valueField": "column-1",
              "fontFamily": "'Oswald', sans-serif",
              "fontSize": 40,
              "allLabels": [],
              "balloon": {},
              "legend": {
                "enabled": true,
                "align": "center",
                "equalWidths": false,
                "markerLabelGap": 15,
                "markerSize": 23,
                "markerType": "circle",
                "valueText": "",
                "valueWidth": 0
              },
              "titles": [],
              "dataProvider": data
            });
          }
        });
      }
    };
  });

})();

