(function() {
  angular.module( 'livefeed.manage_users')



  .controller('ModalAddInstanceCtrl', function ($scope, $uibModalInstance, parent_id, child_role,branch_id, region_id, ManageApi, Enum, Filters, Flash) {

    $scope.user = {role: child_role, parent_id: parent_id};
    if(branch_id){
      $scope.user.branch_id = branch_id;
    }
    if(region_id){
      $scope.user.region_id = region_id;
    }

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
          var message = "User successfully created.";
          Flash.create('success', message, 'custom-class');
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

  .controller('ModalEditInstanceCtrl', function ($scope, $uibModalInstance, parent_id, child_role, user,ManageApi, Enum, Filters, Flash) {

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
          var message = "User successfully edited.";
          Flash.create('success', message, 'custom-class');
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
