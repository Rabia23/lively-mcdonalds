(function() {
  angular.module( 'livefeed.promotions')


  .controller( 'PromotionsCtrl', function PromotionCtrl( $scope, $state, $rootScope, TokenHandler, Auth, Flash, PromotionsApi) {
      PromotionsApi.promotions_list().$promise.then(function(data){
        console.log("promotions data");
        console.log(data);
        $scope.promotions = data;
      });
  });

})();
