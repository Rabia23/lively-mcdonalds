(function() {
  angular.module( 'livefeed.manage_users')



  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, parent_id, child_role, ManageApi, Enum, Filters) {

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
        });
        $scope.ok();
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


    $scope.user = user;

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
        console.log(valid);
        console.log($scope.user);
        // ManageApi.add_user($scope.user).$promise.then(function(data){
        //   console.log(data);
        // });
        $scope.ok();
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
