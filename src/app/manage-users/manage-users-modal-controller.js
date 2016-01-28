(function() {
  angular.module( 'livefeed.manage_users')



  .controller('ModalAddInstanceCtrl', function ($scope, $uibModalInstance, parent_id, child_role, ManageApi, Enum, Filters) {

    $scope.user = {role: child_role, parent_id: parent_id};

    $scope.submitted = false;

    Filters.allRegions().$promise.then(function(data){
      $scope.regions = data;
    });

    Filters.Branches().$promise.then(function(data){
      $scope.branches = data;
    });

    $scope.add = function(valid){
      if(valid){
        $scope.submitted = true;
        ManageApi.add_user($scope.user).$promise.then(function(data){
          console.log(data);
          $scope.ok();
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
  })

  .controller('ModalEditInstanceCtrl', function ($scope, $uibModalInstance, parent_id, child_role, user,ManageApi, Enum, Filters) {


    console.log("in the edit controller");
    $scope.user = user;

    $scope.edit_form = true;

    $scope.submitted = false;

    Filters.allRegions().$promise.then(function(data){
      $scope.regions = data;
    });

    Filters.Branches().$promise.then(function(data){
      $scope.branches = data;
    });


    $scope.add = function(valid){
      if(valid){
        $scope.submitted = true;
        ManageApi.edit_user($scope.user).$promise.then(function(data){
          console.log(data);
          $scope.ok(true);
        });

      }
      else{
        $scope.submitted = true;
      }
    };



    $scope.ok = function (result) {
      $uibModalInstance.close(result);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();
