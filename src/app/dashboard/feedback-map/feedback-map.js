angular.module( 'livefeed.dashboard.feedback_map', [
  'ngMap',
  'factories',
  'livefeed.map',
  'ui.bootstrap',
  'daterangepicker'
])

.controller( 'FeedbackMapCtrl', function FeedbackMapController( $scope, _, Graphs, mapService ) {

  // $scope.datePicker = {};
  // $scope.datePicker.date = {startDate: null, endDate: null};

  $scope.today = new Date();

  function resetDates(){
    $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };
  }

  resetDates();

  $scope.show_loading = true;

  $scope.$on('mapInitialized', function (event, map) {
    $scope.map = map;
  });

  $scope.datePickerOption = {
    eventHandlers: {
      'apply.daterangepicker': function(ev, picker){

        $scope.show_loading = true;
        Graphs.map_view(ev.model.startDate._i, ev.model.endDate._i).$promise.then(function(data){
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
          $scope.show_loading = false;
        });
      
      },
      'cancel.daterangepicker': function(ev, picker){
        //$scope.datePicker.date.startDate = null;
        //$scope.datePicker.date.endDate = null;
      }

    }
  };

  $scope.zoom = 5;
  $scope.markers = [];

  Graphs.map_view().$promise.then(function(data){
    $scope.show_loading = false;
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
})

.directive('mapRangeClick', function() {
  return {
    restrict: 'A',
    link: function(scope, ele, attrs) {
      ele.bind("click", function(event){
        $(ele).prev().trigger("click");
      });      
    }
  };
})

.directive('sameMapHeight', function() {
  return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
            window.initSameHeight();
      }
  };
});

