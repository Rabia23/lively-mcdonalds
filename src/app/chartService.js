angular.module('livefeed.chart', [])

.service('chartService', function(_){

  var randomColorGenerator = function () { 
      return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
  };


  return {
    
    
    decideColorScheme: function(graph_data){
      return _.map(graph_data.feedback,  function(data){ 
                  if(data.label === "Very Bad"){
                    return '#ca786a';
                  }
                  else if(data.label === "Bad"){
                    return '#d8c170';
                  }
                  else if(data.label === "Good"){
                    return '#68acce';
                  }
                  else if(data.label === "Very Good"){
                    return '#2ca998';
                  }
                  else{
                    return randomColorGenerator();
                  }        

                });
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