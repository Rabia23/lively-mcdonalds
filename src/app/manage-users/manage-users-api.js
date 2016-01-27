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
                    manage_users: {method: "GET",isArray: false, params: {endpoint: "manage_user"}}
                 });
  }
  Api.prototype.manage_users = function(){
    return this.service.manage_users({token: token});
  };
  return new Api();
}]);
