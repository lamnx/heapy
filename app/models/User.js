const RoleModel = require('./Role');

module.exports = (sequelize, DataTypes) => sequelize.define('user', {
    id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    roleId: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        references: {
            model: RoleModel(sequelize, DataTypes),
            key: 'id',
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

