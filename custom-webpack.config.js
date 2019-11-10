const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    defaultRules: [
      {
        type: "javascript/auto",
        resolve: {}
      }
    ],
    rules: [
      {
        test: /fibonacci\.js$/,
        loader: "exports-loader"
      },
      {
        test: /fibonacci\.wasm$/,
        loader: "file-loader",
        options: {
          publicPath: "dist/"
        }
      }
    ]
  },
  // This is necessary due to the fact that emscripten puts both Node and
  // web code into one file. The node part uses Node’s `fs` module to load
  // the wasm file.
  // Issue: https://github.com/kripken/emscripten/issues/6542.
  plugins: [new webpack.IgnorePlugin(/(fs)/),new webpack.IgnorePlugin(/(path)/)]
};