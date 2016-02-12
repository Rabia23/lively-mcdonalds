(function() {
  angular.module( 'livefeed.live.strength')



  .controller( 'StrengthCtrl', ['$scope', '_','Global','$rootScope', function( $scope, _, Global, $rootScope ) {
    
    function top_concern(){
      var concern_list = $scope.concerns.concern_list;
      $scope.top_concern_data = [];
      _.each(concern_list, function(value, index){
        
        $scope.top_concern_data.push({"category": value.name.toUpperCase(), "column-1": value.weight});
      });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      top_concern();
    });
    
  }]);

})();

