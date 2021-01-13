const db = require('../db');
const ExpressError = require('../expressError');

class Item {
	// Find all items
	static async findAll() {
		const result = await db.query(`SELECT * FROM items ORDER BY product_name`);

		return result.rows;
	}

	// Find an item by id
	static async findById(id) {
		const result = await db.query(`SELECT * FROM items WHERE id=$1`, [ id ]);

		return result.rows[0];
	}

	// Find an item by name
	static async findByName(name) {
		const results = await db.query(`SELECT * FROM items WHERE UPPER(product_name) LIKE UPPER('%${name}%')`);

		return results.rows;
	}

	// Find all items of the same brand
	static async findByBrand(brand) {
		const results = await db.query(`SELECT * FROM items WHERE UPPER(brand) LIKE UPPER('%${brand}%')`);

		return results.rows;
	}

	// Find all items of the same gender (mens, womens, kids)
	static async findByGender(gender) {
		const results = await db.query(`SELECT * FROM items WHERE gender = $1`, [ gender ]);

		return results.rows;
	}

	// Find all items with the same size
	static async findBySize(size) {
		const results = await db.query(`SELECT * FROM items WHERE UPPER(size) LIKE UPPER('%${size}%')`);

		return results.rows;
	}

	static async create(data) {
		const result = await db.query(
			`INSERT INTO items (product_name, gender, size, image, price, quantity, description, category, brand, color)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
			[
				data.product_name,
				data.gender,
				data.size,
				data.image,
				data.price,
				data.quantity,
				data.description,
				data.category,
				data.brand,
				data.color
			]
		);

		return result.rows[0];
	}

	static async update(id, data) {
		const result = await db.query(
			`UPDATE items SET product_name = $1, gender = $2, size = $3, image = $4, price = $5, quantity = $6, description = $7, category = $8, brand = $9, color = $10 WHERE id = $11 RETURNING *`,
			[
				data.product_name,
				data.gender,
				data.size,
				data.image,
				data.price,
				data.quantity,
				data.description,
				data.category,
				data.brand,
				data.color,
				id
			]
		);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no item with id of ${id}`, 404);
		}

		return result.rows[0];
	}

	static async remove(id) {
		const result = await db.query(`DELETE FROM items WHERE id = $1 RETURNING brand`, [ id ]);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no item with id of ${id}`, 404);
		}

		return result.rows[0];
	}
}

module.exports = Item;
