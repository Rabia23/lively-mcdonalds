angular.module( 'livefeed.dashboard.positive_negative_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories',
  'infinite-scroll'
])

.controller( 'PositiveNegativeFeedbackCtrl', function DashboardController( $scope, _, Global, Graphs,$uibModal, $log ) {

  Graphs.positive_negative_feedback().$promise.then(function(data){
    $scope.pos_feedbacks = data.positive_feedbacks;
    $scope.neg_feedbacks = data.negative_feedbacks;
  });


  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      templateUrl: 'dashboard/positive-negative-feedback/comments-modal.tpl.html',
      controller: 'ModalInstanceCtrl',
      size: 1200,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };

})

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, Graphs) {


  Graphs.comments().$promise.then(function(data){
    console.log(data);
    $scope.comments = data.feedbacks;
  });

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

.directive('customScroll', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        $(ele).enscroll({
          horizontalScrolling: true,
          verticalTrackClass: 'vertical-track2',
          verticalHandleClass: 'vertical-handle2',
          horizontalTrackClass: 'horizontal-track2',
          horizontalHandleClass: 'horizontal-handle2',
          cornerClass: 'corner2'
        });
        
      }
  };
});

