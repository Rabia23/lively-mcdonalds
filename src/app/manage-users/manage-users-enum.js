(function() {
  angular.module( 'livefeed.manage_users.enum', [
  ])

  .factory('Enum', [function() {

    var users = ["CUSTOMER","GRO", "BRANCH MANAGER", "OPERATIONAL CONSULTANT",
     "OPERATIONAL MANAGER", "ASSISTANT DIRECTOR","DIRECTOR"];

    return {
      get_user_label: function(index){
        return users[index + 1];
      }
    };

  }]);

})();
