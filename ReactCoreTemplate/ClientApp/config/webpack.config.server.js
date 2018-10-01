var path = require('path');

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
    }
};
