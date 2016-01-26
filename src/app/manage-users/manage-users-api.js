angular.module( 'livefeed.manage_users.api', [
  'ngResource',
  'livefeed.api_links',
  'livefeed.authService'
])

.factory('Api', ['$resource','apiLinks', function($resource, apiLinks) {
  function Api() {
    this.service = $resource(apiLinks.staging, {},
                  {
                    allRegions: {method: "GET",isArray: true, params: {endpoint: "region"}}
                 });
  }
  Api.prototype.allRegions = function(){
    return this.service.allRegions();
  };
  return new Api();
}]);
