(function() {
  angular.module('livefeed.dashboard.regional_analysis')

  .directive('morrisChart', function() {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        type: '=',
        options: '=',
        action: '&'
      },
      link: function(scope, ele, attrs) {
        var data, func, options, type;
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
        morris_chart = new Morris.Donut(options);
        morris_chart.on('click', function(i, row){
          scope.$apply(scope.action({option: row}));

        });
        _.each($(".regional-analysis").find("svg"), function(value, index){
           $(value).find("g").remove();
           $(value).append('<g xmlns="http://www.w3.org/2000/svg" id="Page-1" stroke="none" stroke-width="1.5" fill="none" fill-rule="evenodd"><ellipse id="Oval-1" stroke="#E2E2E2" cx="129" cy="101" rx="98" ry="98"></ellipse></g>');
        });
        return morris_chart;
      }
    };
  });
})();
