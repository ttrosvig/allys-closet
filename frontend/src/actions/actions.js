import { ADD_ITEM, REMOVE_ITEM } from './actionTypes';

export function addToCart(product_name, price, available, id) {
	return {
		type: ADD_ITEM,
		product_name,
		price,
		available,
		id
	};
}

export function removeFromCart(product_name) {
	return {
		type: REMOVE_ITEM,
		product_name
	};
}
