const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }
    ]
  },
  plugins: [
		new HtmlWebpackPlugin({
      path: path.resolve(__dirname, './dist'),
			filename: "index.html",
			template: "./src/index.html",
		})
	],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
};
