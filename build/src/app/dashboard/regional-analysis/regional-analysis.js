angular.module( 'livefeed.dashboard.regional_analysis', [
  'factories',
  'livefeed.chart', 
  'ui.bootstrap'
])

.controller( 'RegionalAnalysisCtrl', function DashboardController( $scope, _, Graphs, chartService, $uibModal ) {
  
  $scope.regional_view = true;

  $scope.city_view = false;

  $scope.radioModel = 'SQC';

  $scope.show_loading = false;

  $scope.getRegions = function(){
    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.donut_graph_data = [];
    Graphs.regional_analysis($scope.question_type).$promise.then(function(data){
      $scope.donut_graph_data = chartService.getDonutChartData(data, $scope.question_type);
      console.log("donut_graph_data");
      console.log($scope.donut_graph_data);
    });
  };



  $scope.getRegionCities = function(region){
    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.selected_region = region;
    $scope.regional_view = false;
    $scope.city_view = true;
    $scope.show_loading = true;
    $scope.donut_cities_data = [];
    Graphs.city_analysis(region.id, $scope.question_type).$promise.then(function(data){
      $scope.donut_cities_data = chartService.getDonutChartData(data, $scope.question_type);
      $scope.show_loading = false;
    });
  };

  $scope.getCityBranches = function(city){
    $scope.selected_city = city;
    $scope.city_view = false;
    $scope.show_loading = true;
    $scope.donut_branches_data = [];
    Graphs.branch_analysis(city.id, $scope.question_type).$promise.then(function(data){
      $scope.donut_branches_data = chartService.getDonutChartData(data, $scope.question_type);
      $scope.show_loading = false;
    });
  };

  $scope.backToRegions = function(){
    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.selected_region = null;
    $scope.regional_view = true;
    $scope.city_view = false;
    $scope.donut_cities_data = [];
    $scope.showChart(null, 'regions');
  };

  $scope.backToCities = function(region){
    $scope.selected_city = null;
    $scope.city_view = true;
    $scope.regional_view = false;
    $scope.donut_branches_data = [];
    $scope.showChart(region, 'cities');
  };

  $scope.showChart = function(object_id, string){

    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    if(string === 'regions'){
      if($scope.regional_view === true){
        $scope.getRegions();
      }
      else if($scope.city_view === true){
        $scope.getRegionCities($scope.selected_region);
      }
      else{
        $scope.getCityBranches($scope.selected_city);
      }
      
    }
    else if(string === 'cities'){
      $scope.getRegionCities(object_id);
    }
    else{
      $scope.getCityBranches(object_id);
    }
    
  };

  $scope.showChart(null, 'regions');

  $scope.open = function(option,region){

    $scope.region = region;

    console.log("Region");
    console.log(region);

    Graphs.feedback_analysis_breakdown(region.id,"","",option.id).$promise.then(function(data){

        $scope.donut_subgraph_data = chartService.getSubDonutChartData(data);
        console.log("donut_subgraph_data");
        console.log($scope.donut_subgraph_data);
      });

      if($scope.radioModel === 'SQC'){
        var modalInstance = $uibModal.open({
        templateUrl: 'dashboard/regional-analysis/sqc-modal.tpl.html',
        controller: 'SQCModalCtrl',
        size: 1000

      });
    }

  };
  
})

.controller('SQCModalCtrl', function ($scope, $uibModalInstance){

})


.directive('morrisChart', function() {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        type: '=',
        options: '=',
        action: '&'
      },
      link: function(scope, ele, attrs) {
        var data, func, options, type;
        data = scope.data;
        type = scope.type;
        console.log("Data");
        console.log(data);
        options = angular.extend({
          element: ele[0],
          data: data
        }, scope.options);
        if (options.formatter) {
          func = new Function('y', 'data', options.formatter);
          options.formatter = func;
        }
         console.log("options");
        console.log(options);
        morris_chart = new Morris.Donut(options);
        morris_chart.on('click', function(i, row){
            scope.$apply(scope.action({option: row}));

        });
        return morris_chart;
        
      }
  };
});