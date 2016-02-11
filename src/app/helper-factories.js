angular.module( 'helper_factories', ['ngResource'])

.factory('Global', [ '_', function(_) {

  return {
    qscSubCategoriesColors: function(index){
      var colors = [ "#4CCC72","#3598DC","#9C59B8","#34495E","#F0C547","#E74D3D"];
      return colors[index];
    },

    topConcernsColors: function(index){
      var colors = [ "#cb1e24","#178aea","#434347","#f1d400","#90ec7c"];
      return colors[index];
    },

    opportunityPriority: {
      "Quality of Food": 1,
      "Friendly & Courteous Staff": 2,
      "Clean Restaurant": 3,
      "Variety in Menu": 4,
      "Special Promotions": 5
    },

    promotionPieChartColorScheme: {
      "Yes": "#01c211",
      "No": "#cb1e24"
    },

    complaintAnalysisAction: {
      1: ["Unprocessed", "#cb1e24"],
      2: ["Processed", "#01c211"],
      3: ["Deferred", "#ffd200"]
    },

    complaintAnalysisActionPriority: {
      "Unprocessed": 1,
      "Processed": 2,
      "Deferred": 3
    },

    qscClass: {
      "Cleanliness": "item3",
      "Quality": "",
      "Service": "item2"
    },

    complaintAnalysisActionClass: {
      1: "",
      2: "processed",
      3: "item2"
    },

    mainRatingColorScheme: {
      "Few concerns": '#e73a3a',
      "Not happy enough": '#ac1a1a',
      "Everything on track": '#01ad0f',
      "I'm lovin' it": '#0E590A'

    },

     optionsColorScheme: {
      "Quality": '#cb1e24',
      "Service": "#ffd200",
      "Cleanliness": '#1f9aec'

    },

    optionsLineColorScheme: {
      "Quality": '#cb1e24',
      "Service": "#ffd200",
      "Cleanliness": '#1f9aec'

    },
    subOptionsColorScheme: {

      "Employees":{priority: 1, color: "#4CCC72"},
      "Lobby":{priority: 2, color: "#3598DC"},
      "Rest Rooms":{priority: 3, color: "#E74D3D"},
      "Lobby Temperature":{priority: 4, color: "#F0C547"},
      "Music":{priority: 5, color: "#9C59B8"},
      "Flies":{priority: 6, color: "#34495E"},

      "Not Fresh":{priority: 1, color: "#4CCC72"},
      "Taste":{priority: 2, color: "#3598DC"},
      "Fries":{priority: 3, color: "#E74D3D"},
      "Buns Quality":{priority: 4, color: "#F0C547"},
      "Coffee Quality":{priority: 5, color: "#9C59B8"},

      "Employee Attentiveness":{priority: 1, color: "#4CCC72"},
      "Speed of Service":{priority: 2, color: "#3598DC"},
      "Wrong Order":{priority: 3, color: "#E74D3D"},
      "Missing Order":{priority: 4, color: "#F0C547"}
    },

    overallFeedbackClass: {
      "Few concerns": 'neutral',
      "Not happy enough": 'negative',
      "Everything is on track!": 'good',
      "I'm lovin' it": 'v-good'
    },

    categoryPerformanceClass: {
      "Quality": '#cb1e24',
      "Service": "#ffd200",
      "Cleanliness": '#1f9aec'
    },

    segmentationClass: {
      "Cleanliness": 'blue',
      "Quality": 'lilac',
      "Service": 'yellow'
    },

    segmentationPriority: {
      "Late Night": 1,
      "Breakfast": 2,
      "Lunch": 3,
      "Snack": 4,
      "Dinner": 5
    },

    qscPriority: {
      "Cleanliness": 3,
      "Quality": 1,
      "Service": 2
    },
    qscSubCategoriesData:{
      "Quality": {
        "Not Fresh":{priority: 1, color: "#4CCC72"},
        "Taste":{priority: 2, color: "#3598DC"},
        "Fries":{priority: 3, color: "#E74D3D"},
        "Buns Quality":{priority: 4, color: "#F0C547"},
        "Coffee Quality":{priority: 5, color: "#9C59B8"}
      },
      "Service": {
        "Employee Attentiveness":{priority: 1, color: "#4CCC72"},
        "Speed of Service":{priority: 2, color: "#3598DC"},
        "Wrong Order":{priority: 3, color: "#E74D3D"},
        "Missing Order":{priority: 4, color: "#F0C547"}
      },
      "Cleanliness": {
        "Employees":{priority: 1, color: "#4CCC72"},
        "Lobby":{priority: 2, color: "#3598DC"},
        "Rest Rooms":{priority: 3, color: "#E74D3D"},
        "Lobby Temperature":{priority: 4, color: "#F0C547"},
        "Music":{priority: 5, color: "#9C59B8"},
        "Flies":{priority: 6, color: "#34495E"}
      }
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
      "Cleanliness": ["#000737", "#003565", "#1C6292", "#4A90C0", "#78BEEE", "#B6E1FF"],
      "Quality": ["#420F50", "#511E5F", "#683576", "#A572B3", "#1C002A", "#2B0039"],
      "Service": ["#B84900", "#E67700", "#FFA42B", "#FFD259"]
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
