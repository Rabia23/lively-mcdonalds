angular.module('livefeed.regional_analysis.chart', [
  'helper_factories'
])
.service('regionalAnalysisChartService', function(Global){
  return {

      getDonutChartData: function(graph_data, question_type){
      return {
        objects: _.map(graph_data.analysis,  function(data){
          return {
            name: data.object.name, id: data.object.id, show_chart: data.data.feedback_count === 0 ? false : true
          };
        }),
        donutData: _.map(graph_data.analysis,  function(data){
          return   _.map(data.data.feedbacks,  function(dat){ return {id: dat.option_id, label: dat.option__text, value: dat.count};});
        }),
        donutOptions: _.map(graph_data.analysis,  function(data){
          return   {
              colors: _.map(data.data.feedbacks, function(dat){
                return (question_type == 1) ? Global.mainRatingColorScheme[dat.option__text] : Global.optionsColorScheme[dat.option__text];
              })
            };
        })
      };
    },

    getSubDonutChartData: function(graph_data,string){
      return {
          donutData: _.map(graph_data.feedbacks,  function(data){
            return {label: data.option__text, value: data.count};
          }),
          donutOptions: {colors: _.map(graph_data.feedbacks,  function(data){
            return Global.qscSubCategoriesData[string][data.option__text].color;
            })
          }
       };
    },

    getComplaintsDonutChartData: function(graph_data){
      return {
        objects: _.map(graph_data.analysis,  function(data){
          return {
            name: data.object.name, id: data.object.id, show_chart: data.data.feedback_count === 0 ? false : true
          };
        }),
        donutData: _.map(graph_data.analysis,  function(data){
          return   _.map(data.data.action_analysis,  function(dat){ return {label: dat.action_taken === 1 ? "Unprocessed" : dat.action_taken === 2 ? "Processed" : "Deferred", value: dat.count, action_taken: dat.action_taken};});
        }),
        donutOptions: _.map(graph_data.analysis,  function(data){
          return   {
              colors: _.map(data.data.action_analysis, function(dat){
                return dat.action_taken === 1 ? '#e73a3a' : dat.action_taken === 2 ? '#01ad0f': '#FFCC00';
              })
            };
        })
      };
    }
  };
});