'use strict';


const path = require('path');

const entry = './src/index'
const output = {
	// The name under which the editor will be exported.
	library: 'ReactUpload',
	path: path.resolve(__dirname, 'build'),
	filename: 'index.js',
	libraryTarget: 'umd',
	libraryExport: 'default'
}
const devtool = "source-map"

module.exports = {
	mode: "production",
	devtool,
	output,
	entry,
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)x$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader"
				}
			},
			{ test: /\.tsx?$/, loader: ["awesome-typescript-loader"] },
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets'
						},
					},
				],
			},
			{
				test: /\.(sa|sc)ss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader",
					"sass-loader", // compiles Sass to CSS, using Node Sass by default,
					'postcss-loader'
				],
			},
		]
	},
	externals: {
		react: {
			root: "React",
			commonjs2: "react",
			commonjs: "react",
			amd: "react"
		},
		"react-dom": {
			root: "ReactDOM",
			commonjs2: "react-dom",
			commonjs: "react-dom",
			amd: "react-dom"
		}
	},
	node: {
		Buffer: false
	},
	performance: {
		hints: "warning"
	}
}
