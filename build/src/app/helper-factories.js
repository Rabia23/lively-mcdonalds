angular.module( 'helper_factories', ['ngResource'])

.factory('Global', [ function() {

  return {
    mainRatingColorScheme: {
      "Few concerns": '#ac1a1a',
      "Not happy enough": '#e73a3a',
      "Everything is on track!": '#01ad0f',
      "I'm lovin' it": '#28530c'
    },

    optionsColorScheme: {
      "Food Quality": "#8f1a30",
      "Service": "#f5c40f",
      "Cleanliness": "#29474c"
    }

  };

}]);
