const { defineConfig } = require('@vue/cli-service')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'consumer',
        filename: 'remoteEntry.js',
      })
    ]
  },
  transpileDependencies: true
})
