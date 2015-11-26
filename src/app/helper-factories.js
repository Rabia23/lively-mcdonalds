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
      "Food Quality": '#8e44ad',
      "Service": "#FFc300",
      "Cleanliness": '#3498db'
      
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

    sqcPriority: {
      "Cleanliness": 3,
      "Food Quality": 2,
      "Service": 1
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

    childCholorScheme:{
      "Cleanliness": ["#71A6D2", "#4682B4", "#193751", "#314459", "#0F4D92", "#6699CC", "#99BADD", "#0093AF", "#162A40", "#315BA1"],
      "Food Quality": ["#F984EF", "#460B41", "#BD33A4", "#702963", "#B784A7", "#692D54", "#44012D", "#66023C", "#76395D", "#B784A7"],
      "Service": ["#625119", "#D4AF37", "#FFC901", "#C9B35B", "#7B6608", "#E7BF05", "#F9E663", "#FDE910", "#F8F99C", "#737829"]
    },

    childColor: function(index, parent_color, parent){
      return this.childCholorScheme[parent][index];
    },

    bubbleColor: function(index){
      var colors = ["#BFA66E", "#6881C4", "#C66868", "#AF68C6", "#ECDA32", "#62A1CE", "#6FBD6F", "#EC9B9A", '#6458D4', '#A4D558'];
      return colors[index];
    }

  };

}]);
