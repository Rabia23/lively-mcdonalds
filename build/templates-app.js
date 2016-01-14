angular.module('templates-app', ['coupon/coupon.tpl.html', 'dashboard/category-performance-analysis/category-performance-analysis.tpl.html', 'dashboard/dashboard.tpl.html', 'dashboard/feedback-map/feedback-map.tpl.html', 'dashboard/overall-feedback/overall-feedback.tpl.html', 'dashboard/overall-rating/overall-rating.tpl.html', 'dashboard/positive-negative-feedback/comments-modal.tpl.html', 'dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html', 'dashboard/regional-analysis/regional-analysis.tpl.html', 'dashboard/regional-analysis/sqc-modal.tpl.html', 'dashboard/statistics/statistics.tpl.html', 'dashboard/top-concern/top-concern.tpl.html', 'live/benchmark-map/benchmark-map.tpl.html', 'live/business-segments/business-segment.tpl.html', 'live/live.tpl.html', 'live/overall-ratings/overall-rating.tpl.html', 'live/overall-ratings/overall-ratings.tpl.html', 'live/patch-qsc-analysis/patch-qsc-analysis.tpl.html', 'live/qsc/qsc.tpl.html', 'live/top-concerns/top-concern.tpl.html', 'login/login.tpl.html']);

angular.module("coupon/coupon.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("coupon/coupon.tpl.html",
    "<div class=\"section\">\n" +
    "	<div class=\"login-block\">\n" +
    "		<div class=\"form-holder\">\n" +
    "			<div class=\"inner-holder\">\n" +
    "				<h3>Give Away</h3>\n" +
    "				<form action=\"#\" class=\"coupon-form\">\n" +
    "					<fieldset>\n" +
    "						<input type=\"text\" class=\"form-control\" placeholder=\"Enter McDonald Code\">\n" +
    "						<input type=\"submit\" value=\"Log in\" class=\"btn btn-info\">\n" +
    "					</fieldset>\n" +
    "				</form>\n" +
    "				<div class=\"form-text\">\n" +
    "					<h4>inValid COde</h4>\n" +
    "					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus, nunc id sagittis ornare, lorem.</p>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("dashboard/category-performance-analysis/category-performance-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/category-performance-analysis/category-performance-analysis.tpl.html",
    "<div class=\"section-holder ng-scope\">\n" +
    "	<div class=\"info-holder\">\n" +
    "\n" +
    "  <div class=\"heading-holder\">\n" +
    "  	<h2>Business Segment Breakdown\n" +
    "  		<span class=\"icon-help\" uib-popover=\"Representation of the overall QSC breakdown for each business segment. Change the tabs for sub-categories of each main category.\" popover-trigger=\"mouseenter\" popover-placement=\"top\"></span>\n" +
    "	</h2>\n" +
    "  	<ul>\n" +
    "  		<li><a class=\"btn btn-default\"  ng-class=\"{active: class == ''}\" ng-click = \"onClick(null, 'All')\" uib-tooltip=\"Click to view QSC Segmentation Breakdown\" >All</a></li>\n" +
    "  		<li><a class=\"btn btn-default\"  ng-class=\"{active: class == 'Quality'}\" ng-click = \"onClick(QualityID, 'Quality')\" uib-tooltip=\"Click to View Quality SubCategories Breakdown\">Quality</a></li>\n" +
    "  		<li><a class=\"btn btn-default\"  ng-class=\"{active: class == 'Service'}\" ng-click = \"onClick(ServiceID, 'Service')\" uib-tooltip=\"Click to view Service SubCategories Breakdown\">Service</a></li>\n" +
    "  		<li><a class=\"btn btn-default\"  ng-class=\"{active: class == 'Cleanliness'}\" ng-click = \"onClick(CleanlinessID, 'Cleanliness')\" uib-tooltip=\"Click to view Cleanliness SubCategories Breakdown\">Cleanliness</a></li>\n" +
    "  		<li>\n" +
    "			<div class=\"calender-outer\">\n" +
    "				<span class = \"calendar-holder pull-right\" uib-tooltip=\"Click to Select Custom Date Range\">\n" +
    "				  <input date-range-picker id=\"daterange-map\" readonly=\"readonly\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" options = \"datePickerOption\" readonly=\"true\"/>\n" +
    "				  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "		</li>\n" +
    "  	</ul>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"progress-container\" ng-class=\"{loading: show_loading}\">\n" +
    "  	<ul class=\"list add\">\n" +
    "		  <li ng-repeat = \"dat in category_data\"><span class=\"bullet\" style = \"background-color: {{dat.colour}}\"></span>{{dat.name}}</li>\n" +
    "	  </ul>\n" +
    "  	<div class=\"main-holder\">\n" +
    "  		<div class=\"holder\">\n" +
    "  		<div class=\"progress-area\" data-data = \"segments\" segment-progress-bar-background>\n" +
    "\n" +
    "			<div class=\"progress-section\" ng-repeat = \"segment in segments\" >\n" +
    "\n" +
    "			<small><em>{{segment.name}}</em></small>\n" +
    "\n" +
    "			<div class=\"inner-holder\">\n" +
    "				 <uib-progress>\n" +
    "					 <uib-bar ng-repeat=\"bar in segment.segment_data\" value=\"bar.percentage\" data-color = \"{{bar.colour}}\">\n" +
    "						 <span>{{bar.complaints}}</span></uib-bar>\n" +
    "				 </uib-progress>\n" +
    "			</div>\n" +
    "\n" +
    "		  </div>\n" +
    "		</div>\n" +
    "  	</div>\n" +
    "  	<div class=\"holder\">\n" +
    "  		<div class=\"progress-area\">\n" +
    "			<div class=\"progress-holder\" ng-repeat = \"dat in category_data\" data-color = \"dat.colour\" data-data = \"category_data\" progress-bar-background>\n" +
    "				<small><em>{{dat.name}}</em></small>\n" +
    "				<div class=\"progress-block\"><uib-progressbar animate=\"false\" value=\"dat.percentage\" type=\"success\"><b>{{dat.complaints}} complaints</b></uib-progressbar></div>\n" +
    "		  </div>\n" +
    "  		</div>\n" +
    "  	</div>\n" +
    "  	</div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<section class = \"section\" ui-view = \"category_performance_analysis\" ng-controller = \"CategoryPerformanceAnalysisCtrl\">\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "<section class = \"section\">\n" +
    "  <div class = \"block\" ui-view = \"overall_feedback\"></div>\n" +
    "  \n" +
    "  <div class = \"block\" ui-view = \"top_concern\"></div>\n" +
    "</section>\n" +
    "\n" +
    "<section class = \"section\" ui-view=\"regional_analysis\" ng-controller = \"RegionalAnalysisCtrl\"></section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<section class = \"section\">\n" +
    "  <div class = \"block\" ui-view = \"feedback_map\"></div>\n" +
    "  <div class = \"block\" ui-view = \"overall_rating\"></div>\n" +
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
    "  <div class=\"section-holder\">\n" +
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
    "      <h2>\n" +
    "      	Benchmark Map\n" +
    "      	<span class=\"icon-help\" uib-popover=\"Representation of the branch-wise benchmark for daily feedback amount. A green marker is shown for branches who met their benchmark, and red is shown for branches who didn't.\" popover-trigger=\"mouseenter\" popover-placement=\"top\"></span>\n" +
    "      </h2>\n" +
    "      <div class=\"calender-outer\">\n" +
    "        	<span class = \"calendar-holder pull-right\" uib-tooltip=\"Click to Select Custom Date Range\">\n" +
    "			  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" options = \"datePickerOption\" readonly=\"true\"/>\n" +
    "			  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "			</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"map-detail\" ng-class=\"{loading: show_loading}\">\n" +
    "  	<ul class=\"list\">\n" +
    "      <li class=\"good\">Above Benchmark</li>\n" +
    "      <li class=\"negative\">Below Benchmark</li>\n" +
    "    </ul>\n" +
    "  	<div class=\"map-holder\" same-map-height>\n" +
    "		<div class=\"inner-holder\">\n" +
    "			<div map-lazy-load=\"http://maps.google.com/maps/api/js\">\n" +
    "			  <map center=\"30,70\" zoom=\"{{zoom}}\" disable-default-u-i=\"true\" default-style=\"false\">\n" +
    "			  </map>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	  </div>\n" +
    "  </div>\n" +
    "  \n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard/overall-feedback/overall-feedback.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-feedback/overall-feedback.tpl.html",
    "<div class=\"feedback-block\">\n" +
    "  <div class=\"heading-holder\">\n" +
    "  	<div class=\"calender-outer\">\n" +
    "			<span class = \"calendar-holder pull-right\" uib-tooltip=\"Click to Select Custom Date Range\">\n" +
    "			  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" options = \"datePickerOption\" readonly=\"true\"/>\n" +
    "			  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "			</span>\n" +
    "		</div>\n" +
    "		<h2>\n" +
    "			Overall Experience\n" +
    "			<span class=\"icon-help\" uib-popover=\"Representation of the overall Feedback ratings for all respective branches. For a regional/branch breakdown, please see Patch Analysis\" popover-trigger=\"mouseenter\" popover-placement=\"top\"></span>\n" +
    "		</h2>\n" +
    "  </div>\n" +
    "  <div class=\"inner-block\" ng-class=\"{loading: show_loading}\">\n" +
    "  	<ul class=\"list\">\n" +
    "      <li class=\"v-good\">I'm lovin' it</li>\n" +
    "      <li class=\"good\">Everything on track</li>\n" +
    "      <li class=\"neutral\">Few Concern</li>\n" +
    "      <li class=\"negative\">Not Happy Enough</li>\n" +
    "    </ul>\n" +
    "  	<div class=\"graph-holder\" data-mydata = \"bar.data\" same-bar-height >\n" +
    "		<div class=\"holder\">\n" +
    "			<canvas ng-show = \"show_canvas\" style=\" width: 608px; height: 260px;\" id=\"bar\" class=\"chart chart-bar\" chart-data=\"bar.data\" chart-labels=\"bar.labels\" chart-colours=\"bar.colours\" chart-options=\"bar.options\"></canvas>\n" +
    "			<div ng-hide = \"show_canvas\"><h2>No data Available</h2></div>\n" +
    "		</div>\n" +
    "	  </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard/overall-rating/overall-rating.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-rating/overall-rating.tpl.html",
    "<div class=\"rating-section\" ng-class = \"{loading: show_loading}\">\n" +
    "  <header class=\"heading-block\">\n" +
    "    <h2>\n" +
    "    	Timeline\n" +
    "    	<span class=\"icon-help\" uib-popover=\"Representation of amount of QSC complains based on their respective time. Gives a handy daily/weekly/monthly/annual complains comparison.\" popover-trigger=\"mouseenter\" popover-placement=\"top\"></span>\n" +
    "    </h2>\n" +
    "    <div class=\"pull-right\">\n" +
    "		<div class=\"calender-outer\">\n" +
    "			<span class = \"calendar-holder pull-right\" uib-tooltip=\"Click to Select Custom Date Range\">\n" +
    "			  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" options = \"datePickerOption\" ng-disabled = \"!mainView\" readonly=\"true\"/>\n" +
    "			  <i class=\"glyphicon glyphicon-calendar\" map-range-click ></i>\n" +
    "			</span>\n" +
    "		</div>\n" +
    "   		<span class=\"select-holder\">\n" +
    "   			<select ng-disabled = \"!mainView\" ng-model= \"type\" ng-change = \"axisChanged()\" id=\"timely\" custom-form>\n" +
    "  				<option value = \"1\">Daily</option>\n" +
    "  				<option value = \"2\">Weekly</option>\n" +
    "  				<option value = \"3\">Monthly</option>\n" +
    "  				<option value = \"4\">Yearly</option>\n" +
    "			  </select>\n" +
    "   		</span>\n" +
    "    	<a ng-click = \"backToMain()\" ng-hide = \"mainView\">Back</a>\n" +
    "    </div>\n" +
    "  </header>\n" +
    "  <div class=\"rating-holder\">\n" +
    "    <ul>\n" +
    "      <li ng-repeat = \"label in qsc_labels track by $index\">\n" +
    "        <span class=\"bullet\" style = \"background-color: {{label.color}}\"></span>\n" +
    "        <a style = \"cursor:pointer\" ng-click = \"labelClick(label)\">{{label.value}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <div class=\"graph-holder\" same-rating-height data-data = \"line1.data\">\n" +
    "    	<div class=\"inner-holder\">\n" +
    "    		<flot dataset=\"line1.data\" options=\"line1.options\" data-width = \"100%\" data-height = \"300px\" on-plot-click = \"optionClick(event, pos, item)\"></flot>\n" +
    "    	</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard/positive-negative-feedback/comments-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/positive-negative-feedback/comments-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "  <a ng-click = \"cancel()\" class=\"pull-right close-btn-font\"><i class=\"glyphicon glyphicon-remove\"></i></a>\n" +
    "  <h2>Positive Negative Feedback</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"table-holder\">\n" +
    "  	<div class=\"table-block jcf-scrollable\" custom-form>\n" +
    "  		<table class=\"table\">\n" +
    "			<thead>\n" +
    "			  <tr>\n" +
    "				<th class=\"item1\">Name</th>\n" +
    "				<th class=\"item2\">Phone <span>Number</span><span class=\"no\">No</span>/ Email</th>\n" +
    "				<th class=\"item3\">Branch</th>\n" +
    "				<th class=\"item4\">Segment</th>\n" +
    "				<th class=\"item5\">Comments</th>\n" +
    "				<th class=\"item6\">Status</th>\n" +
    "			  </tr>\n" +
    "			</thead>\n" +
    "	  	</table>\n" +
    "		<div class=\"table-container jcf-scrollable\" data-comments = \"comments\" ng-class = \"{loading: lock}\" when-scrolled=\"getMoreComments()\" custom-form>\n" +
    "			<table class=\"table\">\n" +
    "			  <tbody>\n" +
    "				<tr ng-repeat = \"comment in comments\" ng-class = \"{negative: comment.data.is_negative, success: comment.data.action_taken === 2, defer: comment.data.action_taken === 3}\">\n" +
    "\n" +
    "				  <td class=\"item1\">{{comment.data.user_name}}</td>\n" +
    "				  <td class=\"item2\">\n" +
    "					<a href=\"tel:{{comment.phone_no}}\" class=\"tel\">{{comment.phone_no}}</a><br>\n" +
    "					<a>{{comment.email}}</a>\n" +
    "				  </td>\n" +
    "				  <td class=\"item3\">{{comment.data.branch}}</td>\n" +
    "				  <td class=\"item4\">{{comment.data.segment}}</td>\n" +
    "				  <td class=\"item5\">\n" +
    "					<span class=\"ico\"></span>\n" +
    "					<div class=\"text\">\n" +
    "						{{comment.data.comment}}\n" +
    "					</div>\n" +
    "				  </td>\n" +
    "				  <td class=\"item6\">\n" +
    "					<div class=\"btn-group\" uib-dropdown dropdown-append-to-body ng-show = \"comment.show_dropdown\">\n" +
    "					  <button type=\"button\" class=\"btn btn-info\" ng-click=\"selectedValue('Process',comment)\">Process</button>\n" +
    "					  <button id=\"btn-append-to-body\" type=\"button\" class=\"btn btn-info\" uib-dropdown-toggle>\n" +
    "						<span class=\"caret\"></span>\n" +
    "						<span class=\"sr-only\">Split button!</span>\n" +
    "					  </button>\n" +
    "					  <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"btn-append-to-body\">\n" +
    "						<li role=\"menuitem\">\n" +
    "							<a style = \"cursor:pointer;\" ng-click=\"selectedValue('Defer',comment)\">Defer</a>\n" +
    "						</li>\n" +
    "					  </ul>\n" +
    "					</div>\n" +
    "					<span ng-hide = \"comment.show_dropdown\">{{comment.action_string}}</span>\n" +
    "				   </td>\n" +
    "				</tr>\n" +
    "			  </tbody>\n" +
    "			</table>\n" +
    "			<span class=\"loader\"></span>\n" +
    "	  </div>\n" +
    "  	</div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html",
    "<div class=\"review-block\">\n" +
    "  <div class=\"heading-block\">\n" +
    "  	<div class = \"pull-right\">\n" +
    "		<a class = \"btn btn-default\" ng-click = \"open()\" uib-tooltip=\"Click to View All Feedback Details\">View All Feedback</a>\n" +
    "	  </div>\n" +
    "	  <h2>\n" +
    "	  	Positive Negative Feedback\n" +
    "	  	<span class=\"icon-help\" uib-popover=\"Represents the positive suggestions, and negative feedbacks given by the customers. Click on View All Feedback, for more details.\" popover-trigger=\"mouseenter\" popover-placement=\"top\"></span>\n" +
    "	  </h2>\n" +
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
    "");
}]);

angular.module("dashboard/regional-analysis/regional-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/regional-analysis/regional-analysis.tpl.html",
    "<div class=\"section-holder\" >\n" +
    "  <div class=\"info-area\" ng-class=\"{loading: show_loading}\">\n" +
    "    <div class=\"heading-holder\">\n" +
    "\n" +
    "    	<h2 ng-show = \"area_view\">{{title}}\n" +
    "          <span class=\"icon-help\" uib-popover=\"Representation of regional/city/branch breakdown for [1] Amount of complaint resolutions; [2] Overall Ratings; [3] QSC Complaints\" popover-trigger=\"mouseenter\" popover-placement=\"top\"></span>\n" +
    "        </h2>\n" +
    "        <h2 ng-show = \"area_view == false && regional_view == true\">{{selected_area.name}}'s Region Analysis</h2>\n" +
    "		<h2 ng-show = \"regional_view == false && city_view == true\">{{selected_region.name}}'s City Analysis</h2>\n" +
    "		<h2 ng-show = \"area_view == false && regional_view == false && city_view == false\">{{selected_city.name}}'s Branch Analysis</h2>\n" +
    "    	<div class=\"btn-group pull-right\">\n" +
    "		  	  <ul>\n" +
    "		  	  	<li><label class=\"btn btn-default\" ng-model=\"radioModel\" uib-btn-radio=\"'Complaints'\" ng-click = \"showChart(null, 'areas')\" uib-tooltip=\"Click to View Complaint Resolution Analysis\">Complaints</label></li>\n" +
    "		  	  	<li> <label class=\"btn btn-default\" ng-model=\"radioModel\" uib-btn-radio=\"'Rating'\" ng-click = \"showChart(null, 'areas')\" uib-tooltip=\"Click to View Overall Feedback Analysis\">Rating</label></li>\n" +
    "		  	  	<li><label class=\"btn btn-default\" ng-model=\"radioModel\" uib-btn-radio=\"'QSC'\" ng-click = \"showChart(null, 'areas')\" uib-tooltip=\"Click to View Overall QSC Analysis\">QSC</label></li>\n" +
    "\n" +
    "		  	  	<li>\n" +
    "		  	  		<div class=\"calender-outer\">\n" +
    "					<span class = \"calendar-holder\" uib-tooltip=\"Click to Select Custom Date Range\">\n" +
    "					  <input date-range-picker id=\"daterange-map\" name=\"daterange-map\" class=\"date-picker\" type=\"text\" ng-model=\"date\" max=\"today\" options = \"datePickerOption\" readonly=\"true\"/>\n" +
    "					  <i class=\"glyphicon glyphicon-calendar\" map-range-click></i>\n" +
    "					</span>\n" +
    "				  </div>\n" +
    "		  	  	</li>\n" +
    "		  	  </ul>\n" +
    "		</div>\n" +
    "    </div>\n" +
    "    <div class=\"holder\">\n" +
    "     <div class = \"breadcrum\">\n" +
    "        <span ng-hide = \"area_view\">\n" +
    "         <a ng-click = \"backToAreas()\" style = \"cursor:pointer\">Area/</a>\n" +
    "       </span>\n" +
    "       <span ng-show = \"area_view == false && regional_view == false\">\n" +
    "         <a ng-click = \"backToRegions(selected_area)\" style = \"cursor:pointer\">{{selected_area.name}}/</a>\n" +
    "       </span>\n" +
    "       <span ng-show = \"area_view == false && regional_view == false && city_view == false\">\n" +
    "         <a ng-click = \"backToCities(selected_region)\" style = \"cursor:pointer;\">{{selected_region.name}}/</a>\n" +
    "       </span>\n" +
    "     </div>\n" +
    "\n" +
    "    <div class=\"list-container\">\n" +
    "    	<div class=\"inner-holder\">\n" +
    "    		<div class=\"list-inner\">\n" +
    "\n" +
    "             <ul class=\"info-list\" ng-show = \"area_view == true\">\n" +
    "              <li ng-repeat = \"area in donut_graph_data.objects track by $index\">\n" +
    "                <div class=\"graph-holder regional-analysis\" same-region-height data-data=\"donut_graph_data.donutData[$index]\">\n" +
    "                  <div class=\"graph-inner\">\n" +
    "                     <div ng-show=\"area.show_chart\" morris-chart data-data=\"donut_graph_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_graph_data.donutOptions[$index]\" data-action=\"open(option,area,region,city,branch)\"></div>\n" +
    "                  </div>\n" +
    "                    <div ng-hide=\"area.show_chart\">No data available</div>\n" +
    "                </div>\n" +
    "                <h3>\n" +
    "                  <a ng-click = \"showChart(area, 'regions')\" style = \"cursor:pointer;\">{{area.name}}</a>\n" +
    "                </h3>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <div ng-show=\"show_string && area_view == true\">No area available</div>\n" +
    "\n" +
    "    		<ul class=\"info-list\" ng-show = \"area_view == false && regional_view == true\">\n" +
    "              <li ng-repeat = \"region in donut_regions_data.objects track by $index\">\n" +
    "                <div class=\"graph-holder regional-analysis\" same-region-height data-data=\"donut_regions_data.donutData[$index]\">\n" +
    "                  <div class=\"graph-inner\">\n" +
    "                     <div ng-show=\"region.show_chart\" morris-chart data-data=\"donut_regions_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_regions_data.donutOptions[$index]\" data-action=\"open(option,selected_area,region,city,branch)\"></div>\n" +
    "                  </div>\n" +
    "                  <div ng-hide=\"region.show_chart\">No data available</div>\n" +
    "                </div>\n" +
    "                <h3>\n" +
    "                  <a ng-click = \"showChart(region, 'cities')\" style = \"cursor:pointer;\">{{region.name}}</a>\n" +
    "                </h3>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <div ng-show=\"show_string && area_view == false && regional_view == true\">No region available</div>\n" +
    "\n" +
    "            <ul class=\"info-list\" ng-show = \"area_view == false && regional_view == false && city_view == true\">\n" +
    "              <li ng-repeat = \"city in donut_cities_data.objects track by $index\">\n" +
    "                <div class=\"graph-holder\" same-city-height data-data = \"donut_cities_data.donutData[$index]\">\n" +
    "                  <div class=\"graph-inner\">\n" +
    "                  	 <div ng-show=\"city.show_chart\" morris-chart data-data=\"donut_cities_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_cities_data.donutOptions[$index]\" data-action=\"open(option,selected_area,selected_region,city,branch)\"></div>\n" +
    "                  </div>\n" +
    "                  <div ng-hide=\"city.show_chart\">No data available</div>\n" +
    "                </div>\n" +
    "                <h3>\n" +
    "                  <a ng-click = \"showChart(city, 'branches')\" style = \"cursor:pointer;\">{{city.name}}</a>\n" +
    "                </h3>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <div ng-show=\"show_string && area_view == false && regional_view == false && city_view == true\">No city available</div>\n" +
    "\n" +
    "            <ul class=\"info-list\" ng-show = \"area_view == false && regional_view == false && city_view == false\">\n" +
    "              <li ng-repeat = \"branch in donut_branches_data.objects track by $index\">\n" +
    "                <div class=\"graph-holder\" same-branch-height  data-data = \"donut_branches_data.donutData[$index]\">\n" +
    "                 <div class=\"graph-inner\">\n" +
    "                 	 <div ng-show=\"branch.show_chart\" morris-chart data-data=\"donut_branches_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_branches_data.donutOptions[$index]\" data-action=\"open(option,selected_area,selected_region,selected_city,branch)\"></div>\n" +
    "                 </div>\n" +
    "                  <div ng-hide=\"branch.show_chart\">No data available</div>\n" +
    "                </div>\n" +
    "                <h3>{{branch.name}}</h3>\n" +
    "              </li>\n" +
    "             </ul>\n" +
    "\n" +
    "             <div ng-show=\"show_string && area_view == false && regional_view == false && city_view == false\">No branch available</div>\n" +
    "    		</div>\n" +
    "    	</div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard/regional-analysis/sqc-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/regional-analysis/sqc-modal.tpl.html",
    "<div class=\"modal-body info-area\">\n" +
    "  <a ng-click = \"ok()\" class=\"pull-right close-btn-font\"><i class=\"glyphicon glyphicon-remove\"></i></a>\n" +
    "  <h2>Regional Analysis</h2>\n" +
    "	<a style = \"cursor:pointer;\" class=\"btn-slider glyphicon glyphicon-menu-left\" ng-click=\"leftClickDisabled || previous(area,region,city,branch,sqc_data)\"></a>\n" +
    "	<a style = \"cursor:pointer;\" class=\"btn-slider glyphicon glyphicon-menu-right\" ng-click=\"rightClickDisabled || next(area,region,city,branch,sqc_data)\"></a>\n" +
    "\n" +
    "  <div class=\"graph-container\">\n" +
    "  	<div class=\"holder\">\n" +
    "  		<div class=\"graph-holder\">\n" +
    "		<div morris-chart-modal data-data=\"donut_subgraph_data.donutData\" data-type=\"donut\" data-options=\"donut_subgraph_data.donutOptions\"></div>\n" +
    "	  </div>\n" +
    "	  <div style = \"text-align: center;\" ng-show=\"show_div\">No data available</div>\n" +
    "  	</div>\n" +
    "  </div>\n" +
    "  <h1 style = \"text-align: center;\">{{ sqc.name }}</h1>\n" +
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
    "    <h2>\n" +
    "    Customers Top 5 Concerns\n" +
    "    <span class=\"icon-help\" uib-popover=\"Representation of the latest top 5 concerns that the customers are facing in the respective branches. The size of bubbles represents the amount of complaints.\" popover-trigger=\"mouseenter\" popover-placement=\"top\"></span>\n" +
    "    </h2>\n" +
    "  </header>\n" +
    "  <div class=\"rating-holder\">\n" +
    "  	<ul>\n" +
    "  		<li ng-repeat = \"concern in data\">\n" +
    "  			<span class=\"bullet\" style = \"background-color: {{concern.color}};\"></span>\n" +
    "  			{{concern.label}}\n" +
    "  		</li>\n" +
    "  	</ul>\n" +
    "    <div class=\"graph-outer bubble-chart-parent\" same-height data-mydata = \"data\">\n" +
    "      <div id=\"bubble-chart\" pyk-chart data-data = \"data\" data-colors = \"colors\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("live/benchmark-map/benchmark-map.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("live/benchmark-map/benchmark-map.tpl.html",
    "<div class=\"slide win-height\">\n" +
    "        <div class=\"slide-holder\">\n" +
    "            <div class=\"holder\">\n" +
    "                <div class=\"detail-holder\">\n" +
    "                    <div class=\"table-inner\">\n" +
    "                        <div class=\"info-block\">\n" +
    "                            <div class=\"inner-box\">\n" +
    "                                <h3>Gro Of The Day</h3>\n" +
    "                                <div class=\"hold\">\n" +
    "                                    <span class=\"name\">{{leader_board_data.gro.gro.gro_name}}</span>\n" +
    "                                    <div class=\"info\">\n" +
    "                                        <strong>{{leader_board_data.gro.count}}</strong> feedback received, <span class=\"branch\"><strong>{{leader_board_data.gro.branch.branch_name}}</strong> Branch</span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"inner-box\">\n" +
    "                                <h3>City Of The Day</h3>\n" +
    "                                <div class=\"hold\">\n" +
    "                                    <span class=\"name\">{{leader_board_data.city.city_name}}</span>\n" +
    "                                    <div class=\"info\">\n" +
    "                                        <strong>{{leader_board_data.city.count}}</strong> feedback received\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"table-inner\">\n" +
    "                      <div class=\"info-block\">\n" +
    "                        <h3>Top leading Branches</h3>\n" +
    "                        <ul>\n" +
    "                          <li ng-repeat=\"branch_data in branches\">\n" +
    "                            <span class=\"count\">{{branch_data.count}}</span>\n" +
    "                            <div class=\"name\">{{branch_data.city.city_name}}-{{branch_data.branch.branch_name}}</div>\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("live/business-segments/business-segment.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("live/business-segments/business-segment.tpl.html",
    "<div class=\"slide win-height\" business-segment data-data = \"segmentation_rating\">\n" +
    "	<div class=\"slide-holder add\">\n" +
    "		<div class=\"holder\">\n" +
    "			<div class=\"inner-holder\">\n" +
    "				<div class=\"list-holder\">\n" +
    "					<ul class=\"list\">\n" +
    "						<li class = {{label.option_class}} ng-repeat=\"label in business_segments_labels\"><span class=\"bullet\"></span> {{label.option_name}}</li>\n" +
    "					</ul>\n" +
    "				</div>\n" +
    "				<div class=\"block-holder\">\n" +
    "					<div class=\"c-holder\">\n" +
    "						<div class=\"block\">\n" +
    "							<div class=\"chart-outer\">\n" +
    "								<div id=\"stackchart\"></div>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("live/live.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("live/live.tpl.html",
    "<div id=\"wrapper\">\n" +
    "	<header id=\"header\">\n" +
    "		<div class=\"header-block\">\n" +
    "			<div class=\"logo\"><a href=\"http://www.mcdonalds.com.pk/\" target=\"_blank\"><img src=\"assets/images/logo.png\" alt=\"MacDonald's\"></a></div>\n" +
    "			<div class=\"slider\">\n" +
    "				<div class=\"slideset\">\n" +
    "					<div class=\"heading-slide\"><h2>qsc complaints</h2></div>\n" +
    "					<div class=\"heading-slide\"><h2>business segment</h2></div>\n" +
    "					<div class=\"heading-slide\"><h2>overall rating</h2></div>\n" +
    "					<div class=\"heading-slide\"><h2>top concerns</h2></div>\n" +
    "					<div class=\"heading-slide\"><h2>Patch  qsc analysis</h2></div>\n" +
    "					<div class=\"heading-slide\"><h2>benchmark map</h2></div>\n" +
    "				</div>\n" +
    "				<h1>Country Wide</h1>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"header-content\">\n" +
    "			<time datetime=\"2015-12-23 13:49\"><strong>{{time}}</strong>  {{date_output}}</time>\n" +
    "			<ul class=\"info-list\">\n" +
    "				<li>\n" +
    "					<strong class=\"title\">Overall Experience</strong>\n" +
    "					<ul>\n" +
    "						<li>{{top_ranking.overall_experience.option_text}}</li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<strong class=\"title\">top Concern</strong>\n" +
    "					<ul>\n" +
    "						<li>{{top_ranking.top_concern}}</li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<strong class=\"title\">Positive / Negative Feedback</strong>\n" +
    "					<ul>\n" +
    "						<li class=\"positive\">{{top_ranking.positive_negative_feedback.positive_feedback_count}}</li>\n" +
    "						<li>{{top_ranking.positive_negative_feedback.negative_feedback_count}}</li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<strong class=\"title\">QSC complaints</strong>\n" +
    "					<ul>\n" +
    "						<li ng-repeat = \"q_count in qsc_ranking\" ng-class = \"{'item2': q_count.option_name == 'Service', 'item3': q_count.option_name == 'Cleanliness'}\">{{q_count.option_count}}</li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</header>\n" +
    "\n" +
    "	<div class=\"slideshow win-height win-min-height\">\n" +
    "		<div class=\"slideset win-height\">\n" +
    "			<ui-view name = \"qsc\"></ui-view>\n" +
    "			<ui-view name = \"business_segment\"></ui-view>\n" +
    "			<ui-view name = \"overall_rating\"></ui-view>\n" +
    "			<ui-view name = \"top_concern\"></ui-view>\n" +
    "			<ui-view name = \"patch_qsc_analysis\"></ui-view>\n" +
    "			<ui-view name = \"benchmark_map\"></ui-view>\n" +
    "\n" +
    "		</div>\n" +
    "		<div class=\"pagination-holder\" init-slide>\n" +
    "			<ul class=\"pagination\">\n" +
    "				<li><a href=\"#\"><span>QSc</span></a></li>\n" +
    "				<li><a href=\"#\"><span>Business Segment</span></a></li>\n" +
    "				<li><a href=\"#\"><span>Overall rating</span></a></li>\n" +
    "				<li><a href=\"#\"><span>Top Concerns</span></a></li>\n" +
    "				<li><a href=\"#\"><span>Patch  qsc analysis</span></a></li>\n" +
    "				<li><a href=\"#\"><span>Benchmark map</span></a></li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("live/overall-ratings/overall-rating.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("live/overall-ratings/overall-rating.tpl.html",
    "<div class=\"slide win-height\" overall-rating data-data = \"overall_rating_data\">\n" +
    "	<div class=\"slide-holder\">\n" +
    "		<div class=\"holder\">\n" +
    "			<div class=\"chart-outer\">\n" +
    "				<div id=\"barchart\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("live/overall-ratings/overall-ratings.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("live/overall-ratings/overall-ratings.tpl.html",
    "<div class=\"slide win-height\" overall-rating data-data = \"overall_rating_data\">\n" +
    "	<div class=\"slide-holder\">\n" +
    "		<div class=\"holder\">\n" +
    "			<div class=\"chart-outer\">\n" +
    "				<div id=\"barchart\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("live/patch-qsc-analysis/patch-qsc-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("live/patch-qsc-analysis/patch-qsc-analysis.tpl.html",
    "<div class=\"slide win-height\">\n" +
    "    <div class=\"slide-holder add\">\n" +
    "        <div class=\"holder\">\n" +
    "            <div class=\"inner-holder\">\n" +
    "                <div class=\"list-holder\">\n" +
    "                    <ul class=\"list\">\n" +
    "                        <li class = {{label.action_class}} ng-repeat=\"label in patch_qsc_labels\"><span class=\"bullet\"></span> {{label.action_name}}</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"block-holder\">\n" +
    "                    <div class=\"c-holder\">\n" +
    "                        <div class=\"box-holder\" patch-pie-chart data-data = \"pakistan_analysis\">\n" +
    "                            <div id=\"piechart\"></div>\n" +
    "                        </div>\n" +
    "                        <div class=\"box-holder\">\n" +
    "                            <div class=\"container-holder\">\n" +
    "                                <div class=\"container-inner\">\n" +
    "                                    <div class=\"container\">\n" +
    "                                        <div class=\"box\" same-box-height data-data = \"south_analysis\">\n" +
    "                                            <div id=\"chartdiv\" patch-chart-div data-data = \"north_south_percentage\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"container add\">\n" +
    "                                        <div class=\"box\" same-box-height data-data = \"south_analysis\">\n" +
    "                                            <div id=\"patch-bar\" patch-bar-one data-data = \"north_analysis\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"box\" same-box-height data-data = \"south_analysis\">\n" +
    "                                            <div id=\"patch-bar2\" patch-bar-two data-data = \"south_analysis\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("live/qsc/qsc.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("live/qsc/qsc.tpl.html",
    "<div class=\"slide win-height\" qsc data-data = \"overall_rating_data\">\n" +
    "	<div class=\"slide-holder add\">\n" +
    "		<div class=\"holder\">\n" +
    "			<div class=\"inner-holder\">\n" +
    "				<div class=\"list-holder\">\n" +
    "					<ul class=\"list\">\n" +
    "						<li class = {{label.option_class}} ng-repeat=\"label in qsc_labels\"><span class=\"bullet\"></span> {{label.option_name}} </li>\n" +
    "					</ul>\n" +
    "				</div>\n" +
    "				<div class=\"block-holder\">\n" +
    "					<div class=\"c-holder\">\n" +
    "						<div class=\"block\">\n" +
    "							<div class=\"chart-outer\">\n" +
    "								<div id=\"area-chart\"></div>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("live/top-concerns/top-concern.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("live/top-concerns/top-concern.tpl.html",
    "<div class=\"slide win-height\" top-concern data-data = \"top_concern_data\">\n" +
    "	<div class=\"slide-holder\">\n" +
    "		<div class=\"holder\">\n" +
    "			<div class=\"chart-outer\">\n" +
    "				<div id=\"container\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<div class=\"section\">\n" +
    "	<div class=\"login-block\">\n" +
    "		<div class=\"form-holder\">\n" +
    "			<div flash-message=\"5000\" ></div> \n" +
    "			<div class=\"inner-holder\">\n" +
    "				<h3>Log In</h3>\n" +
    "				<form class=\"login-form\" name = \"LoginForm\" ng-submit=\"login(LoginForm.$valid)\" novalidate>\n" +
    "					<fieldset>\n" +
    "						<input type=\"text\" class=\"form-control\" placeholder=\"User Name\" required name = \"username\" ng-model = \"authenticate.username\">\n" +
    "						<div ng-show=\"LoginForm.username.$error.required && (!LoginForm.username.$pristine || submitted == true)\" class=\"form-error-message pull-left\">Username is required.</div>\n" +
    "						<input type=\"password\" class=\"form-control\" placeholder=\"Password\" required name = \"password\" ng-model = \"authenticate.password\">\n" +
    "						<div ng-show=\"LoginForm.password.$error.required && (!LoginForm.password.$pristine || submitted == true)\" class=\"form-error-message pull-left\">Password is required.</div>\n" +
    "						<input type=\"submit\" value=\"Log in\" class=\"btn btn-info\">\n" +
    "						<label for=\"check-1\">\n" +
    "							<input id=\"check-1\" type=\"checkbox\">\n" +
    "							<span class=\"fake-input\"></span>\n" +
    "							<span class=\"fake-label\">Remember me on this computer.</span>\n" +
    "						</label>\n" +
    "					</fieldset>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<div class=\"btn-holder\">\n" +
    "				<a href=\"#\">Forgot Password?</a>\n" +
    "				<a href=\"#\">Contact Support</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "  ");
}]);
