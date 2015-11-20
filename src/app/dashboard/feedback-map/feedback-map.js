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
    console.log("map data");
    console.log(data);
    _.each(data.branches, function(branch){
      var icon;
      if(branch.count_exceeded === false){
         icon = '../assets/images/ico-locator.png';
      }
      else{
        icon = '../assets/images/ico-locator2.png';
      }
      $scope.markers.push(mapService.createMarker(branch, $scope.map, icon));
    });
  });
});

