import React, { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { username, password, url_secret } from './variables';
import './AdminLogin.css';

// Init values for the admin login
const INIT_STATE = {
	username: '',
	password: ''
};

const AdminLogin = () => {
	const [ formData, setFormData ] = useState(INIT_STATE);

	// Used to redirect the user
	const history = useHistory();

	// Runs when form values change
	const handleChange = (evt) => {
		const { name, value } = evt.target;

		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	// Runs when the form is submitted
	const handleSubmit = (evt) => {
		evt.preventDefault();

		// Redirect to the admin page if the correct username and password are passed
		if (formData.password === password && formData.username === username) {
			history.push(`/admin/${url_secret}`);
		} else {
			history.push('/');
		}
	};
	return (
		<Form onSubmit={handleSubmit} className="container AdminLogin">
			<h1 className="display-4">Admin Login</h1>
			<Input
				type="text"
				id="username"
				name="username"
				placeholder="Username"
				onChange={handleChange}
				value={formData.username}
				autoFocus
			/>

			<Input
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				onChange={handleChange}
				value={formData.password}
				className="my-2"
			/>

			<Button color="success">Login</Button>
		</Form>
	);
};

export default AdminLogin;
