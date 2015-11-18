angular.module( 'livefeed.dashboard.positive_negative_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories'
])

.controller( 'PositiveNegativeFeedbackCtrl', function DashboardController( $scope, _, Global, Graphs,$uibModal, $log ) {

  Graphs.positive_negative_feedback().$promise.then(function(data){
    $scope.pos_feedbacks = data.positive_feedbacks;
    $scope.neg_feedbacks = data.negative_feedbacks;
  });

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
      //$scope.selected = selectedItem;
    });
  };

})

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, Graphs) {

  $scope.comments = [];
  $scope.page = 1;

  $scope.lock = false;

  Graphs.comments($scope.page).$promise.then(function(data){
    $scope.comments = data.feedbacks;
  });

  $scope.getMoreComments = function(){
    $scope.page = $scope.page + 1;
    $scope.lock = true;
    Graphs.comments($scope.page).$promise.then(function(data){
      $scope.lock = false;
      angular.forEach(data.feedbacks, function(value, key) {
        $scope.comments.push(value);
      });
    });
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
})

.directive('whenScrolled', function() {
  return {
    link: function(scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function() {
          if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
            if(scope.lock === false){
              scope.$apply(attr.whenScrolled);
            }     
          }
        });
    }
  };
});

