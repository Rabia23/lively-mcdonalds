angular.module( 'livefeed.dashboard.overall_rating', [
  'factories',
  'livefeed.chart',
  "helper_factories",
  'angular-flot'
])

.controller( 'OverallRatingCtrl', function DashboardController( $scope, _, chartService, Graphs, Global ) {

  $scope.line1 = {
    data: [],
    options: {}
  };
  Graphs.overall_rating().$promise.then(function(data){
    $scope.line1 = chartService.getLineChart(data);
    $scope.labels = _.map(data[0].data.feedbacks ,function(value){
      return {value: value.option__text, color: Global.optionsColorScheme[value.option__text]};
    });    
    //$.plot($("#overall-rating-linechart")[0], $scope.line1.data, $scope.line1.options);

  });
})

.directive('bindPlotclick',[function(){
  return {
    link: function(scope, element, attrs){
      console.log("in the link");
      var ele = $(element.children()[0]);
      ele.bind("plotclick", function(event, pos, item){
        console.log("plotclicked");
        console.log(item);
      });

      ele.bind("plotclick", function(event){
        console.log("clicked");
        console.log(event);
      });
    }
  };
}]);

// .directive('chart', function(){
//     return{
//         restrict: 'E',
//         link: function(scope, elem, attrs){
            
//             var chart = null;
            
//             var line1 = scope[attrs.ngModel];            
//             var data = line1.data;
//             var options = {};
//             scope.$watch('data', function(v){
//                 if(!chart){
//                     console.log(options);
//                     console.log(v);
//                     chart = $.plot(elem, v , options);
//                     elem.show();
//                 }else{
//                     chart.setData(v);
//                     chart.setupGrid();
//                     chart.draw();
//                 }
//             });
//         }
//     };
// });

// .directive('flotChart', [
//   '$compile'
//   function($compile) {
//     return {
//       restrict: 'A',
//       scope:{
//         /* NOTE: Normally I would set my attributes and bindings
//         to be the same name but I wanted to delineate between
//         parent and isolated scope. */                
//         isolatedData:'=data',
//         isolatedOptions:'=options'
//       },   
//       link: function(scope, ele, attrs) {
//         console.log(attrs);
//         console.log(scope);

//         scope.$watch(scope.isolatedData, function (value) {
//           compiled = $compile(ele);
//           compiled(scope);
//           $.plot(ele[0],scope.isolatedData, scope.isolatedOptions);
//           //scope.$apply();
//         });



//         // console.log(scope);
//         // scope.$watch(scope.line1.data, function(v){
//         //   console.log(scope.line1.data);
//         //   console.log(scope.line1.options);
//         //   console.log("changed");
//         //   $.plot(ele[0], scope.line1.data, scope.line1.options);
//         // });
//         //data = scope.data;
//         //options = scope.options;
        
//       }
//     };
//   }
// ]);

