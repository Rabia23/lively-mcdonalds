angular.module('livefeed.queries', ['parse-angular.enhance'])

.service('chartQueries', function($q, _){

var mainRatingOptions = [];

	return {

		getMainRatingOptions: function(){
			var deferred = $q.defer();
			var data = [];
			var options = Parse.Object.extend("MainRatingOptions");
			var option_query = new Parse.Query(options);
			option_query.find({
				success: function(options_data) {
					_.each(options_data, function(option){
						data.push({id: option.id, createdAt: option.createdAt, updatedAt: option.updatedAt, attributes: option.attributes});
					});
					deferred.resolve(data);
				}
			});
			return deferred.promise;
		},

		getUserFeedBack: function(){
			var deferred = $q.defer();
			var data = [];
			var feedbacks = Parse.Object.extend("UserFeedback");
			var query = new Parse.Query(feedbacks);
			query.include("customer");
			query.include("selectedRatingOption");
			query.find({
				success: function(feedback_data) {
					_.each(feedback_data, function(option){
						data.push({id: option.id, createdAt: option.createdAt, updatedAt: option.updatedAt, attributes: option.attributes});
					});
					deferred.resolve(data);
				}		
			});
			return deferred.promise;
		},

		getCities: function(){
			var deferred = $q.defer();
			var data = [];
			var cities = Parse.Object.extend("Cities");
			var cities_query = new Parse.Query(cities);
            cities_query.include("region");
			cities_query.find({
				success: function(cities_data) {
					var data = _.map(cities_data, function(city){
						return {city_id: city.id, city_name: city.attributes.cityName, city_createdAt: city.createdAt, city_updateAt: city.updatedAt, city_regionID: city.attributes.region.id};
					});
				deferred.resolve(data);
				}
			});
			return deferred.promise;

		},

		getRegions: function(){
			var deferred = $q.defer();
			var data = [];
			var regions = Parse.Object.extend("Regions");
			var regions_query = new Parse.Query(regions);
			regions_query.find({
				success: function(regions_data) {
					_.each(regions_data, function(region){
						data.push({id: region.id, attributes: region.attributes});
					});
					deferred.resolve(data);
				}
			});
			return deferred.promise;
		},

		getRegionCities: function(regions_data,cities_data){
			var grouped_region = _.groupBy(cities_data, "city_regionID");
			console.log(grouped_region);
			var all_regions_data  = _.map(regions_data, function(region){

				console.log(grouped_region[region.id]);
				return {id: grouped_region[region.id], region: region.attributes.regionName};
			});
			return all_regions_data;

		}

	};

});