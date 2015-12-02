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
      "Cleanliness": 'blue',
      "Quality": 'lilac',
      "Service": 'yellow'
    },

     categoryPerformanceChildCholorScheme:{
      "Cleanliness": ["#064C7C", "#085389", "#0C5E9D", "#0F6DB4", "#137ECC", "#168CE0"],
      "Quality": ["#431051", "#4F1B5E", "#602E76", "#7A4191", "#9352AC", "#A95DC3"],
      "Service": ["#FD8E15", "#FC9918", "#FCA91F", "#FBBC26", "#F9CF2D", "#F8E035"]
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
