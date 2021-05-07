const { join } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.ENV || 'development';

module.exports = {
  mode,
  entry: "./src",
  output: {
    path: join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: { contentBase: join(__dirname, "src") },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ['@babel/preset-react', '@babel/preset-env'] }
      },
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
     }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  })]
};