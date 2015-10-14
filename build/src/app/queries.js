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
		}

	};

});