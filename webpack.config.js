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
                loaders: ['react-hot-loader/webpack','babel'],
                include: SRC_DIR,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                loaders: ['style', 'css', 'sass'],
                include: SRC_DIR
            }
        ]
    }
};

module.exports = config;
