(function() {
  angular.module('livefeed.dashboard.regional_analysis')

  .directive('sameRegionHeight', function() {
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
