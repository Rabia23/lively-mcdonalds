angular.module( 'livefeed.dashboard.positive_negative_feedback', [
  'factories',
  'livefeed.chart',
  'helper_factories',
   'ui.bootstrap',
   'livefeed.scroll'
])

.controller( 'PositiveNegativeFeedbackCtrl', function DashboardController( $scope, _, Global, Graphs,$uibModal, $log ) {

  Graphs.positive_negative_feedback().$promise.then(function(data){
    console.log("positive");
    console.log(data);
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

  $scope.selectedValue = function(value, comment){
    comment.action_taken = false;
    comment.action_string = value == "Process" ? "Processed" : "Deferred";
  };

  Graphs.comments($scope.page).$promise.then(function(data){
    $scope.comments = _.map(data.feedbacks,  function(data){
      return {
        name: data.user_name,
        phone_no: data.user_phone,
        branch: data.branch,
        segment: data.segment,
        comment: data.comment,
        action_taken: data.action_taken === 1 ?  true : false,
        action_string: data.action_taken === 2 ? "Processed" : data.action_taken === 3 ? "Deferred" : ""
      };
    });
  });

  //$scope.processComment = function(comment){
  //  Graphs.action_taken(comment.id).$promise.then(function(data){
  //    comment.action_taken = true;
  //  });
  //
  //};

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

// .directive('customScroll', function() {
//     return {
//       restrict: 'A',
//       link: function(scope, ele, attrs) {
//         $(ele).enscroll({
//           horizontalScrolling: true,
//           verticalTrackClass: 'vertical-track2',
//           verticalHandleClass: 'vertical-handle2',
//           horizontalTrackClass: 'horizontal-track2',
//           horizontalHandleClass: 'horizontal-handle2',
//           cornerClass: 'corner2',
//           scrollIncrement: 100
//         });
        
//       }
//   };
// })

.directive('customScroll', function(scollService){
  return {
    restrict: 'A',
    scope: {
      comments: '='
    },
    link: function(scope, ele, attrs){
      scope.$watch('comments', function(watchedComments) {
        if(watchedComments.length > 0){
          
          console.log("in the watch");
          console.log(watchedComments);
          scollService.init();

        }
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

