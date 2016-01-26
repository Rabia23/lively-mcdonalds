(function() {
  angular.module( 'livefeed.manage_users')

  .directive('footable', function(){
    return {
      restrict: 'C',
      link: function(scope, ele, attrs){
        $(ele).footable();
      }
    };
  });

})();
