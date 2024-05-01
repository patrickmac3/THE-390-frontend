import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Container, Row, Col, ListGroup, Card, Button, Form, Modal } from 'react-bootstrap';
import { useProperty } from '../../utils/hooks/PropertyContext';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { useState } from 'react';
import axiosInstance from '../../api/axios';


const PropertyPage = () => {
  let navigate = useNavigate();

  const { propertyId } = useParams();
  const { property, fetchPropertyById } = useProperty(); //receive needed functions from the property context

  useEffect(() => {
    if (propertyId) {
      //this is useful only for company accounts
      // make the api call from the backend
      fetchPropertyById(propertyId);
    }
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderStyle = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '15px' }

  const renderUnits = () => {
    // Check if the condo_units array is empty
    if (!property.condo_units || property.condo_units.length === 0) {
      return <div>This Property Doesn't Have Units Yet.</div>; // You can customize this message or component as needed
    }
    return property.condo_units.map((unit) => (
      //FIXME unique key prop error in the console
      <ListGroup variant="flush" key={unit.id} style={{ width: '250px', height: '150px', margin: '5px', fontSize: '13px' }} className=" h-25 shadow">
        <ListGroup.Item style={{ marginBottom: "-10px" }}><img src={unit.image} style={{ width: '220px', height: '180px' }} /></ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}><strong>unit name place holder{/*{unit.name}*/}</strong></ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Location: {unit.location}</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Purchase Price: ${unit.purchase_price}</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Rental Price: ${unit.rent_price}</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Size: {unit.size} sqft</ListGroup.Item>
        <ListGroup.Item>Unit Fees: {unit.property_fee} $</ListGroup.Item>
      </ListGroup>
    ));
  };

  const renderParkingSpots = () => {
    // Check if the condo_units array is empty
    if (!property.parking_units || property.parking_units.length === 0) {
      return <div>This Property Doesn't Have Parking Spots Yet.</div>; // You can customize this message or component as needed
    }
    return property.parking_units.map((spot) => (
      <ListGroup variant="flush" key={spot.id} style={{ width: '250px', height: '150px', margin: '5px', fontSize: '13px' }} className=" h-25 shadow">
        <ListGroup.Item style={{ marginBottom: "-10px" }}><img src={spot.image} style={{ width: '220px', height: '180px' }} /></ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Location: {spot.location}</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Size: {spot.size} sqft</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Purchase Price: ${spot.purchase_price}</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Rent Price: ${spot.rent_price}</ListGroup.Item>
        <ListGroup.Item >Extra Information: {spot.extra_information}</ListGroup.Item>
      </ListGroup>
    ));
  };

  const renderLockers = () => {
    // Check if the condo_units array is empty
    if (!property.storage_units || property.storage_units.length === 0) {
      return <div>This Property Doesn't Have Lockers Yet.</div>; // You can customize this message or component as needed
    }
    return property.storage_units.map((locker) => (
      <ListGroup key={locker.id} style={{ width: '250px', height: '110px', margin: '5px', fontSize: '13px' }} className=" h-25 shadow">
        <ListGroup.Item style={{ marginBottom: "-10px" }}><img src={locker.image} style={{ width: '220px', height: '180px' }} /></ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Location: {locker.location}</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Size: {locker.size} sqft</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Purchase Price: ${locker.purchase_price}</ListGroup.Item>
        <ListGroup.Item style={{ marginBottom: "-10px" }}>Rent Price: ${locker.rent_price}</ListGroup.Item>
        {/*<ListGroup.Item >Number: {locker.number}</ListGroup.Item>*/}
      </ListGroup>
    ));
  };

  function goBack() {
    navigate(-1);
  }
  function handleBackToDashboard() {
    goBack()
  }

  function handleGoToCommonFacilities() {
    navigate(`/property-page/${propertyId}/common-facilities`);
  }

  function handleGoToUnitCreate() {
    navigate(`/property-page/${propertyId}/create-condo-unit`);
  }
  function handleGoToParkingCreate() {
    navigate(`/property-page/${propertyId}/create-parking-unit`);
  }
  function handleGoToLockerCreate() {
    navigate(`/property-page/${propertyId}/create-locker-unit`);
  }
  return (
    <Container fluid >
      <Row>
        <Col md={4} style={{ padding: '0' }}>
          {/* FIXME there's no image in db yet */}
          <img src={property.image} alt={property.name} style={{ width: '100%', height: '80vh', objectFit: 'cover', marginTop: '28px' }} />
          {/* <Card className="mt-4 h-25 shadow">
            <Card.Title className="fw-bold">This is where property finances go?</Card.Title>
            This is where the finanical details will go
          </Card>
          <Card className="mt-4 h-25 shadow">
            <Card.Title className="fw-bold">This is where property Requests go?</Card.Title>
            This is where the requests details will go
          </Card> */}
        </Col>
        <Col style={{ padding: '20px', overflowY: 'auto' }}>
          <Row>
            <Col>
              {/* FIXME there's no name in db yet */}
              {/* <h2>{property.name}</h2> */}
              <h1>The {property.name}</h1>
            </Col>

            <Col className="d-flex justify-content-end">

              <Button variant="primary" onClick={handleGoToCommonFacilities} style={{ marginRight: "40px" }} data-testid="to-common-facilities" >
                CommonFacilities
              </Button>

              <Button variant="primary" onClick={handleShow} style={{ marginRight: "40px" }}>
                Upload Files
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Upload Files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group controlId="formFileMultiple" className="mb-3" style={{ marginRight: "50px" }}>
                    <Form.Label>Add your documents here.</Form.Label>
                    <Form.Control type="file" multiple />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              <Button onClick={handleBackToDashboard} data-testid="dashboard-return">
                Dashboard
              </Button>

            </Col>
          </Row>

          <Row style={{ width: '300px' }}>
            <Col>
              <h5 className="mt-3 me-2">Units</h5>
            </Col>
            <Col>
              < Button className="mt-2" variant="primary" onClick={handleGoToUnitCreate} data-testid="create-condo-unit-button">+</Button>
            </Col>
          </Row>
          <div style={renderStyle}>
            {renderUnits()}
          </div>
          <Row style={{ width: '300px' }}>
            <Col>
              <h5 className="mt-3">Parking Spots </h5>
            </Col>
            <Col>
              <Button className="mt-2" variant="primary" onClick={handleGoToParkingCreate} data-testid="create-parking-unit-button">+</Button>
            </Col>
          </Row>
          <div style={renderStyle}>
            {renderParkingSpots()}
          </div>
          <Row style={{ width: '300px' }}>
            <Col>
              <h5 className="mt-3">Lockers </h5>
            </Col>
            <Col>
              <Button className="mt-2" data-testid="create-storage-unit-button" onClick={handleGoToLockerCreate} variant="primary">+</Button>            </Col>
          </Row>
          <div style={renderStyle}>
            {renderLockers()}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyPage;
