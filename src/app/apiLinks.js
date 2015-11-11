angular.module('livefeed.api_links', [])

.service('apiLinks', function(_){

  return {

      production: "http://mclively.herokuapp.com/api/:endpoint",
      staging: "http://172.16.11.113:8000/api/:endpoint"

  };

});