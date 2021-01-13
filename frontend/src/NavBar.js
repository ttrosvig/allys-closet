import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from './static/Logo.jpeg';
import { calcNumInCart } from './helpers';

const NavBar = () => {
	const [ isOpen, setIsOpen ] = useState(false);

	const { cartItems } = useSelector((store) => store);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavLink style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/">
					<img style={{ height: '50px', width: '100px' }} src={Logo} alt="Ally's Closet Logo" />
				</NavLink>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="m-auto" navbar>
						<NavLink className="mx-3" style={{ color: 'black', textDecoration: 'none' }} to="/items">
							All
						</NavLink>
						<NavLink className="mx-3" style={{ color: 'black', textDecoration: 'none' }} to="/items/men">
							Men
						</NavLink>
						<NavLink className="mx-3" style={{ color: 'black', textDecoration: 'none' }} to="/items/women">
							Women
						</NavLink>
						<NavLink className="mx-3" style={{ color: 'black', textDecoration: 'none' }} to="/items/kids">
							Kids
						</NavLink>
					</Nav>

					<NavLink style={{ color: 'black', textDecoration: 'none' }} to="/cart" className="mx-3">
						<i className="fas fa-shopping-cart" />
						({calcNumInCart(cartItems)})
					</NavLink>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
