angular.module( 'livefeed.dashboard.opportunities', [
  'factories',
  "helper_factories"
])

.controller( 'OpportunitiesCtrl', function OpportunitiesCtrl( $scope, Graphs, Global ) {
  
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
