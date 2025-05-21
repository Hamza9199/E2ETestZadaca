const express = require('express');
const Proizvod = require('../models/Proizvod');
const router = express.Router();
const multer = require('multer');
const storage = require('../servisi/multer'); // Import the multer configuration
const fs = require('fs');
const path = require('path');

const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const proizvodi = await Proizvod.findAll();
        res.json(proizvodi);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', upload.single('slika'), async (req, res) => {
    try {
        const { naziv, opis, cijena } = req.body;
        let slika = null;
        if (req.file) {
            slika = `http://localhost:5000/uploads/${req.file.filename}`;
        }
        const noviProizvod = await Proizvod.create({ naziv, opis, cijena, slika });
        res.status(201).json(noviProizvod);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        if (!proizvod) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(proizvod);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);


router.put('/:id', upload.single('slika'), async (req, res) => {
    try {
        const { naziv, opis, cijena } = req.body;
        const proizvod = await Proizvod.findByPk(req.params.id);
        if (!proizvod) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update fields
        proizvod.naziv = naziv;
        proizvod.opis = opis;
        proizvod.cijena = cijena;

        // Handle image update
        if (req.file) {
            // Delete old image if exists
            if (proizvod.slika) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', proizvod.slika);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    }
                });
            }
            proizvod.slika = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        await proizvod.save();
        res.json(proizvod);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        if (!proizvod) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete image file if exists
        if (proizvod.slika) {
            const imagePath = path.join(__dirname, '..', 'uploads', proizvod.slika);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
            });
        }

        await proizvod.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;