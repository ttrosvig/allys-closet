const express = require('express');
const ExpressError = require('../expressError');
const router = express.Router();
const Item = require('../models/items');
const { validate } = require('jsonschema');
const itemSchema = require('../schemas/itemSchema.json');

// Find all items
router.get('/', async (req, res, next) => {
	try {
		const items = await Item.findAll();

		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});

// Find an item by id
router.get('/details/:id', async (req, res, next) => {
	try {
		const item = await Item.findById(req.params.id);

		return res.json({ item });
	} catch (err) {
		return next(err);
	}
});

// Find an item by name
router.get('/name/:product_name', async (req, res, next) => {
	try {
		const items = await Item.findByName(req.params.product_name);

		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});

// Find all items of the same brand
router.get('/brand/:brand', async (req, res, next) => {
	try {
		const items = await Item.findByBrand(req.params.brand);

		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});

router.get('/gender/:gender', async (req, res, next) => {
	try {
		const items = await Item.findByGender(req.params.gender);

		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});

// Get item by size
router.get('/size/:size', async (req, res, next) => {
	try {
		const items = await Item.findBySize(req.params.size);

		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});

// Create an item
router.post('/', async (req, res, next) => {
	try {
		const validation = validate(req.body, itemSchema);
		if (!validation.valid) {
			throw new ExpressError(validation.errors.map((e) => e.stack), 400);
		}

		const item = await Item.create(req.body);

		return res.status(201).json({ item });
	} catch (err) {
		return next(err);
	}
});

// Update an item
router.put('/:id', async (req, res, next) => {
	try {
		if ('id' in req.body) {
			throw new ExpressError('Not allowed', 400);
		}

		const validation = validate(req.body, itemSchema);
		if (!validation.valid) {
			throw new ExpressError(validation.errors.map((e) => e.stack), 400);
		}

		const item = await Item.update(req.params.id, req.body);

		return res.status(202).json({ item });
	} catch (err) {
		return next(err);
	}
});

// Remove an item by id
router.delete('/:id', async (req, res, next) => {
	try {
		await Item.remove(req.params.id);

		return res.status(202).json({ status: 'Item successfully deleted' });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
