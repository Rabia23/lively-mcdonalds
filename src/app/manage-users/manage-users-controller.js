(function() {
  angular.module( 'livefeed.manage_users')


  .controller( 'ManageUsersCtrl', function DashboardController( $scope, $state, $rootScope, TokenHandler, Auth, $uibModal) {

    if (Auth.is_logged_in()) {
      $rootScope.show_username = true;
      $rootScope.username = TokenHandler.get_username();
    }
    $rootScope.logout = function(){
      Auth.is_logged_out();
      $rootScope.show_username = false;
      $state.go('login');
    };

    $rootScope.$on('app-online', function(event, args) {
      console.log("online in dashboard");
    });

    $rootScope.$on('app-offline', function(event, args) {
      console.log("offline in dashboard");
    });

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        templateUrl: 'manage-users/edit-user-modal.tpl.html',
        controller: 'ModalInstanceCtrl',
        size: 1200,
        resolve: {
          items: function () {
            //return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      });
    };

  });

})();
