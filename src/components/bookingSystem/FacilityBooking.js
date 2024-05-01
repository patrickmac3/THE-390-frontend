import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import LargeTitle from "../LargeTitle.js";
import { Button,Row, Col, Modal } from 'react-bootstrap';
import Calendar from './Calendar.js';

const FacilityBooking = () => {

    // propertyId is used to fetch the facility booking details for that specific property
    let {propertyId} = useParams(); 

    const [chosenTime, setChosenTime] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleTimeSelected = (time) => {
        setChosenTime(time);
    };

    const handleConfirmModalClose = () => {
        setShowConfirmation(false);
    };

    const handleConfirm = () => {
        setShowConfirmation(true);
       
    };
    

    return (
       <Row className='justify-content-center'>

        <LargeTitle title='Facility Booking' />
            <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                <h2>Condo number {propertyId}</h2>
            </div>

            {/* This section will display the available facilities that can be booked  */}
        <Row style = {{marginTop:'20px'}}>
            <Col md={2}>
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                    <p style={{fontWeight:'bold'}}>Choose a facility: </p>
                </div>
                <Button variant='primary' size='lg' active style={{width:'100%', marginBottom:'10px'}}>
                    Common Facility #1
                </Button>
                <Button variant='primary' size='lg' active style={{width:'100%', marginBottom:'10px'}}>
                    Common Facility #2
                </Button>
            </Col>


            {/* Fix "Confirm" button, it's currently disabled */}
            <Col md={10}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Pick a date and time:</p>
                    <Row style={{ marginBottom: '20px' }}>
                        <Calendar onTimeSelected={handleTimeSelected} />
                    </Row>
                    <Row>
                        <Button variant='primary' size='lg' active style={{ width: '100%', marginBottom: '10px' }} onClick={handleConfirm} disabled={!chosenTime}>
                            Confirm choice
                        </Button>
                    </Row>
                </div>
                <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reservation Confirmed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your choice has been reserved.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmation(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Col>

        </Row>
    </Row>
            

       
    );
};

export default FacilityBooking;