const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance');

const Korisnik = sequelize.define('Korisnik', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Osigurava automatski inkrement ID
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'korisnici',
    timestamps: false,
});

module.exports = Korisnik;