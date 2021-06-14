const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.ENV || 'development';

module.exports = {
  mode,
  target: 'web',
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: { 
    contentBase: path.join(__dirname, "src"),
    hot: true,
    compress: true,
    watchContentBase: true,
    inline: true,
    port: 3000 
  },
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
     },
     { 
      test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
      use: ["file-loader"] 
     }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/index.html",
  })]
};