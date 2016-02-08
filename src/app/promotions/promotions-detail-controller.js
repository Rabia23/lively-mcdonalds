(function() {
  angular.module( 'livefeed.promotions')

  .controller( 'PromotionsDetailCtrl', function PromotionDetailCtrl( $scope, $state, $rootScope, TokenHandler, Auth, Flash, $stateParams, PromotionsApi) {
      console.log("inside coffee promotion controller");
      console.log($stateParams);
      var promotionId = $stateParams.promotionId;

      PromotionsApi.promotion_detail(promotionId).$promise.then(function(data){
        console.log(data);
      });

  });

})();
