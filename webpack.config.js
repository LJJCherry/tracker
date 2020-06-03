const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInjector = require("html-webpack-injector");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    index: "./src/app.js",
    index_head: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {},
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async",
    }),
    new HtmlWebpackInjector(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
  },
};
