const express = require('express');
const Proizvod = require('../models/Proizvod');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const proizvodi = await Proizvod.findAll();
        res.json(proizvodi);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { naziv, opis } = req.body;
        const noviProizvod = await Proizvod.create({ naziv, opis });
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


router.put('/:id', async (req, res) => {
    try {
        const { naziv, opis } = req.body;
        const proizvod = await Proizvod.findByPk(req.params.id);
        if (!proizvod) {
            return res.status(404).json({ error: 'Product not found' });
        }
        proizvod.naziv = naziv;
        proizvod.opis = opis;
        await proizvod.save();
        res.json(proizvod);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

);


router.delete('/:id', async (req, res) => {
    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        if (!proizvod) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await proizvod.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

module.exports = router;