import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useProperty } from "../../utils/hooks/PropertyContext"
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  ListGroup
} from "react-bootstrap";
import LargeTitle from "../LargeTitle.js";
import { useEffect } from "react"


const CommonFacilities = () => {
    let navigate = useNavigate();
    const { propertyId } = useParams();
    const { property, fetchPropertyById } = useProperty();
    useEffect(() => {
        if (propertyId) {
          //this is useful only for company accounts
          // make the api call from the backend
          fetchPropertyById(propertyId);
        }
      }, []);
    function handleGoToCreateCommonFacilities(){
      navigate(`/property-page/${propertyId}/create-common-facilities`);
    }
    return (
        <Container className="mt-5">
          <Row className="justify-content-center">
            {/* a page title */}
            <LargeTitle title="Common Facilities" />
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src={property.image}
                  alt={property.name}
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>
                    <h2>
                      <strong>Property </strong> {propertyId}
                    </h2>
                  </Card.Title>
                </Card.Body>
    
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Address:</strong> {property.address}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>City:</strong> {property.city} <strong>,</strong> {property.province}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Postal Code</strong> {property.postal_code}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col style={{ padding: '20px', overflowY: 'auto' }}>
              <Row>
                <Col>
                  <h2>List of Common Facilities</h2>
                </Col>
                <Col>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={handleGoToCreateCommonFacilities} data-testid="to-create-common-facilities" >
                    Create Common Facilities
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Card className="mb-3">
                    <Card.Header>
                    <h1>Concordia Gym</h1>
                    </Card.Header>
                    <Card.Body>
                    <Col>
                        <Row>Description: The Concordia Gym</Row>
                        <Row>Capacity: 50</Row>
                        <Row>Reservation duration: 6 hours</Row>
                    </Col>
                    </Card.Body>
                </Card>
              </Row>
              <Row>
              <Card className="mb-3">
                    <Card.Header>
                    <h1>Hall Lounge</h1>
                    </Card.Header>
                    <Card.Body>
                    <Col>
                        <Row>Description: The Hall Lounge</Row>
                        <Row>Capacity: 20</Row>
                        <Row>Reservation duration: 3 hours</Row>
                    </Col>
                    </Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
    );
}

export default CommonFacilities;