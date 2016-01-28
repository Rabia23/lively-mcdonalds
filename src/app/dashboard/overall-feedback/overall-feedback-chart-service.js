angular.module('livefeed.overall_feedback.chart', [
  'helper_factories'
])
.service('overallFeedbackChartService', function(Global){
    return {
      getBarChartData: function(graph_data,max){
        return {
            labels : _.map(graph_data.feedbacks, function(data){return data.option__text;}),
            data: [_.map(graph_data.feedbacks,  function(data){return data.count;})],
            series: ['Series A'],
            colours : [{fillColor: _.map(graph_data.feedbacks, function(data){return Global.mainRatingColorScheme[data.option__text];})}],

            options: {
              barShowStroke : false,
              barValueSpacing : 60,
              scaleShowVerticalLines: false,
              customTooltips: false,
              tooltipEvents: ["mousemove", "touchstart", "touchmove"],
              tooltipFillColor: "rgba(0,0,0,0.8)",
              showTooltips: true,
              tooltipTemplate: "<%= value %>",
              scaleOverride: true,
              scaleSteps: 5,
              scaleStepWidth: Math.ceil(max/5)
            }
        };
      }
    };
});
