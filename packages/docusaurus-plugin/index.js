const webpack = require('webpack')

module.exports = function () {
  return {
    name: 'react-leaflet-docusaurus-plugin',
    configureWebpack(config, isServer) {
      return isServer
        ? {
            resolve: {
              alias: {
                leaflet: '@react-leaflet/universal-leaflet',
              },
            },
            plugins: [
              new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
              }),
            ],
          }
        : {}
    },
  }
}
