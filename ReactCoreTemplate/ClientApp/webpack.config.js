//var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';

module.exports = function(env) {
  const baseConfig = require('./config/webpack.config.base.js');
  const customConfig = require(`./config/webpack.config.${env}.js`);

  const plugins = baseConfig.plugins.concat(customConfig.plugins || []);

  const customRules = (customConfig.module && customConfig.module.rules) || [];
  
  const rules = baseConfig.module.rules
    .filter(r => !customRules.find(cr => cr.test.toString() === r.test.toString()))
    .concat(customRules);

  const module = { ...baseConfig.module, ...customConfig.module, rules };

  return { ...baseConfig, ...customConfig, plugins, module };
};
