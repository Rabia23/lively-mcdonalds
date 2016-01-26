(function() {
  angular.module( 'livefeed.manage_users')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( 'users', {
      url: '/users',
      views: {
        "": {
          controller: 'ManageUsersCtrl',
          templateUrl: 'manage-users/manage-users.tpl.html'
        },
        "sidebar@users":{
          templateUrl: 'common/sidebar.tpl.html'
        },

        "header@users":{
          templateUrl: 'common/header.tpl.html'
        },

        "footer@users":{
          templateUrl: 'common/footer.tpl.html'
        }

      },
      authenticate: true
    });

  });

})();
