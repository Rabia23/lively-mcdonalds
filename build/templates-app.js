angular.module('templates-app', ['dashboard/dashboard.tpl.html']);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<div class=\"page page-dashboard\" data-ng-controller=\"DashboardCtrl\">\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "      <div class=\"panel-heading\">\n" +
    "        <strong>\n" +
    "          <span class=\"glyphicon glyphicon-th\"></span>\n" +
    "           Chart Filters\n" +
    "        </strong>\n" +
    "      </div>\n" +
    "      <div class=\"panel-body\" >\n" +
    "        \n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-lg-6\">\n" +
    "        <div class=\"panel\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <canvas id=\"pie\" class=\"chart chart-pie\" chart-data=\"data\" chart-labels=\"labels\" chart-options = \"options\" legends = true chart-click= \"clicked\"></canvas>\n" +
    "          </div>\n" +
    "        </div>            \n" +
    "      </div>\n" +
    "      <div class=\"col-lg-6\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xsm-6\">\n" +
    "                <div class=\"panel mini-box\">\n" +
    "                    <span class=\"box-icon rounded bg-success\">\n" +
    "                        <i class=\"fa fa-rocket\"></i>\n" +
    "                    </span>\n" +
    "                    <div class=\"box-info\">\n" +
    "                        <p class=\"size-h2\">36 <span class=\"size-h4\">%</span></p>\n" +
    "                        <p class=\"text-muted\"><span >Growth</span></p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xsm-6\">\n" +
    "                <div class=\"panel mini-box\">\n" +
    "                    <span class=\"box-icon rounded bg-info\">\n" +
    "                        <i class=\"fa fa-users\"></i>\n" +
    "                    </span>\n" +
    "                    <div class=\"box-info\">\n" +
    "                        <p class=\"size-h2\">352</p>\n" +
    "                        <p class=\"text-muted\"><span data-i18n=\"New users\"></span></p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xsm-6\">\n" +
    "                <div class=\"panel mini-box\">\n" +
    "                    <span class=\"box-icon rounded bg-warning\">\n" +
    "                        <i class=\"fa fa-dollar\"></i>\n" +
    "                    </span>\n" +
    "                    <div class=\"box-info\">\n" +
    "                        <p class=\"size-h2\">4,120</p>\n" +
    "                        <p class=\"text-muted\"><span data-i18n=\"Profit\"></span></p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xsm-6\">\n" +
    "                <div class=\"panel mini-box\">\n" +
    "                    <span class=\"box-icon rounded bg-danger\">\n" +
    "                        <i class=\"fa fa-shopping-cart\"></i>\n" +
    "                    </span>\n" +
    "                    <div class=\"box-info\">\n" +
    "                        <p class=\"size-h2\">313</p>\n" +
    "                        <p class=\"text-muted\"><span data-i18n=\"Sales\"></span></p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>         \n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "      <div class=\"panel-heading\"><strong><span class=\"glyphicon glyphicon-th\"></span> Area Chart</strong></div>\n" +
    "      <div class=\"panel-body\" >\n" +
    "          <div data-flot-chart\n" +
    "               data-data=\"line1.data\"\n" +
    "               data-options=\"line1.options\"\n" +
    "               style=\"width: 100%; height: 300px;\"\n" +
    "               >\n" +
    "               </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\"><strong><span class=\"glyphicon glyphicon-th\"></span> Table - General</strong></div>\n" +
    "        <table class=\"table\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th>#</th>\n" +
    "                    <th>Project</th>\n" +
    "                    <th>Status</th>\n" +
    "                    <th>Manager</th>\n" +
    "                    <th>Progress</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr>\n" +
    "                    <td>1</td>\n" +
    "                    <td><span class=\"color-success\"><i class=\"fa fa-level-up\"></i></span> TWLT</td>\n" +
    "                    <td><span class=\"label label-info\">Pending</span></td>\n" +
    "                    <td>Amery Lee</td>\n" +
    "                    <td><progressbar class=\"progressbar-xs no-margin\" value=\"55\"></progressbar>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>2</td>\n" +
    "                    <td><span class=\"color-success\"><i class=\"fa fa-level-up\"></i></span> A16Z</td>\n" +
    "                    <td><span class=\"label label-primary\">Due</span></td>\n" +
    "                    <td>Romayne Carlyn</td>\n" +
    "                    <td><progressbar class=\"progressbar-xs no-margin\" value=\"34\" type=\"success\"></progressbar></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>3</td>\n" +
    "                    <td><span class=\"color-warning\"><i class=\"fa fa-level-down\"></i></span> DARK</td>\n" +
    "                    <td><span class=\"label label-success\">Due</span></td>\n" +
    "                    <td>Marybeth Joanna</td>\n" +
    "                    <td><progressbar class=\"progressbar-xs no-margin\" value=\"68\" type=\"info\"></progressbar></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>4</td>\n" +
    "                    <td><span class=\"color-info\"><i class=\"fa fa-level-up\"></i></span> Q300</td>\n" +
    "                    <td><span class=\"label label-danger\">Blocked</span></td>\n" +
    "                    <td>Jonah Benny</td>\n" +
    "                    <td><progressbar class=\"progressbar-xs no-margin\" value=\"52\" type=\"warning\"></progressbar></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>5</td>\n" +
    "                    <td><span class=\"color-danger\"><i class=\"fa fa-level-down\"></i></span> RVNG</td>\n" +
    "                    <td><span class=\"label label-warning\">Suspended</span></td>\n" +
    "                    <td>Daly Royle</td>\n" +
    "                    <td><progressbar class=\"progressbar-xs no-margin\" value=\"77\" type=\"danger\"></progressbar></td></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>6</td>\n" +
    "                    <td><span class=\"color-info\"><i class=\"fa fa-level-down\"></i></span> FDSA</td>\n" +
    "                    <td><span class=\"label label-info\">Suspended</span></td>\n" +
    "                    <td>Jane Swift</td>\n" +
    "                    <td><progressbar class=\"progressbar-xs no-margin\" value=\"55\" type=\"success\"></progressbar></td></td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "<!--     <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h3 class=\"panel-title\">Line and Area Chart</h3>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\" data-ng-controller=\"morrisChartCtrl\">\n" +
    "            <div morris-chart\n" +
    "                 data-data=\"combo1.data\"\n" +
    "                 data-type=\"combo1.type\"\n" +
    "                 data-options=\"combo1.options\"\n" +
    "                 ></div>\n" +
    "        </div>\n" +
    "    </div> -->\n" +
    "\n" +
    "</div>\n" +
    "  ");
}]);
