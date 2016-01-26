(function() {

  angular.module( 'livefeed.live.overall-ratings')



  .controller( 'OverallRatingCtrl', function OverallRatingCtrl( $scope, _, Global, $rootScope ) {
    
    function rating(){
      $scope.overall_rating_data = [];
      _.each($scope.overall_feedback.feedbacks, function(data){
        $scope.overall_rating_data.push({"category": data.option__text.toUpperCase(),"column-1": data.count, "color": Global.mainRatingColorScheme[data.option__text]});
      });

    }

    $rootScope.$on('live-data-received', function (event, data) {
      rating();
    });
  });


})();

