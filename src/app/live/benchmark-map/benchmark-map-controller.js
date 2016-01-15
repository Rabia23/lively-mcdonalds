(function() {
  angular.module('livefeed.live.benchmark_map')


  .controller('BenchmarkMapCtrl', function BenchmarkMapController($scope, $rootScope) {

    function leader_board(){
      $scope.branches = _.sortBy($scope.leader_board_data.branches, function (value) { return value.count; });
      $scope.branches.reverse();  
    }

    $rootScope.$on('live-data-received', function (event, data) {
     leader_board();
    });
  
  });

})();