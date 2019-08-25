/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require('path');
module.exports = {
	devtool: 'source-map',
	performance: { hints: false },

	entry: path.resolve(__dirname, 'src', 'index.tsx'),

	output: {
		// The name under which the editor will be exported.
		library: 'ReactUploader',

		path: path.resolve(__dirname, 'lib'),
		filename: 'index.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: ["awesome-typescript-loader"] },
			{ test: /\.(png|svg)$/, use: 'raw-loader' },
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
	}
}
