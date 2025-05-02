const express = require('express');
const Korisnik = require('../models/Korisnik');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const korisnici = await Korisnik.find();
        res.json(korisnici);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const korisnik = await Korisnik.findById(req.params.id);
        if (!korisnik) return res.status(404).json({ message: 'Korisnik nije pronađen' });
        res.json(korisnik);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const korisnik = new Korisnik(req.body);
    try {
        const noviKorisnik = await korisnik.save();
        res.status(201).json(noviKorisnik);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const korisnik = await Korisnik.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!korisnik) return res.status(404).json({ message: 'Korisnik nije pronađen' });
        res.json(korisnik);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const korisnik = await Korisnik.findByIdAndDelete(req.params.id);
        if (!korisnik) return res.status(404).json({ message: 'Korisnik nije pronađen' });
        res.json({ message: 'Korisnik je obrisan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/register', async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const korisnik = new Korisnik({ ...rest, password: hashedPassword });
        const noviKorisnik = await korisnik.save();
        res.status(201).json(noviKorisnik);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const korisnik = await Korisnik.findOne({ email });

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