/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devEntry = {
	app: './examples/index.js',
	print: './examples/print.js'
}
const devOutput = { 
	library: 'ReactUpload',
	filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../build'),
	libraryTarget: 'umd',
	libraryExport: 'default'
} 
const proEnry = './src/index'
const proOutput = {
	// The name under which the editor will be exported.
	library: 'ReactUpload',
	path: path.resolve(__dirname, 'build'),
	filename: 'index.js',
	libraryTarget: 'umd',
	libraryExport: 'default'
}
const devPlugins = [
	new HtmlWebpackPlugin({
	  title: '管理输出',
	  innerHTML:'<div id="example"></div>'
	})
  ]

const isDev = process.env.NODE_ENV === 'development'
const entry = isDev ? devEntry:proEnry
const output = isDev ? devOutput :proOutput
const devtool = isDev ? "inline-source-map": "source-map"
const plugins = isDev ? devPlugins:[]

module.exports = {
	mode: isDev ? "development" : "production",
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
	},
    plugins,
	devServer: {
		// contentBase: path.join(__dirname, "./build"),
		// port: 9000,
		hot: true,
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://localhost:8080/sip-api',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
