import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axiosInstance from '../../api/axios';

function SubmitRegistrationButton() {
    const [show, setShow] = useState(false);
    const [regKey, setRegKey] = useState('');

    const handleClose = () => {
        setShow(false)
        setRegKey(''); // Clear the input field when the modal is closed
    };

    const sendKey = async () => {
        try {
            const response = await axiosInstance.patch('profiles/public-profile/register-condo/', {
                key: regKey,
                user: parseInt(localStorage.getItem('ID')),
            });
            if (response.status === 200) {
                // Handle success (e.g., notify user, update UI)
                console.log('Registration successful', response.data);
                alert('Condo registration successful!');
            } else {
                console.error('Registration failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error during condo registration:', error);
            alert('Failed to register condo. Please try again.');
        }
    };


    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        setShow(false); // Close the modal after submitting
        setRegKey(''); // Clear the input field when the modal is closed
        await sendKey();
    };

    const handleChange = (e) => {
        setRegKey(e.target.value);
    };

    const [selectedUnitType, setSelectedUnitType] = useState('condo');

    const handleChangeType = (e) => {
        setSelectedUnitType(e.target.value);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Submit Key
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Become Part of Our Family!</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label style={{ fontSize: "20px" }}>Enter Registration Key</Form.Label>
                            <Form.Control type="text" placeholder="Enter the 64 character Key" value={regKey} onChange={handleChange} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Key
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default SubmitRegistrationButton;
