const
    path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    entry: ['webpack-hot-middleware/client', path.resolve(__dirname, 'app/src/index.js')]
});
