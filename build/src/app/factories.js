angular.module( 'factories', [
  'ngResource',
  'livefeed.api_links'
])

.factory('Filters', ['$resource','apiLinks', function($resource, apiLinks) {
  function Filters() {
    this.service = $resource(apiLinks.staging, {callback: "JSON_CALLBACK"},
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


.factory('Graphs', ['$resource','apiLinks',  function($resource, apiLinks) {
  function Graphs() {
    this.service = $resource(apiLinks.production, {callback: "JSON_CALLBACK"},
                  {
                    overall_feedback: {method: "JSONP",isArray: false, params: {endpoint: "overall_feedback"}},
                    feedback_analysis: {method: "JSONP",isArray: false, params: {endpoint: "feedback_analysis"}},
                    overall_rating: {method: "JSONP",isArray: true, params: {endpoint: "overall_rating"}},
                    positive_negative_feedback: {method: "JSONP",isArray: false, params: {endpoint: "positive_negative_feedback"}},
                    category_performance: {method: "JSONP",isArray: false, params: {endpoint: "category_performance"}},
                    comments: {method: "JSONP",isArray: false, params: {endpoint: "comments"}}

                 });
  }

  Graphs.prototype.overall_rating = function(option_id){
    option_id = option_id || "";
    return this.service.overall_rating({option: option_id});
  };

  Graphs.prototype.positive_negative_feedback = function(){
    return this.service.positive_negative_feedback();
  };
  Graphs.prototype.overall_feedback = function(region_id, city_id, branch_id){
    region_id = region_id || "";
    city_id = city_id || "";
    branch_id = branch_id || "";
    return this.service.overall_feedback({region: region_id, city: city_id, branch: branch_id});
  };
  Graphs.prototype.regional_analysis = function(question_type){
    question_type = question_type || 1;
    return this.service.feedback_analysis({question_type: question_type});
  };
  Graphs.prototype.city_analysis = function(region_id, question_type){
    question_type = question_type || 1;
    region_id = region_id || "";
    return this.service.feedback_analysis({type: 2, region: region_id, question_type: question_type});
  };
  Graphs.prototype.branch_analysis = function(city_id, question_type){
    question_type = question_type || 1;
    city_id = city_id || "";
    return this.service.feedback_analysis({type: 3, city: city_id, question_type: question_type});
  };
  Graphs.prototype.category_performance = function(region_id, city_id, branch_id, option_id){
    region_id = region_id || "";
    city_id = city_id || "";
    branch_id = branch_id || "";
    option_id = option_id || "";
    return this.service.category_performance({region: region_id, city: city_id, branch: branch_id, option: option_id});
  };

  Graphs.prototype.comments = function(page){
    page = page || 1;
    return this.service.comments({page: page});
  };

  return new Graphs();
}]);