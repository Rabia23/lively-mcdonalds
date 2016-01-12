/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', 'src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],

    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less',
    sass: 'src/sass/styles.scss',
    sass_live: 'src/sass-live/styles.scss'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-bootstrap/ui-bootstrap.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-ui-utils/modules/route/route.js',
      'vendor/underscore/underscore-min.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/jquery/dist/jquery.js',
      'vendor/morris.js/morris.js',
      'vendor/raphael/raphael.js',
      'vendor/Flot/jquery.flot.js',
      'vendor/Flot/jquery.flot.resize.js',
      'vendor/flot.tooltip/js/jquery.flot.tooltip.js',
      'vendor/angular-flot/angular-flot.js',
      'vendor/color/one-color-all.js',
      'vendor/enscroll/js/mylibs/enscroll.js',
      'vendor/ngmap/build/scripts/ng-map.min.js',
      'vendor/moment/moment.js',
      'vendor/bootstrap-daterangepicker/daterangepicker.js',
      'vendor/angular-daterangepicker/js/angular-daterangepicker.js',
      'vendor/Chart.js/Chart.js',
      'vendor/angular-chart.js/dist/angular-chart.js',
      'vendor/PykCharts/pykih-charts/assets/lib/d3.min.js',
      'vendor/PykCharts/pykih-charts/assets/lib/topojson.min.js',
      'vendor/PykCharts/pykih-charts/assets/lib/custom-hive.min.js',
      'vendor/PykCharts/pykih-charts/assets/lib/colors.min.js',
      'vendor/PykCharts/pykih-charts/assets/lib/paper-full.min.js',
      'vendor/PykCharts/pykcharts.1.1.0.min.js',
      'vendor/Heyoffline/Heyoffline.js',
      'vendor/angular-flash-alert/dist/angular-flash.js',
      'vendor/angular-animate/angular-animate.min.js'




    ],
    css: [
      'vendor/morris.js/morris.css',
      'vendor/bootstrap-daterangepicker/daterangepicker.css',
      'vendor/angular-chart.js/dist/angular-chart.css',
      'vendor/PykCharts/pykcharts.1.1.0.min.css',
      'vendor/angular-flash-alert/dist/angular-flash.css'

    ],
    assets: [
    ]
  }
};
