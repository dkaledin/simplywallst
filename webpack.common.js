const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		extensions: [ ".ts", ".tsx", ".js", ".json", ".css" ],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			}, {
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}, {
				test: /\.css$/,
				use: [ "style-loader", "css-loader" ],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin([ 'dist' ]),
		new HtmlWebpackPlugin({
			template: "./src/assets/index.html",
		}),
	],
};
