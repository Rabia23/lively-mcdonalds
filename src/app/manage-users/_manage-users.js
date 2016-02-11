(function() {
  angular.module( 'livefeed.manage_users', [
    'ui.router',
    'livefeed.manage_users.api',
    'livefeed.manage_users.enum',
    'factories',
    'ngFlash',
    'livefeed.authService'

  ]);
})();
