const path = require('path');

const config = {
  entry: {
    'demo/dist/app': './demo/index.jsx'
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  }
}

module.exports = config;
