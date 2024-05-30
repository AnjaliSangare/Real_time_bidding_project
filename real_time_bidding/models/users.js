const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        default: "user"
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Note the use of defaultValue
    }
}, {
    timestamps: false, // Disable the automatic adding of createdAt and updatedAt fields
    tableName: 'users' // Ensure the table name matches your database table
});
module.exports = User;
