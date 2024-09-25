const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Slot = sequelize.define('Slot', {
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableSeats: {
        type: DataTypes.INTEGER,
        defaultValue: 4
    }
});

module.exports = Slot;
