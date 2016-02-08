(function() {
  angular.module( 'livefeed.promotions')

  .controller( 'PromotionsDetailCtrl', function PromotionDetailCtrl( $scope, $state, $rootScope, TokenHandler, Auth, Flash, $stateParams, PromotionsApi) {
      var promotionId = $stateParams.promotionId;

      PromotionsApi.promotion_detail(promotionId).$promise.then(function(data){
        $scope.promotion = data.promotion;
        $scope.questions = data.analysis;
        console.log(data);
      });

  });

})();
