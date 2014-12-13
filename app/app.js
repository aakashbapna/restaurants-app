var MainView = require("./views/MainView");
var $ = require("jquery");
var app = new MainView();

$(document).ready(function(){
  console.log("Starting app");
  app.render();
})
