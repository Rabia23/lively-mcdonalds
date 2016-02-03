(function() {
  angular.module( 'livefeed.manage_users')


  .controller( 'ManageUsersCtrl', function ManageUsersCtrl( $scope, $state, $rootScope, TokenHandler, Auth, $uibModal, ManageApi, Enum, Flash) {
    $scope.show_active_icon = false;
    $scope.show_deactive_icon = false;

    if (Auth.is_logged_in()) {
      $rootScope.show_username = true;
      $rootScope.username = TokenHandler.get_username();
    }

    ManageApi.manage_users().$promise.then(function(data){
      $scope.user_list = Enum.get_user_label(data.child_role);
      $scope.users = data.children;
      $scope.parent_id = data.parent_id;
      $scope.child_role = data.child_role;
      if(data.parent.branch){
        $scope.branch_id = data.parent.branch.id;
      }
      if(data.parent.region){
        $scope.region_id = data.parent.region.id;
      }
      _.each($scope.users, function(value, index){
        if(value.is_active){
          value.status = "Active";
        }
        else{
          value.status = "Inactive";
        }
      });
    });

    $scope.deactivate = function(user,index){
      ManageApi.delete_user(user.id).$promise.then(function(data){
        var message = "";
        if(data.is_active === true) {
          message = "User successfully activated.";
          user = data;
          user.status = "Active";
          $scope.users[index] = user;
        }
        else {
          message = "User successfully deactivated.";
          user = data;
          user.status = "Inactive";
          $scope.users[index] = user;
        }
        Flash.create('success', message, 'custom-class');
      });
    };

    $scope.open = function (size) {
      var modalInstance = $uibModal.open({
        templateUrl: 'manage-users/edit-user-modal.tpl.html',
        controller: 'ModalAddInstanceCtrl',
        size: 1200,
        resolve: {
          parent_id: function () {
            return $scope.parent_id;
          },
          child_role: function(){
            return $scope.child_role;
          },
          branch_id: function(){
            return $scope.branch_id;
          },
          region_id: function(){
            return $scope.region_id;
          }
        }
      });
      modalInstance.result.then(function (user) {
        console.log("modal instance result");
        //$scope.users.push(user);
        ManageApi.manage_users().$promise.then(function(data){
          $scope.users = data.children;
        });
      });
    };


    $scope.edit = function (user, index) {

      var editInstance = $uibModal.open({
        templateUrl: 'manage-users/edit-user-modal.tpl.html',
        controller: 'ModalEditInstanceCtrl',
        size: 600,
        resolve: {
          parent_id: function () {
            return $scope.parent_id;
          },
          child_role: function(){
            return $scope.child_role;
          },
          user: function(){
            user.parent_id = $scope.parent_id;
            user.role = $scope.child_role;
            return user;
          }
        }
      });

      editInstance.result.then(function (edited_user) {
        $scope.users[index] = edited_user;
        console.log($scope.users[index]);
      });
    };

  });

})();
