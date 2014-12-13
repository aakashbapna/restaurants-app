var path = require("path");


module.exports = {
    context: __dirname + "/app",
    entry: "./app",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    resolve: {
      fallback: path.join(__dirname, "app/templates/helpers")
    },
	  module: {
		    loaders: [{ test: /\.hbs$/, loader: "handlebars-loader"}]
	  }
}
