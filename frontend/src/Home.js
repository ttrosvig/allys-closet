import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './static/Logo.jpeg';
import './Home.css';
import ImgCarousel from './ImgCarousel';

// Image format example
// {
// 	src: Logo,
// 	altText: 'Deals image',
// 	caption: 'Winter Sale is Here!',
// 	captionText: '40% off Patagonia Sweaters'
// }

const items = [];

const Home = () => {
	return (
		<div className="container Home-container">
			<img
				style={items.length === 0 ? { width: '400px' } : { width: '300px' }}
				className="Home-logo"
				src={Logo}
				alt="Ally's Closet Logo"
			/>

			<ImgCarousel images={items} />

			<div className="text-center mb-4 Home-text">
				We are a name brand resale store. We feature high quality new and lightly worn clothing. We pride ourselves on
				providing quality sought after clothing for reasonable pricing. Happy shopping!
			</div>

			<Link to="/items">
				<button className="new-button">Browse Items</button>
			</Link>
		</div>
	);
};

export default Home;
