var path = require('path');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: SRC_DIR + '/app/index.js',
    output: {
      path: DIST_DIR + '/app',
      filename: 'bundle.js',
      publicPath: '/app/'
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
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};

module.exports = config;
