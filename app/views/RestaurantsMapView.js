var Backbone = require("backbone");
var $ = require("jquery");
var tpl = require("app/templates/restaurants_map.hbs");
var AppState = require("app/state")
var RestaurantDetailView = require("app/views/RestaurantDetailView");


module.exports = Backbone.View.extend({
  initialize: function() {
    this.restaurants = this.collection;
    this.listenTo(this.restaurants, "add", this.addMarker);

  },
  template: tpl,
  events: {},
  addMarker: function(restaurant) {
    var lat_lng = new google.maps.LatLng(restaurant.get("location").lat, restaurant.get("location").lng );
    var map = this.map;
    var marker = new google.maps.Marker({
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          strokeColor: "#"+(restaurant.attributes.ratingColor? restaurant.attributes.ratingColor: "ccc" )
        },
        position: lat_lng,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: restaurant.get("name")+" - " + (restaurant.attributes.rating? restaurant.attributes.rating : "unrated")
    });
    google.maps.event.addListener(marker, 'click', function() {
        map.setZoom(20);
        map.setCenter(marker.getPosition());
        var detail_view = new RestaurantDetailView({model:restaurant});
        detail_view.render();
    });
    restaurant.on("change:selected", function(){
      console.log("changing marker style")
      if(restaurant.get("selected")) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        map.setCenter(marker.getPosition());
        map.setZoom(16);

      } else {
        marker.setAnimation(null);
      }
    });
  },
  render: function() {
    console.log("rendering map view");
    this.$el.html(this.template(this));
    var current_position = AppState.get("current_position");
    var myLatlng = new google.maps.LatLng(current_position.coords.latitude, current_position.coords.longitude);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': myLatlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.dir(results);
        if(results[1]) {
          $("#location-text").text(results[1].formatted_address);
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
    var mapOptions = {
      zoom: 15,
      center: myLatlng
    };
    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
        title: "My Location"
    });

    return this;
  }
});
