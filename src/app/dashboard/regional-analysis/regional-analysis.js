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

  $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function(size){
    if($scope.radioModel === 'SQC'){
      var modalInstance = $uibModal.open({
      templateUrl: 'dashboard/regional-analysis/sqc-modal.tpl.html',
      controller: 'SQCModalCtrl',
      size: 1000,
      resolve: {
        items: function () {
           return $scope.items;
        }
      }
    });
    }

  };
  
})

.controller('SQCModalCtrl', function ($scope, $uibModalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close();
  };
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
        options = angular.extend({
          element: ele[0],
          data: data
        }, scope.options);
        if (options.formatter) {
          func = new Function('y', 'data', options.formatter);
          options.formatter = func;
        }
        morris_chart = new Morris.Donut(options);
        morris_chart.on('click', function(i, row){
            console.log("region");
            console.log(scope.$parent.region.id);
            console.log(scope.$parent.region.name);
            console.log(i, row);
            console.log(attrs);
            scope.$apply(scope.action);

        });
        return morris_chart;
        
      }
  };
});