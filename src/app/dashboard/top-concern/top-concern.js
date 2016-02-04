angular.module( 'livefeed.dashboard.top_concern', [
  'factories',
  "helper_factories"
])

.controller( 'TopConcernsCtrl', function TopConcernController( $scope, Graphs, Global ) {

  $scope.colors = [];
  $scope.labels = [];
  $scope.show_loading = true;

  Graphs.top_concerns().$promise.then(function(data){
    $scope.data = [];
    $scope.all_zero = true;

    $scope.concern_list = data.concern_list;

    _.each($scope.concern_list, function(value, index){
      if(value.weight > 0){
        $scope.all_zero = false;
      }
    });

    _.each($scope.concern_list, function(value, index){
      $scope.data.push({"category": value.name, "column-1": value.weight, "color": Global.topConcernsColors(index)});

    });
    $scope.show_loading = false;
  });
})

 .directive('topConcerns', function($timeout) {
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
            chart = AmCharts.makeChart("piechart",
              {
                "type": "pie",
                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b></span>",
                "innerRadius": "40%",
                "startDuration": 0,
                "color": "#FFF",
                "marginTop": -80,
                "marginBottom": -50,
                "autoMargins": false,
                "labelText": "[[title]] [[value]]",
                "labelTickColor" : "#FFF",
                "labelRadius" : 8,
                "labelColorField": "color",
                "titleField": "category",
                "valueField": "column-1",
                "colorField": "color",
                "fontFamily": "'Open Sans', sans-serif;",
                "fontSize": 15,
                "allLabels": [],
                "balloon": { "fixedPosition": true },
                "legend": {},
                "titles": [],
               "dataProvider": data
              });

              // var width = $("#piechart").find("svg").width();
              // //width = width + 500;
              // //$("#piechart").find("svg").css("width", width);
              // console.log("svg width");
              // console.log(width);


              $timeout(function () {
                console.log("hello");
                jQuery('.same-height-parent').sameHeight({
                  elements: '.same-height',
                  flexible: true,
                  multiLine: true,
                  biggestHeight: true,
                  useMinHeight: false
                });
              }, 2000);


              $timeout(function () {
                console.log("hello");
                window.initEqualHeight();
              }, 1000);

          }
        });
      }
    };
  });

// .directive('sameHeight', function() {
//   return {
//       restrict: 'A',
//       scope: {
//         data: '='
//       },
//       link: function(scope, ele, attrs) {
//         scope.$watch('data', function(watchedData) {
//           if(watchedData !== undefined){
//             window.initEqualHeight();
//           }
//         });
//       }
//   };
// });
