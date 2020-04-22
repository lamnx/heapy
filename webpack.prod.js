const
    path = require('path'),
    merge = require('webpack-merge'),
    common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: [path.resolve(__dirname, 'app/src/index.js')],
    mode: 'production'
});
