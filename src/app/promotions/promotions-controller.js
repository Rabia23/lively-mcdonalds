(function() {
  angular.module( 'livefeed.promotions')


  .controller( 'PromotionsCtrl', function PromotionCtrl( $scope, $state, $rootScope, TokenHandler, Auth, Flash, PromotionsApi) {
      PromotionsApi.promotions_list().$promise.then(function(data){
        if(data.success){
          $scope.promotions = data.response;
        }
        else{
          Flash.create('danger', data.message, 'custom-class');
        }

      });

      $scope.detail = function(promotion_id){
        console.log(promotion_id);
        $state.go("promotions_detail", {promotionId: promotion_id});
      };
  });

})();
