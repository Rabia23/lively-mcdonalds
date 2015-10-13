angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class = \"col-xs-12\">\n" +
    "	{{users}}\n" +
    "</div>\n" +
    "\n" +
    "<div class = \"col-xs-12\">\n" +
    "	<canvas id=\"pie\" class=\"chart chart-pie\" chart-data=\"data\" chart-labels=\"labels\" chart-options = \"options\" legends = true chart-click= \"clicked\"></canvas>\n" +
    "</div>\n" +
    "\n" +
    "<div class = \"col-xs-12\">\n" +
    "	<canvas id=\"line\" class=\"chart chart-line\" chart-data=\"line_data\" chart-labels=\"line_labels\" chart-legend=\"true\" chart-series=\"series\"chart-click=\"onClick\" ></canvas>\n" +
    "	\n" +
    "</div>");
}]);
