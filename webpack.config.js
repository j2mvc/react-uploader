/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require('path');
module.exports = {
	mode: "production",
	devtool: "source-map",
	output: {
		// The name under which the editor will be exported.
		library: 'ReactUpload',
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	entry: './src/index',
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

	devtool: "source-map",

	performance: {
		hints: "warning"
	},
	devServer: {
		contentBase: path.join(__dirname, "./dist"),
		port: 9000,
		hot: true
	}
}
