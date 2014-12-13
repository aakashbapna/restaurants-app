var Backbone = require("backbone");
var $ = require("jquery");
var tpl = require("app/templates/restaurant_detail.hbs");


module.exports = Backbone.View.extend({
  template: tpl,
  initialize: function() {
    var ele = $("<div class='restaurant_detail'></div>").appendTo("body");
    this.setElement(ele);
  },
  events: {
    "click .modal-close": function() {
      this.remove();
    }
  },
  render: function() {
    console.log("rendering detail view")
    this.$el.html(this.template(this));
  }
});
