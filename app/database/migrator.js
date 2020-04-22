const
    path = require('path'),
    DBMigrate = require('db-migrate'),
    config = require('../config').get();

const options = {
    cwd: path.resolve(__dirname),
    env: 'db',
    config
};

module.exports = DBMigrate.getInstance(true, options);
