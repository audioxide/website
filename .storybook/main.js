const path = require('path');

module.exports = {
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: [path.resolve(__dirname, '..')]
            },
          },
        }
      ],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.alias['~'] = path.resolve(__dirname, '..');

    config.resolve.alias['~assets'] = path.resolve(__dirname, '../assets');

    return config;
  },
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}