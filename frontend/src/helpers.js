export const calcNumInCart = (cart) => {
	let count = 0;
	let items = Object.values(cart);
	for (let item of items) {
		count += item.quantity;
	}
	return count;
};

export const calculateCartTotal = (cart) => {
	let totalCost = 0.0;
	let prices = Object.values(cart);
	for (let price of prices) {
		totalCost += price.price * price.quantity;
	}

	return totalCost.toFixed(2);
};

export const createReceiptDescription = (cart) => {
	let productNames = Object.keys(cart);
	let reciptDesc = [];

	for (let i = 0; i < productNames.length; i++) {
		reciptDesc.push(String(cart[productNames[i]].quantity) + ' x ' + productNames[i]);
	}

	return reciptDesc;
};

export const capWord = (word) => {
	if (typeof word !== 'string') return '';
	return word.charAt(0).toUpperCase() + word.slice(1);
};
