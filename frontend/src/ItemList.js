import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import './ItemList.css';
import Search from './Search';
import { BASE_URL } from './variables';

const ItemList = ({ gender }) => {
	const [ items, setItems ] = useState([]);

	const searchFn = async (term, filter) => {
		// Return if there is no input
		if (!term) return;

		// Get items based on the filter
		let results = await axios.get(`${BASE_URL}/items/${filter}/${term}`);

		setItems(results.data.items);
	};

	useEffect(
		() => {
			const getItems = async () => {
				let res;
				if (gender === undefined) {
					res = await axios.get(`${BASE_URL}/items`);
				} else {
					res = await axios.get(`${BASE_URL}/items/gender/${gender}`);
				}
				let itemsResults = res.data.items;

				setItems(itemsResults);
			};
			getItems();
		},
		[ gender ]
	);

	return (
		<div>
			<div className="container mt-2">
				<Search fn={searchFn} />
			</div>
			<div className="ItemList-container container mt-2">
				{items.length === 0 ? (
					<h1>No results found</h1>
				) : (
					items.map((item) => {
						return (
							<Item
								product_name={item.product_name}
								price={item.price}
								image={item.image}
								size={item.size}
								key={item.id}
								id={item.id}
								available={item.quantity}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default ItemList;
