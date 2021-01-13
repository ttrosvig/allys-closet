import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemList from './ItemList';
import Home from './Home';
import AdminForm from './AdminForm';
import ItemDetails from './ItemDetails';
import AdminLogin from './AdminLogin';
import { url_secret } from './variables';
import Cart from './Cart';
import PageNotFound from './PageNotFound';
import Checkout from './Checkout';
import ThankYou from './ThankYou';
import Error from './Error';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/items">
				<ItemList />
			</Route>
			<Route exact path="/items/details/:id">
				<ItemDetails />
			</Route>
			<Route exact path="/items/women">
				<ItemList gender="women" />
			</Route>
			<Route exact path="/items/men">
				<ItemList gender="men" />
			</Route>
			<Route exact path="/items/kids">
				<ItemList gender="kids" />
			</Route>
			<Route exact path="/cart">
				<Cart />
			</Route>
			<Route exact path="/admin">
				<AdminLogin />
			</Route>
			<Route exact path={`/admin/${url_secret}`}>
				<AdminForm />
			</Route>
			<Route exact path={`/checkout`}>
				<Checkout />
			</Route>
			<Route exact path="/thanks">
				<ThankYou />
			</Route>
			<Route exact path="/error">
				<Error />
			</Route>
			<PageNotFound />
		</Switch>
	);
};

export default Routes;
