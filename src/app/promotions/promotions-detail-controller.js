(function() {
  angular.module( 'livefeed.promotions')

  .controller( 'PromotionsDetailCtrl', function PromotionDetailCtrl( $scope, $state, $rootScope, TokenHandler, Auth, Flash, $stateParams, PromotionsApi) {
      console.log($stateParams);
      var promotionId = $stateParams.promotionId;

      PromotionsApi.promotion_detail(promotionId).$promise.then(function(data){
        if(data.success){
          $scope.promotion = data.response.promotion;
          $scope.questions = data.response.analysis;
        }
        else{
          Flash.create('danger', data.message, 'custom-class');
        }

      });

  });

})();
