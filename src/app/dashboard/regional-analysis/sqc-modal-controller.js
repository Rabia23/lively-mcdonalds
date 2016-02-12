(function() {
    angular.module('livefeed.dashboard.regional_analysis')

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
            flashService.createFlash($scope.error_message, "danger");
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
            flashService.createFlash($scope.error_message, "danger");
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
            flashService.createFlash($scope.error_message, "danger");
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
            flashService.createFlash($scope.error_message, "danger");
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
            flashService.createFlash($scope.error_message, "danger");
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
    });
})();
