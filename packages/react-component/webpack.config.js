const path = require('path');
const webpack = require('webpack');

const watchOptions = {
  ignored: ['node_modules/**']
}

if (process.env.WATCH_MOD == "poll") {
  watchOptions.poll = 1000
}

module.exports = {
  entry: './mount.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'SUBJECT': JSON.stringify(process.env.SUBJECT),
    }),
    new webpack.ProvidePlugin({
      React: "react", 
      react: "react", 
      "window.react": "react", 
      "window.React": "react"
    })
  ],
  devServer: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: {
      webSocketURL: `ws://0.0.0.0:${process.env.PROJET_PROXY_HTTP_PORT}/ws`,
    },
  },
  watch: true,
  watchOptions
}