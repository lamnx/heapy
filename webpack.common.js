const path = require('path'),
    moduleCommon = require('./utils/webpack/common.module.config');

module.exports = {
    module: moduleCommon,
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public'),
        libraryTarget: 'var',
        library: 'Heapy'
    }
};
