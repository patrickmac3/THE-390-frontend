import React, { useState, useRef, useEffect } from 'react';
import { Button, Overlay, Popover, ListGroup, Card } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import axiosInstance from '../../api/axios';
import { useProfile } from '../../utils/hooks/ProfileContext';


const PropertyCard = ({ property, type }) => {
  //get the role of the user form the ProfileContext
  const { role } = useProfile();
  // Refs for the buttons
  const unitsRef = useRef(null);
  const parkingRef = useRef(null);
  const lockersRef = useRef(null);

  // State for showing popovers
  const [showUnits, setShowUnits] = useState(false);
  const [showParking, setShowParking] = useState(false);
  const [showLockers, setShowLockers] = useState(false);

  // Handlers for button clicks
  const toggleUnits = () => setShowUnits(!showUnits);
  const toggleParking = () => setShowParking(!showParking);
  const toggleLockers = () => setShowLockers(!showLockers);

  const calculateUnitTotal = (property) => {
    let total = 0;
    for (const unit of property.condo_units) {
      total += Number(unit.purchase_price);
    }
    return total;
  }
  const calculateParkingTotal = (property) => {
    let total = 0;
    for (const parking of property.parking_units) {
      total += Number(parking.purchase_price);
    }
    return total;
  }
  const calculateLockerTotal = (property) => {
    let total = 0;
    for (const locker of property.storage_units) {
      total += Number(locker.purchase_price);
    }
    return total;
  }

  return (
    // if the user is a company, show the property card as a property card, if not show unit cards
    role === "COMPANY" ? (
      <Card className="mb-3" style={{ maxWidth: '25rem', width: '100%', textAlign: 'center' }}>

        <Card.Img
          variant="top"
          src={property.image}
          style={{ width: '100%', height: 'auto', display: 'block', maxHeight: "200px", borderRadius: "10px" }}
        />
        <Card.Body>
          {/* FIXME the property doesn't have a name yet so i used id */}
          <Card.Title><NavLink to={`/property-page/${property.id}`}>{property.name}</NavLink></Card.Title>
          <Card.Text>Location: {property.address}</Card.Text>
          <Button ref={unitsRef} onClick={toggleUnits} variant="secondary" className="me-2">Units</Button>
          <Overlay target={unitsRef.current} show={showUnits} placement="bottom" rootClose={true} onHide={() => setShowUnits(false)}>
            {(props) => (
              <Popover {...props} id="popover-units">
                <Popover.Body>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div>Count: {property.condo_units.length}</div>
                    <div>Value: ${calculateUnitTotal(property)}</div>
                  </div>
                </Popover.Body>
              </Popover>
            )}
          </Overlay>

          <Button ref={parkingRef} onClick={toggleParking} variant="secondary" className="me-2">Parking</Button>
          <Overlay target={parkingRef.current} show={showParking} placement="bottom" rootClose={true} onHide={() => setShowParking(false)}>
            {(props) => (
              <Popover {...props} id="popover-parking">
                <Popover.Body>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div>Count: {property.parking_units.length}</div>
                    <div>Total: ${calculateParkingTotal(property)}</div>
                  </div>
                </Popover.Body>
              </Popover>
            )}
          </Overlay>

          <Button ref={lockersRef} onClick={toggleLockers} variant="secondary">Lockers</Button>
          <Overlay target={lockersRef.current} show={showLockers} placement="bottom" rootClose={true} onHide={() => setShowLockers(false)}>
            {(props) => (
              <Popover {...props} id="popover-lockers">
                <Popover.Body>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div>Count: {property.storage_units.length} </div>
                    <div>Total: ${calculateLockerTotal(property)}</div>
                  </div>
                </Popover.Body>
              </Popover>
            )}
          </Overlay>
        </Card.Body>
      </Card>
    ) : (
      // if the user is a public user, show the property card as a unit card
      // this card will be outputted for condo_units, parking and locker_units 
      // the type will dynamically change based on the type of the property in the title
      <Card className="mb-3" style={{ width: '18rem' }}>
        <Card.Header as="h5">{type} number {property.location}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Location: {property.location}</ListGroup.Item>
          <ListGroup.Item>Purchase Price: ${parseFloat(property.purchase_price).toLocaleString()}</ListGroup.Item>
          <ListGroup.Item>Rent Price: ${parseFloat(property.rent_price).toLocaleString()} / month</ListGroup.Item>
          <ListGroup.Item>Size: {parseFloat(property.size).toFixed(2)} sqft</ListGroup.Item>
          {/* to be implemented when the financial model is ready */}
          <ListGroup.Item>Unit Fees: {property.property_fee} $</ListGroup.Item>
          {property.extra_information && <ListGroup.Item>Extra Information: {property.extra_information}</ListGroup.Item>}
        </ListGroup>
        <NavLink to={`/booking-facility/${property.id}`} className="btn btn-primary">
        Reserve Facility
      </NavLink>
  </Card>)
  );
};

export default PropertyCard;
