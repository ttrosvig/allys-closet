import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { calculateCartTotal, createReceiptDescription } from '../helpers';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../variables';

const PayPal = () => {
	// Used to render the PayPal component
	const paypal = useRef();

	// Used to redirect after a successful purchase
	const history = useHistory();

	// Retrieve the cart items from the Redux store
	const { cartItems } = useSelector((store) => store);

	// Get the product names from the cartItems object
	let productNames = Object.keys(cartItems);

	// Calculate the total cost of the items in the cart
	let totalCost = Number(calculateCartTotal(cartItems)) + 8.5;

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								description: `${createReceiptDescription(cartItems).join(', ')}, and $8.50 shipping`,
								amount: {
									value: totalCost
								}
							}
						]
					});
				},
				// This code runs when the purchase is approved
				onApprove: async (data, actions) => {
					await actions.order.capture();

					// Decrement the quantity available or delete the item from the database upon a successful purchase
					const getData = async () => {
						for (let i = 0; i < productNames.length; i++) {
							// Get the item
							let res = await axios.get(`${BASE_URL}/items/details/${cartItems[productNames[i]].id}`);

							// Check if it needs to be decremented or deleted
							if (res.data.item.quantity - cartItems[res.data.item.product_name].quantity === 0) {
								await axios.delete(`${BASE_URL}/items/${res.data.item.id}`);
							} else {
								res.data.item.quantity = res.data.item.quantity - cartItems[res.data.item.product_name].quantity;

								let savedId = res.data.item.id;
								delete res.data.item.id;

								await axios.put(`${BASE_URL}/items/${savedId}`, res.data.item);
							}
						}
					};
					getData();

					localStorage.clear();

					// Redirect to the thank you page
					history.push('/thanks');
					window.location.reload();
				},
				onError: (err) => {
					// console.log(err);
					history.push('/error');
				}
			})
			.render(paypal.current);
	});
	return (
		<div style={{ paddingBottom: '100px' }}>
			<div ref={paypal} />
		</div>
	);
};

export default PayPal;
