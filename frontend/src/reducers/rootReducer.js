import { ADD_ITEM, REMOVE_ITEM } from '../actions/actionTypes';

const INIT_STATE = {
	cartItems: JSON.parse(localStorage.getItem('items')) || {}
};

const rootReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ADD_ITEM:
			const cartCopy = { ...state.cartItems };

			// Increment the quantity and set the price and available variables
			cartCopy[action.product_name] = {
				quantity: (cartCopy[action.product_name] ? cartCopy[action.product_name].quantity : 0) + 1,
				price: action.price,
				available: action.available,
				id: action.id
			};

			localStorage.setItem('items', JSON.stringify(cartCopy));

			return {
				...state,
				cartItems: cartCopy
			};
		case REMOVE_ITEM:
			const anotherCartCopy = { ...state.cartItems };

			if (!anotherCartCopy[action.product_name]) return state;

			// Decrement the quantity value
			anotherCartCopy[action.product_name].quantity--;

			// Remove the item if the quantity is 0
			if (anotherCartCopy[action.product_name].quantity === 0) {
				delete anotherCartCopy[action.product_name];
			}

			localStorage.setItem('items', JSON.stringify(anotherCartCopy));
			return {
				...state,
				cartItems: anotherCartCopy
			};
		default:
			return state;
	}
};

export default rootReducer;
