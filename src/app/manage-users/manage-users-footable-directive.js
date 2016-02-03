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
            if ($(ele).hasClass("footable-loaded")){
              $('.footable').trigger('footable_redraw');
            }
             else{
              $(ele).footable();
            }
            window.fix_height();
          }
        });

      }
    };
  });

})();
