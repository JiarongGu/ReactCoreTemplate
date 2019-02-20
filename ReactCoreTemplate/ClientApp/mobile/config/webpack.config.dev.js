var path = require('path');
var webpack = require('webpack');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appPublic = path.resolve(__dirname, '../public');
const appBuild = path.resolve(__dirname, '../build');

module.exports = {
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'build'),
        publicPath: '/',
        historyApiFallback: true,
        proxy:
        {
            '/api': {
                target: 'https://localhost:5001',
                secure: false,
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            DEBUG: false
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(appPublic, 'index.html'),
            minify: false
        }),
        new CopyWebpackPlugin([
            { from: `${appPublic}/favicon.ico`, to: appBuild },
            { from: `${appPublic}/manifest.json`, to: appBuild },
            { from: `${appPublic}/media`, to: `${appBuild}/media` }
        ])
    ]
}
