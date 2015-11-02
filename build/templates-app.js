angular.module('templates-app', ['dashboard/category-performance-analysis/category-performance-analysis.tpl.html', 'dashboard/dashboard.tpl.html', 'dashboard/feedback-map/feedback-map.tpl.html', 'dashboard/overall-feedback/overall-feedback.tpl.html', 'dashboard/overall-rating/overall-rating.tpl.html', 'dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html', 'dashboard/regional-analysis/regional-analysis.tpl.html', 'dashboard/statistics/statistics.tpl.html']);

angular.module("dashboard/category-performance-analysis/category-performance-analysis.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/category-performance-analysis/category-performance-analysis.tpl.html",
    "<div class=\"info-holder\">\n" +
    "  <h2>Category Performance Analysis</h2>\n" +
    "  <div class=\"table-holder\">\n" +
    "    <table class=\"table\">\n" +
    "      <thead>\n" +
    "        <tr>\n" +
    "          <th class=\"item1\">&nbsp;</th>\n" +
    "          <th class=\"item2\">Grade</th>\n" +
    "          <th class=\"item3\">Trend</th>\n" +
    "          <th class=\"item4\">Review</th>\n" +
    "        </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr>\n" +
    "          <td class=\"item1\">Service</td>\n" +
    "          <td class=\"item2\">\n" +
    "            <ul class=\"rating\">\n" +
    "              <li><a href=\"#\">1</a></li>\n" +
    "              <li><a href=\"#\">2</a></li>\n" +
    "              <li><a href=\"#\">3</a></li>\n" +
    "              <li><a href=\"#\">4</a></li>\n" +
    "              <li><a href=\"#\">5</a></li>\n" +
    "            </ul>\n" +
    "          </td>\n" +
    "          <td class=\"item3\"><img src=\"assets/images/img1.png\" alt=\"graph img\"></td>\n" +
    "          <td class=\"item4\"><span class=\"text\">50</span></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td class=\"item1\">Food Quality</td>\n" +
    "          <td class=\"item2\">\n" +
    "            <ul class=\"rating\">\n" +
    "              <li><a href=\"#\">1</a></li>\n" +
    "              <li><a href=\"#\">2</a></li>\n" +
    "              <li><a href=\"#\">3</a></li>\n" +
    "              <li><a href=\"#\">4</a></li>\n" +
    "            </ul>\n" +
    "          </td>\n" +
    "          <td class=\"item3\"><img src=\"assets/images/img2.png\" alt=\"graph img\"></td>\n" +
    "          <td class=\"item4\"><span class=\"text\">30</span></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td class=\"item1\">Cleanliness</td>\n" +
    "          <td class=\"item2\">\n" +
    "            <ul class=\"rating\">\n" +
    "              <li><a href=\"#\">1</a></li>\n" +
    "              <li><a href=\"#\">2</a></li>\n" +
    "              <li><a href=\"#\">3</a></li>\n" +
    "              <li><a href=\"#\">4</a></li>\n" +
    "              <li><a href=\"#\">5</a></li>\n" +
    "            </ul>\n" +
    "          </td>\n" +
    "          <td class=\"item3\"><img src=\"assets/images/img3.png\" alt=\"graph img\"></td>\n" +
    "          <td class=\"item4\"><span class=\"text\">48</span></td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<section class = \"section\">\n" +
    "  <div class = \"block\" ui-view = \"feedback_map\" ng-controller = \"FeedbackMapCtrl\"></div>\n" +
    "  <div class = \"block\" ui-view = \"category_performance_analysis\" ng-controller = \"CategoryPerformanceAnalysisCtrl\"></div>\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "<section class = \"section\" ui-view=\"regional_analysis\" ng-controller = \"RegionalAnalysisCtrl\"></section>\n" +
    "\n" +
    "<section class = \"section\">\n" +
    "  <div class = \"block\" ui-view = \"overall_rating\" ng-controller = \"OverallRatingCtrl\"></div>\n" +
    "  <div class = \"block\" ui-view = \"overall_feedback\" ng-controller = \"OverallFeedbackCtrl\"></div>\n" +
    "</section>\n" +
    "\n" +
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
    "<div class=\"info-block\">\n" +
    "  <div class=\"info-box\">\n" +
    "    <div class=\"heading\">\n" +
    "      <h2>Feedback Map</h2>\n" +
    "      <p>Country where the user has given the Survey</p>\n" +
    "    </div>\n" +
    "    <ul class=\"list\">\n" +
    "      <li class=\"v-good\">68%</li>\n" +
    "      <li class=\"good\">52%</li>\n" +
    "      <li class=\"neutral\">48%</li>\n" +
    "      <li class=\"negative\">32%</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"map-holder\"><img src=\"assets/images/img-map.jpg\" alt=\"map img\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard/overall-feedback/overall-feedback.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-feedback/overall-feedback.tpl.html",
    "<div class=\"feedback-block\">\n" +
    "  <h2>Overall Feedback</h2>\n" +
    "  <ul class=\"feedback-list\">\n" +
    "    <li class=\"{{feedback.class}}\" ng-repeat = \"feedback in overall_feedback\">\n" +
    "      <div class=\"img-holder\">\n" +
    "        <ul class=\"ico-list\" ng-if = \"feedback.class == 'v-good'\">\n" +
    "          <li ng-repeat='val in feedback.columns'>\n" +
    "            <ul>\n" +
    "              <li><img src=\"assets/images/ico-hand.png\" alt=\"image description\"></li>\n" +
    "              <li><img src=\"assets/images/ico-hand.png\" alt=\"image description\"></li>\n" +
    "              <li><img src=\"assets/images/ico-hand.png\" alt=\"image description\"></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"ico-list\" ng-if = \"feedback.class == 'good'\">\n" +
    "          <li ng-repeat='val in feedback.columns'>\n" +
    "            <ul>\n" +
    "              <li><img src=\"assets/images/ico-hand2.png\" alt=\"image description\"></li>\n" +
    "              <li><img src=\"assets/images/ico-hand2.png\" alt=\"image description\"></li>\n" +
    "              <li><img src=\"assets/images/ico-hand2.png\" alt=\"image description\"></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"ico-list\" ng-if = \"feedback.class == 'neutral'\">\n" +
    "          <li ng-repeat='val in feedback.columns'>\n" +
    "            <ul>\n" +
    "              <li><img src=\"assets/images/ico-face.png\" alt=\"image description\"></li>\n" +
    "              <li><img src=\"assets/images/ico-face.png\" alt=\"image description\"></li>\n" +
    "              <li><img src=\"assets/images/ico-face.png\" alt=\"image description\"></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"ico-list\" ng-if = \"feedback.class == 'negative'\">\n" +
    "          <li ng-repeat='val in feedback.columns'>\n" +
    "            <ul>\n" +
    "              <li><img src=\"assets/images/ico-hand3.png\" alt=\"image description\"></li>\n" +
    "              <li><img src=\"assets/images/ico-hand3.png\" alt=\"image description\"></li>\n" +
    "              <li><img src=\"assets/images/ico-hand3.png\" alt=\"image description\"></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <h3>\n" +
    "        <span class=\"count\">{{feedback.rounded_percentage}}%</span>\n" +
    "        {{feedback.name}}\n" +
    "      </h3>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("dashboard/overall-rating/overall-rating.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/overall-rating/overall-rating.tpl.html",
    "<div class=\"rating-section\">\n" +
    "  <header class=\"heading-block\">\n" +
    "    <h2>Overall Rating</h2>\n" +
    "    <ul>\n" +
    "      <li><a href=\"#\">Food</a></li>\n" +
    "      <li class=\"item2\"><a href=\"#\">Service</a></li>\n" +
    "      <li class=\"item3\"><a href=\"#\">Cleanliness</a></li>\n" +
    "    </ul>\n" +
    "  </header>\n" +
    "  <div class=\"rating-holder\"><img src=\"assets/images/img9.png\" alt=\"image description\"></div>\n" +
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
    "<div class=\"section-holder\" >\n" +
    "  <div class=\"info-area\">\n" +
    "    <h2 ng-show = \"regional_view\">Regional Analysis</h2>\n" +
    "    <h2 ng-hide = \"regional_view\">{{selected_region.name}} Region City Analysis</h2>\n" +
    "    <div class = \"breadcrum\">\n" +
    "      <span ng-hide = \"regional_view\">\n" +
    "        <a ng-click = \"backToRegions()\" style = \"style: cursor:pointer\">Regions /</a>\n" +
    "      </span>\n" +
    "      <span ng-show = \"regional_view == false && city_view == false\">\n" +
    "        <a ng-click = \"backToCities()\" style = \"cursor:pointer;\">{{selected_region.name}} /</a>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"info-list\" ng-show = \"regional_view\">\n" +
    "      <li ng-repeat = \"region in donut_graph_data.objects track by $index\">\n" +
    "        <div class=\"graph-holder\">\n" +
    "          <div morris-chart data-data=\"donut_graph_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_graph_data.donutOptions[$index]\"></div>\n" +
    "        </div>\n" +
    "        <h3>Region {{$index + 1}},&nbsp;\n" +
    "          <a ng-click = \"getRegionCities(region)\" style = \"cursor:pointer;\">{{region.name}}</a>\n" +
    "        </h3>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"info-list\" ng-show = \"regional_view == false && city_view == true\">\n" +
    "      <li ng-repeat = \"city in donut_cities_data.objects track by $index\">\n" +
    "        <div class=\"graph-holder\">\n" +
    "          <div morris-chart data-data=\"donut_cities_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_cities_data.donutOptions[$index]\"></div>\n" +
    "        </div>\n" +
    "        <h3>\n" +
    "          City {{$index + 1}},&nbsp;\n" +
    "          <a ng-click = \"getCityBranches(city)\" style = \"cursor:pointer;\">{{city.name}}</a>\n" +
    "        </h3>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"info-list\" ng-show = \"regional_view == false && city_view == false\">\n" +
    "      <li ng-repeat = \"branch in donut_branches_data.objects track by $index\">\n" +
    "        <div class=\"graph-holder\">\n" +
    "          <div morris-chart data-data=\"donut_branches_data.donutData[$index]\" data-type=\"donut\" data-options=\"donut_branches_data.donutOptions[$index]\"></div>\n" +
    "        </div>\n" +
    "        <h3>Branch {{$index + 1}},&nbsp;{{branch.name}}</h3>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
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
