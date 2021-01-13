import React, { useState } from 'react';
import { Input, Button, Form } from 'reactstrap';
import './Search.css';

const INIT_STATE = {
	search: '',
	filter: 'size'
};

const Search = ({ fn }) => {
	const [ formData, setFormData ] = useState(INIT_STATE);

	// Runs when form values are changed
	const handleChange = (evt) => {
		const { value, name } = evt.target;

		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	// Runs when the form is submitted
	const handleSubmit = (evt) => {
		evt.preventDefault();

		fn(formData.search, formData.filter);
	};

	return (
		<Form onSubmit={handleSubmit} inline>
			<Input
				style={{ marginLeft: '5px', width: '63%' }}
				name="search"
				value={formData.search}
				onChange={handleChange}
				type="text"
				placeholder="Search by..."
				className="Search-text"
			/>

			<Input
				type="select"
				name="filter"
				id="filter"
				onChange={handleChange}
				style={{ width: '25%' }}
				className="Search-select"
			>
				<option>size</option>
				<option>name</option>
				<option>brand</option>
			</Input>

			<Button style={{ width: '10%' }} className="Search-button" color="primary">
				<i className="fas fa-search" />
			</Button>
		</Form>
	);
};

export default Search;
