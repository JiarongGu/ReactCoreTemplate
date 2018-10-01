const path = require('path');
const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const appPublic = path.resolve(__dirname, '../public');
const appBuild = path.resolve(__dirname, '../build');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(appPublic, 'index.html'),
            minify: false
        }),
        new CopyWebpackPlugin([
            { from: `${appPublic}/favicon.ico`, to: appBuild, },
            { from: `${appPublic}/manifest.json`, to: appBuild, },
            { from: `${appPublic}/media`, to: `${appBuild}/media` }
        ]),
    ]
};
