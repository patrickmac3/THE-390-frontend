import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useProfile } from '../../utils/hooks/ProfileContext'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import LargeTitle from '../LargeTitle.js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateRequest = () => {
    let navigate = useNavigate();
    
    const currentDate = new Date();
    const { profileInfo, getProfileInformation} = useProfile();
    const id = localStorage.getItem("ID");
    const { propertyId } = useParams();

  useEffect(() => {
    getProfileInformation()
  }, [])

    const [formData, setFormData] = useState({
        type: "Miscelanious",
        request_date: currentDate,
        request_description: "",
        unit: null,
    });

  const [errors, setErrors] = useState({})

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

  const handleDateChange = date => {
    setFormData({
      ...formData,
      request_date: date,
    })
  }

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (formData.request_description.length > 200){
            errors.request_description = "Request description must be less than 200 characters"
            isValid = false;
        }

    //If there are errors, set errors in state and prevent submit
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
    }

    return isValid
  }

  const handleSubmit = e => {
    e.preventDefault()

    //If form is valid, post the form
    if (validateForm()) {
      console.log(formData)

      //post form
      axiosInstance

          // TODO: Check for endpoint, as this might change
            .post(`/requests/service-request/`, {
                public_profile: id,
                assigned_employee: null,
                // request_date: formData.request_date,
                request_description: formData.request_description,
                completion_date: null,
                completion_information: null,
                // status: "PENDING",
                unit: null,
                type: formData.type,
            })
            .then((res) => {
              if (res.status == 201) {
                // Create new request if successful and go back to property dashboard
                window.alert(`Request ${formData.type} has been created`)
                console.log(res);
                console.log(res.data);
                goBack();
              }
            })
            .catch((error) => {
              //Show popup of error if encountered
              console.log(error);
              console.log(error.data);
              window.alert(`${error} `)
            });
        } else {
          //Do not post form if there is error in request input
          return;
        }
    };
    
    //Go back to previous page
    function goBack() {
        navigate(-1);
    }

  return (
    <Container className='w-75 p-3 bg-secondary mt-5 text-dark'>
      <Row className='justify-content-center'>
        {/* a page title */}
        <LargeTitle title='Create New Request' />
      </Row>

            <Form className="py-5 text-dark" onSubmit={handleSubmit}>
                <Row className="mb-3">  
                    <Form.Group as={Col} controlId="formGridType">
                        <Form.Label>Request Type</Form.Label>
                        <Form.Select
                        defaultValue={formData.type}
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        data-testid="type-select-test">
                        <option value="MISCELANIOUS" data-testid="misc-test">Miscelanious</option>
                        <option value="INTERCOM" data-testid="intercom-test">Intercom</option>
                        <option value="ACCESS" data-testid="access-test">Access</option>
                        <option value="MOVE IN" data-testid="move-in-test">Move In</option>
                        <option value="MOVE OUT" data-testid="move-out-test">Move Out</option>
                        <option value="VIOLATION" data-testid="violation-test">Violation Report</option>
                        <option value="DEFICIENCY" data-testid="deficiency-test">Deficiency Report</option>
                        <option value="REPAIR" data-testid="repair-test">Repair</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridRequestData">
                        <div>
                            <Form.Label>Request Date</Form.Label>
                        </div>
                        <div style={{height: '100%'}}>
                        <DatePicker
                            selected={formData.request_date}
                            onChange={handleDateChange}
                            minDate={currentDate}
                            dateFormat="dd/MM/yyyy HH:mm:ss"
                        />
                        </div>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        data-testid="request-description"
                        name="request_description"
                        onChange={handleChange}
                        placeholder="Enter Request Description"
                        type="text"
                        value={formData.request_description}
                        />
                        {/*Show error if submitting invalid input*/}
                        {errors.request_description && <span style={{ color: "red" }}>{errors.request_description}</span>}
                    </Form.Group>
                </Row>

        <Button
          style={{ marginTop: '20px' }}
          variant='primary'
          onClick={goBack}
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

export default CreateRequest
