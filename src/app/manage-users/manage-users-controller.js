(function() {
  angular.module( 'livefeed.manage_users')


  .controller( 'ManageUsersCtrl', function ManageUsersCtrl( $scope, $state, $rootScope, TokenHandler, Auth, $uibModal, ManageApi, Enum) {

    if (Auth.is_logged_in()) {
      $rootScope.show_username = true;
      $rootScope.username = TokenHandler.get_username();
    }




    ManageApi.manage_users().$promise.then(function(data){
      console.log(data);
      $scope.user_list = Enum.get_user_label(data.child_role);
      $scope.users = data.children;
      $scope.parent_id = data.parent_id;
      $scope.child_role = data.child_role;
    });

    $scope.deactivate = function(user){
      ManageApi.delete_user(user.id).$promise.then(function(data){
        console.log("deactivated");
        console.log(data);
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
          }
        }
      });
      modalInstance.result.then(function (user) {
        //$scope.users.push(user);
        ManageApi.manage_users().$promise.then(function(data){
          $scope.users = data.children;
        });
      });
    };


    $scope.edit = function (user) {

      var editInstance = $uibModal.open({
        templateUrl: 'manage-users/edit-user-modal.tpl.html',
        controller: 'ModalEditInstanceCtrl',
        size: 1200,
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

      editInstance.result.then(function (result) {
      });
    };

  });

})();
