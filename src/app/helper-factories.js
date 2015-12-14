angular.module( 'helper_factories', ['ngResource'])

.factory('Global', [ '_', function(_) {

  return {
    mainRatingColorScheme: {
      "Few concerns": '#e73a3a',
      "Not happy enough": '#ac1a1a',
      "Everything is on track!": '#01ad0f',
      "I'm lovin' it": '#0E590A'

    },

    optionsColorScheme: {
      "Quality": '#8e44ad',
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
      "Cleanliness": '#3498db',
      "Quality": '#9352ac',
      "Service": '#ffc300'
    },

     categoryPerformanceChildCholorScheme:{
      "Cleanliness": ["#B6E1FF", "#78BEEE", "#4A90C0", "#1C6292", "#003565", "#000737"],
      "Quality": ["#A572B3", "#683576", "#511E5F", "#420F50", "#2B0039", "#1C002A"],
      "Service": ["#FFFFBF", "#FFFF87", "#FFD259", "#FFA42B", "#E67700", "#B84900"]
    },

    segmentationClass: {
      "Cleanliness": 'blue',
      "Quality": 'lilac',
      "Service": 'yellow'
    },

    segmentationPriority: {
      "Late Night": 5,
      "Breakfast": 1,
      "Lunch": 2,
      "Snack": 3,
      "Dinner": 4
    },

    qscPriority: {
      "Cleanliness": 3,
      "Quality": 1,
      "Service": 2
    },

    qscSubCategoriesPriority:{
      "Cleanliness": {"Flies":4, "Lobby Temperature":5, "Music":6, "Lobby":2, "Rest Rooms":3, "Employees":1},
      "Quality": {"Fries":3, "Taste":2, "Coffee Quality":5, "Buns Quality":4, "Ice Cream Quality":6, "Not Fresh":1},
      "Service": {"Employee Attentiveness":1, "Wrong Order":3, "Speed of Service":2, "Missing Order":4}
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
      "Quality": ["#F984EF", "#460B41", "#BD33A4", "#702963", "#B784A7", "#692D54", "#44012D", "#66023C", "#76395D", "#B784A7"],
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
