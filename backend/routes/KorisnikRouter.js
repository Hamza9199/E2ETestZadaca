const express = require('express');
const Korisnik = require('../models/Korisnik');
const bcrypt = require('bcrypt');
const router = express.Router();

// Dohvati sve korisnike
router.get('/', async (req, res) => {
    try {
        const korisnici = await Korisnik.findAll();
        res.json(korisnici);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati korisnika po ID-u
router.get('/:id', async (req, res) => {
    try {
        const korisnik = await Korisnik.findByPk(req.params.id);
        if (!korisnik) return res.status(404).json({ message: 'Korisnik nije pronađen' });
        res.json(korisnik);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Kreiraj korisnika
router.post('/', async (req, res) => {
    try {
        const noviKorisnik = await Korisnik.create(req.body);
        res.status(201).json(noviKorisnik);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update korisnika
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Korisnik.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Korisnik nije pronađen' });
        const korisnik = await Korisnik.findByPk(req.params.id);
        res.json(korisnik);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obriši korisnika
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Korisnik.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Korisnik nije pronađen' });
        res.json({ message: 'Korisnik je obrisan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Registracija korisnika (sa hashiranjem lozinke)
router.post('/register', async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const korisnik = await Korisnik.create({ ...rest, password: hashedPassword });
        res.status(201).json(korisnik);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login korisnika
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const korisnik = await Korisnik.findOne({ where: { email } });
        if (!korisnik) {
            return res.status(401).json({ message: 'Pogrešan email ili lozinka' });
        }
        const isMatch = await bcrypt.compare(password, korisnik.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Pogrešan email ili lozinka' });
        }
        return res.json({ message: 'Uspješna prijava', korisnik });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;