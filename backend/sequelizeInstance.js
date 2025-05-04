const {Sequelize} = require('sequelize');

/*
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
    retry: {
        match: [/SQLITE_CONSTRAINT/], // Pokušaj ponovo ako naiđe na constraint
grešku max: 3, // Maksimalno 3 pokušaja
    },
});
*/

const sequelize = new Sequelize('mysql', 'admin', 'admin', {
  host : 'mysql',
  dialect : 'mysql',
  logging : true,
  port : '3306',
});

module.exports = sequelize;
