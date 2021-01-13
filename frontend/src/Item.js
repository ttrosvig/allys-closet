import React from 'react';
import './Item.css';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { cloudinary_user } from './variables';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './actions/actions';

const Item = ({ product_name, price, image, size, id, available }) => {
	const dispatch = useDispatch();

	const { cartItems } = useSelector((store) => store);

	// Adds an item to cart
	const add = () => {
		if (cartItems[product_name]) {
			if (cartItems[product_name].quantity >= cartItems[product_name].available) {
				return;
			}
		}

		dispatch(addToCart(product_name, price, available, id));
	};

	return (
		<span className="Item">
			<Card style={{ width: '185px', height: '425px' }}>
				<Image cloudName={cloudinary_user} publicId={image} className="Item-image" />
				<CardBody className="Item-container">
					<CardTitle className="m-0" tag="h5">
						<Link style={{ color: 'black' }} to={`/items/details/${id}`}>
							<b>{product_name}</b>
						</Link>
						<p>{`$${price}`}</p>
						<span style={{ fontSize: '0.90em' }}>Size: {size}</span>
					</CardTitle>

					<Button color="success" outline onClick={add}>
						Add to cart
						<i className="fas fa-cart-plus ml-1" />
					</Button>
				</CardBody>
			</Card>
		</span>
	);
};

export default Item;
