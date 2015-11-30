angular.module('templates-app', ['dashboard/category-performance-analysis/category-performance-analysis.tpl.html', 'dashboard/dashboard.tpl.html', 'dashboard/feedback-map/feedback-map.tpl.html', 'dashboard/overall-feedback/overall-feedback.tpl.html', 'dashboard/overall-rating/overall-rating.tpl.html', 'dashboard/positive-negative-feedback/comments-modal.tpl.html', 'dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html', 'dashboard/regional-analysis/regional-analysis.tpl.html', 'dashboard/regional-analysis/sqc-modal.tpl.html', 'dashboard/statistics/statistics.tpl.html', 'dashboard/top-concern/top-concern.tpl.html']);

angular.module("dashboard/category-performance-analysis/category-performance-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/category-performance-analysis/category-performance-analysis.tpl.html",
    "<div class=\"section-holder ng-scope\">\n" +
    "	<div class=\"info-holder\">\n" +
    "  \n" +
    "  <div class=\"heading-holder\">\n" +
    "  	<h2>Overall Rating</h2>\n" +
    "  	<ul>\n" +
    "  		<li><a href=\"#\" class=\"btn btn-default\"  ng-class=\"{active: show_active}\" ng-click = \"onClick(null, 'All')\">all</a></li>\n" +
    "  		<li><a href=\"#\" class=\"btn btn-default\"  ng-click = \"onClick(QualityID, 'Quality')\">Quality</a></li>\n" +
    "  		<li><a href=\"#\" class=\"btn btn-default\"  ng-click = \"onClick(ServiceID, 'Service')\">Service</a></li>\n" +
    "  		<li><a href=\"#\" class=\"btn btn-default\"  ng-click = \"onClick(CleanlinessID, 'Cleanliness')\">Cleanliness</a></li>\n" +
    "  		<li>\n" +
    "			<div class=\"calender-outer\">\n" +
    "				<span class = \"calendar-holder pull-right\">\n" +
    "				  <input date-range-picker id=\"daterange-map\" readonly=\"readonly\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" />\n" +
    "				  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "		</li>\n" +
    "  	</ul>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"progress-container {{class}}\">\n" +
    "  	<div class=\"holder\">\n" +
    "  		<ul class=\"list add\">\n" +
    "			<li ng-repeat = \"dat in category_data\"><a href=\"#\">{{dat.name}}</a></li>\n" +
    "		</ul>\n" +
    "  		<div class=\"progress-area\">\n" +
    "\n" +
    "			<div class=\"progress-section\" ng-repeat = \"segment in segments\">\n" +
    "\n" +
    "			<small><em>{{segment.name}}</em></small>\n" +
    "\n" +
    "				<div class=\"inner-holder\">\n" +
    "					 <uib-progress><uib-bar ng-repeat=\"bar in segment.segment_data track by $index\" value=\"bar.percentage\" type=\"{{bar.class}}\"><span>{{bar.complaints}}</span></uib-bar></uib-progress>\n" +
    "				</div>\n" +
    "\n" +
    "		  </div>\n" +
    "		</div>\n" +
    "  	</div>\n" +
    "  	<div class=\"holder\">\n" +
    "  		<div class=\"progress-area\">\n" +
    "			<div class=\"progress-holder {{dat.colour}}\" ng-repeat = \"dat in category_data\">\n" +
    "				<small><em>{{dat.name}}</em></small>\n" +
    "				<div class=\"progress-block\"><uib-progressbar animate=\"false\" value=\"dat.percentage\" type=\"success\"><b>{{dat.complaints}}</b></uib-progressbar></div>\n" +
    "		  </div>\n" +
    "  		</div>\n" +
    "  	</div>\n" +
    "  </div>\n" +
    "</div> \n" +
    "</div>");
}]);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<section class = \"section\" ui-view = \"category_performance_analysis\" ng-controller = \"CategoryPerformanceAnalysisCtrl\">\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "<section class = \"section\">\n" +
    "  <div class = \"block\" ui-view = \"overall_feedback\" ng-controller = \"OverallFeedbackCtrl\"></div>\n" +
    "  \n" +
    "  <div class = \"block\" ui-view = \"top_concern\" ng-controller = \"TopConcernCtrl\"></div>\n" +
    "</section>\n" +
    "\n" +
    "<section class = \"section\" ui-view=\"regional_analysis\" ng-controller = \"RegionalAnalysisCtrl\"></section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<section class = \"section\">\n" +
    "  <div class = \"block\" ui-view = \"feedback_map\" ng-controller = \"FeedbackMapCtrl\"></div>\n" +
    "  <div class = \"block\" ui-view = \"overall_rating\" ng-controller = \"OverallRatingCtrl\"></div>\n" +
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
    "      <h2>Map</h2>\n" +
    "      <div class=\"calender-outer\">\n" +
    "        	<span class = \"calendar-holder pull-right\">\n" +
    "			  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" />\n" +
    "			  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "			</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <ul class=\"list\">\n" +
    "      <li class=\"v-good\">Above Benchmark</li>\n" +
    "      <li class=\"negative\">Below Benchmark</li>\n" +
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
    "  <div class=\"heading-holder\">\n" +
    "  	<div class=\"calender-outer\">\n" +
    "		<span class = \"calendar-holder pull-right\">\n" +
    "		  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" />\n" +
    "		  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "		</span>\n" +
    "	</div>\n" +
    "	<h2>Rating</h2>\n" +
    "  </div>\n" +
    "  <div class=\"inner-block\">\n" +
    "  	<ul class=\"list\">\n" +
    "      <li class=\"v-good\"><a href=\"#\">I'm lovin' it</a></li>\n" +
    "      <li class=\"good\"><a href=\"#\">Everything on track</a></li>\n" +
    "      <li class=\"neutral\"><a href=\"#\">Few Concern</a></li>\n" +
    "      <li class=\"negative\"><a href=\"#\">Not Happy Enough</a></li>\n" +
    "    </ul>\n" +
    "  	<div class=\"graph-holder\">\n" +
    "		<canvas id=\"bar\" class=\"chart chart-bar\" chart-data=\"data\" chart-labels=\"labels\" chart-colours=\"colours\" chart-options=\"options\"></canvas>\n" +
    "	  </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/overall-rating/overall-rating.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-rating/overall-rating.tpl.html",
    "<div class=\"rating-section\" ng-class = \"{loading: show_loading}\">\n" +
    "  <header class=\"heading-block\">\n" +
    "    <h2>Timeline</h2>\n" +
    "    <div class=\"pull-right\">\n" +
    "		<div class=\"calender-outer\">\n" +
    "			<span class = \"calendar-holder pull-right\">\n" +
    "			  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" />\n" +
    "			  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "			</span>\n" +
    "		</div>\n" +
    "   		<span class=\"select-holder\">\n" +
    "   			<select>\n" +
    "				<option>Daily</option>\n" +
    "				<option>Weekly</option>\n" +
    "				<option>Monthly</option>\n" +
    "				<option>Quaterly</option>\n" +
    "				<option>Yearly</option>\n" +
    "			</select>\n" +
    "   		</span>\n" +
    "    	<a ng-click = \"backToMain()\" ng-hide = \"mainView\">Back</a>\n" +
    "    </div>\n" +
    "  </header>\n" +
    "  <div class=\"rating-holder\">\n" +
    "    <ul>\n" +
    "      <li ng-repeat = \"label in labels track by $index\">\n" +
    "        <span class=\"bullet\" style = \"background-color: {{label.color}}\"></span>\n" +
    "        <a style = \"cursor:pointer\" ng-click = \"labelClick(label)\">{{label.value}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <div class=\"graph-holder\">\n" +
    "    	<div class=\"inner-holder\">\n" +
    "    		<flot dataset=\"line1.data\" options=\"line1.options\" data-width = \"100%\" data-height = \"300px\" on-plot-click = \"optionClick(event, pos, item)\"></flot>\n" +
    "    	</div>\n" +
    "    </div>\n" +
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
    "        <th class=\"item6\">Take Action</th>\n" +
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
    "          <td class=\"item5\">\n" +
    "          	<span class=\"ico\"></span>\n" +
    "          	<div class=\"text\">\n" +
    "          		{{comment.comment}}\n" +
    "          	</div>\n" +
    "          </td>\n" +
    "          <td class=\"item6\"><a href=\"#\" class=\"btn btn-info\">Process</a></td>\n" +
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
    "  <div class=\"heading-block\">\n" +
    "  	<div class = \"pull-right\">\n" +
    "		<a class = \"btn btn-default\" ng-click = \"open()\">View All Feedback</a>\n" +
    "	  </div>\n" +
    "	  <h2>Positive Negative Feedback</h2>\n" +
    "  </div>\n" +
    "  <div class=\"holder\">\n" +
    "    <ul>\n" +
    "      <li ng-repeat = \"pos_feedback in pos_feedbacks\">\n" +
    "        <div class=\"inner-holder\">\n" +
    "            <div class=\"text\">\n" +
    "            	<p>{{pos_feedback.comment}}</p>\n" +
    "            </div>\n" +
    "            <span class=\"arrow\"></span>\n" +
    "        </div>\n" +
    "        <time>{{pos_feedback.created_at | date:\"dd-MM-yyyy',' h:mm a\"}}</time>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"add\">\n" +
    "      <li ng-repeat = \"neg_feedback in neg_feedbacks\">\n" +
    "        <div class=\"inner-holder\">\n" +
    "            <div class=\"text\">\n" +
    "            	<p>{{neg_feedback.comment}}</p>\n" +
    "            </div>\n" +
    "            <span class=\"arrow\"></span>\n" +
    "        </div>\n" +
    "        <time>{{neg_feedback.created_at | date:\"dd-MM-yyyy',' h:mm a\"}}</time>\n" +
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
    "    <div class=\"heading-holder\">\n" +
    "    	<h2 ng-show = \"regional_view\">Regional Analysis</h2>  \n" +
    "		<h2 ng-show = \"regional_view == false && city_view == true\">{{selected_region.name}} Region City Analysis</h2>\n" +
    "		<h2 ng-show = \"regional_view == false && city_view == false\">{{selected_city.name}} City Branch Analysis</h2>\n" +
    "    	<div class=\"btn-group pull-right\">\n" +
    "		  	  <ul>\n" +
    "		  	  	<li><label class=\"btn btn-default\" ng-model=\"radioModel\" uib-btn-radio=\"'Comments'\" ng-click = \"showChart(null, 'regions')\">Comments</label></li>\n" +
    "		  	  	<li> <label class=\"btn btn-default\" ng-model=\"radioModel\" uib-btn-radio=\"'Rating'\" ng-click = \"showChart(null, 'regions')\">Rating</label></li>\n" +
    "		  	  	<li><label class=\"btn btn-default\" ng-model=\"radioModel\" uib-btn-radio=\"'QSC'\" ng-click = \"showChart(null, 'regions')\">QSC</label></li>\n" +
    "		  	  	<li>\n" +
    "		  	  		<div class=\"calender-outer\">\n" +
    "					<span class = \"calendar-holder\">\n" +
    "					  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" />\n" +
    "					  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "					</span>\n" +
    "				  </div>\n" +
    "		  	  	</li>\n" +
    "		  	  </ul>\n" +
    "		</div>\n" +
    "    </div>\n" +
    "    <div class=\"holder\">\n" +
    "    	<div class = \"breadcrum\">\n" +
    "      <span ng-hide = \"regional_view\">\n" +
    "        <a ng-click = \"backToRegions()\" style = \"style: cursor:pointer\">Regions /</a>\n" +
    "      </span>\n" +
    "      <span ng-show = \"regional_view == false && city_view == false\">\n" +
    "        <a ng-click = \"backToCities(selected_region)\" style = \"cursor:pointer;\">{{selected_region.name}} /</a>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"list-container\">\n" +
    "    	<div class=\"inner-holder\">\n" +
    "    		<ul class=\"info-list\" ng-show = \"regional_view == true\">\n" +
    "      <li ng-repeat = \"region in donut_graph_data.objects track by $index\">\n" +
    "        <div class=\"graph-holder\">\n" +
    "          <div morris-chart data-data=\"donut_graph_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_graph_data.donutOptions[$index]\" data-action=\"open(option,region,city,branch)\"></div>\n" +
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
    "          <div morris-chart data-data=\"donut_cities_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_cities_data.donutOptions[$index]\" data-action=\"open(option,selected_region,city,branch)\"></div>\n" +
    "        </div>\n" +
    "        <h3>\n" +
    "          <a ng-click = \"showChart(city, 'branches')\" style = \"cursor:pointer;\">{{city.name}}</a>\n" +
    "        </h3>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"info-list\" ng-show = \"regional_view == false && city_view == false\">\n" +
    "      <li ng-repeat = \"branch in donut_branches_data.objects track by $index\">\n" +
    "        <div class=\"graph-holder\">\n" +
    "          <div morris-chart data-data=\"donut_branches_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_branches_data.donutOptions[$index]\" data-action=\"open(option,selected_region,selected_city,branch)\"></div>\n" +
    "        </div>\n" +
    "        <h3>{{branch.name}}</h3>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    	</div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/regional-analysis/sqc-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/regional-analysis/sqc-modal.tpl.html",
    "<div class=\"modal-body info-area\">\n" +
    "  <h2>Regional Analysis</h2>\n" +
    "	<a href=\"#\" class=\"btn-slider glyphicon glyphicon-menu-left\" ng-click=\"leftClickDisabled || previous(region,city,branch,sqc_data)\"></a>\n" +
    "	<a href=\"#\" class=\"btn-slider glyphicon glyphicon-menu-right\" ng-click=\"rightClickDisabled || next(region,city,branch,sqc_data)\" ng-model=\"isDisabled\" ng-disabled=\"isDisabled\"></a>\n" +
    "\n" +
    "  <div class=\"graph-holder\">\n" +
    "    <div morris-chart-modal data-data=\"donut_subgraph_data.donutData\" data-type=\"donut\" data-options=\"donut_subgraph_data.donutOptions\"></div>\n" +
    "  </div>\n" +
    "  <h1 style = \"text-align: center;\">{{ sqc.name }}</h1>\n" +
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

angular.module("dashboard/top-concern/top-concern.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/top-concern/top-concern.tpl.html",
    "<div class=\"rating-section\" ng-class = \"{loading: show_loading}\">\n" +
    "  <header class=\"heading-block\">\n" +
    "    <h2>Top Concern</h2>\n" +
    "    <div class=\"calender-outer\">\n" +
    "		<span class = \"calendar-holder pull-right\">\n" +
    "		  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" />\n" +
    "		  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "		</span>\n" +
    "	</div>\n" +
    "  </header>\n" +
    "  <div class=\"rating-holder\">\n" +
    "  	<ul>\n" +
    "  		<li ng-repeat = \"concern in data\">\n" +
    "  			<span class=\"bullet\" style = \"background-color: {{concern.color}};\"></span>\n" +
    "  			<a href=\"#\">{{concern.label}}</a>\n" +
    "  		</li>\n" +
    "  	</ul>\n" +
    "    <div class=\"graph-outer\">\n" +
    "      <div id=\"bubble-chart\" pyk-chart data-data = \"data\" data-colors = \"colors\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);
