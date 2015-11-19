angular.module( 'livefeed.dashboard.feedback_map', [
  'ngMap',
  'factories',
  'livefeed.map'
])

.controller( 'FeedbackMapCtrl', function DashboardController( $scope, _, Graphs, mapService ) {


  $scope.$on('mapInitialized', function (event, map) {
    $scope.map = map;
  });




  $scope.zoom = 5;
  $scope.markers = [];

  Graphs.map_view().$promise.then(function(data){
    _.each(data.branches, function(branch){
      $scope.markers.push(mapService.createMarker(branch, $scope.map));
    });
  });
});

