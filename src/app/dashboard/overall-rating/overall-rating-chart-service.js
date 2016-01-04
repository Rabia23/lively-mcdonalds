angular.module('livefeed.overall_rating.chart', [
  'helper_factories'
])
.service('overallRatingChartService', function(Global){
    return {
        getLineChart: function(graph_data, type, parent_color, parent_value){

          var labels = _.map(graph_data[0].data.feedbacks ,function(value){
            return value.option__text;
          });

          var data_array = {};

          _.each(labels, function(value, index){
            var key = "" + value;
            data_array[key] = [];
          });

          _.each(graph_data, function(value, upper_index){
            var feedbacks = value.data.feedbacks;
            _.each(feedbacks, function(value, index){
              data_array[value.option__text].push([ upper_index + 1, value.count]);
            });
          });

          function getTooltip(label, x, y){
            return "Complaints: "  + y;
          }

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
                  lineWidth: 1,
                  fill: true,
                  fillColor: "#ffffff",
                  symbol: "circle",
                  radius: 3
                }
              },
              colors: _.map(labels, function(value, index){
                if(parent_color === undefined){
                  return Global.optionsColorScheme[value];
                }
                else{
                  return Global.childColor(index, parent_color, parent_value);
                }

              }),
              tooltip: true,
              legend: false,
              tooltipOpts: {
                defaultTheme: false,
                content: getTooltip
              },
              grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#f9f9f9",
                borderWidth: 1,
                borderColor: "#eeeeee"
              },
              xaxis: {
                ticks: _.map(graph_data,  function(value, index){
                  var new_date = null;
                  var new_date_array = value.date.split(" ");
                  var d = new Date(new_date_array[0]);
                  if(type == 4){
                    new_date = d.toString("MMMM").split(" ")[1]+" "+d.toString().split(" ")[2]+", "+d.getFullYear();
                    // d.getFullYear().toString().substr(2, 2)
                  }
                  else{
                    new_date = d.toString("MMMM").split(" ")[1]+" "+d.toString().split(" ")[2];
                  }
                  return [index+1,new_date];
                })
              },
              yaxis: {
                minTickSize: 1,
                tickDecimals: 0,
                 min:0
                //tickFormatter: function(val, axis) { return val < axis.max ? val.toFixed(2) : "Complaints";}

              }
            }
          };
        },

        getSegmentLineChart: function(graph_data, parent_color, parent_value){
          var labels =  _.map(graph_data.options,function(value, index){
            return value.option__text;
          });

          var segments = _.map(graph_data.options[0].segment_list ,function(value){
            return value.segment;
          });

          var data_array = {};


          _.each(labels, function(value, index){
            var key = "" + value;
            data_array[key] = [];
          });



          _.each(graph_data.options, function(value, upper_index){
            var list = value.segment_list;
            _.each(list, function(list_value, index){
                data_array[value.option__text].push([ index + 1, list_value.option_count]);
            });
          });

          function getTooltip(label, x, y){
            return "Complaints: "  + y;
          }

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
                  lineWidth: 3,
                  fill: true,
                  fillColor: "#ffffff",
                  symbol: "circle",
                  radius: 3
                },
                shadowSize: 0
              },
              colors: _.map(labels, function(value, index){
                return Global.childColor(index, parent_color, parent_value);
              }),
              tooltip: true,
              legend: false,
              tooltipOpts: {
                defaultTheme: false,
                content: getTooltip
              },
              grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#f9f9f9",
                borderWidth: 1,
                borderColor: "#eeeeee"
              },
              xaxis: {
                ticks: _.map(segments,  function(value, index){
                  return [index + 1, value];
                })
              },
              yaxis: {
                minTickSize: 1,
                tickDecimals: 0,
                min:0

              }
            }
          };
        }
    };
});
