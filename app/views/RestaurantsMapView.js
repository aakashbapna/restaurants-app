var Backbone = require("backbone");
var $ = require("jquery");
var tpl = require("app/templates/restaurants_map.hbs");
var AppState = require("app/state")

module.exports = Backbone.View.extend({
  initialize: function() {
    this.restaurants = this.collection;
    this.listenTo(this.restaurants, "add", this.addMarker);

  },
  template: tpl,
  events: {},
  addMarker: function(restaurant) {
    var lat_lng = new google.maps.LatLng(restaurant.get("location").lat, restaurant.get("location").lng );

    var marker = new google.maps.Marker({
        position: lat_lng,
        map: this.map,
        title: restaurant.get("name")+" - " + (restaurant.attributes.rating? restaurant.attributes.rating : "unrated")
    });
  },
  render: function() {
    this.$el.html(this.template(this));
    var current_position = AppState.get("current_position");
    var myLatlng = new google.maps.LatLng(current_position.coords.latitude, current_position.coords.longitude);
    var mapOptions = {
      zoom: 15,
      center: myLatlng
    }
    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    return this;
  }
});
