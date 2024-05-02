import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useProperty } from '../../utils/hooks/PropertyContext'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

const CreateParking = () => {
  const { properties } = useProperty()
  // receive the containing property id from the url
  let { propertyId } = useParams()
  const navigate = useNavigate()

  // parking information should extend to match all info needed
  const [formData, setFormData] = useState({
    location: '',
    //FIXME bring this back for after sprint_2
    //public_profile:"",
    purchase_price: '',
    rent_price: '',
    size: '',
    extra_information: '',
    parking_owner: '',
  })

  const [errors, setErrors] = useState({})

  const findPropertyById = propertyId => {
    if (Array.isArray(properties)) {
      return properties.find(property => property.id.toString() === propertyId)
    }
  }

  //handle change from the user input and save to state
  const handleChange = e => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value,
    })

    //Clear existing error if there is change to input
    setErrors({ ...errors, [e.target.name]: '' })
    console.log(formData)
  }

  //Go back to previous page
  function goBack() {
    navigate(-1)
  }

  //Go back to property dashboard
  function handleBackToPropertyPage() {
    goBack()
  }

  //Validate the input form
  const validateForm = () => {
    const errors = {}
    let isValid = true

    //Validate input fields
    //Location must be filled, length less than 4 chars
    if (!formData.location) {
      errors.location = 'Location field required'
      isValid = false
    } else if (formData.location.length > 4) {
      errors.location = 'Location field must be under 4 characters'
      isValid = false
    }

    //Purchase price must be filled, must be a non-negative number, can only have 2 decimal places, and less than 20 characters
    if (!formData.purchase_price) {
      errors.purchase_price = 'Purchase price required'
      isValid = false
    } else if (isNaN(formData.purchase_price)) {
      errors.purchase_price = 'Purchase price must be a number'
      isValid = false
    } else if (parseFloat(formData.purchase_price) < 0) {
      errors.purchase_price = 'Invalid number'
      isValid = false
    } else if (!formData.purchase_price.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
      errors.purchase_price = 'Purchase price can only have 2 decimal places'
      isValid = false
    } else if (formData.purchase_price.length > 20) {
      errors.purchase_price = 'Purchase price must be less than 20 characters'
      isValid = false
    }

    //Rent price must be filled, must be a non-negative number, can only have 2 decimal places, and less than 20 characters
    if (!formData.rent_price) {
      errors.rent_price = 'Rent price required'
      isValid = false
    } else if (isNaN(formData.rent_price)) {
      errors.rent_price = 'Rent price must be a number'
      isValid = false
    } else if (parseFloat(formData.rent_price) < 0) {
      errors.rent_price = 'Invalid number'
      isValid = false
    } else if (!formData.rent_price.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
      errors.rent_price = 'Rent price can only have 2 decimal places'
      isValid = false
    } else if (formData.rent_price.length > 20) {
      errors.rent_price = 'Rent price must be less than 20 characters'
      isValid = false
    }

    //Size must be filled, must be a non-negative number, can only have 2 decimal places, and less than 20 characters
    if (!formData.size) {
      errors.size = 'Size required'
      isValid = false
    } else if (isNaN(formData.size)) {
      errors.size = 'Size must be a number'
      isValid = false
    } else if (parseFloat(formData.size) <= 0) {
      errors.size = 'Invalid number'
      isValid = false
    } else if (!formData.size.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
      errors.size = 'Size can only have 2 decimal places'
      isValid = false
    } else if (formData.size.length > 20) {
      errors.size = 'Size must be less than 20 characters'
      isValid = false
    }

    //Extra information must be filled, must be not exceed 200 chars
    if (formData.extra_information.length > 200) {
      errors.extra_information =
        'Extra information field must be less than 200 characters'
      isValid = false
    } else if (!formData.extra_information) {
      errors.extra_information = 'Extra information required'
      isValid = false
    }

    //If there are errors, set errors in state and prevent submit
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
    }

    return isValid
  }

  //handle form submission to create a new parking space
  const handleSubmit = e => {
    e.preventDefault()

    //If form is valid then post the form
    if (validateForm()) {
      console.log(formData)
      //post form data
      axiosInstance
        .post(`properties/property-profile/${propertyId}/parking-unit/`, {
          location: formData.location,
          size: formData.size,
          rent_price: formData.rent_price,
          purchase_price: formData.purchase_price,
          extra_information: formData.extra_information,
          //TODO: causes bad request without form input check
        })
        .then(res => {
          if (res.status == 201) {
            // Create parking profile and go back to property dashboard if successful
            window.alert(
              `Parking profile ${formData.location} has been created`,
            )
            console.log(res)
            console.log(res.data)
            goBack()
          }
        })
        .catch(error => {
          //Print error if encountered
          console.log(error)
          console.log(error.data)
          window.alert(`${error} `)
        })
    } else {
      //If form input is not valid then do not post
      return
    }
  }

  return (
    <Container className='w-75 p-3 bg-secondary mt-5 text-dark'>
      <Form className='py-5 text-dark' onSubmit={handleSubmit}>
        <h2>
          Add a Parking Spot to Property {findPropertyById(propertyId)?.id}
        </h2>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridParkingLocation'>
            <Form.Label>Parking Location</Form.Label>
            <Form.Control
              data-testid='parking-location-input'
              name='location'
              onChange={handleChange}
              placeholder='####'
              type='text'
              value={formData.location}
            />
            {/*Show error if submitting invalid input*/}
            {errors.location && (
              <span style={{ color: 'red' }}>{errors.location}</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridParkingOwner'>
            <Form.Label>Parking Size</Form.Label>
            <Form.Control
              data-testid='parking-size-input'
              name='size'
              onChange={handleChange}
              placeholder='Enter Parking Size'
              type='text'
              value={formData.size}
            />
            {errors.size && <span style={{ color: 'red' }}>{errors.size}</span>}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group
            as={Col}
            className='mb-3'
            controlId='formGridParkingPurchasePrice'
          >
            <Form.Label>Purchase Price</Form.Label>
            <Form.Control
              data-testid='parking-purchase_price-input'
              name='purchase_price'
              onChange={handleChange}
              placeholder='Enter Parking Purchase Price'
              type='text'
              value={formData.purchase_price}
            />
            {errors.purchase_price && (
              <span style={{ color: 'red' }}>{errors.purchase_price}</span>
            )}
          </Form.Group>
          <Form.Group
            as={Col}
            className='mb-3'
            controlId='formGridParkingRentPrice'
          >
            <Form.Label>Rent Price</Form.Label>
            <Form.Control
              data-testid='parking-rent_price-input'
              name='rent_price'
              onChange={handleChange}
              placeholder='Enter Parking Renting Price'
              type='text'
              value={formData.rent_price}
            />
            {errors.rent_price && (
              <span style={{ color: 'red' }}>{errors.rent_price}</span>
            )}
          </Form.Group>
        </Row>

        <Form.Group className='mb-3' controlId='formGridParkingExtraInfo'>
          <Form.Label>Parking Info</Form.Label>
          <Form.Control
            data-testid='parking-extra_information-input'
            name='extra_information'
            onChange={handleChange}
            placeholder='Enter Parking Owner Info'
            type='text'
            value={formData.extra_information}
          />
          {errors.extra_information && (
            <span style={{ color: 'red' }}>{errors.extra_information}</span>
          )}
        </Form.Group>

        <Button
          style={{ marginTop: '20px' }}
          variant='primary'
          onClick={handleBackToPropertyPage}
        >
          Cancel
        </Button>
        <Button
          style={{ marginTop: '20px', marginLeft: '20px' }}
          variant='primary'
          type='submit'
          data-testid='submit-button'
        >
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default CreateParking
