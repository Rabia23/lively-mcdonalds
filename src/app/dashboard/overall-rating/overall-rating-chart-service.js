angular.module('livefeed.overall_rating.chart', [
  'helper_factories'
])
.service('overallRatingChartService', function(Global){
    return {

        getAreaChart: function(data){
            var qsc = {quality: [], service: [], cleanliness: []};
           var qsc_id = {quality_id: [], service_id: [], cleanliness_id: []};
           var timeline_data = [];

            _.each(data, function(value,index){
                _.each(value.data.feedbacks, function(item){
                  if (item.option__text === 'Quality'){
                    qsc.quality.push(item.count);
                    qsc_id.quality_id.push(item.option_id);
                  }
                  if (item.option__text === 'Service'){
                    qsc.service.push(item.count);
                    qsc_id.service_id.push(item.option_id);
                  }
                  if (item.option__text === 'Cleanliness'){
                     qsc.cleanliness.push(item.count);
                    qsc_id.cleanliness_id.push(item.option_id);
                  }
                });

                timeline_data.push({
                  "category": value.date,
                  "column-1": qsc.quality[index],
                  "column-2": qsc.service[index],
                  "column-3": qsc.cleanliness[index],
                  "column-1-id": qsc_id.quality_id[index],
                  "column-2-id": qsc_id.service_id[index],
                  "column-3-id": qsc_id.cleanliness_id[index]
                });
            });
            return timeline_data;
        },
        getAreaSegmentChart: function(graph_data){
            var segment_data = [];
            var segment_array = {};

            var segments = _.map(graph_data.options[0].segment_list ,function(value){
                segment_data.push({category: value.segment});
               return value.segment;
            });

             _.each(segments, function(value){
               segment_array[value] = [];
            });

            _.each(graph_data.options, function(value, upper_index){
                var list = value.segment_list;
                _.each(list, function(list_value, index){
                    segment_array[list_value.segment].push(list_value.option_count);
                });
            });
            var inc = 0;
            _.each(segment_array, function(value,upper_index){
                _.each(value, function(value, index){
                   segment_data[inc]["column-"+(index+1)] = value;
               });
                inc = inc + 1;
            });
            return segment_data;
        },

        getAreaLabelChart: function(graph_data){
           var label_data = [];
           var label_array = {};
           var labels = _.map(graph_data[0].data.feedbacks ,function(value){
              return value.option__text;
           });
           _.each(labels, function(value){
             label_array[value] = [];
           });
           _.each(graph_data, function(value,upper_index){
             label_data.push({category: value.date});
             _.each(value.data.feedbacks, function(item,index){
                label_data[upper_index]["column-"+(index+1)] = item.count;
                label_array[item.option__text].push(item.count);
             });
           });
            var inc = 1;
            _.each(label_array, function(value,upper_index){
                _.each(value, function(item,index){
                    label_data[index]["column-"+inc] = item;
                });
                inc = inc + 1;
            });
            return label_data;
        },

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
