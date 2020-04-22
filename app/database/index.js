const
    fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    config = require('../config').get(),
    logger = require('../utils/logger').child({label: module.filename});

let
    db = {},
    basename = path.basename(__filename),
    modelsDir = path.resolve(__dirname, '../models'),
    {database, user, password, host, port} = config.db;

logger.info(`Init sequelize for [${config.env}] env`);

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    query: {
        raw: true
    },
    dialectOption: {
        ssl: true,
        native: true
    }
});

fs
    .readdirSync(modelsDir)
    .filter(file =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js')
    .forEach(file => {
        const model = sequelize.import(path.join(modelsDir, file));
        db[model.name] = model;
    });

Object
    .keys(db)
    .forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

module.exports = {
    ...db,
    sequelize,
    Sequelize
};
