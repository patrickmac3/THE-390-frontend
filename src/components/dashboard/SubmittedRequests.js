import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useProperty } from '../../utils/hooks/PropertyContext'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  ListGroup,
  Accordion,
  Table,
} from 'react-bootstrap'
import LargeTitle from '../LargeTitle.js'
import { useProfile } from '../../utils/hooks/ProfileContext.js'

const SubmittedRequests = () => {
    const { role, fetchProfileRole } = useProfile();
    const [ requests, setRequests ] = useState({});
    const id = localStorage.getItem("ID");
    let navigate = useNavigate();
    
    const FetchCompanyRequests = async () => {
        try {
          const response = await axiosInstance.get(`/profiles/company-profile/${id}/requests/`);
          if (response.status === 200) {
            setRequests(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }

    const FetchPublicRequests = async () => {
    try {
        const response = await axiosInstance.get(`/profiles/public-profile/${id}/requests/`);
        if (response.status === 200) {
        setRequests(response.data);
        }
    } catch (error) {
        console.log(error);
    }
    }
    
    useEffect(() => {
        //get the id from local storage
        //fetch profile role from the profile context
        if (role === "COMPANY"){
            FetchCompanyRequests();
        } else if (role === "PUBLIC")
        {
            FetchPublicRequests();
        }
        fetchProfileRole();
    }, []);

    function handleGoToCreateRequest() {
        navigate('/property-page/:propertyId/create-request');
    }
    function handleGoToEditRequest() {
        navigate('/property-page/:propertyId/edit-request');
    }
    return (
        <Container style={{ width: '100%' }}>
            <Card style={{ minHeight: "70vh", maxHeight: "70vh" }}>
                <div className="d-flex justify-content-center">
                    {/* Title for the requests with styling */}
                    <Card.Title><h1 style={{ fontSize: "40px", fontWeight: "bold", marginTop: "15px" }}>Requests</h1></Card.Title>
                </div>

                <Accordion defaultActiveKey="0" style={{ maxHeight: '600px', overflowY: 'scroll' }}>
                    {requests && 
                    Object.keys(requests).map(requestsKey => (
                    <Accordion.Item key={requestsKey} eventKey={requestsKey}>
                        <Accordion.Header>
                            <Row style={{ width: '100%' }}>
                                <Col>
                                    Request {`${requestsKey}`}
                                </Col>
                            </Row>
                        </Accordion.Header>

                        <Accordion.Body style={{ maxHeight: "200px", overflowY: "scroll" }}>
                            <Table bordered hover>
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Request Type</th>
                                        <th style={{ width: '50%', textAlign: "center" }}>{`${requests[requestsKey].type}`}</th>
                                    </tr>
                                    <tr>
                                        <th>Request Date</th>
                                        <th style={{ width: '50%', textAlign: "center" }}>{`${requests[requestsKey].request_date}`.substring(0, 10)}</th>
                                    </tr>
                                    <tr>
                                        <th>Request Description</th>
                                        <th style={{ width: '50%', textAlign: "center" }}>{`${requests[requestsKey].request_description}`}</th>
                                    </tr>
                                    <tr>
                                        <th>Completed Status</th>
                                        <th style={{ width: '50%', textAlign: "center" }}>{`${requests[requestsKey].completed}`}</th>
                                    </tr>
                                    {/* <tr>
                                        <th>Completion Date</th>
                                        <th style={{ width: '50%', textAlign: "center" }}>{`${requests[requestsKey].completion_date}`}</th>
                                    </tr>
                                    <tr>
                                        <th>Completion Information</th>
                                        <th style={{ width: '50%', textAlign: "center" }}>{`${requests[requestsKey].completion_information}`}</th>
                                    </tr>
                                    <tr>
                                        <th>Completion Status</th>
                                        <th style={{ width: '50%', textAlign: "center" }}>{`${requests[requestsKey].completion_status}`}</th>
                                    </tr>
                                    {role === "COMPANY" && 
                                        <tr>
                                            <th>Assigned Employee</th>
                                            <th style={{ width: '50%', textAlign: "center" }}>{`${requests[requestsKey].assigned_employee}`}</th>
                                        </tr>
                                    } */}
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>))}
                </Accordion>
            </Card>
            {
            role === "PUBLIC" &&
            <div className="mt-5 diplay-flex text-center">
                <Button variant="primary" style={{ width: "150px", marginRight: "60px" }} onClick={handleGoToCreateRequest} data-testid="create-request-button">New request</Button>
                <Button variant="primary" style={{ width: "150px" }} onClick={handleGoToEditRequest} data-testid="edit-request-button">Edit request</Button>
            </div>
            }
            
        </Container>
    )
}

export default SubmittedRequests
