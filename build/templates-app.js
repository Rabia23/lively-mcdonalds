angular.module('templates-app', ['dashboard/dashboard.tpl.html']);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<div class=\"page page-dashboard\" data-ng-controller=\"DashboardCtrl\">\n" +
    "\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <strong>\n" +
    "        <span class=\"glyphicon glyphicon-th\"></span>\n" +
    "         Chart Filters\n" +
    "      </strong>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\" >\n" +
    "      <div class=\"form-group col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "        <label>Region</label>\n" +
    "        <span class=\"ui-select\">\n" +
    "          <select>\n" +
    "            <option value = \"\">All Branches</option>\n" +
    "          </select>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"form-group col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "        <label>City</label>\n" +
    "        <span class=\"ui-select\">\n" +
    "          <select>\n" +
    "            <option value = \"\"> All Cities</option>\n" +
    "          </select>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"form-group col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "        <label>Branch</label>\n" +
    "        <span class=\"ui-select\">\n" +
    "          <select>\n" +
    "            <option value = \"\">All Branches</option>\n" +
    "          </select>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-lg-6\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "          <strong><span class=\"glyphicon glyphicon-th\"></span>Pie Chart</strong>\n" +
    "        </div> \n" +
    "        <div class=\"panel-body\">\n" +
    "          <div class = \"col-xs-12\">\n" +
    "            <a ng-click = \"backPieChart()\" ng-hide = \"pie_chart_first_step\">Back</a>\n" +
    "            <a ng-click = \"detailPieChart()\" ng-show = \"pie_chart_first_step\">Details</a>\n" +
    "          </div>\n" +
    "          <div class = \"col-xs-8\">\n" +
    "            <canvas id=\"pie\" class=\"chart chart-pie\" chart-data=\"pie_chart.data\" chart-labels=\"pie_chart.labels\" chart-options = \"pie_chart.options\" chart-legend = true chart-click= \"pie_clicked\" chart-colours = \"pie_chart.colors\"></canvas>\n" +
    "          </div>\n" +
    "          <div class = \"col-xs-4\">\n" +
    "            <div ng-repeat = \"label in pie_chart.labels track by $index\">\n" +
    "              <span style = \"color: {{pie_chart.colors[$index]}}; font-size: 21px;\">{{pie_chart.data[$index]}}%</span>&nbsp;\n" +
    "              <span style = \"color: {{pie_chart.colors[$index]}}; font-size: 21px;\">{{label}}</span>\n" +
    "            </div>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>            \n" +
    "    </div>\n" +
    "    <div class=\"col-lg-6\">\n" +
    "      <div class = \"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "          <strong><span class=\"glyphicon glyphicon-th\"></span>Rating Bar Chart</strong>\n" +
    "        </div>\n" +
    "        <div class = \"panel-body\">\n" +
    "          <canvas id=\"bar\" class=\"chart chart-bar\" chart-data=\"bar_chart.data\" chart-labels=\"bar_chart.labels\" chart-colours = \"bar_chart.colors\" chart-options = \"bar_chart.options\"></canvas>\n" +
    "        </div>\n" +
    "      </div>        \n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\"><strong><span class=\"glyphicon glyphicon-th\"></span>Line Chart</strong></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div class = \"col-xs-12\">\n" +
    "        <label class=\"ui-checkbox\" ng-repeat = \"series in total_line_chart_series  track by $index\">\n" +
    "          <input name=\"checkbox1\" type=\"checkbox\" ng-click = \"addRemoveSeries(series, $index)\" ng-checked = \"checkCheckBox(series)\">\n" +
    "          <span>{{series}}</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class = \"col-xs-12\">\n" +
    "        <canvas id=\"line\" class=\"chart chart-line\" chart-data=\"line_chart.data\" chart-labels=\"line_chart.labels\" chart-legend=\"true\" chart-options = \"line_chart.options\" chart-series = \"line_chart.series\" chart-click = \"lineChartClicked\"></canvas>\n" +
    "      </div> \n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"panel panel-default\" ng-show = \"show_detail_table\" id=\"details-table\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <strong><span class=\"glyphicon glyphicon-th\"></span>Customer Details</strong>\n" +
    "    </div>\n" +
    "    <table class=\"table\">\n" +
    "      <thead>\n" +
    "        <tr>\n" +
    "          <th>#</th>\n" +
    "          <th>Customer Name</th>\n" +
    "          <th>Date</th>\n" +
    "          <th>Feedback</th>\n" +
    "          <th>Region</th>\n" +
    "          <th>Branch</th>\n" +
    "        </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr>\n" +
    "          <td>1</td>\n" +
    "          <td> Name 1 </td>\n" +
    "          <td>March 19, 2015</td>\n" +
    "          <td><span class=\"label label-info\">Good</span></td>\n" +
    "          <td>North/Lahore</td>\n" +
    "          <td>Gulberg</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td>2</td>\n" +
    "          <td> Name 2 </td>\n" +
    "          <td>March 19, 2015</td>\n" +
    "          <td><span class=\"label label-info\">Good</span></td>\n" +
    "          <td>North/Lahore</td>\n" +
    "          <td>Gulberg</td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  ");
}]);
