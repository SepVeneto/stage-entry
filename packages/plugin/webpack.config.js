const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const path = require('path')
const DotenvWebpack = require('dotenv-webpack')

const envConfigPath = {
  staging: path.resolve(__dirname, './.env.staging'),
  production: path.resolve(__dirname, './.env.production'),
}

module.exports = () => ({
  entry: './src/init.js',
  devServer: {
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  optimization: {
    minimize: true,
  },
  output: {
    clean: true,
    filename: '[name]-[contenthash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ],
  },
  plugins: [
    new DotenvWebpack({
      path: envConfigPath[process.env.ENV_MODE],
    }),
    new ModuleFederationPlugin({
      name: 'core',
      filename: 'remoteEntry.js',
      library: { type: 'var', name: 'EXTERNAL_CORE' },
      exposes: {
        './init': './src/init',
      }
    })
  ]
})
