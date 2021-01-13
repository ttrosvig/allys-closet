import React from 'react';
import Logo from './static/Logo.jpeg';
import './ThankYou.css';

// Runs when PayPal approves a payment
const ThankYou = () => {
	localStorage.clear();

	return (
		<div className="container ThankYou-container">
			<img style={{ width: '500px', marginTop: '5%' }} src={Logo} alt="Ally's Closet Logo" />

			<div className="text-center mb-4 ThankYou-text text-success">
				Thank you for shopping at Ally's Closet! You should receive a PayPal email with your receipt shortly!
			</div>
		</div>
	);
};

export default ThankYou;
