angular.module( 'livefeed.live', [
  'ui.router',
  'livefeed.authService',
  'livefeed.live.api',
   'helper_factories',
  'flash',
  'livefeed.live.top_concerns',
  'livefeed.live.overall-ratings',
  'livefeed.live.business_segment',
  'livefeed.live.qsc',
  'livefeed.live.patch_qsc_analysis',
  'livefeed.live.benchmark_map'
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
      },
      "benchmark_map@live":{
        controller: "BenchmarkMapCtrl",
        templateUrl: 'live/benchmark-map/benchmark-map.tpl.html'
      }
    },
    authenticate: false
  });

})

/**
 * And of course we define a controller for our route.
 */
.controller( 'LiveCtrl', function LiveController( $scope,  _ , $rootScope, $state, Authentication, Api, WebSocket, Global, Clock, $interval) {


  $scope.authenticate = {};

  $rootScope.$on('app-online', function(event, args) {
    console.log("online in login");
    //WebSocket.init();
  });

  $rootScope.$on('app-offline', function(event, args) {
    console.log("offline in login");
    WebSocket.close_socket();
  });


  function live_dashboard(){
    Api.live_dashboard().$promise.then(function(data){
      console.log("live dashboard");
      console.log(data);
      $scope.top_ranking = data.top_rankings;
      $scope.overall_ratings = data.overall_rating;
      $scope.complaint_view = data.complaint_view;
      $scope.overall_feedback = data.overall_feedback;
      $scope.leader_board_data = data.leaderboard_view;
      $scope.segmentation_ratings = data.segmentation_rating;
      $scope.concerns = data.concerns;
      $rootScope.$broadcast('live-data-received');


    });
  }


  live_dashboard();

  //WebSocket.init();

  $rootScope.$on('live-data-received', function (event, data) {
    top_rankings();
  });


  function top_rankings(){
      $scope.qsc_ranking = _.map($scope.top_ranking.qsc_count, function(value){
        return { option_name: value.option_text, option_count: value.count, priority: Global.qscPriority[value.option_text] };
      });
      $scope.qsc_ranking = _.sortBy($scope.qsc_ranking, function (value) { return value.priority; });
  }

  $rootScope.$on('web-socket-message', function (event, data) {
    live_dashboard();
  });



  var display = function(){    
    var date = new Date();
    $scope.time = Clock.formatAMPM(date);

    var date_string = date.toString().split(" ");
    console.log(date_string);
    $scope.date_output = date_string[0] + "-" + date_string[1] + " " + date_string[2] + "-" + date_string[3];
  };

  display();

  $interval(display, 1000 * 60);



  $rootScope.$on('web-socket-close', function (event, data) {
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

.service('Clock', ['$rootScope', function($rootScope){

  return {
    formatAMPM: function(date){
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' '  + ampm;
      return strTime;
    }
  };

}])



.service('WebSocket', ['$rootScope', function($rootScope){

  var ws = null;

  return {

    init: function(){
      console.log("in the init function");
      ws = null;
      ws = new WebSocket("ws://staginglivefeed.arbisoft.com:5679/");
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



