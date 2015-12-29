angular.module('templates-app', ['coupon/coupon.tpl.html', 'dashboard/category-performance-analysis/category-performance-analysis.tpl.html', 'dashboard/dashboard.tpl.html', 'dashboard/feedback-map/feedback-map.tpl.html', 'dashboard/overall-feedback/overall-feedback.tpl.html', 'dashboard/overall-rating/overall-rating.tpl.html', 'dashboard/positive-negative-feedback/comments-modal.tpl.html', 'dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html', 'dashboard/regional-analysis/regional-analysis.tpl.html', 'dashboard/regional-analysis/sqc-modal.tpl.html', 'dashboard/statistics/statistics.tpl.html', 'dashboard/top-concern/top-concern.tpl.html', 'login/login.tpl.html']);

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
    "<div id=\"wrapper\">\n" +
    "\n" +
    "    <nav class=\"navbar-default navbar-static-side\" role=\"navigation\">\n" +
    "        <div class=\"sidebar-collapse\">\n" +
    "            <div id=\"side-menu\" class=\"nav metismenu\">\n" +
    "                <div class=\"logo-holder\">\n" +
    "                    <div class=\"logo\">\n" +
    "                        <a href=\"#\"> <img alt=\"image\" class=\"img-responsive\" src=\"assets/images/logo.jpg\"></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </nav>\n" +
    "    <div id=\"page-wrapper\" class=\"gray-bg\">\n" +
    "        <div class=\"header-visual\">\n" +
    "            <nav class=\"navbar dashboard\" role=\"navigation\" style=\"margin-bottom: 0\">\n" +
    "                <div class=\"navbar-header\">\n" +
    "                    <a class=\"navbar-minimalize minimalize-styl-2 btn btn-primary \" href=\"#\"><i class=\"fa fa-bars\"></i> </a>\n" +
    "                    <form role=\"search\" class=\"navbar-form-custom\" action=\"search_results.html\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <input type=\"text\" placeholder=\"Search for something...\" class=\"form-control\" name=\"top-search\" id=\"top-search\">\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "                <ul class=\"nav navbar-top-links navbar-right\">\n" +
    "                  <li>\n" +
    "                      <span class=\"m-r-sm text-muted welcome-message\">Welcome <span class=\"name\">Name</span></span>\n" +
    "                  </li>\n" +
    "                  <li>\n" +
    "                      <a href=\"login.html\">\n" +
    "                          <i class=\"fa fa-sign-out\"></i> Log out\n" +
    "                      </a>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "\n" +
    "            </nav>\n" +
    "\n" +
    "            <div class=\"img-holder\">\n" +
    "                <div class=\"inner-holder\"><img alt=\"image\" class=\"img-responsive\" src=\"/assets/images/img1.jpg\" /></div>\n" +
    "            </div>\n" +
    "            <div class=\"header-caption animated fadeInRight\">\n" +
    "                <h1>Customer Centric Approch</h1>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"comment-block\">\n" +
    "            <a href=\"#\" class=\"nav-opener\">\n" +
    "                <i class=\"fa fa-comments-o\"></i>\n" +
    "                <span class=\"count\">2</span>\n" +
    "            </a>\n" +
    "            <div class=\"comments-drop\">\n" +
    "                <a href=\"#\" class=\"nav-opener\">\n" +
    "                    <i class=\"fa fa-times\"></i>\n" +
    "                </a>\n" +
    "                <div class=\"inner-holder\">\n" +
    "                    <div class=\"heading-holder\">\n" +
    "                        <div class=\"holder\">\n" +
    "                            <div class=\"icon-holder\">\n" +
    "                                <i class=\"fa fa-comments-o\"></i>\n" +
    "                            </div>\n" +
    "                            <h2>Positive/Negative Feedback</h2>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"comments-holder\">\n" +
    "                        <ul class=\"comments-list list-unstyled\">\n" +
    "                            <li class=\"negative deferred\">\n" +
    "                                <p>Chicken was all red inside</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                            <li class=\"positive processed\">\n" +
    "                                <p>We want pratha n omlete</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                            <li class=\"positive\">\n" +
    "                                <p>People are too choosy here!!</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                            <li class=\"negative\">\n" +
    "                                <p>Value meal price should be less then 285 for students</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                            <li class=\"positive\">\n" +
    "                                <p>Overall good, your fries quantity is less</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                            <li class=\"positive\">\n" +
    "                                <p>People are too choosy here!!</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                            <li class=\"negative\">\n" +
    "                                <p>Chicken was all red inside</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                            <li class=\"positive\">\n" +
    "                                <p>We want pratha n omlete</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                            <li class=\"positive\">\n" +
    "                                <p>People are too choosy here!!</p>\n" +
    "                                <time datetime=\"2014-06-12 18:00\">Today 5:60 pm - 12.06.2014</time>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div class=\"btn-holder\">\n" +
    "                        <a href=\"#\" class=\"btn btn-info pull-right\">View All</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"wrapper wrapper-content animated fadeInRight\">\n" +
    "        <div class=\"row same-height-parent\">\n" +
    "            <div class=\"col-lg-6 col-lg-push-6 business-segment\">\n" +
    "                <div class=\"same-height-block add\">\n" +
    "                    <div class=\"ibox float-e-margins\">\n" +
    "                        <div class=\"title-outer\">\n" +
    "                            <div class=\"ibox-title\">\n" +
    "                                <h5>Business Segment Breakdown</h5>\n" +
    "                                <div class=\"ibox-tools\">\n" +
    "                                    <ul class=\"tab-links\">\n" +
    "                                        <li><a href=\"#\">All</a></li>\n" +
    "                                        <li class=\"item2\"><a href=\"#\">Quality</a></li>\n" +
    "                                        <li class=\"item3\"><a href=\"#\">Service</a></li>\n" +
    "                                        <li class=\"item4\"><a href=\"#\">Cleanliness</a></li>\n" +
    "                                        <li class=\"item5\">\n" +
    "                                            <div class=\"calender-outer\">\n" +
    "                                                <span class=\"calendar-holder\">\n" +
    "                                                    <i class=\"fa fa-calendar\"></i>\n" +
    "                                                </span>\n" +
    "                                            </div>\n" +
    "                                        </li>\n" +
    "                                    </ul>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"content-holder\">\n" +
    "                            <div class=\"ibox-content add\">\n" +
    "                                <div class=\"chart-outer\">\n" +
    "                                    <div id=\"morris-area-chart\"></div>\n" +
    "                                </div>\n" +
    "                                <div class=\"list-holder\">\n" +
    "                                    <div class=\"row\">\n" +
    "                                        <div class=\"morris-block-holder\">\n" +
    "                                            <div class=\"morris-content-holder\">\n" +
    "                                                <div class=\"morris-graph-holder\">\n" +
    "                                                   <div class=\"morris-holder\">\n" +
    "                                                        <div>\n" +
    "                                                            <canvas id=\"doughnutChart1\" height=\"140\"></canvas>\n" +
    "                                                        </div>\n" +
    "                                                   </div>\n" +
    "                                                </div>\n" +
    "                                                <strong class=\"title\"><a href=\"#\">BREAKFAST</a></strong>   \n" +
    "                                            </div>\n" +
    "                                            <div class=\"morris-content-holder\">\n" +
    "                                                <div class=\"morris-graph-holder\">\n" +
    "                                                   <div class=\"morris-holder\">\n" +
    "                                                        <div>\n" +
    "                                                            <canvas id=\"doughnutChart2\" height=\"140\"></canvas>\n" +
    "                                                        </div>\n" +
    "                                                   </div>\n" +
    "                                                </div>\n" +
    "                                                <strong class=\"title\"><a href=\"#\">LUNCH</a></strong>   \n" +
    "                                            </div>\n" +
    "                                            <div class=\"morris-content-holder\">\n" +
    "                                                <div class=\"morris-graph-holder\">\n" +
    "                                                   <div class=\"morris-holder\">\n" +
    "                                                        <div>\n" +
    "                                                            <canvas id=\"doughnutChart3\" height=\"140\"></canvas>\n" +
    "                                                        </div>\n" +
    "                                                   </div>\n" +
    "                                                </div>\n" +
    "                                                <strong class=\"title\"><a href=\"#\">SNACK</a></strong>   \n" +
    "                                            </div>\n" +
    "                                            <div class=\"morris-content-holder\">\n" +
    "                                                <div class=\"morris-graph-holder\">\n" +
    "                                                   <div class=\"morris-holder\">\n" +
    "                                                        <div>\n" +
    "                                                            <canvas id=\"doughnutChart4\" height=\"140\"></canvas>\n" +
    "                                                        </div>\n" +
    "                                                   </div>\n" +
    "                                                </div>\n" +
    "                                                <strong class=\"title\"><a href=\"#\">DINNER</a></strong>   \n" +
    "                                            </div>\n" +
    "                                            <div class=\"morris-content-holder\">\n" +
    "                                                <div class=\"morris-graph-holder\">\n" +
    "                                                   <div class=\"morris-holder\">\n" +
    "                                                        <div>\n" +
    "                                                            <canvas id=\"doughnutChart5\" height=\"140\"></canvas>\n" +
    "                                                        </div>\n" +
    "                                                   </div>\n" +
    "                                                </div>\n" +
    "                                                <strong class=\"title\"><a href=\"#\">LATE NIGHT</a></strong>   \n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-6 col-lg-pull-6\">\n" +
    "                <div class=\"same-height-block\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-lg-8 same-height-col\">\n" +
    "                            <ui-view name = \"overall_feedback\"></ui-view>\n" +
    "                          <!--   <div class=\"row inner-row add\">\n" +
    "                                <div class=\"col-xs-12\">\n" +
    "                                    <div class=\"ibox float-e-margins float-e-margin-none\">\n" +
    "                                        <div class=\"title-outer\">\n" +
    "                                            <div class=\"ibox-title\">\n" +
    "                                                <h5>Top Concerns</h5>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"content-holder\">\n" +
    "                                            <div class=\"ibox-content\">\n" +
    "                                                <div class=\"graph-block\">\n" +
    "                                                    <canvas id=\"doughnutChart\" height=\"140\"></canvas>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div> -->\n" +
    "                            <ui-view name = \"top_concern\"></ui-view>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-lg-4 same-height-col\">\n" +
    "                            <div class=\"row inner-row\">\n" +
    "                                <div class=\"col-sm-6 col-lg-12\">\n" +
    "                                    <div class=\"ibox float-e-margins detail-block\">\n" +
    "                                        <div class=\"title-outer\">\n" +
    "                                            <div class=\"ibox-title\">\n" +
    "                                                <span class=\"label label-primary pull-right\">Monthly</span>\n" +
    "                                                <h5>Income</h5>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"content-holder\">\n" +
    "                                            <div class=\"ibox-content\">\n" +
    "                                                <h1 class=\"no-margins\">22 285,400</h1>\n" +
    "                                                <div class=\"stat-percent font-bold text-navy\">98% <i class=\"fa fa-bolt\"></i></div>\n" +
    "                                                <small>New orders</small>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-6 col-lg-12\">\n" +
    "                                    <div class=\"ibox float-e-margins detail-block\">\n" +
    "                                        <div class=\"title-outer\">\n" +
    "                                            <div class=\"ibox-title\">\n" +
    "                                                <span class=\"label label-primary pull-right\">Monthly</span>\n" +
    "                                                <h5>Income</h5>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"content-holder\">\n" +
    "                                            <div class=\"ibox-content\">\n" +
    "                                                <h1 class=\"no-margins\">22 285,400</h1>\n" +
    "                                                <div class=\"stat-percent font-bold text-navy\">98% <i class=\"fa fa-bolt\"></i></div>\n" +
    "                                                <small>New orders</small>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"row inner-row add\">\n" +
    "                                <div class=\"col-sm-6 col-lg-12\">\n" +
    "                                    <div class=\"ibox float-e-margins detail-block\">\n" +
    "                                        <div class=\"title-outer\">\n" +
    "                                            <div class=\"ibox-title\">\n" +
    "                                                <span class=\"label label-primary pull-right\">Monthly</span>\n" +
    "                                                <h5>Income</h5>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"content-holder\">\n" +
    "                                            <div class=\"ibox-content\">\n" +
    "                                                <h1 class=\"no-margins\">22 285,400</h1>\n" +
    "                                                <div class=\"stat-percent font-bold text-navy\">98% <i class=\"fa fa-bolt\"></i></div>\n" +
    "                                                <small>New orders</small>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-6 col-lg-12\">\n" +
    "                                    <div class=\"ibox float-e-margins detail-block\">\n" +
    "                                        <div class=\"title-outer\">\n" +
    "                                            <div class=\"ibox-title\">\n" +
    "                                                <span class=\"label label-primary pull-right\">Monthly</span>\n" +
    "                                                <h5>Income</h5>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"content-holder\">\n" +
    "                                            <div class=\"ibox-content\">\n" +
    "                                                <h1 class=\"no-margins\">22 285,400</h1>\n" +
    "                                                <div class=\"stat-percent font-bold text-navy\">98% <i class=\"fa fa-bolt\"></i></div>\n" +
    "                                                <small>New orders</small>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 patch-section\">\n" +
    "                <div class=\"ibox float-e-margins\">\n" +
    "                    <div class=\"ibox-title\">\n" +
    "                        <h5>Patch QSC Analysis</h5>\n" +
    "                        <div class=\"ibox-tools\">\n" +
    "                            <ul class=\"tab-links\">\n" +
    "                                <li class=\"active\"><a href=\"#\">Complaints</a></li>\n" +
    "                                <li><a href=\"#\">Rating</a></li>\n" +
    "                                <li><a href=\"#\">QSC</a></li>\n" +
    "                                <li>\n" +
    "                                    <div class=\"calender-outer\">\n" +
    "                                        <span class=\"calendar-holder\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                              </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"ibox-content morris-content-outer\">\n" +
    "                        <div class=\"morris-content-holder\">\n" +
    "                            <div class=\"morris-graph-holder\">\n" +
    "                               <div class=\"morris-holder\">\n" +
    "                                   <div id=\"morris-donut-chart1\"></div>\n" +
    "                               </div>\n" +
    "                            </div>\n" +
    "                            <strong class=\"title\"><a href=\"#\">Name</a></strong>   \n" +
    "                        </div>\n" +
    "                        <div class=\"morris-content-holder\">\n" +
    "                            <div class=\"morris-graph-holder\">\n" +
    "                               <div class=\"morris-holder\">\n" +
    "                                   <div id=\"morris-donut-chart2\"></div>\n" +
    "                               </div>\n" +
    "                            </div>\n" +
    "                            <strong class=\"title\"><a href=\"#\">Name</a></strong>   \n" +
    "                        </div>\n" +
    "                        <div class=\"morris-content-holder\">\n" +
    "                            <div class=\"morris-graph-holder\">\n" +
    "                               <div class=\"morris-holder\">\n" +
    "                                   <div id=\"morris-donut-chart3\"></div>\n" +
    "                               </div>\n" +
    "                            </div>\n" +
    "                            <strong class=\"title\"><a href=\"#\">Name</a></strong>   \n" +
    "                        </div>\n" +
    "                        <div class=\"morris-content-holder\">\n" +
    "                            <div class=\"morris-graph-holder\">\n" +
    "                               <div class=\"morris-holder\">\n" +
    "                                   <div id=\"morris-donut-chart4\"></div>\n" +
    "                               </div>\n" +
    "                            </div>\n" +
    "                            <strong class=\"title\"><a href=\"#\">Name</a></strong>   \n" +
    "                        </div>\n" +
    "                        <div class=\"morris-content-holder\">\n" +
    "                            <div class=\"morris-graph-holder\">\n" +
    "                               <div class=\"morris-holder\">\n" +
    "                                   <div id=\"morris-donut-chart5\"></div>\n" +
    "                               </div>\n" +
    "                            </div>\n" +
    "                            <strong class=\"title\"><a href=\"#\">Name</a></strong>   \n" +
    "                        </div>\n" +
    "                        <div class=\"morris-content-holder\">\n" +
    "                            <div class=\"morris-graph-holder\">\n" +
    "                               <div class=\"morris-holder\">\n" +
    "                                   <div id=\"morris-donut-chart6\"></div>\n" +
    "                               </div>\n" +
    "                            </div>\n" +
    "                            <strong class=\"title\"><a href=\"#\">Name</a></strong>   \n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row same-height-parent\">\n" +
    "            <div class=\"col-lg-6 map-section\">\n" +
    "                <div class=\"ibox float-e-margins\">\n" +
    "                    <div class=\"ibox-title\">\n" +
    "                        <h5>Benchmark Map</h5>\n" +
    "                        <div class=\"ibox-tools\">\n" +
    "                            <ul class=\"tab-links\">\n" +
    "                                <li>\n" +
    "                                    <div class=\"calender-outer\">\n" +
    "                                        <span class=\"calendar-holder\">\n" +
    "                                            <i class=\"fa fa-calendar\"></i>\n" +
    "                                        </span>\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"ibox-content same-height\">\n" +
    "                        <div class=\"block-holder\">\n" +
    "                            <div id=\"world-map\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-6 timeline-section\">\n" +
    "                <div class=\"ibox float-e-margins\">\n" +
    "                    <div class=\"ibox-title\">\n" +
    "                        <h5>Timeline</h5>\n" +
    "                        <div class=\"ibox-tools\">\n" +
    "                            <ul class=\"tab-links\">\n" +
    "                                <li>\n" +
    "                                    <div class=\"calender-outer\">\n" +
    "                                        <span class=\"calendar-holder\">\n" +
    "                                            <i class=\"fa fa-calendar\"></i>\n" +
    "                                        </span>\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"ibox-content same-height\">\n" +
    "                        <div class=\"block-holder\">\n" +
    "                            <canvas id=\"lineChart\" height=\"140\"></canvas>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div></div>\n" +
    "        <div class=\"footer\">\n" +
    "            <div class=\"pull-right\">\n" +
    "                10GB of <strong>250GB</strong> Free.\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <strong>Copyright</strong> Example Company &copy; 2014-2015\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
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
    "<!-- <div class=\"feedback-block\">\n" +
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
    "</div> -->\n" +
    "\n" +
    "\n" +
    "<div class=\"row inner-row rating\">\n" +
    "                                <div class=\"col-xs-12\">\n" +
    "                                    <div class=\"ibox float-e-margins\">\n" +
    "                                        <div class=\"title-outer\">\n" +
    "                                            <div class=\"ibox-title\">\n" +
    "                                                <h5>Overall Rating</h5>\n" +
    "                                                <ul class=\"tab-links\">\n" +
    "                                                    <li>\n" +
    "                                                        <div class=\"calender-outer\">\n" +
    "                                                            <span class=\"calendar-holder\">\n" +
    "                                                                <i class=\"fa fa-calendar\"></i>\n" +
    "                                                            </span>\n" +
    "                                                        </div>\n" +
    "                                                    </li>\n" +
    "                                                </ul>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"content-holder\">\n" +
    "                                            <div class=\"ibox-content float-chart-block\">\n" +
    "                                                <div class=\"flot-chart\">\n" +
    "                                                    <div class=\"flot-chart-content\" id=\"flot-bar-chart\"></div>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
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
    "<!-- <div class=\"rating-section\" ng-class = \"{loading: show_loading}\">\n" +
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
    "</div> -->\n" +
    "\n" +
    "\n" +
    "  <div class=\"row inner-row add\">\n" +
    "                                <div class=\"col-xs-12\">\n" +
    "                                    <div class=\"ibox float-e-margins float-e-margin-none\">\n" +
    "                                        <div class=\"title-outer\">\n" +
    "                                            <div class=\"ibox-title\">\n" +
    "                                                <h5>Top Concerns</h5>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"content-holder\">\n" +
    "                                            <div class=\"ibox-content\">\n" +
    "                                                <div class=\"graph-block\">\n" +
    "                                                    <canvas id=\"doughnutChart\" height=\"140\"></canvas>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "");
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
    "\n" +
    "\n" +
    "    <div class=\"middle-box text-center loginscreen animated fadeInDown\">\n" +
    "        <div>\n" +
    "            <div>\n" +
    "\n" +
    "                <h1 class=\"logo-name\">IN+</h1>\n" +
    "\n" +
    "            </div>\n" +
    "            <h3>Welcome to IN+</h3>\n" +
    "            <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.\n" +
    "                <!--Continually expanded and constantly improved Inspinia Admin Them (IN+)-->\n" +
    "            </p>\n" +
    "            <p>Login in. To see it in action.</p>\n" +
    "            <form class=\"m-t\" role=\"form\" action=\"index.html\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"email\" class=\"form-control\" placeholder=\"Username\" required=\"\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"password\" class=\"form-control\" placeholder=\"Password\" required=\"\">\n" +
    "                </div>\n" +
    "                <button type=\"submit\" class=\"btn btn-primary block full-width m-b\">Login</button>\n" +
    "\n" +
    "                <a href=\"#\"><small>Forgot password?</small></a>\n" +
    "                <p class=\"text-muted text-center\"><small>Do not have an account?</small></p>\n" +
    "                <a class=\"btn btn-sm btn-white btn-block\" href=\"register.html\">Create an account</a>\n" +
    "            </form>\n" +
    "            <p class=\"m-t\"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  ");
}]);
