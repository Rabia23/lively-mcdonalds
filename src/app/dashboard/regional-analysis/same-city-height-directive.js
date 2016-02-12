(function() {
  angular.module('livefeed.dashboard.regional_analysis')

  .directive('sameCityHeight', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
    };
  });
})();
