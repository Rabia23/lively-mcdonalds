(function() {
  angular.module( 'livefeed.manage_users')


  .controller( 'ManageUsersCtrl', function ManageUsersCtrl( $scope, $state, $rootScope, TokenHandler, Auth, $uibModal, ManageApi, Enum, Flash) {

    $scope.show_active_icon = false;
    $scope.show_deactive_icon = false;

    $scope.show_error_message = false;

    $scope.show_loading = true;

    if (Auth.is_logged_in()) {
      $rootScope.show_username = true;
      $rootScope.username = TokenHandler.get_username();
    }


    ManageApi.manage_users().$promise.then(function(data){
      $scope.show_loading = false;
      if(data.success){
        $scope.show_error_message = false;
        $scope.user_list = Enum.get_user_label(data.response.child_role) + "S";
        $scope.users = data.response.children;
        $scope.parent_id = data.response.parent_id;
        $scope.child_role = data.response.child_role;
        if(data.response.parent.branch){
          $scope.branch_id = data.response.parent.branch.id;
        }
        if(data.response.parent.region){
          $scope.region_id = data.response.parent.region.id;
        }
        _.each($scope.users, function(value, index){
          value.user_role = Enum.get_user_label(value.role);
          if(value.is_active){
            value.status = "Active";
          }
          else{
            value.status = "Inactive";
          }
        });
        $scope.users = _.sortBy($scope.users, function(item) { return item.is_active; });
        $scope.users = $scope.users.reverse();
        //$scope.users.sort( function( item ) { return !item.is_active; } );
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = data.message;
        Flash.create('danger', $scope.error_message, 'custom-class');
      }

    });

    $scope.deactivate = function(user,index){
      $scope.show_loading = true;
      ManageApi.delete_user(user.id).$promise.then(function(data){
        $scope.show_loading = false;
        var message = "";
        if(data.success){
          $scope.show_error_message = false;
          if(data.response.is_active === true) {
            message = "User successfully activated.";
            user = data.response;
            user.status = "Active";
            $scope.users[index] = user;

          }
          else {
            message = "User successfully deactivated.";
            user = data.response;
            user.status = "Inactive";
            $scope.users[index] = user;
          }
          $scope.users[index].user_role = Enum.get_user_label(data.response.role);
          Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
          //Flash.dismiss(1);
          $scope.users = _.sortBy($scope.users, function(item) { return item.is_active; });
          $scope.users = $scope.users.reverse();
        }

        else{
          $scope.show_error_message = true;
          $scope.error_message = data.message;
          Flash.create('danger', $scope.error_message, 'custom-class');
        }

      });
    };

    $scope.open = function (size) {
      var modalInstance = $uibModal.open({
        templateUrl: 'manage-users/edit-user-modal.tpl.html',
        controller: 'ModalAddInstanceCtrl',
        size: 600,
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
        ManageApi.manage_users().$promise.then(function(data){
          if(data.success){
            $scope.show_error_message = false;
            $scope.users = data.response.children;
            _.each($scope.users, function(value, index){
              value.user_role = Enum.get_user_label(value.role);
              if(value.is_active){
                value.status = "Active";
              }
              else{
                value.status = "Inactive";
              }
            });
            $scope.users = _.sortBy($scope.users, function(item) { return item.is_active; });
            $scope.users = $scope.users.reverse();
          }
          else{
            $scope.show_error_message = true;
            $scope.error_message = data.message;
            Flash.create('danger', $scope.error_message, 'custom-class');
          }

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
        $scope.users[index].user_role = Enum.get_user_label($scope.users[index].role);
        if($scope.users[index].is_active === true) {
          $scope.users[index].status = "Active";
        }
        else {
          $scope.users[index].status = "Inactive";
        }

      });
    };

  });

})();
