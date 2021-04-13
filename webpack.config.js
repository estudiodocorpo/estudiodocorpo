const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./public/assets/scripts/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devtool: "eval-source-map",
  plugins: [new CompressionPlugin()],
};
