var Backbone = require("Backbone");

module.exports = Backbone.Model.extend({
  selected: false,
  getFeaturedPhotoUrl: function() {
    if(this.get("featuredPhotos").count>0) {
      var photo = this.get("featuredPhotos").items[0];
      return photo.prefix+"500x300"+photo.suffix;
    } else {
      "/no-photo-url";
    }
  }
});
