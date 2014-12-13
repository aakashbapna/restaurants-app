var Backbone = require("backbone");
var Foursquare = require("app/Foursquare");
var AppState = require("app/state");
var RestaurantModel = require("app/models/RestaurantModel");
var _ = require("underscore");

module.exports = Backbone.Collection.extend({
    model: RestaurantModel,
		url: function(){
      var location = AppState.get("current_position");
			return Foursquare.getVenuesBaseUrl()
				+ "&ll="+ location.coords.latitude +","+ location.coords.longitude
				+"&radius=2000"
        +"&section=food";
		},

		parse: function( data ){
      console.log("FSQ response");
			console.log( data );
			return _.pluck(data.response.groups[0].items, "venue");
		}
	});
