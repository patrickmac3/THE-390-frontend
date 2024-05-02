import React from 'react'
import {
  Container,
  Card,
  ListGroup,
  Table,
  ListGroupItem,
  Row,
  Col,
} from 'react-bootstrap'
import { Accordion } from 'react-bootstrap'

const FinancialPublic = () => {
  const accordionData = [
    {
      title: 'Condo',
      content: [
        { label: 'Size', value: '$0.00' },
        { label: 'Purchase amount', value: '$0.00' },
        { label: 'Rent amount', value: '$0.00' },
        { label: 'Total', value: '$0.00' },
      ],
    },
    {
      title: 'Parking',
      content: [
        { label: 'Size', value: '$0.00' },
        { label: 'Purchase amount', value: '$0.00' },
        { label: 'Rent amount', value: '$0.00' },
        { label: 'Total', value: '$0.00' },
      ],
    },
    {
      title: 'Locker',
      content: [
        { label: 'Size', value: '$0.00' },
        { label: 'Purchase amount', value: '$0.00' },
        { label: 'Rent amount', value: '$0.00' },
        { label: 'Total', value: '$0.00' },
      ],
    },
  ]

  return (
    <Container style={{ width: '100%' }}>
      <Card>
        <div className='d-flex justify-content-center'>
          <Card.Title>
            <h1
              style={{
                fontSize: '40px',
                fontWeight: 'bold',
                marginTop: '15px',
              }}
            >
              Financial Details
            </h1>
          </Card.Title>
        </div>
        <ListGroup>
          {/* Change key data */}
          {accordionData.map((item, index) => (
            <Accordion key={index}>
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <Row style={{ width: '100%' }}>
                    <Col>{item.title}</Col>
                    <Col style={{ textAlign: 'right' }}>$0.00</Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.content.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>{row.label}</td>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
          <ListGroup>
            <ListGroupItem>Total: $0.00</ListGroupItem>
          </ListGroup>
        </ListGroup>
      </Card>
    </Container>
  )
}

export default FinancialPublic
