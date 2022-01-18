module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './source/_js/scripts.js',
  output: {
    path: __dirname + '/source/assets/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
