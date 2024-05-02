import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
} from 'react-bootstrap'
import { useProfile } from '../../utils/hooks/ProfileContext'
import LargeTitle from '../LargeTitle.js'
import SubmitRegistrationButton from '../registrationKey/SubmitRegistrationButton.js'

const UserProfile = () => {
  const { profileInfo, getProfileInformation, fetchProfileRole, role } =
    useProfile()

  const [showModal, setShowModal] = useState(false)
  const id = localStorage.getItem('ID')
  const [formData, setFormData] = useState({})

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  // Handle form submission
  const handleSaveChanges = () => {
    console.log(formData)
    axiosInstance
      .patchForm(`profiles/user/${id}/`, formData)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

    if (role === 'PUBLIC') {
      axiosInstance
        .patchForm(`profiles/public-profile/${id}/`, formData)
        .then(response => {
          console.log(response)
          handleCloseModal()
          if (response.status == 200) {
            alert('Successfully saved changes')
            window.location.reload()
          } else {
            alert('Error occured while saving changes')
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else if (role === 'COMPANY') {
      axiosInstance
        .patchForm(`profiles/company-profile/${id}/`, formData)
        .then(response => {
          console.log(response)
          handleCloseModal()
          if (response.status == 200) {
            alert('Successfully saved changes')
            window.location.reload()
          } else {
            alert('Error occured while saving changes')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  // Update formData when change occurs
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Update formData when image changes
  const handleImageChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    })
  }

  // get information on active user
  useEffect(() => {
    getProfileInformation()
    //TODO this might be a problem, if the homepage is the default start of the website, then the user will not have a role
    fetchProfileRole() //fetch the role of the user from the profile context
  }, [])

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        {/* a page title */}
        <LargeTitle title='Your Profile' />
        <Col md={4}>
          <Card>
            <Card.Img
              variant='top'
              src={profileInfo.avatar}
              alt='Profile Picture'
              style={{ height: '200px', width: '100%', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>
                <h2>
                  {profileInfo.first_name} {profileInfo.last_name}
                </h2>
              </Card.Title>
            </Card.Body>

            <ListGroup>
              <ListGroup.Item>
                <strong>Email:</strong> {profileInfo.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Phone:</strong> {profileInfo.phone_number}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body className='d-flex justify-content-center'>
              <Button
                variant='primary'
                onClick={handleShowModal}
                data-testid='edit-profile'
                style={{ marginRight: '30px' }}
              >
                Edit Profile
              </Button>
              {role === 'PUBLIC' && <SubmitRegistrationButton />}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Header>
              <h1>Details</h1>
            </Card.Header>
            <Card.Body>
              <Col>
                <p>
                  <strong>Address: </strong> {profileInfo.address}
                  <br />
                  <strong>City: </strong>
                  {profileInfo.city}
                  <br />
                  <strong>Province: </strong>
                  {profileInfo.province}
                  <br />
                  <strong>Postal Code: </strong>
                  {profileInfo.postal_code}
                </p>
                <p>more details to come...</p>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for editing profile */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formGroupFirstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='first_name'
                    defaultValue={profileInfo.first_name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formGroupLastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='last_name'
                    defaultValue={profileInfo.last_name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                defaultValue={profileInfo.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              controlId='formGridPhoneNumber'
              className='mb-4'
            >
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                name='phone_number'
                defaultValue={profileInfo.phone_number}
                onChange={handleChange}
                data-testid='phone-number-input1'
              />
            </Form.Group>
            {/* TODO check the default profile picture */}
            <Form.Group controlId='formFile' className='mb-4'>
              <Form.Label>Update Profile Picture</Form.Label>
              <Form.Control
                type='file'
                accept='image/png, image/jpeg'
                name='avatar'
                multiple
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGridAddress'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name='address'
                defaultValue={profileInfo.address}
                onChange={handleChange}
                data-testid='address-input1'
              />
            </Form.Group>

            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  name='city'
                  defaultValue={profileInfo.city}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* TODO there's a problem here, not sure how to set the default option */}
              <Form.Group as={Col} controlId='formGridState'>
                <Form.Label>Province</Form.Label>
                <Form.Select
                  name='province'
                  defaultValue={profileInfo.province}
                  onChange={handleChange}
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
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId='formGridZip'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  name='postal_code'
                  value={profileInfo.postal_code}
                  defaultValue={profileInfo.postal_code}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleCloseModal}
            data-testid='secondary'
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleSaveChanges}
            data-testid='submit-button'
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default UserProfile
