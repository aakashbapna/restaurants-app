var Backbone = require("backbone");
var $ = require("jquery");
var main_tpl = require("app/templates/main.hbs");
var AppState = require("app/state"); //TODO:: get rid of this state all together.
var RestaurantsCollection = require("app/collections/RestaurantsCollection");
var RestaurantsListView = require("app/views/RestaurantsListView");
var RestaurantsMapView = require("app/views/RestaurantsMapView");


var MainView = module.exports = Backbone.View.extend({
  initialize: function() {
    this.restaurants = new RestaurantsCollection();
    this.view_restaurants_list = new RestaurantsListView({collection:this.restaurants});
    this.view_restaurants_map = new RestaurantsMapView({collection:this.restaurants});

  },
  el: $("#main"),
  template: main_tpl,
  events: {
    "click .btn-location": "getLocationAndFetch"
  },
  onPositionArrive: function(position) {
    console.log(position);
    AppState.set("current_position", position);
    this.restaurants.fetch();
    this.view_restaurants_map.render(); //TODO:: don't do this here
  },
  getLocationAndFetch:function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.onPositionArrive.bind(this));
    } else {
        Alert("Geolocation is not supported by this browser.");
    }
  },
  renderRestaurants:function() {
    console.log("Rendering restaurants");
    this.view_restaurants_list.render();
  },
  render: function() {
    this.$el.html(this.template());
    this.view_restaurants_list.setElement("#view-list");
    this.view_restaurants_map.setElement("#view-map");

    return this;
  }

});
