(function() {
  angular.module( 'livefeed.manage_users')

  .directive('footable', function(){
    return {
      restrict: 'C',
      scope: {
        users: "="
      },
      link: function(scope, ele, attrs){
        scope.$watch('users', function(watchedData) {
          if(watchedData !== undefined){
            $(ele).footable();
          }
        });

      }
    };
  });

})();
