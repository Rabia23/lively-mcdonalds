angular.module('livefeed.api_links', [])

.service('apiLinks', function(_){

  return {

      production: "https://livefeed.arbisoft.com/api/:endpoint",
      staging: "https://staginglivefeed.arbisoft.com/api/:endpoint"

  };

});