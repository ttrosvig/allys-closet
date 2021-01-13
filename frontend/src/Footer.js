import React from 'react';
import './Footer.css';
import InfoModal from './InfoModal';
import { contact_us, disclaimer, privacy_policy, refund_policy } from './variables';

const Footer = () => {
	return (
		<div className="Footer">
			<div className="Footer-quick-links">
				<InfoModal className="Footer-link" title="Privacy Policy" text={privacy_policy} />

				<InfoModal text={refund_policy} title="Refund Policy" />

				<InfoModal text={disclaimer} title="Disclaimer" />

				<InfoModal text={contact_us} title="Contact Us" />
			</div>
			<div className="Footer-social-icons">
				<a href="https://www.facebook.com/groups/allysclosetgroup/" className="Footer-link-icon">
					<i className="fab fa-facebook-square" />
				</a>
				<a href="https://www.instagram.com/allysclosetgroup/" className="Footer-link-icon">
					<i className="fab fa-instagram" />
				</a>
				<a href="https://www.tiktok.com/@allysclosetgroup/" className="Footer-link-icon">
					<i className="fab fa-tiktok" />
				</a>
			</div>
		</div>
	);
};

export default Footer;
