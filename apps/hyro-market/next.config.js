const withImages = require('next-images');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

const path = require('path');

module.exports = withCustomBabelConfigFile(
  withImages({
    babelConfigFile: path.resolve('./babel.config.js'),
    cssModules: true,
    env: {
      url: process.env.URL || 'http://localhost:3002',
      apiUrl: process.env.API_URL || 'http://localhost:3001/api',
      landingUrl: process.env.LANDING_URL || 'https://www.hyro.agency/',
    },
    experimental: {
      externalDir: true,
    },
    async headers() {
      return [
        {
          source: '/.well-known/apple-developer-merchantid-domain-association',
          headers: [{ key: 'content-type', value: 'application/octet-stream' }],
        },
      ];
    },
    webpack(config) {
      config.module.rules.push = (...items) => {
        Array.prototype.push.call(
          config.module.rules,
          ...items.filter((item) => item.test.toString() !== '/\\.svg$/'),
        );
      };

      return config;
    },
  }),
);
