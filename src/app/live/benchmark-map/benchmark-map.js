(function() {
    angular.module('livefeed.live.benchmark_map', [
        'ui.router',
        'factories',
        'helper_factories',
        'flash'
    ])


    .controller('BenchmarkMapCtrl', function BenchmarkMapController($scope, Graphs, Global) {
            console.log("benchmark map");
    });

})();