import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useProperty } from "../../utils/hooks/PropertyContext"
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  ListGroup
} from "react-bootstrap";
import LargeTitle from "../LargeTitle.js";
import { useEffect } from "react"

const CreateCommonFacilities = () => {
    const { propertyId } = useParams();

    let navigate = useNavigate();

    // property information, should extend to match all info needed
    const [formData, setFormData] = useState({
        name: "",
        type: "Gym",
        description: "",
        capacity: "",
        reservation_duration: "",
    });

    const [errors, setErrors] = useState({});
    
    //handle change from the user input and save to state
    const handleChange = (e) => {
        setFormData({
          ...formData,
          // Trimming any whitespace
          [e.target.name]: e.target.value,
        });
    
        //Clear existing error if there is change to input
        setErrors({ ...errors, [e.target.name]: '' });
        console.log(formData);
      };
      
    //handle form submission to create a new property
    const validateForm = () =>{
        const errors = {};
        let isValid = true;

        // Facility name must be filled, and must not exceed 100 chars
        if (!formData.name) {
            errors.name = 'Facility name required';
            isValid = false;
        } else if (formData.name.length > 100) {
            errors.name = 'Facility name must be under 100 characters';
            isValid = false;
        }

        //Description must be filled, must be not exceed 200 chars
        if (!formData.description) {
            errors.description = "Facility description required";
            isValid = false;
        } else if (formData.description.length > 200) {
            errors.description = "Facility description must be less than 200 characters";
            isValid = false;
        }

        // Capacity must be filled, must consist only of numbers, and must be less than 100
        if (!formData.capacity) {
            errors.capacity = "Please enter facility capacity";
            isValid = false;
        } else if (isNaN(parseInt(formData.capacity))) {
            errors.capacity = "Your capacity must consist of numbers only";
            isValid = false;
        } else if (parseInt(formData.capacity) > 100){
            errors.capacity  = "Max Capacity Allowed: 100"
        }

        // Reservation duration must be filled, must consist only of numbers, and must be less than 1440
        if (!formData.reservation_duration) {
            errors.reservation_duration = "Please enter facility reservation duration";
            isValid = false;
        } else if (isNaN(parseInt(formData.reservation_duration))) {
            errors.reservation_duration = "Your reservation duration must consist of numbers only";
            isValid = false;
        } else if (parseInt(formData.reservation_duration) > 1440){
            errors.reservation_duration  = "Max reservation duration allowed: 1440 minutes"
        }

        //If there are errors, set errors in state and prevent submit
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        }
    
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        //If form is valid, post the form
        if (validateForm()) {
          console.log(formData);
    
          //post form
          axiosInstance

          // TODO: Check for endpoint, as this might change
            .postForm(`properties/property-profile/${propertyId}/common-facilities/`, {
              name: formData.name,
              type: formData.type,
              description: formData.description,
              capacity: formData.capacity,
              reservation_duration: formData.reservation_duration,
            })
            .then((res) => {
              if (res.status == 201) {
                // Create new property if successful and go back to property dashboard
                window.alert(`Common Facility ${formData.name} has been created`)
                console.log(res);
                console.log(res.data);
                goBack();
              }
            })
            .catch((error) => {
              //Show popup of error encountered
              console.log(error);
              console.log(error.data);
              window.alert(`${error} `)
            });
        } else {
          //Do not post form if there is error in input
          return;
        }
    };
    
    //Go back to previous page
    function goBack() {
        navigate(-1);
    }

    return (
        <Container className="w-75 p-3 bg-secondary mt-5 text-dark">
            <Row className="justify-content-center">
                {/* a page title */}
                <LargeTitle title="Create Common Facilities" />
            </Row>
                <Form className="py-5 text-dark" onSubmit={handleSubmit}>
                {/*TODOchange to name instead of id*/}
                <Row className="mb-3">
                
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    data-testid="facility-name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter Facility Name"
                    type="text"
                    value={formData.name}
                    />
                    {/*Show error if submitting invalid input*/}
                    {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                </Form.Group>
                
                <Form.Group as={Col} controlId="formGridType">
                    <Form.Label>Facility Type</Form.Label>
                    <Form.Select
                    defaultValue={formData.property_rovince}
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    data-testid="type-select-test">
                    <option value="Gym" data-testid="gym-test">Gym</option>
                    <option value="Swimming Pool" data-testid="SP-test">Swimming Pool</option>
                    <option value="Meeting Room" data-testid="MR-test">Meeting Room</option>
                    <option value="Lounge" data-testid="lounge-test">Lounge</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    data-testid="facility-description"
                    name="description"
                    onChange={handleChange}
                    placeholder="Enter Facility Description"
                    type="text"
                    value={formData.description}
                    />
                    {/*Show error if submitting invalid input*/}
                    {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridCapacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                    data-testid="facility-capacity"
                    name="capacity"
                    onChange={handleChange}
                    placeholder="Enter Facility Capacity"
                    type="text"
                    value={formData.capacity}
                    />
                    {/*Show error if submitting invalid input*/}
                    {errors.capacity && <span style={{ color: "red" }}>{errors.capacity}</span>}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCapacity">
                    <Form.Label>Reservation Duration</Form.Label>
                    <Form.Control
                    data-testid="facility-reservation"
                    name="reservation_duration"
                    onChange={handleChange}
                    placeholder="Enter Facility Reservation Duration"
                    type="text"
                    value={formData.reservation_duration}
                    />
                    {/*Show error if submitting invalid input*/}
                    {errors.reservation_duration && <span style={{ color: "red" }}>{errors.reservation_duration}</span>}
                </Form.Group>
            </Row>

            <Button style={{ marginTop: "20px" }} variant="primary" onClick={goBack}>
                Cancel
            </Button>
            <Button style={{ marginTop: "20px", marginLeft: "20px" }} variant="primary" type="submit" data-testid="submit-button">
                Submit
            </Button>
        </Form>
        </Container>
    );
}

export default CreateCommonFacilities;