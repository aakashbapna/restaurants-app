var baseUrl = "https://api.foursquare.com/v2";
var qs = require("querystring");
var fsq_config = require("./config").fsq;

module.exports = {
  getVenuesBaseUrl: function() {
    return baseUrl+"/venues/explore?"+qs.stringify(fsq_config);
  }
}
