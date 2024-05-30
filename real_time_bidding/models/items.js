const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const AuctionItem = sequelize.define('items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    starting_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    current_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: sequelize.literal('starting_price'),
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'items',  // Customize table name if needed
});

module.exports = AuctionItem;
