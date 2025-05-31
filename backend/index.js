const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelizeInstance');
const Korisnik = require('./models/Korisnik');
const Proizvod = require('./models/Proizvod');
const KorisnikRouter = require('./routes/KorisnikRouter');
const ProizvodRouter = require('./routes/ProizvodRouter');
const dotenv = require('dotenv');

const app = express();

require('dotenv').config();

const PORT = 5000;

/*
(async () => {
    try {
	await sequelize.authenticate();
	console.log('Konekcija s SQLite bazom je uspješna.');
	await sequelize.query('PRAGMA foreign_keys = ON;');
	await sequelize.sync({ force: false }); // Onemogućeno automatsko ažuriranje
	console.log('Baza sinhronizovana.');
    } catch (error) {
	console.error('Greška pri konekciji s bazom:', error);
	process.exit(1);
    }
})();
*/

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Konekcija s MySQL bazom je uspješna.');
		await sequelize.sync({ alter: true }); // Sinhronizacija modela s bazom
		console.log('Baza sinhronizovana.');
	} catch (error) {
		console.error('Greška pri konekciji s bazom:', error);
		process.exit(1);
	}
})();

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin) return callback(null, true);
		const allowedOrigins = [
			'http://localhost:5173',
			'http://frontend:5173',
			'frontend'
		];
		if (allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error('Not allowed by CORS'));
	},
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());


app.use("/uploads", express.static("uploads"));


app.use('/server/korisnik', KorisnikRouter);
app.use('/server/proizvod', ProizvodRouter);

app.use("/",
	(req, res) => { res.status(200).json({ message: "Server radi!" }); });

app.listen(
	PORT, () => { console.log(`Server running on http://localhost:${PORT}`); });
