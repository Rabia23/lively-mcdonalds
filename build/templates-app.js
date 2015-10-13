angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div>\n" +
    "  welcome to home page\n" +
    "  {{users}}\n" +
    "</div>");
}]);
