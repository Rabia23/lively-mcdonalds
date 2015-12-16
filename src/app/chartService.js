angular.module('livefeed.chart', [
  'helper_factories'
])

.service('chartService', function(_, Global){

  var randomColorGenerator = function () {
      return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
  };


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
      //console.log(graph_data.feedback_count);
      return {
          donutData: _.map(graph_data.feedbacks,  function(data){
            return {label: data.option__text, value: data.count};
          }),
          donutOptions: {colors: _.map(graph_data.feedbacks,  function(data,index){
            return Global.categoryPerformanceChildCholorScheme[string][index];
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
          return   _.map(data.data.action_analysis,  function(dat){ return {label: dat.action_taken === 1 ? "Unprocessed" : dat.action_taken === 2 ? "Processed" : "Deferred", value: dat.count};});
        }),
        donutOptions: _.map(graph_data.analysis,  function(data){
          return   {
              colors: _.map(data.data.action_analysis, function(dat){
                return dat.action_taken === 1 ? '#e73a3a' : dat.action_taken === 2 ? '#01ad0f': '#FFCC00';
              })
            };
        })
      };
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
            tickDecimals: 0

          }
        }
      };
    },

    getBarChartData: function(graph_data,max){
      return {
        labels : _.map(graph_data.feedbacks, function(data){return data.option__text;}),
        data: [_.map(graph_data.feedbacks,  function(data){return data.count;})],
        series: ['Series A'],
        colours : [{fillColor: _.map(graph_data.feedbacks, function(data){return Global.mainRatingColorScheme[data.option__text];})}],

        options: {
          barShowStroke : false,
          barValueSpacing : 35,
          scaleShowVerticalLines: false,
          tooltipTemplate: "<%= value %>",
          scaleOverride: true,
          scaleSteps: 8,
          scaleStepWidth: Math.ceil(max/8)
        }

     };
    }
  };

});
