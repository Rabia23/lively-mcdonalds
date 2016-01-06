(function() {
  angular.module( 'livefeed.live.patch_qsc_analysis', [
  'ui.router',
  'factories',
  'flash'
 ])



  .controller( 'PatchQscAnalysisCtrl', function PatchQscAnalysisController( $scope, Graphs, Global ) {

      console.log("Patch analysis controller");

  })

  .directive('patchQscAnalysis', function($timeout) {
      return {
        link: function(scope, ele, attrs) {
            console.log("patch link");
            $timeout(function () {
                AmCharts.makeChart("piechart",
                {
                    "type": "pie",
                    "angle": 30,
                    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                    "depth3D": 65,
                    "labelText": "",
                    "colors": [
                        "#01c211",
                        "#bf1616",
                        "#ffee00"
                    ],
                    "titleField": "category",
                    "valueField": "column-1",
                    "allLabels": [],
                    "balloon": {},
                    "titles": [],
                    "dataProvider": [
                        {
                            "category": "Unprocessed",
                            "column-1": "10"
                        },
                        {
                            "category": "Deferred",
                            "column-1": "60"
                        },
                        {
                            "category": "Processed",
                            "column-1": "30"
                        }
                    ]
                });
            }, 1000);
        }
      };
  });

})();
