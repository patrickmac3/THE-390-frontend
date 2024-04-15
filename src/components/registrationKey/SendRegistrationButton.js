import React, { useEffect, useState } from 'react'
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { useProperty } from '../../utils/hooks/PropertyContext.js';
import axiosInstance from '../../api/axios.js';

const SendRegistrationButton = () => {
    const companyId = localStorage.getItem('ID');
    // state to handle modal visibility
    const [showModal, setShowModal] = useState(false);

    // state and function to handle user type selection, true for Owner, false for Renter
    const [isOwner, setIsOwner] = useState(true);
    const handleSwitchChange = () => setIsOwner(!isOwner);

    // function to open and close the modal 
    const handleOpen = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setUnits([]);
        setUsers([]);
        setSelectedUnit('Your Unit');
        setSelectedUser('Your User');
    }
    const handleSend = async () => {
        // console.log(pickedUnit.id);
        // console.log(pickedUser.user.email);
        // console.log(companyId);
        await SendRegistrationkeyRequest();
        handleClose();
    }
    // states to output selected unit and selected user
    const [selectedUnit, setSelectedUnit] = useState('Your Unit');
    const [selectedUser, setSelectedUser] = useState('Your User');

    // states to get all the units from the properties that belong to the company
    const { properties } = useProperty();
    const [units, setUnits] = useState([]);
    const [users, setUsers] = useState([]);

    // function to go through the properties and append its units to the units state
    const getUnitsFromProperties = (properties, companyId) => {
        let allUnits = [];
        Object.values(properties).forEach(property => {
            // if (property.company == companyId) {
            // Destructure the units arrays from the current property
            const { condo_units, parking_units, storage_units } = property;

            // Aggregate units without setting the state immediately
            [condo_units, parking_units, storage_units].forEach(unitsArray => {
                if (unitsArray && Array.isArray(unitsArray)) { // Ensure unitsArray exists and is an array
                    allUnits = [...allUnits, ...unitsArray];
                }
            });
            // }
        })
        const unitsWithNullUser = allUnits.filter(unit => unit.public_profile === null);
        // Now update the state a single time
        setUnits(unitsWithNullUser);
    };


    const getPublicUsers = async () => {
        try {
            const response = await axiosInstance.get('/profiles/public-profile/');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    //api call with selectedUnit companyId and selectedUser.email
    //FIXME always getting 500 error, could be an email not being read
    // even though i added async and await for this function call
    const SendRegistrationkeyRequest = async () => {
        console.log(parseInt(selectedUnit.id))
        console.log(selectedUser.user.email)
        console.log(parseInt(companyId, 10))
        console.log(isOwner)
        try {
            //FIXME i hard coded values and still didn't work. tried postman and stilll didn't work, might not be post.
            const response = await axiosInstance.post('/registration-keys/condo-registration-key/', {
                unit: parseInt(selectedUnit.id),
                user: selectedUser.user.email,
                company: parseInt(companyId, 10),
                is_owner: isOwner
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }

    }
    //TODO add a property name in the 
    useEffect(() => {

        if (properties) {
            getUnitsFromProperties(properties, companyId);
            getPublicUsers();
        }
    }, [showModal]);


    return (
        <>
            {/* button to open the modal */}
            <Button variant="primary" onClick={() => {
                handleOpen()
            }}>
                Send a Key
            </Button>

            {/* modal to send a registration key */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    {/*title for the modal*/}
                    <Modal.Title className="w-100 text-center"><h2>Registration Key Details</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* dropdown to choose the Unit managed by the company to assign a key to*/}
                    <h5 className="w-100 text-center">Select an Available Unit</h5>
                    <Dropdown className="mb-4 w-75 text-center mx-auto">
                        <Dropdown.Toggle variant="success" id="dropdown-Unit" className="w-100">
                            {selectedUnit === 'Your Unit' ? 'Your Unit' : `Unit ${selectedUnit.location}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100 text-center">
                            {
                                units.map((unit) => {
                                    return <Dropdown.Item key={unit.id} eventKey={unit.id} onClick={() => setSelectedUnit(unit)}>Unit {unit.location}</Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* dropdown to choose the User by the company to assign a key to*/}
                    <h5 className="w-100 text-center">Select a User to Send Key To</h5>
                    <Dropdown className="mb-4 w-75 text-center mx-auto">
                        <Dropdown.Toggle variant="success" id="dropdown-User" className="w-100">
                            {selectedUser === "Your User" ? "Your User" : `${selectedUser.user.first_name} ${selectedUser.user.last_name}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100 text-center">
                            {
                                users.map((user) => {
                                    return <Dropdown.Item key={user.user.id} eventKey={user.id} onClick={() => setSelectedUser(user)}>{user.user.first_name} {user.user.last_name}</Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Group controlId="formUserRoleSwitch" className="mt-3">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={isOwner ? 'Owner' : 'Renter'}
                            checked={isOwner}
                            onChange={handleSwitchChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSend}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SendRegistrationButton