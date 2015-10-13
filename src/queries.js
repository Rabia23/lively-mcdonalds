angular.module('livefeed.queries', ['parse-angular.enhance'])

.service('chartQueries', function($q){

	return {

		piechart: function(){
			var deferred = $q.defer();
			var data = [];
			var User = Parse.Object.extend("TestObject");
			var query = new Parse.Query(User);
			query.notEqualTo("foo", "abdullah");
			console.log(query);
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var result = results[i];
						data.push({name: result.get("foo")});
          }
          console.log(data);
					deferred.resolve(data);
				},
				error: function(error) {
					deferred.reject(error);
				}
			});
			return deferred.promise;
		}

	};

});