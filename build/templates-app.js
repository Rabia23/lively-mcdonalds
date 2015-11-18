angular.module('templates-app', ['dashboard/category-performance-analysis/category-performance-analysis.tpl.html', 'dashboard/dashboard.tpl.html', 'dashboard/feedback-map/feedback-map.tpl.html', 'dashboard/overall-feedback/overall-feedback.tpl.html', 'dashboard/overall-rating/overall-rating.tpl.html', 'dashboard/positive-negative-feedback/comments-modal.tpl.html', 'dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html', 'dashboard/regional-analysis/regional-analysis.tpl.html', 'dashboard/regional-analysis/sqc-modal.tpl.html', 'dashboard/statistics/statistics.tpl.html']);

angular.module("dashboard/category-performance-analysis/category-performance-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/category-performance-analysis/category-performance-analysis.tpl.html",
    "<div class=\"info-holder\">\n" +
    "  <h2>Category Performance Analysis</h2>\n" +
    "  <div class=\"progress-area\" ng-controller=\"CategoryPerformanceAnalysisCtrl\">\n" +
    "\n" +
    "    <div class=\"progress-holder {{dat.class}}\" ng-repeat = \"dat in category_performance\">\n" +
    "\n" +
    "    <small><em>{{dat.name}}</em></small>\n" +
    "    \n" +
    "    	<div class=\"progress-block\">\n" +
    "    		<uib-progressbar animate=\"false\" value=\"dat.percentage\" type=\"success\"><b>{{dat.percentage}}%</b></uib-progressbar>\n" +
    "    	</div>\n" +
    "\n" +
    "  </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "  ");
}]);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<section class = \"section\">\n" +
    "  <div class = \"block\" ui-view = \"overall_rating\" ng-controller = \"OverallRatingCtrl\"></div>\n" +
    "  <div class = \"block\" ui-view = \"overall_feedback\" ng-controller = \"OverallFeedbackCtrl\"></div>\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "<section class = \"section\" ui-view=\"regional_analysis\" ng-controller = \"RegionalAnalysisCtrl\"></section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<section class = \"section\">\n" +
    "  <div class = \"block\" ui-view = \"feedback_map\" ng-controller = \"FeedbackMapCtrl\"></div>\n" +
    "  <div class = \"block\" ui-view = \"category_performance_analysis\" ng-controller = \"CategoryPerformanceAnalysisCtrl\"></div>\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "<!--<div class = \"row\">\n" +
    "  <div class = \"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n" +
    "    <div ui-view=\"statistics\"></div>\n" +
    "  </div>\n" +
    "</div> -->\n" +
    "\n" +
    "<section class = \"section\">\n" +
    "  <div class=\"section-holder\" ng-controller = \"PositiveNegativeFeedbackCtrl\">\n" +
    "      <div ui-view = \"positive_negative_feedback\"></div>\n" +
    "  </div>\n" +
    "</section>\n" +
    "\n" +
    "  ");
}]);

angular.module("dashboard/feedback-map/feedback-map.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/feedback-map/feedback-map.tpl.html",
    "<div class=\"info-block\">\n" +
    "  <div class=\"info-box\">\n" +
    "    <div class=\"heading\">\n" +
    "      <h2>Feedback Map</h2>\n" +
    "      <p>Country where the user has given the Survey</p>\n" +
    "    </div>\n" +
    "    <ul class=\"list\">\n" +
    "      <li class=\"v-good\">200+</li>\n" +
    "      <li class=\"negative\">200-</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"map-holder\">\n" +
    "    <div map-lazy-load=\"http://maps.google.com/maps/api/js\">\n" +
    "      <map center=\"30,70\" zoom=\"{{zoom}}\" disable-default-u-i=\"true\">\n" +
    "      </map>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard/overall-feedback/overall-feedback.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-feedback/overall-feedback.tpl.html",
    "<div class=\"feedback-block\">\n" +
    "  <h2>Overall Feedback</h2>\n" +
    "  <!-- <ul class=\"title-list\">\n" +
    "    <li ng-repeat = \"feedback in overall_feedback\" class = \"{{feedback.class}}\">\n" +
    "      {{feedback.name}}\n" +
    "    </li>\n" +
    "  </ul> -->\n" +
    "  <div class=\"feedback-holder\">\n" +
    "  	<ul class=\"feedback-list\">\n" +
    "  	  <li class=\"{{feedback.class}}\" ng-repeat = \"feedback in overall_feedback\">\n" +
    "  	    <div class=\"img-holder\">\n" +
    "  	      <ul class=\"ico-list\" ng-if = \"feedback.class == 'v-good'\">\n" +
    "  	        <li ng-repeat='val in feedback.columns'>\n" +
    "  	          <ul>\n" +
    "  	            <li><span class=\"icon-thumbs-up\"></span></li>\n" +
    "  	            <li><span class=\"icon-thumbs-up\"></span></li>\n" +
    "  	            <li><span class=\"icon-thumbs-up\"></span></li>\n" +
    "  	          </ul>\n" +
    "  	        </li>\n" +
    "  	      </ul>\n" +
    "  	      <ul class=\"ico-list\" ng-if = \"feedback.class == 'good'\">\n" +
    "  	        <li ng-repeat='val in feedback.columns'>\n" +
    "  	          <ul>\n" +
    "  	            <li><span class=\"icon-thumbs-up\"></span></li>\n" +
    "  	            <li><span class=\"icon-thumbs-up\"></span></li>\n" +
    "  	            <li><span class=\"icon-thumbs-up\"></span></li>\n" +
    "  	          </ul>\n" +
    "  	        </li>\n" +
    "  	      </ul>\n" +
    "  	      <ul class=\"ico-list\" ng-if = \"feedback.class == 'neutral'\">\n" +
    "  	        <li ng-repeat='val in feedback.columns'>\n" +
    "  	          <ul>\n" +
    "  	            <li><span class=\"icon-thumbs-down\"></span></li>\n" +
    "  	            <li><span class=\"icon-thumbs-down\"></span></li>\n" +
    "  	            <li><span class=\"icon-thumbs-down\"></span></li>\n" +
    "  	          </ul>\n" +
    "  	        </li>\n" +
    "  	      </ul>\n" +
    "  	      <ul class=\"ico-list\" ng-if = \"feedback.class == 'negative'\">\n" +
    "  	        <li ng-repeat='val in feedback.columns'>\n" +
    "  	          <ul>\n" +
    "  	            <li><span class=\"icon-thumbs-down\"></span></li>\n" +
    "  	            <li><span class=\"icon-thumbs-down\"></span></li>\n" +
    "  	            <li><span class=\"icon-thumbs-down\"></span></li>\n" +
    "  	          </ul>\n" +
    "  	        </li>\n" +
    "  	      </ul>\n" +
    "  	    </div>\n" +
    "  	    <h3>\n" +
    "  	      <span class=\"count\">{{feedback.rounded_percentage}}%</span>  \n" +
    "  	    </h3>\n" +
    "  	  </li>\n" +
    "  	</ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/overall-rating/overall-rating.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-rating/overall-rating.tpl.html",
    "<div class=\"rating-section\" ng-class = \"{loading: show_loading}\">\n" +
    "  <header class=\"heading-block\">\n" +
    "    <h2>Overall Rating</h2>\n" +
    "    <a ng-click = \"backToMain()\" ng-hide = \"mainView\">Back</a>\n" +
    "  </header>\n" +
    "  <div class=\"rating-holder\">\n" +
    "    <ul>\n" +
    "      <li ng-repeat = \"label in labels track by $index\" class = \"item{{$index + 1}}\">\n" +
    "        <a style = \"cursor:pointer;\" ng-click = \"labelClick(label)\">{{label.value}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <!-- <div id = \"overall-rating-linechart\" data-flot-chart data-data=\"line1.data\" data-options=\"line1.options\" style=\"width: 100%; height: 300px;\" data-bind-plotclick></div> -->\n" +
    "     <flot dataset=\"line1.data\" options=\"line1.options\" data-width = \"100%\" data-height = \"300px\" on-plot-click = \"optionClick(event, pos, item)\"></flot>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/positive-negative-feedback/comments-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/positive-negative-feedback/comments-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "  <a ng-click = \"cancel()\" class=\"pull-right close-btn-font\"><i class=\"glyphicon glyphicon-remove\"></i></a>\n" +
    "  <h2>Positive Negative Feedback</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    " <div id=\"scrollbar\" custom-scroll>\n" +
    "  <table class=\"table\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"item1\">Name</th>\n" +
    "        <th class=\"item2\">Phone Number</th>\n" +
    "        <th class=\"item3\">Branch</th>\n" +
    "        <th class=\"item4\">Segment</th>\n" +
    "        <th class=\"item5\">Comments</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "  </table>\n" +
    "  <div id=\"scrollbox2\" ng-class = \"{loading: lock}\" custom-scroll when-scrolled=\"getMoreComments()\">\n" +
    "    <table class=\"table\">\n" +
    "      <tbody>\n" +
    "        <tr ng-repeat = \"comment in comments\">\n" +
    "          <td class=\"item1\">{{comment.user_name}}</td>\n" +
    "          <td class=\"item2\">\n" +
    "            <a href=\"tel:{{comment.user_phone}}\" class=\"tel\">{{comment.user_phone}}</a>\n" +
    "          </td>\n" +
    "          <td class=\"item3\">{{comment.branch}}</td>\n" +
    "          <td class=\"item4\">N/A</td>\n" +
    "          <td class=\"item5\">{{comment.comment}}</td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "    <span class=\"loader\"></span>\n" +
    "  </div>\n" +
    " </div>\n" +
    "</div>");
}]);

angular.module("dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html",
    "<div class=\"review-block\">\n" +
    "  <div class = \"pull-right\">\n" +
    "    <a class = \"btn btn-default\" ng-click = \"open()\">View All</a>\n" +
    "  </div>\n" +
    "  <h2>Positive Negative Feedback</h2>\n" +
    "  <div class=\"holder\">\n" +
    "    <ul>\n" +
    "      <li ng-repeat = \"pos_feedback in pos_feedbacks\">\n" +
    "        <div class=\"inner-holder\">\n" +
    "          <div class=\"ico-holder\">\n" +
    "            <span class=\"icon-thumbs-up\"></span>\n" +
    "          </div>\n" +
    "          <div class=\"text\">\n" +
    "            <p>{{pos_feedback.comment}}</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"add\">\n" +
    "      <li ng-repeat = \"neg_feedback in neg_feedbacks\">\n" +
    "        <div class=\"inner-holder\">\n" +
    "          <div class=\"ico-holder\">\n" +
    "            <span class=\"icon-thumbs-down\"></span>\n" +
    "          </div>\n" +
    "          <div class=\"text\">\n" +
    "            <p>{{neg_feedback.comment}}</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/regional-analysis/regional-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/regional-analysis/regional-analysis.tpl.html",
    "<div class=\"section-holder\" >\n" +
    "  <div class=\"info-area\" ng-class=\"{loading: show_loading}\">\n" +
    "    <div class=\"btn-group pull-right\">\n" +
    "      <label class=\"btn btn-default\" ng-model=\"radioModel\" uib-btn-radio=\"'Rating'\" ng-click = \"showChart(null, 'regions')\">Rating</label>\n" +
    "      <label class=\"btn btn-default\" ng-model=\"radioModel\" uib-btn-radio=\"'SQC'\" ng-click = \"showChart(null, 'regions')\">SQC</label>\n" +
    "    </div>\n" +
    "    <h2 ng-show = \"regional_view\">Regional Analysis</h2>  \n" +
    "    <h2 ng-show = \"regional_view == false && city_view == true\">{{selected_region.name}} Region City Analysis</h2>\n" +
    "    <h2 ng-show = \"regional_view == false && city_view == false\">{{selected_city.name}} City Branch Analysis</h2>\n" +
    "    <div class = \"breadcrum\">\n" +
    "      <span ng-hide = \"regional_view\">\n" +
    "        <a ng-click = \"backToRegions()\" style = \"style: cursor:pointer\">Regions /</a>\n" +
    "      </span>\n" +
    "      <span ng-show = \"regional_view == false && city_view == false\">\n" +
    "        <a ng-click = \"backToCities(selected_region)\" style = \"cursor:pointer;\">{{selected_region.name}} /</a>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"info-list\" ng-show = \"regional_view == true\">\n" +
    "      <li ng-repeat = \"region in donut_graph_data.objects track by $index\">\n" +
    "        <div class=\"graph-holder\">\n" +
    "          <div morris-chart data-data=\"donut_graph_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_graph_data.donutOptions[$index]\" data-action=\"open(option,region)\"></div>\n" +
    "        </div>\n" +
    "        <h3>\n" +
    "          <a ng-click = \"showChart(region, 'cities')\" style = \"cursor:pointer;\">{{region.name}}</a>\n" +
    "        </h3>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <ul class=\"info-list\" ng-show = \"regional_view == false && city_view == true \">\n" +
    "      <li ng-repeat = \"city in donut_cities_data.objects track by $index\">\n" +
    "        <div class=\"graph-holder\">\n" +
    "          <div morris-chart data-data=\"donut_cities_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_cities_data.donutOptions[$index]\"></div>\n" +
    "        </div>\n" +
    "        <h3>\n" +
    "          <a ng-click = \"showChart(city, 'branches')\" style = \"cursor:pointer;\">{{city.name}}</a>\n" +
    "        </h3>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"info-list\" ng-show = \"regional_view == false && city_view == false\">\n" +
    "      <li ng-repeat = \"branch in donut_branches_data.objects track by $index\">\n" +
    "        <div class=\"graph-holder\">\n" +
    "          <div morris-chart data-data=\"donut_branches_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_branches_data.donutOptions[$index]\"></div>\n" +
    "        </div>\n" +
    "        <h3>{{branch.name}}</h3>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/regional-analysis/sqc-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/regional-analysis/sqc-modal.tpl.html",
    "<div class=\"modal-body info-area\">\n" +
    "  <h2 ng-show = \"regional_view\">Regional Analysis</h2>\n" +
    "	<a href=\"#\" class=\"btn-slider glyphicon glyphicon-menu-left\"></a>\n" +
    "	<a href=\"#\" class=\"btn-slider glyphicon glyphicon-menu-right\"></a>\n" +
    "\n" +
    "  <div class=\"graph-holder\">\n" +
    "    <div morris-chart-modal data-data=\"donut_subgraph_data.donutData\" data-type=\"donut\" data-options=\"donut_subgraph_data.donutOptions\"></div>\n" +
    "  </div>\n" +
    "  <h3>\n" +
    "    <a ng-click = \"showChart(region, 'cities')\" style = \"cursor:pointer;\">{{region}}</a>\n" +
    "  </h3>\n" +
    "\n" +
    "\n" +
    "</div>");
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
