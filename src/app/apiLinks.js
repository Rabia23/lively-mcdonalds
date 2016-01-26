angular.module('livefeed.api_links', [])

.service('apiLinks', function(_){

  return {

    production: "https://livefeed.arbisoft.com/api/:endpoint",
    staging: "https://staginglivefeedapi.arbisoft.com/api/:endpoint"
    //staging: "http://172.16.11.113:8000/api/:endpoint"
  };
});
