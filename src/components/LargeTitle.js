import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const LargeTitle = ({ title }) => {
  return (
    <Container className='large-title-container'>
      <Row className='justify-content-center'>
        <Col>
          <h1 className='large-title-text'>{title}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default LargeTitle
