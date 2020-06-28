const path = require('path');
const webpack = require('webpack');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/public/js/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Public'
    },
    module: {
        rules: [{
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                plugins: [new MiniCssExtractPlugin()]
            },
            {
                test: /\.(scss)$/,

                use: [{
                    plugins: [new MiniCssExtractPlugin()],

                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /\.(jpeg|png|svg|jpg|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HTMLWebPackPlugin({
            template: './src/public/index.html',
            filename: 'index.html'
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}