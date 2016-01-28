angular.module( 'livefeed.live.api', [
  'ngResource',
  'livefeed.api_links',
  'livefeed.authService'
])



.factory('Api', ['$resource','apiLinks','_','TokenHandler','$http','$rootScope',  function($resource, apiLinks, _, TokenHandler, $http, $rootScope) {



  function Api() {
    this.service = $resource(apiLinks.staging, {},
                  {
                    live_dashboard: {method: "GET", isArray: false, params:{endpoint: "livedashboard/"}}

                 });
  }

  Api.prototype.live_dashboard = function(){
    var token = $rootScope.token || TokenHandler.get_token();
    return this.service.live_dashboard({token: token});
  };

  return new Api();
}]);
