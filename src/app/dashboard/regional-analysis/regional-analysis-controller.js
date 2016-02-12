(function() {
  angular.module( 'livefeed.dashboard.regional_analysis')

  .controller( 'RegionalAnalysisCtrl', function DashboardController( $rootScope, $scope, Graphs, regionalAnalysisChartService, $uibModal, Global, TokenHandler, flashService ) {

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
             flashService.createFlash($scope.error_message, "danger");
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
           flashService.createFlash($scope.error_message, "danger");

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
            flashService.createFlash($scope.error_message, "danger");

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
            flashService.createFlash($scope.error_message, "danger");
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
            flashService.createFlash($scope.error_message, "danger");
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
            flashService.createFlash($scope.error_message, "danger");
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
            flashService.createFlash($scope.error_message, "danger");
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
            flashService.createFlash($scope.error_message, "danger");
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
  });

})();
