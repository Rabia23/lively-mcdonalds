(function() {
  angular.module( 'livefeed.manage_users')



  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {



    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();
