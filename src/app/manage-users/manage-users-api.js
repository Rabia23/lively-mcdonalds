angular.module( 'livefeed.manage_users.api', [
  'ngResource',
  'livefeed.api_links',
  'livefeed.authService'
])

.factory('Api', ['$resource','apiLinks','TokenHandler', function($resource, apiLinks, TokenHandler) {

  var token = TokenHandler.get_token();

  function Api() {
    this.service = $resource(apiLinks.staging, {},
                  {
                    manage_users: {method: "GET",isArray: false, params: {endpoint: "manage_user"}},
                    leader_board: {method: "POST",isArray: false, params: {endpoint: "leader_board/"}}
                 });
  }
  Api.prototype.manage_users = function(){
    return this.service.manage_users({token: token});
  };
  Api.prototype.add_user = function(user){
    var user_json = {first_name: user.first_name, last_name: user.last_name, username: user.username,
       password: user.password, email: user.email, phone_no: user.phone_no, role: user.role, parent_id: user.parent_id, token: token};
    if(user.role == 4){
      user_json.region_id = user.region_id;
    }
    if(user.role == 2 || user.role == 3){
      user_json.branch_id = user.branch_id;
    }
    return this.service.leader_board(user_json);
  };
  return new Api();
}]);
