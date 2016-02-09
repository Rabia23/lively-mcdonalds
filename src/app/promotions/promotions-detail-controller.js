(function() {
  angular.module( 'livefeed.promotions')


  .controller( 'PromotionsDetailCtrl', function PromotionDetailCtrl( $scope, $state, $rootScope, Global, TokenHandler, Auth, Flash, $stateParams, PromotionsApi) {
    var promotionId = $stateParams.promotionId;

    PromotionsApi.promotion_detail(promotionId).$promise.then(function(data){
      console.log(data);
      if(data.success){
        console.log("in the if");
        $scope.promotion = data.response.promotion;
        $scope.questions = data.response.analysis;
        _.each($scope.questions, function(question){
          if(question.type == 5){
            showBarChart(question.feedbacks,100);
          }
          else if(question.type == 4){
            showPieChart(question.feedbacks);
          }
        });
      }
      else{
        Flash.create('danger', data.message, 'custom-class');
      }

    });

    function showBarChart(feedbacks, feedback_count){
       console.log("bar chart..");
       console.log(feedbacks);
       $scope.question_analysis = _.map(feedbacks,  function(data, index){
        return {
          id: data.option_id,
          name: data.option__text,
          count: data.count,
          percentage: data.count === 0 ? 0 : Math.round((data.count/feedback_count)*100),
          colour: Global.topConcernsColors(index)
        };
      });
    }

    function showPieChart(feedbacks){
      console.log("pie chart..");
      console.log(feedbacks);
      $scope.data = [];
      _.each(feedbacks,  function(value, index){
        $scope.data.push({"category": value.option__text, "column-1": value.count, "color": Global.topConcernsColors(index)});
      });
    }
  });

})();
