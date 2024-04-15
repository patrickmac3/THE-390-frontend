import React from 'react'
import { useEffect } from "react"
import PropertyContainer from '../property/PropertyContainer.js'
import { Container, Col, Row, Button } from "react-bootstrap";
import FinancialPublic from './FinancialPublic.js';
import Financial from './financial/Financial.js';
import SubmittedRequests from './SubmittedRequests.js';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../utils/hooks/ProfileContext.js';
import SendRegistrationButton from '../registrationKey/SendRegistrationButton.js';
import LargeTitle from '../LargeTitle.js';


const DashBoard = () => {
    //state to hold the role of the signed in user
    const { role, fetchProfileRole } = useProfile();
    let navigate = useNavigate();

    function handleGoToProperty() {
        navigate('/create-property');
    }

    // make a call to get the role of the user based on the stored id in the local storage
    // using the profile role context instead of making the complete fetch request here
    useEffect(() => {
        const id = localStorage.getItem("ID"); //get the id from local storage
        //fetch profile role from the profile context
        fetchProfileRole();
    }, []);

    return (
        <Container>
            {/* <UserInfo /> */}
            <div>
                <LargeTitle title="Your Properties" />
            </div>
            <PropertyContainer />
            {/* the button to create a property is only accessible to company profiles */}
            {
                role === "COMPANY" &&
                <div className="mt-5 diplay-flex text-center">
                    <Button variant="primary" style={{ width: "150px", marginRight: "60px" }} onClick={handleGoToProperty} data-testid="create-property-button">Add Property</Button>
                    <SendRegistrationButton style={{ width: "150px" }} />
                </div>
            }
            <Row className="mt-5">
                <Row>
                    <Col>
                        {
                            role === "COMPANY"
                                ? <Financial /> :
                                <FinancialPublic />
                        }
                    </Col>
                    <Col>
                        <SubmittedRequests />
                    </Col>
                </Row>


            </Row>
        </Container>
    );
}

export default DashBoard