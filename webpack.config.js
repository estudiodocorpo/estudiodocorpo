const path = require("path");

module.exports = {
  mode: "development",
  entry: "./public/assets/scripts/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    publicPath: "/public",
  },
  devtool: false,
};
