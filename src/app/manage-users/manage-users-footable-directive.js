(function() {
  angular.module( 'livefeed.manage_users')

  .directive('footable', function($timeout){
    return {
      restrict: 'C',
      scope: {
        users: "="
      },
      link: function(scope, ele, attrs){
        scope.$watchCollection('users', function(watchedData) {
          if(watchedData !== undefined){
            console.log("in the watch if");
            if ($(ele).hasClass("footable-loaded")){
              $timeout(function(){
                  $('.footable').trigger('footable_redraw');
              }, 100);
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
