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
                    top_concerns: {method: "JSONP", isArray: false, params: {endpoint: "top_concerns"},transformResponse: function(data, headers){
                      _.each(data.concern_list, function(concern){
                        concern.label = concern.name;
                        concern.name = concern.weight.toString();
                      });
                      return data;
                    }
                  },
                  segmentation_rating:{method: "JSONP",isArray: false, params: {endpoint: "segmentation_rating"}},
                  action_taken:{method: "JSONP",isArray: false, params: {endpoint: "action_taken"}},

                  action_analysis: {method: "JSONP",isArray: false, params: {endpoint: "action_analysis"}}
                 });
  }

  Graphs.prototype.overall_rating = function(type,option_id, date_from, date_to){
    option_id = option_id || "";
    return this.service.overall_rating({type: type, option: option_id, date_from: date_from, date_to: date_to});
  };

  Graphs.prototype.action_taken = function(feedback_id){
    return this.service.action_taken({feedback_id: feedback_id});
  };

  Graphs.prototype.top_concerns = function(top_concerns){
    return this.service.top_concerns();
  };

  Graphs.prototype.feedback_segmentation = function(date, option_id, date_from, date_to){
    date = date || "";
    return this.service.feedback_segmentation({date: date, option: option_id, date_from: date_from, date_to: date_to});
  };

  Graphs.prototype.map_view = function(date_to, date_from){
    return this.service.map_view({date_from: date_from, date_to: date_to});
  };

  Graphs.prototype.positive_negative_feedback = function(){
    return this.service.positive_negative_feedback();
  };
  Graphs.prototype.overall_feedback = function(date_from, date_to){
    return this.service.overall_feedback({date_from: date_from, date_to: date_to});
  };
  Graphs.prototype.regional_analysis = function(question_type, start_date, end_date){
    question_type = question_type || 1;
    start_date = start_date || "";
    end_date = end_date || "";
    return this.service.feedback_analysis({question_type: question_type, date_from: start_date, date_to: end_date});
  };
  Graphs.prototype.city_analysis = function(region_id, question_type, start_date, end_date){
    question_type = question_type || 1;
    region_id = region_id || "";
    start_date = start_date || "";
    end_date = end_date || "";
    return this.service.feedback_analysis({type: 2, date_from: start_date, date_to: end_date, region: region_id, question_type: question_type});
  };
  Graphs.prototype.branch_analysis = function(city_id, question_type, start_date, end_date){
    question_type = question_type || 1;
    city_id = city_id || "";
    start_date = start_date || "";
    end_date = end_date || "";
    return this.service.feedback_analysis({type: 3, date_from: start_date, date_to: end_date, city: city_id, question_type: question_type});
  };
  Graphs.prototype.category_performance = function(region_id, city_id, branch_id, option_id, start_date, end_date){
    region_id = region_id || "";
    city_id = city_id || "";
    branch_id = branch_id || "";
    option_id = option_id || "";
    start_date = start_date || "";
    end_date = end_date || "";
    return this.service.category_performance({region: region_id, city: city_id, branch: branch_id, option: option_id, date_from: start_date, date_to: end_date});
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
  Graphs.prototype.segmentation_rating = function(region_id, city_id, branch_id, option_id, start_date, end_date){
    region_id = region_id || "";
    city_id = city_id || "";
    branch_id = branch_id || "";
    option_id = option_id || "";
    start_date = start_date || "";
    end_date = end_date || "";
    return this.service.segmentation_rating({region: region_id, city: city_id, branch: branch_id, option: option_id, date_from: start_date, date_to: end_date});
  };
  Graphs.prototype.action_analysis = function(type_id, region_id, city_id, date_from, date_to){
    type_id = type_id || "";
    date_from = date_from || "";
    date_to = date_to || "";
    region_id = region_id || "";
    city_id = city_id || "";
    return this.service.action_analysis({type: type_id, date_from: date_from, date_to: date_to, region: region_id, city:city_id});
  };

  return new Graphs();
}]);