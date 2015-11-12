angular.module( 'helper_factories', ['ngResource'])

.factory('Global', [ '_', function(_) {

  return {
    mainRatingColorScheme: {
      "Few concerns": '#e73a3a',
      "Not happy enough": '#ac1a1a',
      "Everything is on track!": '#01ad0f',
      "I'm lovin' it": '#28530c'

    },

    optionsColorScheme: {
      "Food Quality": '#3498db',
      "Service": "#FFc300",
      "Cleanliness": '#8e44ad'
    },

    overallFeedbackClass: {
      "Few concerns": 'neutral',
      "Not happy enough": 'negative',
      "Everything is on track!": 'good',
      "I'm lovin' it": 'v-good'
    },

    categoryPerformanceClass: {
      "Cleanliness": 'blue',
      "Food Quality": 'lilac',
      "Service": 'yellow'
    },

    overallFeedbackPriority: {
      "Few concerns": 3,
      "Not happy enough": 4,
      "Everything is on track!": 2,
      "I'm lovin' it": 1
    },

    overallFeedbackColumn:{
      ranges: [_.range(0,15), _.range(15,30), _.range(30, 45), _.range(45, 60), _.range(60, 75), _.range(75,101)]
    },

    childColor: function(index, parent_color){
      if(index === 0){
        return "#F5C40F";
      }
      else if(index === 1){
        return '#ac1a1a';
      }
      else if(index === 2){
        return '#01ad0f';
      }
      else{
         return one.color(parent_color).lightness((index/2)).green(0.2).hex();
      }
     
    }

  };

}]);
