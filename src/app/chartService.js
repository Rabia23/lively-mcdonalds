angular.module('livefeed.chart', [])

.service('chartService', function(_){

  var randomColorGenerator = function () { 
      return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
  };


  return {
    
    getDonutChartData: function(graph_data){
      return {
        objects: _.map(graph_data.analysis,  function(data){ return {name: data.object.name, id: data.object.id};}),
        donutData: _.map(graph_data.analysis,  function(data){ 
          return   _.map(data.data.feedbacks,  function(dat){ return {label: dat.option__text, value: dat.count};});
        }),
        donutOptions: _.map(graph_data.analysis,  function(data){ 
          return   {
              xkey: "year",
              colors: _.map(data.data.feedbacks,  function(dat){
                  if(dat.option__text === "Few concerns"){
                    return '#ac1a1a';
                  }
                  else if(dat.option__text === "Not happy enough"){
                    return '#e73a3a';
                  }
                  else if(dat.option__text === "Everything is on track!"){
                    return '#01ad0f';
                  }
                  else{
                    return '#28530c';
                  }
              })
            };
        })
      };
    }

  };

});