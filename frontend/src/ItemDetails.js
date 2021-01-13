import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { Button } from 'reactstrap';
import { cloudinary_user } from './variables';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './actions/actions';
import './ItemDetails.css';
import { BASE_URL } from './variables';
import { capWord } from './helpers';

const ItemDetails = () => {
	const { id } = useParams();
	const [ item, setItem ] = useState({});
	const dispatch = useDispatch();

	// Get cart items from the Redux store
	const { cartItems } = useSelector((store) => store);

	// Adds an item to cart
	const add = (product_name, price, available, id) => {
		if (cartItems[product_name]) {
			if (cartItems[product_name].quantity >= cartItems[product_name].available) {
				return;
			}
		}

		dispatch(addToCart(product_name, price, available, id));
	};

	useEffect(
		() => {
			const getData = async () => {
				const itemResult = await axios.get(`${BASE_URL}/items/details/${id}`);

				setItem(itemResult.data.item);
			};
			getData();
		},
		[ id ]
	);

	return (
		<div className="container text-center ItemDetails-container">
			<div className="row">
				<div className="col-sm-8 ItemDetails-grid-container">
					<Image
						cloudName={cloudinary_user}
						publicId={item.image}
						style={{ maxWidth: '400px', width: '100%', maxHeight: 'auto' }}
					/>

					<Button
						color="success"
						outline
						block
						onClick={() => add(item.product_name, item.price, item.quantity, item.id)}
						className="Item-button my-2"
						style={{ maxWidth: '400px' }}
					>
						Add to cart
						<i className="fas fa-cart-plus ml-1" />
					</Button>
				</div>
				<div className="col-sm-4 ItemDetails-info">
					<h3>{item.product_name}</h3>
					<p>
						<b>${item.price}</b>
					</p>

					<p>Quantity available: {item.quantity}</p>

					<p>{capWord(item.gender)}</p>

					<p>Size: {item.size}</p>

					<p className="text-left" style={{ fontSize: '0.75em', margin: '15px', maxWidth: '450px' }}>
						{item.description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ItemDetails;
