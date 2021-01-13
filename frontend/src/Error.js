import React from 'react';
import Logo from './static/Logo.jpeg';
import './Error.css';

// Renders when the purchase isn't approved by PayPal
const Error = () => {
	return (
		<div className="container Error-container">
			<img style={{ width: '500px', marginTop: '5%' }} src={Logo} alt="Ally's Closet Logo" />

			<div className="text-center mb-4 Error-text text-danger">
				Something went wrong with your purchase. Please ensure you have sufficient funds in your account and try again.
				If your information is correct and you have sufficient funds, please contact us at allysclosetgroup@gmail.com.
			</div>
		</div>
	);
};

export default Error;
