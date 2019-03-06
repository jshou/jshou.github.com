const path = require("path");

module.exports = {
  entry: "./scripts/index.js",
  output: {
    path: path.join(__dirname, "/../"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
