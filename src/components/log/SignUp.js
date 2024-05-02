import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../../api/axios.js'
import LargeTitle from '../LargeTitle.js'

const SignUp = () => {
  const history = useNavigate()

  //this should in extended to match all info we have
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    phone_number: '',
    address: '',
    city: '',
    province: 'British Colombia',
    postal_code: '',
    registration_key: '',
    profile_photo: '',
  })

  const [errors, setErrors] = useState({})

  // update formData as input is given
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
  const validateForm = () => {
    const errors = {}
    let isValid = true

    //Validate input fields
    //Email must be filled, must not exceed 64 chars, must be unique, and must be a valid email-form input
    if (!formData.email) {
      errors.email = 'Email field required'
      isValid = false
    } else if (formData.email.length > 64) {
      errors.email = 'Your email must be under 64 characters'
      isValid = false
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      //Make sure email format is correct
      errors.email = 'Invalid email address'
      isValid = false
    }
    //TODO: Check if email is already associated with an existing profile

    //First name must be filled, must not exceed 100 chars, and must not contain numbers
    if (!formData.first_name) {
      errors.first_name = 'First name field required'
      isValid = false
    } else if (formData.first_name.length > 100) {
      errors.first_name = 'First name must be under 100 characters'
      isValid = false
    } else if (/\d/.test(formData.first_name)) {
      errors.first_name = 'First name must not contain numbers'
      isValid = false
    }

    //Last name must be filled, must not exceed 100 chars, and must not contain numbers
    if (!formData.last_name) {
      errors.last_name = 'Last name field required'
      isValid = false
    } else if (formData.last_name.length > 100) {
      errors.last_name = 'Last name must be under 100 characters'
      isValid = false
    } else if (/\d/.test(formData.last_name)) {
      errors.last_name = 'Last name must not contain numbers'
      isValid = false
    }

    //Password must be filled, and must not exceed 20 chars
    if (!formData.password) {
      errors.password = 'Please enter your password'
      isValid = false
    } else if (formData.password.length > 20) {
      errors.password = 'Your password must be under 20 characters'
      isValid = false
    } // Possible to validate that password include a symbol, number and capital letter in future sprints

    //Phone number must be filled, must consist only of numbers, and must be shorter than 12 characters and longer than 2
    if (!formData.phone_number) {
      errors.phone_number = 'Please enter your phone number'
      isValid = false
    } else if (
      formData.phone_number.length > 12 ||
      formData.phone_number.length < 2
    ) {
      errors.phone_number =
        'Your phone number must be shorter than 12 characters and longer than 2'
      isValid = false
    } else if (isNaN(parseInt(formData.phone_number))) {
      errors.phone_number = 'Your phone number must consist of numbers only'
      isValid = false
    }

    //Address must be filled, and must not exceed 100 chars
    if (!formData.address) {
      errors.address = 'Please enter your Address'
      isValid = false
    } else if (formData.address.length > 100) {
      errors.address = 'Address must be under 100 characters'
      isValid = false
    }

    //City must must be filled, not exceed 100 chars
    if (!formData.city) {
      errors.city = 'Please enter your city'
      isValid = false
    } else if (formData.city.length > 100) {
      errors.city = 'City must be under 100 characters'
      isValid = false
    }

    //Postal code must be filled, must not exceed 12 chars
    if (!formData.postal_code) {
      errors.postal_code = 'Please enter your postal_code'
      isValid = false
    } else if (formData.postal_code.length > 12) {
      errors.postal_code = 'Postal code must be under 12 characters'
      isValid = false
    }

    //TODO: Add validation for profile_image

    //If there are errors, set errors in state and prevent submit
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
    }

    return isValid
  }

  // handle submit form
  const handleSubmit = e => {
    e.preventDefault()

    //If form is valid then post the form
    if (validateForm()) {
      console.log(formData)
      //Fields needed to create user
      axiosInstance
        .post(`profiles/user/`, {
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
          role: 'PUBLIC',
        })
        .then(res => {
          if (res.status == 201) {
            // Create new public profile and go back to login if successful
            console.log(res)
            console.log(res.data)
            updateProfileInfo(res.data.id)
            window.alert(`profile ${formData.email} has been created`)
            history('/login')
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.data)
          window.alert(`${error} `)
          history(SignUp)
        })
    } else {
      //If form input is not valid then do not post
      return
    }

    const updateProfileInfo = id => {
      //Fields for additional information about the user
      axiosInstance
        .patch(`profiles/public-profile/${id}/`, {
          phone_number: formData.phone_number,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postal_code,
        })
        .then(res => {
          if (res.status == 200) {
            // Add information to new public profile and go back to login if successful
            console.log('public-profile information patched')
            console.log(res.data)
            window.alert(`profile ${formData.email} has been created`)
            history('/login')
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.data)
          window.alert(`${error} `)
          history(SignUp)
        })
    }
  }
  //match the input with the backend parameters (ex: first last and all the other fields)
  return (
    <Container className='w-75 p-3 bg-secondary mt-5 text-dark'>
      <LargeTitle title='Sign Up Now!' />
      <Form className='py-5 text-dark' onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              name='first_name'
              placeholder='Enter Your First Name'
              value={formData.first_name}
              onChange={handleChange}
              data-testid='first-name-input'
            />
            {/*Show error if submitting invalid input*/}
            {errors.first_name && (
              <span style={{ color: 'red' }}>{errors.first_name}</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='last_name'
              placeholder='Enter Your Last Name'
              value={formData.last_name}
              onChange={handleChange}
              data-testid='last-name-input'
            />
            {errors.last_name && (
              <span style={{ color: 'red' }}>{errors.last_name}</span>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group
            as={Col}
            className='mb-3'
            controlId='formGridEmailAddress'
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='your-email@email.com'
              value={formData.email}
              onChange={handleChange}
              data-testid='email-input'
            />
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridPhoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Your Phone Number'
              name='phone_number'
              value={formData.phone_number}
              onChange={handleChange}
              data-testid='phone-number-input'
            />
            {errors.phone_number && (
              <span style={{ color: 'red' }}>{errors.phone_number}</span>
            )}
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter Your Password'
              value={formData.password}
              onChange={handleChange}
              data-testid='password-input'
            />
            {errors.password && (
              <span style={{ color: 'red' }}>{errors.password}</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridPasswordConfirmation'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Your Password'
              name='password_confirmation'
              data-testid='confirm-password-input'
            />
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridFile' className='mb-3'>
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control
              type='file'
              placeholder='Upload Your Profile Photo'
              name='profile_photo'
              value={formData.profile_photo}
              onChange={handleChange}
              data-testid='profile_photo-input'
            />
            {/*
              TODO: Add image error message
              */}
          </Form.Group>
        </Row>

        <Form.Group className='mb-3' controlId='formGridAddress'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Apartment, studio, or floor'
            name='address'
            value={formData.address}
            onChange={handleChange}
            data-testid='address-input'
          />
          {errors.address && (
            <span style={{ color: 'red' }}>{errors.address}</span>
          )}
        </Form.Group>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridCity'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='City'
              name='city'
              value={formData.city}
              onChange={handleChange}
              data-testid='city-input'
            />
            {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Province</Form.Label>
            <Form.Select
              name='province'
              value={formData.province}
              onChange={handleChange}
              data-testid='province-select'
            >
              <option value='British Colombia'>BC</option>
              <option value='Prince Edward Island'>PE</option>
              <option value='Nova Scotia'>NS</option>
              <option value='New Brunswick'>NB</option>
              <option value='Quebec'>QC</option>
              <option value='Ontario'>ON</option>
              <option value='Manitoba'>MB</option>
              <option value='Saskatchuwan'>SK</option>
              <option value='Alberta'>AB</option>
              {/* <option value="British Colombia">BC</option>
              <option value="British Colombia">YT</option>
              <option value="British Colombia">NT</option>
              <option value="British Colombia">NJ</option> */}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId='formGridZip'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              name='postal_code'
              placeholder='H3G 1M8'
              value={formData.postal_code}
              onChange={handleChange}
              data-testid='postal-code-input'
            />
            {errors.postal_code && (
              <span style={{ color: 'red' }}>{errors.postal_code}</span>
            )}
          </Form.Group>
        </Row>

        <Button variant='primary' type='submit' data-testid='submit-button'>
          Submit
        </Button>
        <Form.Text>
          {' '}
          Already have an account? <Link to='/login'>Sign In</Link>
        </Form.Text>
      </Form>
    </Container>
  )
}

export default SignUp
