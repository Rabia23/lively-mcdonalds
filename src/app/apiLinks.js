angular.module('livefeed.api_links', [])

.service('apiLinks', function(_){

  return {

      production: "http://mclively.herokuapp.com/api/:endpoint",
      staging: "http://mclivefeed-staging.herokuapp.com/api/:endpoint"

  };

});