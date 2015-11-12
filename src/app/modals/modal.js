angular.module( 'livefeed.modal', [
  'ui.router',
  'ui.bootstrap',
  'factories'
])

.config(function config( $stateProvider ) {
	$stateProvider
  .state("dashboard.comments", {
    url: "comments",
    controller: ['$stateParams','$state','$modal', function($stateParams, $state, $modal){
      console.log("in the controller parent");
      var modalInstance = $modal.open({
        size: 330,
        backdrop : 'static',
        keyboard :false,
        templateUrl: "modals/comments.tpl.html",
        controller: ['$scope', '$modalInstance',function ($scope, $modalInstance) {
          console.log("in the controller");
          $scope.dismiss = function () {
              $modalInstance.dismiss('cancel');
              $state.go("dashboard");
          };
          $scope.$on('$stateChangeStart', function() {
            $modalInstance.dismiss();
          });
        }]
      });  
      console.log(modalInstance);          
    }]
  });
});
  