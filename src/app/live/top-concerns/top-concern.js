(function() {
  angular.module( 'livefeed.live.top_concerns', [
    'ui.router',
    'flash'

  ])



  .controller( 'TopConcernCtrl', function TopConcernController( $scope, _, Global, $rootScope ) {
    
    function top_concern(){
      var concern_list = $scope.concerns.concern_list;
      $scope.top_concern_data = [];
      _.each(concern_list, function(value, index){
        
        $scope.top_concern_data.push({"category": value.name.toUpperCase(), "column-1": value.weight});
      });
    }

    $rootScope.$on('live-data-received', function (event, data) {
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
              "angle": 25,
              "startDuration": 0,
              "balloonText": "[[title]]<br><span style='font-size:14px'>[[value]]</span>",
              "depth3D": 55,
              "innerRadius": "35%",
              //"labelRadius": -35,
              //"labelText": "[[value]]",
              "labelsEnabled": false,
              "titleField": "category",
              "valueField": "column-1",
              "fontFamily": "'Oswald', sans-serif",
              "fontSize": 35,
              "allLabels": [],
              "balloon": {},
              "legend": {
                "enabled": true,
                "align": "center",
                "equalWidths": false,
                "markerLabelGap": 25,
                "markerSize": 23,
                "markerType": "circle",
                "valueText": "",
                "valueWidth": 0,
                "position": "right",
                "autoMargins": false,
                "marginRight": 400
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

