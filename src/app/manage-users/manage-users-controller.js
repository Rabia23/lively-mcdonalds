(function() {
  angular.module( 'livefeed.manage_users')


  .controller( 'ManageUsersCtrl', function ManageUsersCtrl( $scope, $state, $rootScope, TokenHandler, Auth, $uibModal, ManageApi, Enum) {

    if (Auth.is_logged_in()) {
      $rootScope.show_username = true;
      $rootScope.username = TokenHandler.get_username();
    }
    $rootScope.logout = function(){
      Auth.is_logged_out();
      $rootScope.show_username = false;
      $state.go('login');
    };

    var parent_id;
    var child_role;

    ManageApi.manage_users().$promise.then(function(data){
      console.log(data);
      $scope.user_list = Enum.get_user_label(data.child_role);
      $scope.users = data.children;
      parent_id = data.parent_id;
      child_role = data.child_role;
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
            return parent_id;
          },
          child_role: function(){
            return child_role;
          }
        }
      });
      modalInstance.result.then(function (user) {
        console.log("added");
        console.log(user);
        $scope.users.push(user);
        //$scope.$apply();
        // ManageApi.manage_users().$promise.then(function(data){
        //   $scope.users = data.children;
        // });
      });
    };


    $scope.edit = function (user) {

      var editInstance = $uibModal.open({
        templateUrl: 'manage-users/edit-user-modal.tpl.html',
        controller: 'ModalEditInstanceCtrl',
        size: 1200,
        resolve: {
          parent_id: function () {
            return parent_id;
          },
          child_role: function(){
            return child_role;
          },
          user: function(){
            user.parent_id = parent_id;
            user.role = child_role;
            return user;
          }
        }
      });

      editInstance.result.then(function (result) {
      });
    };

  });

})();
