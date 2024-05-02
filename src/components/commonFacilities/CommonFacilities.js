import React, { useState } from 'react'
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
} from 'react-bootstrap'
import LargeTitle from '../LargeTitle.js'
import { useEffect } from 'react'
import FacilitiesList from './FacilitiesList.js'

const CommonFacilities = () => {
  let navigate = useNavigate()
  const { propertyId } = useParams()
  const { property, fetchPropertyById, fetchAllFacilities, facilities } =
    useProperty()

  useEffect(() => {
    if (propertyId) {
      // this is useful only for company accounts
      // make the api call from the backend
      fetchPropertyById(propertyId)
      fetchAllFacilities()
    }
  }, [])

  function handleGoToCreateCommonFacilities() {
    navigate(`/property-page/${propertyId}/create-common-facilities`)
  }
  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        {/* a page title */}
        <LargeTitle title='Common Facilities' />
        <Col md={4}>
          <Card>
            <Card.Img
              variant='top'
              src={property.image}
              alt={property.name}
              style={{ height: '200px', width: '100%', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>
                <h2>
                  <strong>{property.name}</strong>
                </h2>
              </Card.Title>
            </Card.Body>

            <ListGroup>
              <ListGroup.Item>
                <strong>Address:</strong> {property.address}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>City:</strong> {property.city} <strong>,</strong>{' '}
                {property.province}
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
              <h2>Common Facilities</h2>
            </Col>
            <Col>
              <div className='d-flex justify-content-end'>
                <Button
                  variant='primary'
                  onClick={handleGoToCreateCommonFacilities}
                  data-testid='to-create-common-facilities'
                >
                  Create Common Facilities
                </Button>
              </div>
            </Col>
          </Row>
          {facilities &&
          facilities.filter(
            facility => String(facility.property) === propertyId,
          ).length > 0 ? (
            <FacilitiesList
              facilities={facilities.filter(
                facility => String(facility.property) === propertyId,
              )}
            />
          ) : (
            <h3>create your first Facility...</h3>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default CommonFacilities
