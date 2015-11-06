angular.module( 'helper_factories', ['ngResource'])

.factory('Global', [ function() {

  return {
    mainRatingColorScheme: {
      "Few concerns": '#e73a3a',
      "Not happy enough": '#ac1a1a',
      "Everything is on track!": '#01ad0f',
      "I'm lovin' it": '#28530c'

    },

    optionsColorScheme: {
      "Food Quality": '#ac1a1a',
      "Service": "#F5C40F",
      "Cleanliness": '#01ad0f'
      
    },

    overallFeedbackClass: {
      "Few concerns": 'neutral',
      "Not happy enough": 'negative',
      "Everything is on track!": 'good',
      "I'm lovin' it": 'v-good'
    },

    overallFeedbackPriority: {
      "Few concerns": 3,
      "Not happy enough": 4,
      "Everything is on track!": 2,
      "I'm lovin' it": 1
    },

    childColor: function(index, parent_color){
      console.log(index);
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
