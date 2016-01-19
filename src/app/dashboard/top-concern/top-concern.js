angular.module( 'livefeed.dashboard.top_concern', [
  'factories',
  "helper_factories"
])

.controller( 'TopConcernsCtrl', function TopConcernController( $scope, Graphs, Global ) {
  
  $scope.colors = [];
  $scope.labels = [];
  $scope.data = [];

  Graphs.top_concerns().$promise.then(function(data){
    var concern_list = data.concern_list;
    _.each(concern_list, function(value, index){
      $scope.labels.push(value.name);
      $scope.data.push(value.weight);
      $scope.colors.push(Global.bubbleColor(index));
      
    });
  });
})

.directive('sameHeight', function() {
  return {
      restrict: 'A',
      scope: {
        mydata: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('mydata', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
  };
});
