angular.module( 'livefeed.dashboard.feedback_map', [
  'ngMap',
  'factories',
  'livefeed.map',
  'ui.bootstrap',
  'daterangepicker',
  'flash'
])

.controller( 'FeedbackMapCtrl', function FeedbackMapController( $scope, Graphs, mapService, Flash ) {

  $scope.today = new Date();

  $scope.show_error_message = false;

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

  function draw_map(start_date,end_date ){
    $scope.markers = [];
    Graphs.map_view(start_date, end_date).$promise.then(function(data){
      if(data.success) {
        $scope.show_error_message = false;
        _.each(data.response.branches, function (branch) {
          var icon;
          if (branch.count_exceeded === false) {
            icon = '../assets/images/ico-locator.png';
          }
          else {
            icon = '../assets/images/ico-locator2.png';
          }
          $scope.markers.push(mapService.createMarker(branch, $scope.map, icon));
        });
        $scope.show_loading = false;
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = data.message;
        Flash.create('danger', $scope.error_message, 'custom-class');
      }
    });

  }

  $scope.datePickerOption = {
    eventHandlers: {
      'apply.daterangepicker': function(ev, picker){

        $scope.show_loading = true;
        draw_map(ev.model.startDate._i, ev.model.endDate._i);
      },
      'cancel.daterangepicker': function(ev, picker){
        //$scope.datePicker.date.startDate = null;
        //$scope.datePicker.date.endDate = null;
      }

    },
    opens: "left"
  };

  $scope.zoom = 5;
  $scope.markers = [];

  draw_map();

  // Graphs.map_view().$promise.then(function(data){
  //   $scope.show_loading = false;
  //   if(data.success) {
  //     $scope.show_error_message = false;
  //     _.each(data.response.branches, function (branch) {
  //       var icon;
  //       if (branch.count_exceeded === false) {
  //         icon = '../assets/images/ico-locator.png';
  //       }
  //       else {
  //         icon = '../assets/images/ico-locator2.png';
  //       }
  //       $scope.markers.push(mapService.createMarker(branch, $scope.map, icon));
  //     });
  //   }
  //   else{
  //     $scope.show_error_message = true;
  //     $scope.error_message = data.message;
  //     Flash.create('danger', $scope.error_message, 'custom-class');
  //   }
  // });
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
