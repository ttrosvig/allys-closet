import React, { useState } from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, Spinner } from 'reactstrap';
import axios from 'axios';
import { cloudinary_user } from './variables';
import AdminTable from './AdminTable';
import { BASE_URL } from './variables';

// Init values for the admin form
let INIT_STATE = {
	product_name: '',
	gender: '',
	size: '',
	image: '',
	price: 0.0,
	quantity: 0,
	description: '',
	category: '',
	brand: '',
	color: ''
};

const AdminForm = () => {
	// State variables
	const [ formData, setFormData ] = useState(INIT_STATE);
	const [ image, setImage ] = useState({});
	const [ isLoading, setIsLoading ] = useState(false);

	// Used for the file upload to Cloudinary
	const data = new FormData();
	data.append('file', image);
	data.append('upload_preset', 'allysCloset');

	// Runs when form values change
	const handleChange = (evt) => {
		const { name, value } = evt.target;

		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	// Runs when the form is submitted
	const handleSubmit = async (evt) => {
		// Prevent page refresh
		evt.preventDefault();

		// Make sure no fields are empty
		let itemData = Object.values(formData);

		for (let item of itemData) {
			if (item === 0 || '') {
				return;
			}
		}

		// Loading
		setIsLoading(true);

		// Upload the image to cloudinary
		const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary_user}/image/upload`, data);

		// Set the value of the image to be the cloudinary public id from the res
		formData.image = res.data.public_id;

		// Change strings to numbers
		formData.price = +formData.price;
		formData.quantity = +formData.quantity;

		// Post to the DB
		await axios.post(`${BASE_URL}/items`, formData);

		setFormData(INIT_STATE);
		setIsLoading(false);
	};

	return (
		<div className="container d-flex flex-column text-center" style={{ maxWidth: '50%' }}>
			<h1 className="display-4">Enter a new item</h1>

			<p className="text-danger">All fields are required</p>

			<form onSubmit={handleSubmit}>
				<div className="my-2">
					<Input
						type="text"
						placeholder="Product name"
						name="product_name"
						id="product_name"
						onChange={handleChange}
						autoFocus
					/>
				</div>

				<div className="my-2">
					<Input type="select" name="gender" id="gender" onChange={handleChange}>
						<option>men/women/kids</option>
						<option>men</option>
						<option>women</option>
						<option>kids</option>
					</Input>
				</div>

				<div className="my-2">
					<Input type="text" placeholder="Size (S, M, 32x34, etc)" name="size" id="size" onChange={handleChange} />
				</div>

				<div className="my-2">
					<Input type="file" name="image" id="image" onChange={(event) => setImage(event.target.files[0])} />
				</div>

				<div className="my-2">
					<InputGroup>
						<InputGroupAddon addonType="prepend">
							<InputGroupText>$</InputGroupText>
						</InputGroupAddon>

						<Input type="float" placeholder="Price" name="price" id="price" onChange={handleChange} />
					</InputGroup>
				</div>

				<div className="my-2">
					<Input type="number" placeholder="Quantity (number)" name="quantity" id="quantity" onChange={handleChange} />
				</div>

				<div className="my-2">
					<Input
						type="textarea"
						name="description"
						id="description"
						rows={5}
						placeholder="Product description"
						onChange={handleChange}
					/>
				</div>

				<div className="my-2">
					<Input
						type="text"
						placeholder="Category (pants, top, etc)"
						name="category"
						id="category"
						onChange={handleChange}
					/>
				</div>

				<div className="my-2">
					<Input type="text" placeholder="Brand" name="brand" id="brand" onChange={handleChange} />
				</div>

				<div className="my-2">
					<Input type="text" placeholder="Color" name="color" id="color" onChange={handleChange} />
				</div>

				<div>
					{isLoading ? (
						<Button block disabled color="success">
							<Spinner color="light" />
						</Button>
					) : (
						<Button block color="success">
							Submit
						</Button>
					)}
				</div>
			</form>
			<br />

			<AdminTable />
		</div>
	);
};

export default AdminForm;
