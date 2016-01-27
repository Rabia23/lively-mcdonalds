(function() {
  angular.module( 'livefeed.manage_users')



  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, parent_id, child_role, Api, Enum, Filters) {


    $scope.user = {role: child_role, parent_id: parent_id};

    $scope.submitted = false;

    Filters.allRegions().$promise.then(function(data){
      $scope.regions = data;
      console.log($scope.regions);
    });

    Filters.Branches().$promise.then(function(data){
      $scope.branches = data;
      console.log($scope.branches);
    });


    $scope.add = function(valid){
      if(valid){
        $scope.submitted = true;
        console.log(valid);
        console.log($scope.user);
        Api.add_user($scope.user).$promise.then(function(data){
          console.log(data);
        });
      }
      else{
        $scope.submitted = true;
      }
    };



    $scope.ok = function () {
      $uibModalInstance.close($scope.user);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();
