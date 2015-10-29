angular.module('templates-app', ['dashboard/category-performance-analysis/category-performance-analysis.tpl.html', 'dashboard/dashboard.tpl.html', 'dashboard/feedback-map/feedback-map.tpl.html', 'dashboard/overall-feedback/overall-feedback.tpl.html', 'dashboard/overall-rating/overall-rating.tpl.html', 'dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html', 'dashboard/regional-analysis/regional-analysis.tpl.html', 'dashboard/statistics/statistics.tpl.html']);

angular.module("dashboard/category-performance-analysis/category-performance-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/category-performance-analysis/category-performance-analysis.tpl.html",
    "<div ng-controller = \"CategoryPerformanceAnalysisCtrl\">    \n" +
    "  <section class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "       <h4>Category Performance Analysis</h4>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<br/>\n" +
    "<div class = \"row\">\n" +
    "  <div class = \"col-xs-12 col-sm-12 col-md-6 col-lg-6\">\n" +
    "    <div ui-view=\"feedback_map\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class = \"col-xs-12 col-sm-12 col-md-6 col-lg-6\">\n" +
    "    <div ui-view=\"category_performance_analysis\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class = \"row\">\n" +
    "  <div class = \"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n" +
    "    <div ui-view=\"regional_analysis\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class = \"row\">\n" +
    "  <div class = \"col-xs-12 col-sm-12 col-md-6 col-lg-6\">\n" +
    "    <div ui-view=\"overall_rating\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class = \"col-xs-12 col-sm-12 col-md-6 col-lg-6\">\n" +
    "    <div ui-view=\"overall_feedback\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class = \"row\">\n" +
    "  <div class = \"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n" +
    "    <div ui-view=\"statistics\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class = \"row\">\n" +
    "  <div class = \"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n" +
    "    <div ui-view=\"positive_negative_feedback\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "  ");
}]);

angular.module("dashboard/feedback-map/feedback-map.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/feedback-map/feedback-map.tpl.html",
    "<div ng-controller = \"FeedbackMapCtrl\">    \n" +
    "  <section class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "      <h4>Feedback Map</h4>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/overall-feedback/overall-feedback.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-feedback/overall-feedback.tpl.html",
    "<div ng-controller = \"OverallFeedbackCtrl\">    \n" +
    "  <section class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "      <h4>Overall Feedback</h4>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/overall-rating/overall-rating.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-rating/overall-rating.tpl.html",
    "<div ng-controller = \"OverallRatingCtrl\">    \n" +
    "  <section class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "      <h4>Overall Rating</h4>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html",
    "<div ng-controller = \"PositiveNegativeFeedbackCtrl\">    \n" +
    "  <section class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "      <h4>Positive Negative Feedback</h4>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/regional-analysis/regional-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/regional-analysis/regional-analysis.tpl.html",
    "<div ng-controller = \"RegionalAnalysisCtrl\">    \n" +
    "\n" +
    "  <section class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "      <h4> Regional Analysis </h4>\n" +
    "      <div class=\"col-md-3\" ng-repeat = \"region in donut_graph_data.regions track by $index\">\n" +
    "        <div morris-chart data-data=\"donut_graph_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_graph_data.donutOptions[$index]\"></div>\n" +
    "        <div style = \"text-align:center\">\n" +
    "        	<span>Region {{$index + 1}}</span>&nbsp;<span>{{region}}</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/statistics/statistics.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/statistics/statistics.tpl.html",
    "<div ng-controller = \"StatisticsCtrl\">    \n" +
    "  <section class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "      <h4>Statistics</h4>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "  ");
}]);
