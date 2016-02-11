(function() {
  angular.module( 'livefeed.promotions')


  .controller( 'PromotionsDetailCtrl', function PromotionDetailCtrl( $scope, $state, $rootScope, Global, TokenHandler, Auth, flashService, $stateParams, PromotionsApi) {
    var promotionId = $stateParams.promotionId;
    var inc = 1;
    $scope.show_loading = true;
    $scope.all_zero = true;
    PromotionsApi.promotion_detail(promotionId).$promise.then(function(data){
      $scope.show_loading = false;
      if(data.success){
        $scope.promotion = data.response.promotion;
        $scope.questions = data.response.analysis;
        _.each($scope.questions, function(question){
          if (question.total_count > 0) {
              $scope.all_zero = false;
          }
          if(question.type == 5){
            var question_bar_chart = getBarChartData(question.feedbacks, question.total_count);
             question["question_bar_chart"] = question_bar_chart;
          }
          else if(question.type == 4){
            var question_pie_chart= getPieChartData(question.feedbacks);
            question["question_pie_chart"] = ["piechart-" + inc, question_pie_chart];
            inc = inc + 1;
          }
        });
      }
      else{
        flashService.createFlash(data.message, "danger");

      }

    });

    function getBarChartData(feedbacks, feedback_count){
       var question_analysis = _.map(feedbacks,  function(data, index){
        return {
          id: data.option_id,
          name: data.option__text,
          count: data.count,
          percentage: data.count === 0 ? 0 : Math.round((data.count/feedback_count)*100),
          colour: Global.topConcernsColors(index)
        };
      });
      return question_analysis;
    }

    function getPieChartData(feedbacks){
       var pie_chart_data = [];
       _.each(feedbacks,  function(value){
          pie_chart_data.push({"category": value.option__text, "column-1": value.count, "color": Global.promotionPieChartColorScheme[value.option__text]});
       });
      return pie_chart_data;
    }
  });

})();
