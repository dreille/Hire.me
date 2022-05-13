const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.jsx'),
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'client'),
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
      },
      '/auth': {
        target: 'http://localhost:3000/',
      },
    },
    historyApiFallback: true,
  },
};
