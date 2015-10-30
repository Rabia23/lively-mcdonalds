angular.module('livefeed.chart', [])

.service('chartService', function(_){

  var randomColorGenerator = function () { 
      return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
  };


  return {
    
    
    decideColorScheme: function(graph_data){
      return _.map(graph_data.feedback,  function(data){ 
                  if(data.score === 1){
                    return '#ca786a';
                  }
                  else if(data.score === 2){
                    return '#d8c170';
                  }
                  else if(data.label === 3){
                    return '#68acce';
                  }
                  else if(data.label === 4){
                    return '#2ca998';
                  }
                  else{
                    return randomColorGenerator();
                  }        

                });
    },
    getRegionChartData: function(graph_data){
      return {
        regions: _.map(graph_data.regional_feedbacks,  function(data){ return data.region.name;}),
        donutData: _.map(graph_data.regional_feedbacks,  function(data){ 
          return   _.map(data.data.feedbacks,  function(dat){ return {label: dat.option__text, value: dat.count};});
        }),
        donutOptions: _.map(graph_data.regional_feedbacks,  function(data){ 
          return   {
              xkey: "year",
              colors: _.map(data.data.feedbacks,  function(dat){
                  if(dat.option__text === "Few concerns"){
                    return '#ca786a';
                  }
                  else if(dat.option__text === "Not happy enough"){
                    return '#d8c170';
                  }
                  else if(dat.option__text === "Everything is on track!"){
                    return '#68acce';
                  }
                  else{
                    return '#2ca998';
                  }
              })
            };
        })
      };
    },
    getPieChartData: function(graph_data, colorScheme){
      return {
        labels : _.map(graph_data.feedback,  function(data){ return data.label;}),
        data: _.map(graph_data.feedback,  function(data){return (data.count/graph_data.total_feedback)*100;}),
        colors : colorScheme
      };
    },

    getBarChartData: function(graph_data, colorScheme){
      return {
        labels : _.map(graph_data.feedback,  function(data){ return data.label;}),
        data: [_.map(graph_data.feedback,  function(data){return data.count;})],
        colors : [{fillColor: colorScheme}],
        
        options: {
          scaleShowHorizontalLines: false,
          scaleShowVerticalLines: false,
          barValueSpacing : 30
        }

      };
    }

  };

});