var Handlerbars = require("handlerbars");

var fn = module.exports = function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
}

Handlebars.registerHelper('times', fn);
