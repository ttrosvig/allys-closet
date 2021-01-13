import React, { useState, useEffect } from 'react';
import { Table, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';
import { BASE_URL } from './variables';

const AdminTable = () => {
	// State variables
	const [ items, setItems ] = useState([]);
	const [ isEditing, setIsEditing ] = useState(false);
	const [ formData, setFormData ] = useState({});

	// Runs when form values change
	const handleChange = (evt) => {
		const { name, value } = evt.target;

		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	// Runs when an item is deleted
	const deleteItem = async (id) => {
		await axios.delete(`${BASE_URL}/items/${id}`);
	};

	// Runs when an item is edited
	const editItem = async (id) => {
		const res = await axios.get(`${BASE_URL}/items/details/${id}`);

		setFormData(res.data.item);
		setIsEditing(true);
	};

	// Runs when the edit is completed
	const updateItem = async (id) => {
		// Remove the id from the formData object
		delete formData['id'];

		// Change strings to numbers
		formData.price = +formData.price;

		await axios.put(`${BASE_URL}/items/${id}`, formData);

		setIsEditing(false);
	};

	useEffect(
		() => {
			const getData = async () => {
				// Load items and save then to state in order to display in the table
				let itemsResult = await axios.get(`${BASE_URL}/items`);

				setItems(itemsResult.data.items);
			};
			getData();
		},
		[ items ]
	);

	return (
		<div style={{ paddingBottom: '100px' }}>
			{isEditing ? (
				<form>
					<h1>Editing {formData.product_name}</h1>
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
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<InputGroupText>$</InputGroupText>
							</InputGroupAddon>

							<Input type="float" placeholder="Price" name="price" id="price" onChange={handleChange} />
						</InputGroup>
					</div>

					<div className="my-2">
						<Input
							type="number"
							placeholder="Quantity (number)"
							name="quantity"
							id="quantity"
							onChange={handleChange}
						/>
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
						<Button block color="success" outline onClick={() => updateItem(formData.id)}>
							Save
						</Button>
						<Button block className="mb-5" onClick={() => setIsEditing(false)}>
							Cancel
						</Button>
					</div>
				</form>
			) : (
				<Table>
					<thead>
						<tr>
							<th>Product Name</th>
							<th>Color</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{items.map((i) => {
							return (
								<tr key={i.id}>
									<th>{i.product_name}</th>
									<td>{i.color}</td>
									<td>
										<Button color="primary" onClick={() => editItem(i.id)}>
											<i className="fas fa-edit" />
										</Button>
									</td>
									<td>
										<Button onClick={() => deleteItem(i.id)} color="danger">
											<i className="fas fa-trash" />
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default AdminTable;
