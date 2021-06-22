const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    // worker: './src/app/worker.js'
  },
  output: {
    // publicPath: '',
    // path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};