(function() {
    angular.module('livefeed.live.benchmark_map', [
        'ui.router',
        'factories'
    ])


    .controller('BenchmarkMapCtrl', function BenchmarkMapController($scope, Graphs) {
        Graphs.leader_board().$promise.then(function(data){
            $scope.leader_board_data = data;
            $scope.branches = _.sortBy($scope.leader_board_data.branches, function (value) { return value.count; });
            $scope.branches.reverse();
        });
    });

})();