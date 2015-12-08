angular.module('livefeed.offline', []
)
.service('offlineService', function(_, $rootScope) {


  return{
    init: function(){

      window.addEventListener("online", function() {
        $rootScope.$broadcast('app-online');
      }, true);

      window.addEventListener("offline", function() {
        $rootScope.$broadcast('app-offline');
      }, true);

      return  navigator.onLine;
    }
  };

});
