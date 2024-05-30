const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Item = require('./items');
const User = require('./users'); // Assuming you have a User model

const Bid = sequelize.define('bids', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: items,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users,
            key: 'id'
        }
    },
    bid_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'bids',
    timestamps: false
});

Item.hasMany(Bid, { foreignKey: 'item_id' });
Bid.belongsTo(Item, { foreignKey: 'item_id' });

module.exports = Bid;
