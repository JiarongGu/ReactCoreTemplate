
const path = require('path');
const { paths } = require('react-app-rewired');
const rewireAliases = require('react-app-rewire-aliases');
const { addBabelPlugin } = require('customize-cra');
const webpack = require('webpack');

const isServer = process.argv.indexOf('--server') > 0;

module.exports = {
  webpack: function(config, env) {
    config = rewireAliases.aliasesOptions({
      '@store': path.resolve(__dirname, `${paths.appSrc}/store/`),
      '@components': path.resolve(__dirname, `${paths.appSrc}/components`),
      '@services': path.resolve(__dirname, `${paths.appSrc}/services`),
      '@utils': path.resolve(__dirname, `${paths.appSrc}/utils`)
    })(config, env);
    
    config = addBabelPlugin(["@babel/plugin-proposal-decorators", { "legacy": true }])(config);
    
    // used for server-side bundle
    if(isServer) {
      config = getServerConfig(config);
    }
    return config;
  },
}

function getServerConfig(config) {
  config = {
    ...config,
    target: 'node',
    entry: [ `${paths.appSrc}/server.tsx` ],
    devtool: false,
    output: {
        ...config.output,
        filename: 'bundle.js',
        chunkFilename: 'bundle.[chunkhash:8].chunk.js',
        libraryTarget: 'commonjs'
    },
    optimization: undefined,
    plugins: [
      ... config.plugins,
      new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
      })
    ]
  }
  return config;
}