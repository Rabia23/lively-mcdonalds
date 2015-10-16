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
    "        <ul class=\"nav-left list-unstyled\">\n" +
    "          <li>\n" +
    "              <a href=\"#/\" data-toggle-nav-collapsed-min class=\"toggle-min\" id=\"step4\">\n" +
    "                <i class=\"fa fa-bars\"></i>\n" +
    "              </a>\n" +
    "          </li>\n" +
    "            <li class=\"dropdown hidden-xs\" dropdown is-open=\"isopenSetting\">\n" +
    "                <a href=\"javascript:;\" class=\"dropdown-toggle\" dropdown-toggle ng-disabled=\"disabled\"><i class=\"fa fa-cogs\"></i></a>\n" +
    "                <div class=\"dropdown-menu with-arrow panel panel-default admin-options\" ui-not-close-on-click>\n" +
    "                    <div class=\"panel-heading\"> Admin Options </div>\n" +
    "                    <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <p>Layouts Style</p>\n" +
    "                            <label class=\"ui-radio\"><input name=\"layout\" type=\"radio\" value=\"boxed\" ng-model=\"admin.layout\"><span>Boxed</span></label>\n" +
    "                            <label class=\"ui-radio\"><input name=\"layout\" type=\"radio\" value=\"wide\" ng-model=\"admin.layout\"><span>Wide</span></label>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <p>Menu Style</p>\n" +
    "                            <label class=\"ui-radio\"><input name=\"menu\" type=\"radio\" value=\"vertical\" ng-model=\"admin.menu\"><span>Vertical</span></label>\n" +
    "                            <label class=\"ui-radio\"><input name=\"menu\" type=\"radio\" value=\"horizontal\" ng-model=\"admin.menu\"><span>Horizontal</span></label>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <p>Additional</p>\n" +
    "                            <label class=\"ui-checkbox\"><input name=\"checkbox1\" type=\"checkbox\" value=\"option1\" ng-model=\"admin.fixedHeader\"><span>Fixed Top Header</span></label>\n" +
    "                            <br>\n" +
    "                            <label class=\"ui-checkbox\"><input name=\"checkbox1\" type=\"checkbox\" value=\"option1\" ng-model=\"admin.fixedSidebar\"><span>Fixed Sidebar Menu</span></label>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            <li class=\"dropdown text-normal nav-profile\" dropdown is-open=\"status.isopenProfile\">\n" +
    "                <a href=\"javascript:;\" class=\"dropdown-toggle\" dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                    <img src=\"assets/images/g1.jpg\" alt=\"\" class=\"img-circle img30_30\">\n" +
    "                    <span class=\"hidden-xs\">\n" +
    "                        <span data-i18n=\"Lisa Doe\"></span>\n" +
    "                    </span>\n" +
    "                </a>\n" +
    "                <ul class=\"dropdown-menu with-arrow\">\n" +
    "                    <li>\n" +
    "                        <a href=\"#/pages/profile\">\n" +
    "                            <i class=\"fa fa-user\"></i>\n" +
    "                            <span data-i18n=\"My Profile\"></span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#/tasks/tasks\">\n" +
    "                            <i class=\"fa fa-check\"></i>\n" +
    "                            <span data-i18n=\"My Tasks\"></span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#/pages/lock-screen\">\n" +
    "                            <i class=\"fa fa-lock\"></i>\n" +
    "                            <span data-i18n=\"Lock\"></span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"#/pages/signin\">\n" +
    "                            <i class=\"fa fa-sign-out\"></i>\n" +
    "                            <span data-i18n=\"Log Out\"></span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "            <li class=\"dropdown langs text-normal\" dropdown is-open=\"status.isopenLang\" >\n" +
    "                <a href=\"javascript:;\" class=\"dropdown-toggle active-flag\" dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                    <div class=\"flag {{ getFlag() }}\"></div>\n" +
    "                </a>\n" +
    "                <ul class=\"dropdown-menu with-arrow list-langs\" role=\"menu\">\n" +
    "                    <li data-ng-show=\"lang !== 'English' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('English')\"><div class=\"flag flags-american\"></div> English</a></li>\n" +
    "                    <li data-ng-show=\"lang !== 'Español' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('Español')\"><div class=\"flag flags-spain\"></div> Español</a></li>\n" +
    "                    <li data-ng-show=\"lang !== '日本語' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('日本語')\"><div class=\"flag flags-japan\"></div> 日本語</a></li>\n" +
    "                    <li data-ng-show=\"lang !== '中文' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('中文')\"><div class=\"flag flags-china\"></div> 中文</a></li>\n" +
    "                    <li data-ng-show=\"lang !== 'Deutsch' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('Deutsch')\"><div class=\"flag flags-germany\"></div> Deutsch</a></li>\n" +
    "                    <li data-ng-show=\"lang !== 'français' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('français')\"><div class=\"flag flags-france\"></div> français</a></li>\n" +
    "                    <li data-ng-show=\"lang !== 'Italiano' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('Italiano')\"><div class=\"flag flags-italy\"></div> Italiano</a></li>\n" +
    "                    <li data-ng-show=\"lang !== 'Portugal' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('Portugal')\"><div class=\"flag flags-portugal\"></div> Portugal</a></li>\n" +
    "                    <li data-ng-show=\"lang !== 'Русский язык' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('Русский язык')\"><div class=\"flag flags-russia\"></div> Русский язык</a></li>\n" +
    "                    <li data-ng-show=\"lang !== '한국어' \">\n" +
    "                        <a href=\"javascript:;\" data-ng-click=\"setLang('한국어')\"><div class=\"flag flags-korea\"></div> 한국어</a></li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "          <!--<li class=\"dropdown\">\n" +
    "              <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "                  <span class=\"fa fa-magic nav-icon\"></span>\n" +
    "              </a>\n" +
    "              <ul class=\"dropdown-menu pull-right color-switch\" data-ui-color-switch>\n" +
    "                  <li><a href=\"javascript:;\" class=\"color-option color-some_color\" data-style=\"some_color\"></a></li>\n" +
    "              </ul>\n" +
    "          </li> -->\n" +
    "\n" +
    "        </ul> \n" +
    "\n" +
    "        <ul class=\"nav-right pull-right list-unstyled\">\n" +
    "            <li class=\"dropdown\" dropdown is-open=\"isopenComment\">\n" +
    "                <a href=\"javascript:;\" class=\"dropdown-toggle bg-info\" dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                    <i class=\"fa fa-comment-o\"></i>\n" +
    "                    <span class=\"badge badge-info\">2</span>\n" +
    "                </a>\n" +
    "                <div class=\"dropdown-menu pull-right with-arrow panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        You have 2 messages.\n" +
    "                    </div>\n" +
    "                    <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"media-left media-icon\">\n" +
    "                                    <span class=\"round-icon sm bg-info\"><i class=\"fa fa-comment-o\"></i></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">Jane sent you a message</span>\n" +
    "                                    <span class=\"text-muted\">3 hours ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"media-left media-icon\">\n" +
    "                                    <span class=\"round-icon sm bg-danger\"><i class=\"fa fa-comment-o\"></i></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">Lynda sent you a mail</span>\n" +
    "                                    <span class=\"text-muted\">9 hours ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>                       \n" +
    "                    </ul>\n" +
    "                    <div class=\"panel-footer\">\n" +
    "                        <a href=\"javascript:;\">Show all messages.</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            <li class=\"dropdown\" dropdown is-open=\"isopenEmail\">\n" +
    "                <a href=\"javascript:;\" class=\"dropdown-toggle bg-success\" dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                    <i class=\"fa fa-envelope-o\"></i>\n" +
    "                    <span class=\"badge badge-info\">3</span>\n" +
    "                </a>\n" +
    "                <div class=\"dropdown-menu pull-right with-arrow panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        You have 3 mails.\n" +
    "                    </div>\n" +
    "                    <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"media-left media-icon\">\n" +
    "                                    <span class=\"round-icon sm bg-warning\"><i class=\"fa fa-envelope-o\"></i></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">Lisa sent you a mail</span>\n" +
    "                                    <span class=\"text-muted block\">2min ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"media-left media-icon\">\n" +
    "                                    <span class=\"round-icon sm bg-info\"><i class=\"fa fa-envelope-o\"></i></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">Jane sent you a mail</span>\n" +
    "                                    <span class=\"text-muted\">3 hours ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"media-left media-icon\">\n" +
    "                                    <span class=\"round-icon sm bg-success\"><i class=\"fa fa-envelope-o\"></i></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">Lynda sent you a mail</span>\n" +
    "                                    <span class=\"text-muted\">9 hours ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>                       \n" +
    "                    </ul>\n" +
    "                    <div class=\"panel-footer\">\n" +
    "                        <a href=\"javascript:;\">Show all mails.</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            <li class=\"dropdown\" dropdown is-open=\"isopeBell\">\n" +
    "                <a href=\"javascript:;\" class=\"dropdown-toggle bg-warning\" dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                    <i class=\"fa fa-bell-o nav-icon\"></i>\n" +
    "                    <span class=\"badge badge-info\">3</span>\n" +
    "                </a>\n" +
    "                <div class=\"dropdown-menu pull-right with-arrow panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        You have 3 notifications.\n" +
    "                    </div>\n" +
    "                    <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"media-left media-icon\">\n" +
    "                                    <span class=\"round-icon sm bg-success\"><i class=\"fa fa-bell-o\"></i></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">New tasks needs to be done</span>\n" +
    "                                    <span class=\"text-muted block\">2min ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"media-left media-icon\">\n" +
    "                                    <span class=\"round-icon sm bg-info\"><i class=\"fa fa-bell-o\"></i></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">Change your password</span>\n" +
    "                                    <span class=\"text-muted\">3 hours ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"media-left media-icon\">\n" +
    "                                    <span class=\"round-icon sm bg-danger\"><i class=\"fa fa-bell-o\"></i></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">New feature added</span>\n" +
    "                                    <span class=\"text-muted\">9 hours ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>                       \n" +
    "                    </ul>\n" +
    "                    <div class=\"panel-footer\">\n" +
    "                        <a href=\"javascript:;\">Show all notifications.</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"#/tasks/tasks\" class=\"bg-danger\" id=\"step3\">\n" +
    "                    <i class=\"fa fa-tasks\"></i>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
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
