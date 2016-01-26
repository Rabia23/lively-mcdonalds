angular.module('templates-common', ['header.tpl.html', 'nav.tpl.html']);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<header class=\"top-header clearfix\">\n" +
    "\n" +
    "  <div class=\"logo\">\n" +
    "    <a href=\"#/\">\n" +
    "        <span>{{main.brand}}</span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"menu-button\" toggle-off-canvas>\n" +
    "    <span class=\"icon-bar\"></span>\n" +
    "    <span class=\"icon-bar\"></span>\n" +
    "    <span class=\"icon-bar\"></span>\n" +
    "  </div>\n" +
    "\n" +
    "    <div class=\"top-nav\">\n" +
    "      <ul class=\"nav-left list-unstyled\">\n" +
    "        <li>\n" +
    "            <a href=\"#/\" data-toggle-nav-collapsed-min class=\"toggle-min\" id=\"step4\">\n" +
    "              <i class=\"fa fa-bars\"></i>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "</header>\n" +
    "");
}]);

angular.module("nav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("nav.tpl.html",
    "        \n" +
    "<div class=\"nav-wrapper\">\n" +
    "    <ul id=\"nav\"\n" +
    "        class=\"nav\"\n" +
    "        data-slim-scroll\n" +
    "        data-collapse-nav\n" +
    "        data-highlight-active>\n" +
    "        <li><a href=\"#/dashboard\"> <i class=\"fa fa-dashboard\"></i><span>Dashboard</span> </a></li>\n" +
    "    </ul>\n" +
    "</div>");
}]);
