const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance');

const Proizvod = sequelize.define('Proizvod', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Osigurava automatski inkrement ID
      },
    naziv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    opis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cijena: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'proizvodi',
    timestamps: false,
});

module.exports = Proizvod;