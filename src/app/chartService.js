angular.module('livefeed.chart', [
  'helper_factories'
])

.service('chartService', function(_, Global){

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
              colors: _.map(data.data.feedbacks, function(dat){
                return Global.mainRatingColorScheme[dat.option__text];
              })
            };
        })
      };
    },

    getLineChart: function(graph_data){
      var length = graph_data[0].data.feedbacks.length;

      var labels = _.map(graph_data[0].data.feedbacks ,function(value){
        return value.option__text;
      });
      
      var data_array = [];
      var range = _.range(0, length);
            
      _.each(range, function(value){
        data_array.push([]);
      });
      
      _.each(graph_data, function(value, upper_index){
        var feedbacks = value.data.feedbacks;
        _.each(feedbacks, function(value, index){
          data_array[index].push([ upper_index + 1, value.count]);
        });
      });
      
      return {
        
        data: _.map(data_array, function(value, index){
          return {label: labels[index], data: value};
        }),

        options: {
          series: {
            lines: {
              show: true,
              fill: false
            },
            points: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: "#ffffff",
              symbol: "circle",
              radius: 5
            }
          },
          colors: _.map(labels, function(value){return Global.optionsColorScheme[value];}),
          tooltip: true,
          legend: false,
          tooltipOpts: {
            defaultTheme: false
          },
          grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#f9f9f9",
            borderWidth: 1,
            borderColor: "#eeeeee"
          },
          xaxis: {
            ticks: _.map(graph_data,  function(data, index){ 
              var date = new Date(data.date);
              var dateString = date.toString();
              var new_date_array = dateString.split(" ");
              var new_date = new_date_array[1] + " " + new_date_array[2] + " " + new_date_array[3];
              return [index + 1, new_date];
            })
            //ticks: [[1,"Jan"], [2, "Feb"], [3,"Mar"], [4,"Apr"], [5,"May"], [6,"Jun"], [7,"Jul"], [8,"Aug"]]
          }
        }
      };
    }
  };

});