var path = require('path');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: SRC_DIR + '/app/scripts/index.js',
    output: {
      path: DIST_DIR + '/app/scripts',
      filename: 'bundle.js',
      publicPath: '/app/scripts/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                loaders: ['react-hot-loader/webpack','babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};

module.exports = config;
