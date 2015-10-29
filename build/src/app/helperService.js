angular.module('livefeed.helper', [])

.service('helperService', function(_){

  return {

      getArguments: function(filter_options){
        var region = (filter_options.region == null)? "" : filter_options.region.id;
        var city = (filter_options.city == null)? "" : filter_options.city.id; 
        var branch = (filter_options.branch == null)? "" : filter_options.branch.id; 
        var segment = (filter_options.segment == null)? "" : filter_options.segment;

        return {region: region, city: city, branch: branch, segment: segment};
      }

  };

});