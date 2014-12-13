var Backbone = require("backbone");
var $ = require("jquery");
var tpl = require("app/templates/restaurants_list.hbs");
var RestaurantDetailView = require("app/views/RestaurantDetailView");


module.exports = Backbone.View.extend({
  initialize: function() {
    this.restaurants = this.collection;
    this.listenTo(this.restaurants, "add remove sort", this.render);
    this.sortOrderDescending = true;
  },
  template: tpl,
  events: {
    "click .btn-sort": function() {

      this.restaurants.comparator = function(restaurant) {
        var rating = restaurant.get("rating")? restaurant.get("rating") : 0;
        return (this.sortOrderDescending? -1 :1) * rating; //sorting descending order
      }.bind(this);
      this.restaurants.sort();
      this.sortOrderDescending = !this.sortOrderDescending;
    },
    "click .restaurant-item": "openDetailModel",
    "mouseenter .restaurant-item": "toggleRestaurantSelected",
    "mouseleave .restaurant-item": "toggleRestaurantSelected"
  },
  openDetailModel: function(ev) {
    console.log("open modal for model id", ev.currentTarget.getAttribute("data-id"));
    var restaurantModel = this.restaurants.get(ev.currentTarget.getAttribute("data-id"));
    var detail_view = new RestaurantDetailView({model:restaurantModel});
    detail_view.render();
  },
  toggleRestaurantSelected: function(ev) {
    console.log("toggling selected for", ev.currentTarget.getAttribute("data-id"));
    var restaurant = this.restaurants.get(ev.currentTarget.getAttribute("data-id"))
    restaurant.set("selected", !restaurant.get("selected"));
  },
  render: function() {
    console.log("rendering list view")
    this.$el.html(this.template(this));
    return this;
  }
});
