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

  $scope.datePicker = {};
  $scope.datePicker.date = {startDate: null, endDate: null};

  $scope.today = new Date();

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

  $scope.open = function(option,region,city,branch){
    if (city === undefined){
      city = null;
    }
    if (branch === undefined){
      branch = null;
    }
    if($scope.radioModel === 'SQC'){
        var modalInstance = $uibModal.open({
        templateUrl: 'dashboard/regional-analysis/sqc-modal.tpl.html',
        controller: 'SQCModalCtrl',
        size: 1000,
        resolve: {
          region: function () {
            return region;
          },
          city: function () {
            return city;
          },
          branch: function () {
            return branch;
          },
          option: function() {
              return option;
          }
      }

      });
    }

  };
  
})

.controller('SQCModalCtrl', function ($scope, Graphs, chartService, $uibModalInstance, region, city, branch, option){
  $scope.leftClickDisabled = false;
  $scope.rightClickDisabled = false;

  $scope.showGraph = function(region, city, branch, option){
    Graphs.feedback_analysis_breakdown(region.id,city.id,branch.id,option.id).$promise.then(function(data){
      $scope.donut_subgraph_data = chartService.getSubDonutChartData(data);
    });

  };
  $scope.question_type = 2;

  if(city == null && branch == null){
   $scope.region = region;
   $scope.city = null;
   $scope.branch = null;
   $scope.sqc = region;

   Graphs.regional_analysis($scope.question_type).$promise.then(function(data){
     $scope.sqc_data = _.map(data.analysis,  function(dat){
       return {name: dat.object.name, id: dat.object.id};
     });
     $scope.showGraph(region,"","", option);
   });
  }
  else if(branch == null){
   $scope.region = region;
   $scope.city = city;
   $scope.branch = null;
   $scope.sqc = city;

   Graphs.city_analysis(region.id, $scope.question_type).$promise.then(function(data){
     $scope.sqc_data = _.map(data.analysis,  function(dat){
      return {name: dat.object.name, id: dat.object.id};
     });
     $scope.showGraph(region,city,"", option);
   });

  }
  else{
    $scope.region = region;
    $scope.city = city;
    $scope.branch = branch;
    $scope.sqc = branch;

    Graphs.branch_analysis(city.id, $scope.question_type).$promise.then(function(data){
     $scope.sqc_data = _.map(data.analysis,  function(dat){
        return {name: dat.object.name, id: dat.object.id};
       });
     $scope.showGraph(region,city,branch, option);
    });
  }
  $scope.findNextSQC = function(sqc,sqc_data){
    var next_sqc;
    var index = _.findIndex(sqc_data, sqc);
    if(index == sqc_data.length-1){
      $scope.rightClickDisabled = true;
      return null;
    }
    next_sqc = sqc_data[index + 1];
    return next_sqc;
  };
  $scope.findPrevSQC = function(sqc,sqc_data){
    var prev_sqc;
    var index = _.findIndex(sqc_data, sqc);
    if(index === 0){
      $scope.leftClickDisabled = true;
      return null;
    }
    prev_sqc = sqc_data[index -1];
    return prev_sqc;
  };

  $scope.findSqcData = function(region,city,branch,sqc_data,string){
    var next_sqc_data, prev_sqc_data;
    if(city == null && branch == null){
      $scope.city = null;
      $scope.branch = null;
      if(string == "next"){
        next_sqc_data = $scope.findNextSQC(region,sqc_data);
        if(next_sqc_data != null){
           $scope.region = next_sqc_data;
           $scope.sqc = next_sqc_data;
           $scope.showGraph(next_sqc_data,"","", option);
        }
        $scope.rightClickDisabled = false;
      }
      else if(string == "previous"){
        prev_sqc_data = $scope.findPrevSQC(region, sqc_data);
        if (prev_sqc_data != null) {
          $scope.region = prev_sqc_data;
          $scope.sqc = prev_sqc_data;
          $scope.showGraph(prev_sqc_data, "", "", option);
        }
        $scope.leftClickDisabled = false;
      }
    }
    else if(branch == null) {
      $scope.region = region;
      $scope.branch = null;
      if (string == "next") {
        next_sqc_data = $scope.findNextSQC(city, sqc_data);
        if (next_sqc_data != null) {
          $scope.city = next_sqc_data;
          $scope.sqc = next_sqc_data;
          $scope.showGraph(region, next_sqc_data, "", option);
        }
        $scope.rightClickDisabled = false;
      }
      else if (string == "previous") {
        prev_sqc_data = $scope.findPrevSQC(city, sqc_data);
        if (prev_sqc_data != null) {
          $scope.city = prev_sqc_data;
          $scope.sqc = prev_sqc_data;
          $scope.showGraph(region, prev_sqc_data, "", option);
        }
        $scope.leftClickDisabled = false;
      }
    }
    else{
      $scope.region = region;
      $scope.city = city;
      if(string == "next"){
        next_sqc_data = $scope.findNextSQC(branch,sqc_data);
        if(next_sqc_data != null){
          $scope.branch = next_sqc_data;
          $scope.sqc = next_sqc_data;
          $scope.showGraph(region,city,next_sqc_data, option);
        }
         $scope.rightClickDisabled = false;
      }
      else if (string == "previous") {
          prev_sqc_data = $scope.findPrevSQC(branch,sqc_data);
          if (prev_sqc_data != null) {
            $scope.branch = prev_sqc_data;
            $scope.sqc = prev_sqc_data;
            $scope.showGraph(region, city, prev_sqc_data, option);
          }
           $scope.leftClickDisabled = false;
      }
    }
  };

  $scope.next = function(region,city,branch,sqc_data){
    var string = "next";
    $scope.findSqcData(region,city,branch,sqc_data,string);
  };

  $scope.previous = function(region,city,branch,sqc_data){
    var string = "previous";
    $scope.findSqcData(region,city,branch,sqc_data,string);
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
          scope.$apply(scope.action({option: row}));

      });
      return morris_chart;
      
    }
  };
})
.directive('morrisChartModal', function() {
  return {
      restrict: 'A',
      scope: {
        data: '=',
        type: '=',
        options: '=',
        action: '&'
      },
      link: function(scope, ele, attrs) {
        
        var morris_chart_modal = null;

        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
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

            $(".modal-body").find("svg").remove();

            morris_chart_modal = new Morris.Donut(options);
            return morris_chart_modal;

          }
        });

      }
  };
});

