const express = require('express');
const cors = require('cors');
const ExpressError = require('./expressError');

// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const itemRoutes = require('./routes/items');

// Use the routes with their prefixes
app.use('/items', itemRoutes);

// 404 handler
app.use(function(req, res, next) {
	const err = new ExpressError('Not Found');
	err.status = 404;

	// Pass the error to next middleware
	return next(err);
});

// General error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);

	return res.json({
		error: err
	});
});

module.exports = app;
