'use strict';
const webpack = require('webpack');
const path = require('path');
module.exports = {
    resolve: {
        root: [
            path.resolve('./public/webComponents/'),
        ],
        extensions: [
            '',
            '.webpack.js',
            '.web.js',
            '.js',
            '.html'
        ]
    },
    eslint: {
        configFile: './.eslintrc'
    },
    entry: {
        // This preloads resources that won't change often
        vendor: [
            'babel-polyfill',
            '@angular/core',
            '@angular/router',
            '@angular/http',
            '@angular/platform-browser-dynamic'
        ],
        main: './src/client/main.js'
    },
    output: {
        path: 'public/',
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('main', 'common.bundle.js')
    ],
    module: {
        preLoaders: [

        ],
        loaders: [
            {
                loader: 'babel-loader',

                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, 'src/client'),
                    path.resolve(__dirname, 'src/common')
                ],

                // Only run `.js` files through Babel
                test: /\.js$/,

                // Options to configure babel with
                query: {
                    plugins: [
                        'angular2-annotations',
                        'transform-decorators-legacy',
                        'transform-class-properties',
                        'transform-flow-strip-types'
                    ],
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: [
                    path.resolve(__dirname, 'public/stylesheets'),
                    path.resolve(__dirname, 'public/webComponents')
                ],
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.ejs?$/,
                loader: 'ejs-loader'
            },
            {
                loader: 'eslint-loader',

                test: /\.js$/,

                exclude: [
                    /node_modules/,
                    /public/
                ],

                include: [
                    path.resolve(__dirname)
                ]
            }
        ],
    },
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
        customAttrAssign: [/\)?\]?=/]
    }
};
