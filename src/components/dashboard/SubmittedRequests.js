import React from 'react'
import { Container, Card, ListGroup } from "react-bootstrap"

const SubmittedRequests = () => {
    return (
        <Container style={{ width: '100%' }}>
            <Card>
                <div className="d-flex justify-content-center">
                    {/* title for the financial details with styling */}
                    <Card.Title><h1 style={{ fontSize: "40px", fontWeight: "bold", marginTop: "15px" }}>Your Requests</h1></Card.Title>
                </div>
                <ListGroup>
                    <ListGroup.Item>
                        request information 1
                    </ListGroup.Item>
                    <ListGroup.Item>
                        request information 2
                    </ListGroup.Item>
                    <ListGroup.Item>
                        request information 3
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
    )
}

export default SubmittedRequests