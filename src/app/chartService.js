angular.module('livefeed.chart', [])

.service('chartService', function(_){

var mainRatingOptions = [];

	return {

		getPieChartData: function(options_data, feedback_data){
			var allSelectedOptions = _.pluck(_.pluck(feedback_data, 'attributes'), "selectedRatingOption");
			var grouped_feeback = _.groupBy(allSelectedOptions, "id");
			var feedback_length = feedback_data.length;
			var graph_data  = _.map(options_data, function(option){
				var length = (grouped_feeback[option.id] === undefined)? 0 : grouped_feeback[option.id].length;
				return {length: length, title: option.attributes.optionString, percentage: ((length*100)/feedback_length)};
			});
			return graph_data;
		},

		getBarChartData: function(options_data, feedback_data){
			var allSelectedOptions = _.pluck(_.pluck(feedback_data, 'attributes'), "selectedRatingOption");
			var grouped_feeback = _.groupBy(allSelectedOptions, "id");
			var graph_data  = _.map(options_data, function(option){
				var length = (grouped_feeback[option.id] === undefined)? 0 : grouped_feeback[option.id].length;
				return {length: length, title: option.attributes.optionString};
			});
			return graph_data;
		}

	};

});