var Backbone = require("backbone");
var $ = require("jquery");
var tpl = require("app/templates/restaurants_list.hbs");


module.exports = Backbone.View.extend({
  initialize: function() {
    this.restaurants = this.collection;
    this.listenTo(this.restaurants, "all", this.render);
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
    }
  },
  render: function() {
    console.log("rendering list view")
    this.$el.html(this.template(this));
    return this;
  }
});
