(function() {
  angular.module( 'livefeed.promotions')


  .controller( 'PromotionsCtrl', function PromotionCtrl( $scope, $state, $rootScope, TokenHandler, Auth, flashService, PromotionsApi) {
      $scope.show_loading = true;
      PromotionsApi.promotions_list().$promise.then(function(data){
        $scope.show_loading = false;
        if(data.success){
          $scope.promotions = data.response;
        }
        else{
          flashService.createFlash(data.message, "danger");
        }

      });

      $scope.detail = function(promotion_id){
        console.log(promotion_id);
        $state.go("promotions_detail", {promotionId: promotion_id});
      };
  })

  .directive('promotionSameHeight', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        promotion: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('promotion', function(watchedData) {
          if (watchedData !== undefined) {
            window.initSameHeight();
          }
        });
      }
    };
 });



})();
