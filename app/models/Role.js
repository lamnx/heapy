module.exports = (sequelize, DataTypes) => sequelize.define('role', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
});

