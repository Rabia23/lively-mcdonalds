(function() {
  angular.module( 'livefeed.manage_users')

  .directive('footable', function(){
    return {
      restrict: 'C',
      scope: {
        users: "="
      },
      link: function(scope, ele, attrs){
        scope.$watchCollection('users', function(watchedData) {
          if(watchedData !== undefined){
            console.log("in the watch if");
            console.log($(ele));
            if ($(ele).hasClass("footable-loaded")){
              console.log($(ele).children());
            }
            else{
              $(ele).footable();
            }

          }
        });

      }
    };
  });

})();
