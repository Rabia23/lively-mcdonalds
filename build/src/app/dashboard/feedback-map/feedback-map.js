angular.module( 'livefeed.dashboard.feedback_map', [
	'ngMap'
])

.controller( 'FeedbackMapCtrl', function DashboardController( $scope, _ ) {

	$scope.zoom = 5;

	$scope.destinations = [
		"31, 72", "31.5, 74.3"
	];
	// NgMap.getMap().then(function(map) {
 //    console.log(map.getCenter());
 //    console.log('markers', map.markers);
 //    console.log('shapes', map.shapes);
 //  });
});

