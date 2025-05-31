const { Sequelize } = require('sequelize');

require('dotenv').config();

/*
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
    retry: {
	match: [/SQLITE_CONSTRAINT/], // Pokušaj ponovo ako naiđe na constraint
	max: 3, // Maksimalno 3 pokušaja
    },
});
*/

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
	logging: false,
	port: process.env.PORT,
});

module.exports = sequelize;
