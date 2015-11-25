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


.factory('Graphs', ['$resource','apiLinks','_',  function($resource, apiLinks, _) {
  function Graphs() {
    this.service = $resource(apiLinks.staging, {callback: "JSON_CALLBACK"},
                  {
                    overall_feedback: {method: "JSONP",isArray: false, params: {endpoint: "overall_feedback"}},
                    feedback_analysis: {method: "JSONP",isArray: false, params: {endpoint: "feedback_analysis"}},
                    overall_rating: {method: "JSONP",isArray: true, params: {endpoint: "overall_rating"}},
                    positive_negative_feedback: {method: "JSONP",isArray: false, params: {endpoint: "positive_negative_feedback"}},
                    category_performance: {method: "JSONP",isArray: false, params: {endpoint: "category_performance"}},
                    comments: {method: "JSONP",isArray: false, params: {endpoint: "comments"}},
                    feedback_analysis_breakdown: {method: "JSONP",isArray: false, params: {endpoint: "feedback_analysis_breakdown"}},
                    map_view: {method: "JSONP",isArray: false, params: {endpoint: "map_view"}, transformResponse: function(data, headers){
                      _.each(data.branches, function(branch){
                        branch.position = branch.latitude +"," +branch.longitude;
                      });
                      return data;
                    }},
                    feedback_segmentation: {method: "JSONP",isArray: false, params: {endpoint: "feedback_segmentation"}},
                    top_concerns: {method: "JSONP", isArray: false, params: {endpoint: "top_concerns"}}
                 });
  }

  Graphs.prototype.overall_rating = function(option_id){
    option_id = option_id || "";
    return this.service.overall_rating({option: option_id});
  };

  Graphs.prototype.top_concerns = function(top_concerns){
    return this.service.top_concerns();
  };

  Graphs.prototype.feedback_segmentation = function(date, option_id){
    date = date || "";
    return this.service.feedback_segmentation({date: date, option: option_id});
  };

  Graphs.prototype.map_view = function(){
    return this.service.map_view();
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

  Graphs.prototype.feedback_analysis_breakdown = function(region_id, city_id, branch_id, option_id){
    region_id = region_id || "";
    city_id = city_id || "";
    branch_id = branch_id || "";
    option_id = option_id || "";
    return this.service.feedback_analysis_breakdown({region: region_id, city: city_id, branch: branch_id, option: option_id});
  };

  return new Graphs();
}]);