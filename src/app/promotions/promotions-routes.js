(function() {
  angular.module( 'livefeed.promotions')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( 'promotions', {
      url: '/promotions',
      views: {
        "": {
          controller: 'PromotionsCtrl',
          templateUrl: 'promotions/promotions.tpl.html'
        },
        "sidebar@promotions":{
          templateUrl: 'common/sidebar.tpl.html'
        },

        "header@promotions":{
          templateUrl: 'common/header.tpl.html'
        },

        "footer@promotions":{
          templateUrl: 'common/footer.tpl.html'
        }

      },
      authenticate: true
    })
    .state( 'coffee-promotions', {
      url: '/coffee-promotions',
      views: {
        "": {
          controller: 'CoffeePromotionsCtrl',
          templateUrl: 'promotions/coffee-promotions.tpl.html'
        },
        "sidebar@coffee-promotions":{
          templateUrl: 'common/sidebar.tpl.html'
        },

        "header@coffee-promotions":{
          templateUrl: 'common/header.tpl.html'
        },

        "footer@coffee-promotions":{
          templateUrl: 'common/footer.tpl.html'
        }

      },
      authenticate: true
    });

  });

})();
