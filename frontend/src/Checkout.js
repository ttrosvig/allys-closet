import React from 'react';
import PayPal from './components/PayPal';
import { useSelector } from 'react-redux';
import { calculateCartTotal } from './helpers';

const Checkout = () => {
	// Get cart items from the Redux store
	const { cartItems } = useSelector((store) => store);

	return (
		<div className="container text-center">
			<h1>Your cart total is: ${calculateCartTotal(cartItems)}</h1>

			<p className="text-danger">
				Purchased items and shipping cost will appear as one line in the receipt description.
			</p>

			<PayPal />
		</div>
	);
};

export default Checkout;
