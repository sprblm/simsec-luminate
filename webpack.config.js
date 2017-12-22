module.exports = {
  context: __dirname,
  entry: "./webpack/entry.js",
  output: {
    path: __dirname + "/source/js/",
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      }
    }]
  }
};
