(function() {
    angular.module( 'livefeed.dashboard.regional_analysis', [
      'factories',
      'livefeed.regional_analysis.chart',
      'ui.bootstrap',
      'flash'
    ])

.controller( 'RegionalAnalysisCtrl', function DashboardController( $rootScope, $scope, Graphs, regionalAnalysisChartService, $uibModal, Global, TokenHandler, Flash ) {
  var user_role = TokenHandler.get_user_role();
  $scope.today = new Date();

  $scope.show_error_message = false;

  function resetDates(){
    $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };
  }

  resetDates();

  $scope.start_date = null;
  $scope.end_date = null;

  $scope.datePickerOption = {
    eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          $scope.start_date = ev.model.startDate._i;
          $scope.end_date =  ev.model.endDate._i;
          if(user_role == 4){
             $scope.showChart("", "regions");
          }
          else if(user_role == 3){
            $scope.showChart("");
          }
          else{
           $scope.showChart($scope.object_id, $scope.string);
          }
        },
        'cancel.daterangepicker': function(ev, picker){
          //$scope.datePicker.date.startDate = null;
          //$scope.datePicker.date.endDate = null;
        }

    },
    opens: "left"
  };

  $scope.area_view = true;
  $scope.regional_view = false;
  $scope.city_view = false;

  $scope.area_link = false;
  $scope.region_link = false;
  $scope.city_link = false;

  $scope.radioModel = 'QSC';

  $scope.show_loading = false;

  $scope.show_string = false;

  function showString(data_count){
    $scope.show_string = data_count === 0 || data_count === undefined? true:false;
  }

  $scope.getAreas = function(){
    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.donut_graph_data = [];
    $scope.show_loading = true;
    var donut_data = [], donut_colors = [];

    if($scope.radioModel === 'Complaints'){
       Graphs.action_analysis("", "", "", $scope.start_date, $scope.end_date, "").$promise.then(function(complains_data){
         if(complains_data.success) {
           $scope.show_error_message = false;
           showString(complains_data.response.count);
           $scope.donut_graph_data = regionalAnalysisChartService.getComplaintsDonutChartData(complains_data.response);
           $scope.donut_graph_data.objects.push({
             id: "",
             name: "Pakistan",
             show_chart: $scope.donut_graph_data.objects[0].show_chart === false && $scope.donut_graph_data.objects[1].show_chart === false ? false : true
           });
           _.each($scope.donut_graph_data.donutData[0], function (data) {
             _.find($scope.donut_graph_data.donutData[1], function (dat) {
               if (data['label'] === dat['label']) {
                 donut_data.push({id: "", label: dat['label'], value: data['value'] + dat['value']});
                 var color = dat['action_taken'] === 1 ? '#e73a3a' : dat['action_taken'] === 2 ? '#01ad0f' : '#FFCC00';
                 donut_colors.push(color);
               }
             });
           });
           $scope.donut_graph_data.donutData.push(donut_data);
           $scope.donut_graph_data.donutOptions.push({colors: donut_colors});
           $scope.show_loading = false;
         }
         else {
           $scope.show_error_message = true;
           $scope.error_message = complains_data.message;
           Flash.create('danger', $scope.error_message, 'custom-class');
         }
       });
    }
    else {
     Graphs.area_analysis($scope.question_type, $scope.start_date, $scope.end_date).$promise.then(function (area_data){
       if(area_data.success) {
         $scope.show_error_message = false;
         showString(area_data.response.count);
         $scope.donut_graph_data = regionalAnalysisChartService.getDonutChartData(area_data.response, $scope.question_type);
         $scope.donut_graph_data.objects.push({
           id: "",
           name: "Pakistan",
           show_chart: $scope.donut_graph_data.objects[0].show_chart === false && $scope.donut_graph_data.objects[1].show_chart === false ? false : true
         });
         _.each($scope.donut_graph_data.donutData[0], function (data) {
           _.find($scope.donut_graph_data.donutData[1], function (dat) {
             if (data['label'] === dat['label']) {
               donut_data.push({id: dat['id'], label: dat['label'], value: data['value'] + dat['value']});
               var color = $scope.question_type == 1 ? Global.mainRatingColorScheme[dat['label']] : Global.optionsColorScheme[dat['label']];
               donut_colors.push(color);
             }
           });
         });
         $scope.donut_graph_data.donutData.push(donut_data);
         $scope.donut_graph_data.donutOptions.push({colors: donut_colors});
         $scope.show_loading = false;
       }
       else {
         $scope.show_error_message = true;
         $scope.error_message = area_data.message;
         Flash.create('danger', $scope.error_message, 'custom-class');
       }
     });
   }
  };

  $scope.getAreaRegions = function(area){
    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.selected_area = area;
    $scope.regional_view = true;
    $scope.area_view = false;
    $scope.area_link = user_role == 4 ? false : true;
    $scope.region_link = false;
    $scope.city_link = false;
    $scope.show_loading = true;
    $scope.donut_regions_data = [];
    var type_id;
    if($scope.radioModel === 'Complaints'){
      type_id = user_role == 4 ? "" : 1;
      Graphs.action_analysis(type_id, "", "", $scope.start_date, $scope.end_date, area.id).$promise.then(function(complains_data){
        if(complains_data.success) {
          $scope.show_error_message = false;
          showString(complains_data.response.count);
          $scope.donut_regions_data = regionalAnalysisChartService.getComplaintsDonutChartData(complains_data.response);
          $scope.show_loading = false;
        }
        else{
          $scope.show_error_message = true;
          $scope.error_message = complains_data.message;
          Flash.create('danger', $scope.error_message, 'custom-class');
        }
      });
    }
    else {
      type_id = user_role == 4 ? "" : 1;
      Graphs.regional_analysis($scope.question_type, $scope.start_date, $scope.end_date, area.id, type_id).$promise.then(function(data){
        if(data.success) {
          $scope.show_error_message = false;
          showString(data.response.count);
          $scope.donut_regions_data = regionalAnalysisChartService.getDonutChartData(data.response, $scope.question_type);
          $scope.show_loading = false;
        }
        else{
          $scope.show_error_message = true;
          $scope.error_message = data.message;
          Flash.create('danger', $scope.error_message, 'custom-class');
        }
      });
    }
  };

  $scope.getRegionCities = function(region){
    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.selected_region = region;
    $scope.area_view = false;
    $scope.regional_view = false;
    $scope.city_view = true;
    $scope.area_link = user_role == 4 ? false : true;
    $scope.region_link = true;
    $scope.city_link = false;
    $scope.show_loading = true;
    $scope.donut_cities_data = [];
    if($scope.radioModel === 'Complaints'){
      Graphs.action_analysis(2, region.id, "", $scope.start_date, $scope.end_date,"").$promise.then(function(complains_data){
        if(complains_data.success) {
          $scope.show_error_message = false;
          showString(complains_data.response.count);
          $scope.donut_cities_data = regionalAnalysisChartService.getComplaintsDonutChartData(complains_data.response);
          $scope.show_loading = false;
        }
        else{
          $scope.show_error_message = true;
          $scope.error_message = complains_data.message;
          Flash.create('danger', $scope.error_message, 'custom-class');
        }
      });
    }
    else {
      Graphs.city_analysis(region.id, $scope.question_type, $scope.start_date, $scope.end_date, 2).$promise.then(function(data){
        if(data.success) {
          $scope.show_error_message = false;
          showString(data.response.count);
          $scope.donut_cities_data = regionalAnalysisChartService.getDonutChartData(data.response, $scope.question_type);
          $scope.show_loading = false;
        }
        else{
          $scope.show_error_message = true;
          $scope.error_message = data.message;
          Flash.create('danger', $scope.error_message, 'custom-class');
        }
      });
    }
  };

  $scope.getCityBranches = function(city){
    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.selected_city = city;
    $scope.area_view = false;
    $scope.regional_view = false;
    $scope.city_view = false;
    $scope.area_link = user_role == 4 || user_role == 3 ? false : true;
    $scope.region_link = user_role == 3 ? false : true;
    $scope.city_link = user_role == 3 ? false : true;
    $scope.show_loading = true;
    $scope.donut_branches_data = [];
    var type_id;
    if($scope.radioModel === 'Complaints'){
      type_id = user_role == 3 ? "" : 3;
      Graphs.action_analysis(type_id, "", city.id, $scope.start_date, $scope.end_date,"").$promise.then(function(complains_data){
        if(complains_data.success) {
          $scope.show_error_message = false;
          showString(complains_data.response.count);
          $scope.donut_branches_data = regionalAnalysisChartService.getComplaintsDonutChartData(complains_data.response);
          $scope.show_loading = false;
        }
        else{
          $scope.show_error_message = true;
          $scope.error_message = complains_data.message;
          Flash.create('danger', $scope.error_message, 'custom-class');
        }
      });
    }
    else {
      type_id = user_role == 3 ? "" : 3;
      Graphs.branch_analysis(city.id, $scope.question_type, $scope.start_date, $scope.end_date, type_id).$promise.then(function (data) {
        if(data.success) {
          $scope.show_error_message = false;
          showString(data.response.count);
          $scope.donut_branches_data = regionalAnalysisChartService.getDonutChartData(data.response, $scope.question_type);
          $scope.show_loading = false;
        }
        else{
          $scope.show_error_message = true;
          $scope.error_message = data.message;
          Flash.create('danger', $scope.error_message, 'custom-class');
        }
      });
    }
  };

  $scope.backToAreas = function(){

    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.selected_area = null;
    $scope.area_view = true;
    $scope.regional_view = false;
    $scope.area_link = false;
    $scope.region_link = false;
    $scope.city_link = false;
    $scope.donut_regions_data = [];
    $scope.showChart(null, 'areas');
  };

  $scope.backToRegions = function(area){

    $scope.question_type = ($scope.radioModel === 'Rating') ? 1 : 2;
    $scope.selected_region = null;
    $scope.regional_view = true;
    $scope.city_view = false;
    $scope.area_link = user_role == 4 ? false : true;
    $scope.region_link = false;
    $scope.city_link = false;
    $scope.donut_cities_data = [];
    $scope.showChart(area, 'regions');
  };

  $scope.backToCities = function(region){

    $scope.selected_city = null;
    $scope.city_view = true;
    $scope.regional_view = false;
    $scope.area_link = user_role == 4 ? false : true;
    $scope.region_link = true;
    $scope.city_link = false;
    $scope.donut_branches_data = [];
    $scope.showChart(region, 'cities');
  };

  $scope.showTitle = function(radioModel){
    if(radioModel === 'Rating'){$scope.title = 'Feedback Analysis';}
    else if(radioModel === 'QSC'){$scope.title = 'QSC Analysis';}
    else if(radioModel === 'Complaints'){$scope.title = 'Complaint Analysis';}
  };

  $scope.showChart = function(object_id, string){
      $scope.showTitle($scope.radioModel);
      $scope.object_id = object_id;
      $scope.string = string;

      if(string === 'areas'){
        if($scope.area_view === true) {
          $scope.getAreas();
        }
        else if($scope.regional_view === true){
          $scope.getAreaRegions($scope.selected_area);
        }
        else if($scope.city_view === true){
          $scope.getRegionCities($scope.selected_region);
        }
        else{
          $scope.getCityBranches($scope.selected_city);
        }
      }
      else if(string === 'regions'){
        $scope.getAreaRegions(object_id);
      }
      else if(string === 'cities'){
        $scope.getRegionCities(object_id);
      }
      else{
        $scope.getCityBranches(object_id);
      }

  };
  if(user_role == 4){
    $scope.showTitle($scope.radioModel);
    $scope.getAreaRegions("");
  }
  else if(user_role == 3){
    $scope.showTitle($scope.radioModel);
    $scope.getCityBranches("");
  }
  else {
    $scope.showChart(null, 'areas');
  }

  $scope.open = function(option, area, region, city, branch){
    if (region === undefined){ region = null;}
    if (city === undefined){ city = null;}
    if (branch === undefined){ branch = null;}
    if($scope.radioModel === 'QSC'){
      var modalInstance = $uibModal.open({
        templateUrl: 'dashboard/regional-analysis/sqc-modal.tpl.html',
        controller: 'SQCModalCtrl',
        size: 1000,
        resolve: {
          area: function () {return area;},
          region: function () {return region;},
          city: function () {return city;},
          branch: function () {return branch;},
          option: function() {return option;},
          start_date: function() {return $scope.start_date;},
          end_date: function() {return $scope.end_date;}
        }
      });
    }
  };

})

.controller('SQCModalCtrl', function ($scope, Graphs, regionalAnalysisChartService, $uibModalInstance, area, region, city, branch, option, start_date, end_date, TokenHandler, Flash){

  var user_role = TokenHandler.get_user_role();
  var type_id;

  $scope.show_angle_left = true;
  $scope.show_angle_right = true;

  $scope.question_type = 2;
  $scope.show_div = false;
  $scope.show_loading = false;

  $scope.show_error_message = false;

  function showGraph(area, region, city, branch, option) {
    $scope.show_loading = true;
    Graphs.feedback_analysis_breakdown(area.id,region.id,city.id,branch.id,option.id,start_date,end_date).$promise.then(function(data) {
      if(data.success) {
        $scope.show_error_message = false;
        $scope.show_div = data.response.feedback_count === 0 ? true : false;
        $scope.donut_subgraph_data = regionalAnalysisChartService.getSubDonutChartData(data.response, option.label);
        $scope.show_loading = false;
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = data.message;
        Flash.create('danger', $scope.error_message, 'custom-class');
      }
    });
  }

  function getSQCdata(data) {
    return _.map(data.analysis,  function(dat) {
        return {name: dat.object.name, id: dat.object.id
      };
    });
  }

  function onOptionSelect(area, region, city, branch, sqc){
    $scope.area = area;
    $scope.region = region;
    $scope.city = city;
    $scope.branch = branch;
    $scope.sqc = sqc;
  }

  function hideQSCModalButton(sqc, sqc_data){
     var index = findSqcIndex(sqc,sqc_data);
     if(index == sqc_data.length-1){
       $scope.show_angle_right = false;
     }
     else if(index === 0){
       $scope.show_angle_left = false;
     }

     if(sqc_data.length == 1){
       $scope.show_angle_right = false;
       $scope.show_angle_left = false;
     }
  }

  if(region == null && city == null && branch == null){
    onOptionSelect(area, null, null, null, area);
    Graphs.area_analysis($scope.question_type).$promise.then(function(data) {
      if(data.success) {
        $scope.show_error_message = false;
        $scope.sqc_data = getSQCdata(data.response);
        $scope.sqc_data.push({id: "", name: "Pakistan"});
        hideQSCModalButton(area, $scope.sqc_data);
        showGraph(area, "", "", "", option);
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = data.message;
        Flash.create('danger', $scope.error_message, 'custom-class');
      }
    });
  }
  else if(city == null && branch == null){
    type_id = user_role == 4 ? "" : 1;
    onOptionSelect(area, region, null, null, region);
    Graphs.regional_analysis($scope.question_type,"","",area.id,type_id).$promise.then(function(data) {
      if(data.success) {
        $scope.show_error_message = false;
        $scope.sqc_data = getSQCdata(data.response);
        hideQSCModalButton(region, $scope.sqc_data);
        showGraph(area, region, "", "", option);
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = data.message;
        Flash.create('danger', $scope.error_message, 'custom-class');
      }
    });
  }
  else if(branch == null) {
    onOptionSelect(area, region, city, null, city);
    Graphs.city_analysis(region.id, $scope.question_type,"","",2).$promise.then(function(data) {
      if(data.success) {
        $scope.show_error_message = false;
        $scope.sqc_data = getSQCdata(data.response);
        hideQSCModalButton(city, $scope.sqc_data);
        showGraph(area, region, city, "", option);
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = data.message;
        Flash.create('danger', $scope.error_message, 'custom-class');
      }
    });
  }
  else{
    type_id = user_role == 3 ? "" : 3;
    onOptionSelect(area, region, city, branch, branch);
    Graphs.branch_analysis(city.id, $scope.question_type,"","",type_id).$promise.then(function(data) {
      if(data.success) {
        $scope.show_error_message = false;
        $scope.sqc_data = getSQCdata(data.response);
        hideQSCModalButton(branch, $scope.sqc_data);
        if (user_role == 3) {
          showGraph("", "", "", branch, option);
        }
        else {
          showGraph(area, region, city, branch, option);
        }
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = data.message;
        Flash.create('danger', $scope.error_message, 'custom-class');
      }
    });
  }

  function findSqcIndex(sqc, sqc_data){
    return _.findIndex(sqc_data, {id: sqc.id});
  }

  function findNextSQC(sqc,sqc_data){
    var next_sqc;
    var index = findSqcIndex(sqc, sqc_data);
    next_sqc = sqc_data[index + 1];
    return next_sqc;
  }

  function findPrevSQC(sqc,sqc_data){
    var prev_sqc;
    var index = findSqcIndex(sqc, sqc_data);
    prev_sqc = sqc_data[index -1];
    return prev_sqc;
  }

  function getNextSQC(sqc, sqc_data, area, region, city, branch){
     var next_sqc_data;
     next_sqc_data = findNextSQC(sqc,sqc_data);
     hideQSCModalButton(next_sqc_data, sqc_data);

     if(region == null && city == null && branch == null){
         onOptionSelect(next_sqc_data,region,city,branch,next_sqc_data);
         showGraph(next_sqc_data, "", "", "", option);
     }
     else if(city == null && branch == null){
       onOptionSelect(area,next_sqc_data,city,branch,next_sqc_data);
       showGraph(area, next_sqc_data, "", "", option);
     }
     else if(branch == null) {
       onOptionSelect(area,region,next_sqc_data,branch,next_sqc_data);
       showGraph(area, region, next_sqc_data, "", option);
     }
     else {
       onOptionSelect(area,region,city,next_sqc_data,next_sqc_data);
       showGraph(area, region, city, next_sqc_data, option);
     }
  }

  function getPreviousSQC(sqc, sqc_data, area, region, city, branch){
     var prev_sqc_data;
     prev_sqc_data = findPrevSQC(sqc, sqc_data);
     hideQSCModalButton(prev_sqc_data, sqc_data);

     if(region == null && city == null && branch == null){
       onOptionSelect(prev_sqc_data,region,city,branch,prev_sqc_data);
       showGraph(prev_sqc_data, "", "", "", option);
     }
     else if(city == null && branch == null){
       onOptionSelect(area,prev_sqc_data,city,branch,prev_sqc_data);
       showGraph(area, prev_sqc_data, "", "", option);
     }
     else if(branch == null) {
       onOptionSelect(area,region,prev_sqc_data,branch,prev_sqc_data);
       showGraph(area, region, prev_sqc_data, "", option);
     }
     else {
       onOptionSelect(area,region,city,prev_sqc_data,prev_sqc_data);
       showGraph(area, region, city, prev_sqc_data, option);
     }
  }

  function findSqcData(area,region,city,branch,sqc_data,string){
     if(region == null && city == null && branch == null){
      if(string == "next"){
        getNextSQC(area,sqc_data,"",null,null,null);
      }
      else if(string == "previous"){
        getPreviousSQC(area,sqc_data,"",null,null,null);
      }
    }
    else if(city == null && branch == null){
      if(string == "next"){
        getNextSQC(region,sqc_data,area,"",null,null);
      }
      else if(string == "previous"){
        getPreviousSQC(region,sqc_data,area,"",null,null);
      }
    }
    else if(branch == null) {
      if (string == "next") {
        getNextSQC(city,sqc_data,area,region,"",null);
      }
      else if (string == "previous") {
        getPreviousSQC(city,sqc_data,area,region,"",null);
      }
    }
    else{
      if(string == "next"){
        getNextSQC(branch,sqc_data,area,region,city,"");
      }
      else if (string == "previous") {
        getPreviousSQC(branch,sqc_data,area,region,city,"");
      }
    }
  }

  $scope.next = function(area,region,city,branch,sqc_data){
    $scope.show_angle_left = true;
    findSqcData(area,region,city,branch,sqc_data,"next");
  };

  $scope.previous = function(area,region,city,branch,sqc_data){
    $scope.show_angle_right = true;
    findSqcData(area,region,city,branch,sqc_data,"previous");
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
          scope.$apply(scope.action({option: row}));

      });
      _.each($(".regional-analysis").find("svg"), function(value, index){
        $(value).find("g").remove();
        $(value).append('<g xmlns="http://www.w3.org/2000/svg" id="Page-1" stroke="none" stroke-width="1.5" fill="none" fill-rule="evenodd"><ellipse id="Oval-1" stroke="#E2E2E2" cx="129" cy="101" rx="98" ry="98"></ellipse></g>');
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
            var data, func, options, type, option_array;
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
})
.directive('sameRegionHeight', function() {
  return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
  };
})

.directive('sameCityHeight', function() {
  return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
  };
})

.directive('sameBranchHeight', function() {
  return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
  };
});
})();
