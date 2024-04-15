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
            <Col md={8}>
              <Row>
                <Card className="mb-3">
                    <Card.Header>
                    <h1>Common Facility #1</h1>
                    </Card.Header>
                    <Card.Body>
                    <Col>
                        <p>more details to come...</p>
                    </Col>
                    </Card.Body>
                </Card>
              </Row>
              <Row>
              <Card className="mb-3">
                    <Card.Header>
                    <h1>Common Facility #2</h1>
                    </Card.Header>
                    <Card.Body>
                    <Col>
                        <p>more details to come...</p>
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