(function() {
    angular.module('livefeed.promotions')
    .directive('questionBarBackground', function() {
      return {
          restrict: 'A',
          scope: {
            data: '=',
            color: "="
          },
          link: function(scope, ele, attrs) {
            scope.$watch('data', function(watchedData) {
              if(watchedData !== undefined){
                $(ele).find(".progress-bar").css("background-color", ('' + scope.color));
                $(ele).find(".progress-bar").css("color", ('' + scope.color));
                window.initSameHeight();
              }
            });
          }
      };
    });
})();
