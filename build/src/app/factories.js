angular.module( 'factories', ['ngResource'])

.factory('Filters', ['$resource', function($resource) {
  function Filters() {
    this.service = $resource('http://mclively.herokuapp.com/:endpoint/', {callback: "JSON_CALLBACK"},
                  {
                    allRegions: {method: "JSONP",isArray: true, params: {endpoint: "region"}},
                    Cities: {method: "JSONP",isArray: true, params: {endpoint: "city"}},
                    Branches: {method: "JSONP",isArray: true, params: {endpoint: "branch"}}
                 });
  }
  Filters.prototype.allRegions = function(){
    return this.service.allRegions();
  };
  Filters.prototype.Cities = function(region_id){
    return this.service.Cities({region_id: region_id});
  };
  Filters.prototype.Branches = function(city_id){
    return this.service.Branches({city: city_id});
  };
  return new Filters();
}])


.factory('Graphs', ['$resource', function($resource) {
  function Graphs() {
    this.service = $resource('http://mclively.herokuapp.com/api/:endpoint/', {callback: "JSON_CALLBACK"},
                  {
                    overall_feedback: {method: "JSONP",isArray: false, params: {endpoint: "overall_feedback"}},
                    regional_analysis: {method: "JSONP",isArray: false, params: {endpoint: "regional_analysis"}}

                 });
  }
  Graphs.prototype.overall_feedback = function(region_id, city_id, branch_id){
    region_id = region_id || "";
    city_id = city_id || "";
    branch_id = branch_id || "";
    return this.service.overall_feedback({region: region_id, city: city_id, branch: branch_id});
  };
  Graphs.prototype.regional_analysis = function(region_id, city_id, branch_id){
    region_id = region_id || "";
    city_id = city_id || "";
    branch_id = branch_id || "";
    return this.service.regional_analysis({region: region_id, city: city_id, branch: branch_id});
  };
  return new Graphs();
}]);