angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class = \"col-xs-12\">\n" +
    "	<div class = \"col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "		<label>Region</label>\n" +
    "		<select class = \"form-control\">\n" +
    "			<option value = \"\">All</option>\n" +
    "		</select>\n" +
    "	</div>\n" +
    "	<div class = \"col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "		<label>City</label>\n" +
    "		<select class = \"form-control\">\n" +
    "			<option value = \"\">All</option>\n" +
    "		</select>\n" +
    "	</div>\n" +
    "	<div class = \"col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "		<label>Branch</label>\n" +
    "		<select class = \"form-control\">\n" +
    "			<option value = \"\">All</option>\n" +
    "		</select>\n" +
    "	</div>\n" +
    "	<div class = \"col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "		<label>From</label>\n" +
    "		<select class = \"form-control\">\n" +
    "			<option value = \"\">All</option>\n" +
    "		</select>\n" +
    "	</div>\n" +
    "	<div class = \"col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "		<label>To</label>\n" +
    "		<select class = \"form-control\">\n" +
    "			<option value = \"\">All</option>\n" +
    "		</select>\n" +
    "	</div>\n" +
    "	<div class = \"col-lg-4 col-md-4 col-sm-6 col-xs-6\">\n" +
    "		<label>Segment</label>\n" +
    "		<select class = \"form-control\">\n" +
    "			<option value = \"\">All</option>\n" +
    "		</select>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class = \"charts col-xs-12\" style = \"margin-top: 50px;\">\n" +
    "	<div class = \"col-lg-6 col-md-6 col-sm-12 col-sm12\">\n" +
    "		<canvas id=\"pie\" class=\"chart chart-pie\" chart-data=\"data\" chart-labels=\"labels\" chart-options = \"options\" legends = true chart-click= \"clicked\"></canvas>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class = \"col-lg-6 col-md-6 col-sm-12 col-sm12\">\n" +
    "		<canvas id=\"bar\" class=\"chart chart-bar\" chart-data=\"bar_data\" chart-labels=\"bar_labels\"></canvas>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class = \"col-xs-12\">\n" +
    "		<canvas id=\"line\" class=\"chart chart-line\" chart-data=\"line_data\" chart-labels=\"line_labels\" chart-legend=\"true\" chart-series=\"series\" chart-click=\"onClick\" ></canvas>	\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
}]);
