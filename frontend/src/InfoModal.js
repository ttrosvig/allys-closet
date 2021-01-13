import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './InfoModal.css';

const InfoModal = ({ text, title }) => {
	const [ modal, setModal ] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<div>
			<span className="InfoModal-link" onClick={toggle}>
				{title}
			</span>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>{text}</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default InfoModal;
