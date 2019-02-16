var path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: {
        ssr: './boot-server.tsx'
    },
    devtool: false,
    output: {
        filename: 'bundle.js',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '../build/server')
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        })
    ]
};
