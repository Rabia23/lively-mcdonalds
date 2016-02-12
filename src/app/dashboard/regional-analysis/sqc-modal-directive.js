(function() {
  angular.module('livefeed.dashboard.regional_analysis')

  .directive('morrisChartModal', function() {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        type: '=',
        options: '=',
        action: '&'
      },
      link: function(scope, ele, attrs) {

        var morris_chart_modal = null;
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            var data, func, options, type, option_array;
            data = scope.data;
            type = scope.type;
            options = angular.extend({
              element: ele[0],
              data: data
            }, scope.options);
            if (options.formatter) {
              func = new Function('y', 'data', options.formatter);
              options.formatter = func;
            }
            $(".modal-body").find("svg").remove();

            morris_chart_modal = new Morris.Donut(options);

            return morris_chart_modal;
          }
        });
      }
    };
  });
})();
