
import React, { useEffect, useState } from 'react';
import { Container, Card, Accordion, Table, Row, Col, Button } from "react-bootstrap";
import Total from './Total.js';
import axiosInstance from '../../../api/axios';

const Financial = () => {
  const comapanyID = localStorage.getItem('ID');
  const [property, setProperty] = useState({});
  
  const FetchPropertiesFinacials = async () => {
    try {
      const response = await axiosInstance.get(`/profiles/company-profile/${comapanyID}/finance-report/`);
      if (response.status === 200) {
        setProperty(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchPropertiesFinacials();
  }, []);

  return (
    <Container style={{ width: '100%' }}>
      <Card style={{ minHeight: "70vh", maxHeight: "70vh" }}>
        <div className="d-flex justify-content-center">
          {/* Title for the financial details with styling */}
          <Card.Title><h1 style={{ fontSize: "40px", fontWeight: "bold", marginTop: "15px" }}>Financial Details</h1></Card.Title>
        </div>

        <Accordion defaultActiveKey="0" style={{ maxHeight: '600px', overflowY: 'scroll' }}>
          {property && property.properties &&

            Object.keys(property.properties).map(propertyKey => (
              <Accordion.Item key={propertyKey} eventKey={propertyKey}>
                <Accordion.Header>
                  {/* Displaying property name and total */}
                  <Row style={{ width: '100%' }}>
                    <Col>
                      {`${property.properties[propertyKey].property_name}`}
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      ${property.properties[propertyKey].fee}
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body style={{ maxHeight: "200px", overflowY: "scroll" }}>
                  {/* Displaying condo fees */}
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Condo Number</th>
                        <th style={{ width: '50%', textAlign: "center" }}>Fees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.properties[propertyKey].condos.map(condo => (
                        <tr key={condo.id}>
                          <td>{condo.condo}</td>
                          <td style={{ width: '50%', textAlign: "center" }}>${condo.fee}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>Total Condo Fees</td>
                        <td style={{ width: '50%', textAlign: "center" }}>${property.properties[propertyKey].condo_fee}</td>
                      </tr>
                    </tbody>
                  </Table>
                  {/* Displaying parking fees */}
                  <Table bordered hover style={{ maxHeight: "200px", overflowY: "scroll" }}>
                    <thead>
                      <tr>
                        <th>Parking Number</th>
                        <th style={{ width: '50%', textAlign: "center" }}>Fees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.properties[propertyKey].parkings.map(parking => (
                        <tr key={parking.id}>
                          <td>{parking.parking}</td>
                          <td style={{ width: '50%', textAlign: "center" }}>${parking.fee}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>Total Parking Fees</td>
                        <td style={{ width: '50%', textAlign: "center" }}>${property.properties[propertyKey].parking_fee}</td>
                      </tr>
                    </tbody>
                  </Table>
                  {/* Displaying storage fees */}
                  <Table bordered hover style={{ maxHeight: "200px", overflowY: "scroll" }}>
                    <thead>
                      <tr>
                        <th>Storage Number</th>
                        <th style={{ width: '50%', textAlign: "center" }}>Fees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.properties[propertyKey].storages.map(storage => (
                        <tr key={storage.id}>
                          <td> Storage {storage.storage}</td>
                          <td style={{ width: '50%', textAlign: "center" }}>${storage.fee}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>Total Storage Fees</td>
                        <td style={{ width: '50%', textAlign: "center" }}>${property.properties[propertyKey].storage_fee}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            ))}

        </Accordion>

        {/* Div at the bottom showing the last total */}
        {/* <div style={{ position: "absolute", textAlign: "right", bottom: "0px", marginBottom: "20px", marginLeft: "20px" }}>
                    <Row Style={{width:"100%"}}>
                        <Col><strong>Total fees for all properties: </strong>
                        </Col>
                        <Col>{property.TOTAL}
                        </Col>
                    </Row>

                </div> */}
        <Total fee={property.fee} />
      </Card>
    </Container>
  )
}

export default Financial;