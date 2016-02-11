(function() {
  angular.module( 'livefeed.manage_users')



  .controller('ModalAddInstanceCtrl', function ($scope, $uibModalInstance, parent_id, child_role,branch_id, region_id, ManageApi, Enum, Filters, flashService) {

    $scope.user = {role: child_role, parent_id: parent_id};
    if(branch_id){
      $scope.user.branch_id = branch_id;
    }
    if(region_id){
      $scope.user.region_id = region_id;
    }

    $scope.show_error_message = false;

    $scope.submitted = false;

    $scope.show_loading = false;

    Filters.allRegions().$promise.then(function(data){
      if(data.success){
        $scope.regions = data.response;
        $scope.show_error_message = false;
      }
      else{
        $scope.show_error_message = true;
        flashService.createFlash(data.message, "danger");
      }

    });

    Filters.Branches(null, region_id).$promise.then(function(data){
      if(data.success){
        $scope.show_error_message = false;
        $scope.branches = data.reponse;
      }
      else{
        $scope.show_error_message = true;
        flashService.createFlash(data.message, "danger");
      }

    });

    $scope.add = function(valid){
      if(valid){
        $scope.submitted = true;
        $scope.show_loading = true;
        ManageApi.add_user($scope.user).$promise.then(function(data){
          $scope.show_loading = false;
          if(data.success){
            $scope.show_error_message = false;
            $scope.ok();
            var message = "User successfully created.";
            flashService.createFlash(message, "success");
          }
          else{
            $scope.show_error_message = true;
            flashService.createFlash(data.message, "danger");
          }

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

    $scope.user = angular.copy(user);

    $scope.edit_form = true;

    $scope.submitted = false;

    $scope.show_error_message = false;


    $scope.add = function(valid){
      if(valid){
        $scope.submitted = true;
        $scope.show_loading = true;
        ManageApi.edit_user($scope.user).$promise.then(function(data){
          $scope.show_loading = false;
          if(data.success){
            $scope.show_error_message = false;
            $scope.user = data.response;
            $scope.ok($scope.user);
            var message = "User successfully edited.";
            flashService.createFlash(message, "success");

          }
          else{
            $scope.show_error_message = true;
            $scope.error_message = data.message;
            flashService.createFlash($scope.error_message, "danger");
          }

        });
      }
      else{
        $scope.submitted = true;
      }
    };

    $scope.ok = function (user) {
      $uibModalInstance.close(user);
    };

    $scope.cancel = function () {
      $scope.user = angular.copy(user);
      $uibModalInstance.dismiss('cancel');
    };
  });

})();
