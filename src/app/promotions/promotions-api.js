angular.module( 'livefeed.promotions.api', [
  'ngResource',
  'livefeed.api_links',
  'livefeed.authService'
])

.factory('PromotionsApi', ['$resource','apiLinks','TokenHandler','$rootScope', function($resource, apiLinks, TokenHandler, $rootScope) {



  function PromotionsApi() {
    this.service = $resource(apiLinks.staging, {},
                  {
                    promotions_list: {method: "GET",isArray: true, params: {endpoint: "promotion"}},
                    promotion_detail: {method: "GET",isArray: false, params: {endpoint: "promotion_detail"}}
                 });
  }
  PromotionsApi.prototype.promotions_list = function(){
    var token = $rootScope.token || TokenHandler.get_token();
    return this.service.promotions_list({token: token});
  };
  PromotionsApi.prototype.promotion_detail = function(id){
    var token = $rootScope.token || TokenHandler.get_token();
    return this.service.promotion_detail({id: id, token: token});
  };
  return new PromotionsApi();
}]);
