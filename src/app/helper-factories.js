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
      "Food Quality": "rgb(143,26,48)",
      "Service": "rgb(245,196,15)",
      "Cleanliness": "rgb(41,71,76)"
    }

  };

}]);
