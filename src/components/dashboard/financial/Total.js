import React from 'react'
import { Col, Row } from 'react-bootstrap';

const Total = ({ fee }) => {
    const style = {
        color: '#606060', // Light grey color for the text
        fontSize: '1.5em', // Prominent size
        fontWeight: 'bold', // Make it bold
        padding: '10px', // Some padding for better spacing
        backgroundColor: '#f0f0f0', // Light background color for prominence
        borderRadius: '5px', // Slightly rounded corners
        position: 'absolute', // Absolute positioning
        bottom: '0', // Stick to the bottom of the container
        left: '0', // Align to the left side of the container
        right: '0', // Align to the right side of the container
    };

    return (
        <div style={style}>
            <Row>
                <Col>
                    Your Total Fees
                </Col>
                <Col style={{ textAlign: "right" }}>
                    ${fee}
                </Col>
            </Row>

        </div>)
}

export default Total