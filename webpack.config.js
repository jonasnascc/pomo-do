const path = require('path');

module.exports = {
  mode: 'production',
  entry: './api/index.js',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
  resolve: {
    alias: {
        'express-handlebars': 'handlebars/dist/handlebars.js'
    }
 }
};