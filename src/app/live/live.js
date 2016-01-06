/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'livefeed.live', [
  'ui.router',
  'livefeed.authService',
  'factories',
  'flash',
  'livefeed.live.top_concerns',
  'livefeed.live.overall-ratings',
  'livefeed.live.business_segment',
  'livefeed.live.qsc',
  'livefeed.live.patch_qsc_analysis'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'live', {
    url: '/live',
    views: {
      "": {
        controller: 'LiveCtrl',
        templateUrl: 'live/live.tpl.html'
      },
      "top_concern@live":{
        controller: "TopConcernCtrl",
        templateUrl: 'live/top-concerns/top-concern.tpl.html'
      },
      "overall_rating@live":{
        controller: "OverallRatingCtrl",
        templateUrl: 'live/overall-ratings/overall-rating.tpl.html'
      },
      "business_segment@live":{
        controller: "BusinessSegmentCtrl",
        templateUrl: 'live/business-segments/business-segment.tpl.html'
      },
      "qsc@live":{
        controller: "QscCtrl",
        templateUrl: 'live/qsc/qsc.tpl.html'
      },
      "patch_qsc_analysis@live":{
        controller: "PatchQscAnalysisCtrl",
        templateUrl: 'live/patch-qsc-analysis/patch-qsc-analysis.tpl.html'
      }
    },
    authenticate: false
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'LiveCtrl', function LiveController( $scope,  _ , $rootScope, $state, Authentication, Graphs, WebSocket) {


  $scope.authenticate = {};

  $rootScope.$on('app-online', function(event, args) {
    console.log("online in login");
    WebSocket.init();
  });

  $rootScope.$on('app-offline', function(event, args) {
    console.log("offline in login");
    WebSocket.close_socket();
  });

  WebSocket.init();

  function top_rankings(){
    Graphs.top_rankings().$promise.then(function(data){
      $scope.top_ranking = data;
    });
  }
  top_rankings();

  $rootScope.$on('web-socket-message', function (event, data) {
    top_rankings();
  });

  $rootScope.$on('web-socket-close', function (event, data) {
    WebSocket.close_socket();
    WebSocket.init();
  });

  $rootScope.$on('web-socket-error', function (event, data) {
    WebSocket.close_socket();
    WebSocket.init();
  });


  

})


.directive('initSlide', function() {
  return {
    restrict: 'A',
    link: function(scope, ele, attrs) {
      window.initSlideShow();
    }
  };
})

.service('WebSocket', ['$rootScope', function($rootScope){

  var ws = null;

  return {

    init: function(){
      console.log("in the init function");
      ws = null;
      ws = new WebSocket("ws://staginglivefeed.arbisoft.com:5678/");
      //ws = new WebSocket("ws://172.16.11.113:5678/");
      ws.onopen = function (event) {
        console.log("sockets opened");
        $rootScope.$broadcast('web-socket-open');
      };
      ws.onmessage = function (event) {
        console.log("message received");
        $rootScope.$broadcast('web-socket-message');
      };
      ws.onerror = function(event){
        console.log("error in connection");
        $rootScope.$broadcast('web-socket-error');
      };
      ws.onclose = function(event){
        console.log("connection closing");
        $rootScope.$broadcast('web-socket-close');

      };

                
    },

    get_socket: function(){
      return ws;
    },

    close_socket: function(){
      return ws.close();
    }



  };

}]);



