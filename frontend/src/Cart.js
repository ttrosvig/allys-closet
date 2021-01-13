import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { calculateCartTotal } from './helpers';
import { removeFromCart, addToCart } from './actions/actions';
import { v4 as uuid } from 'uuid';

const Cart = () => {
	// Get cart items from the Redux store
	const { cartItems } = useSelector((store) => store);

	// Set localStorage
	localStorage.setItem('items', JSON.stringify(cartItems));

	// Get from localStorage
	const localStorageItems = JSON.parse(localStorage.getItem('items'));

	// Get the keys and the values from cartItems
	let productNames = Object.keys(localStorageItems);
	let productValues = Object.values(localStorageItems);

	const dispatch = useDispatch();

	// Used to remove an item from cart
	const remove = (product_name) => dispatch(removeFromCart(product_name));

	// Used to add an item to cart
	const add = (product_name, price, available, id) => dispatch(addToCart(product_name, price, available, id));

	return (
		<div>
			{productNames.length === 0 ? (
				<div className="text-center">
					<h1>Cart is empty</h1>
				</div>
			) : (
				<div>
					<h1 className="text-center">Your cart total is: ${calculateCartTotal(cartItems)}</h1>
					<p className="text-center text-success">+ $8.50 shipping</p>
					<Table className="text-center">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Quantity</th>
								<th>Price</th>
								<th>Add Item</th>
								<th>Remove Item</th>
							</tr>
						</thead>
						<tbody>
							{productNames.map((i, idx) => {
								return (
									<tr key={uuid()}>
										<th>{i}</th>

										<th>{productValues[idx].quantity}</th>

										<th>{`$${productValues[idx].price}`}</th>

										<td>
											{productValues[idx].quantity >= productValues[idx].available ? (
												<Button color="success" disabled>
													<b>
														<i className="fas fa-plus" />
													</b>
												</Button>
											) : (
												<Button
													color="success"
													onClick={() =>
														add(
															productNames[idx],
															productValues[idx].price,
															productValues[idx].available,
															productValues[idx].id
														)}
												>
													<b>
														<i className="fas fa-plus" />
													</b>
												</Button>
											)}
										</td>
										<td>
											<Button onClick={() => remove(productNames[idx])} color="danger">
												<b>
													<i className="fas fa-minus" />
												</b>
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			)}

			{productNames.length === 0 ? null : (
				<div className="container">
					<a href="/checkout" style={{ textDecoration: 'none' }}>
						<Button color="success" block className="mb-2">
							Checkout
						</Button>
					</a>

					<Button
						color="danger"
						outline
						block
						onClick={() => {
							localStorage.clear();
							window.location.reload();
						}}
					>
						Clear Cart
					</Button>
				</div>
			)}
		</div>
	);
};

export default Cart;
