import propertyPhoto from "../../assets/condo-photo.jpg"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";

const CreateProperty = () => {

  let navigate = useNavigate();

  // property information, should extend to match all info needed
  const [formData, setFormData] = useState({
    property_name: "",
    property_company: "",
    property_address: "",
    property_city: "",
    property_province: "British Colombia",
    property_postal_code: "",
    property_fee_rate: "",
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

  // Update formData when image changes
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  //Validate input form
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate input fields

    // Property field is not yet submitted through form
    // Property name must be filled, and must not exceed 100 chars
    if (!formData.property_name) {
      errors.property_name = 'Name field required';
      isValid = false;
    } else if (formData.property_name.length > 100) {
      errors.property_name = 'Name must be under 100 characters';
      isValid = false;
    }

    // Property address must be filled, and must not exceed 100 chars
    if (!formData.property_address) {
      errors.property_address = 'Address field required';
      isValid = false;
    } else if (formData.property_address.length > 100) {
      errors.property_address = 'Address must be under 100 characters';
      isValid = false;
    }

    //City name must be filled, not contain a number, and must not exceed 100 chars
    if (!formData.property_city) {
      errors.property_city = 'City name field required';
      isValid = false;
    } else if (formData.property_city.length > 100) {
      errors.property_city = 'City name must be under 100 characters';
      isValid = false;
    } else if (/\d/.test(formData.property_city)) {
      errors.property_city = 'City name must not contain numbers';
      isValid = false;
    }

    //Postal code must be filled, and must not exceed 10 chars
    if (!formData.property_postal_code) {
      errors.property_postal_code = 'Postal code field required';
      isValid = false;
    } else if (formData.property_postal_code.length > 10) {
      errors.property_postal_code = 'Postal code must not exceed 10 characters';
      isValid = false;
    }

    //Condo Fees must be filled, must be greater than 0 and must not exceed 10 chars
    if (!formData.property_fee_rate) {
      errors.property_condo_fees = 'Condo Fees field required';
      isValid = false;
    } else if (formData.property_fee_rate.length > 10) {
      errors.property_fee_rate = 'Condo Fees must not exceed 10 characters';
      isValid = false;
    } else if (formData.property_fee_rate <= 0) {
      errors.property_fee_rate = 'Condo Fees must be greter than 0'
    }

    //TODO: Add validation for image field: Image field must not be empty

    //If there are errors, set errors in state and prevent submit
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    }

    return isValid;

  }

  //handle form submission to create a new property
  const handleSubmit = (e) => {
    const companyID = localStorage.getItem("ID");
    e.preventDefault();

    //If form is valid, post the form
    if (validateForm()) {
      console.log(formData);

      //post form
      axiosInstance
        .postForm(`/properties/property-profile/`, {
          //TODO await model updates with name and image
          // name: formData.property_name, 
          company: companyID,
          address: formData.property_address,
          city: formData.property_city,
          province: formData.property_province,
          postal_code: formData.property_postal_code,
          fee_rate: 0.12, // TODO Implement input for fee rate. This is a temp value
          image: formData.property_image, //TODO: await model updates with name and image
        })
        .then((res) => {
          if (res.status == 201) {
            // Create new property if successful and go back to property dashboard
            window.alert(`Property profile ${formData.property_name} has been created`)
            console.log(res);
            console.log(res.data);
            navigate("/dashboard");
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

  //Go back to property dashboard
  function handleBackToDashboard() {
    navigate('/dashboard');
  }

  return (
    <Container className="w-75 p-3 bg-secondary mt-5 text-dark">
      <Form className="py-5 text-dark" onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formGridPropertyName">
          <Form.Label>Property Name</Form.Label>
          <Form.Control
            type="text"
            name="property_name"
            placeholder="Enter Property Name"
            value={formData.name}
            onChange={handleChange}
            data-testid="property-name-input"
          />
          {/*Show error if submitting invalid input*/}
          {errors.property_name && <span style={{ color: "red" }}>{errors.property_name}</span>}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPropertyAddress">
          <Form.Label>Property Address</Form.Label>
          <Form.Control
            type="text"
            name="property_address"
            placeholder="Enter Property Address"
            value={formData.address}
            onChange={handleChange}
            data-testid="property-address-input"
          />
          {errors.property_address && <span style={{ color: "red" }}>{errors.property_address}</span>}
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPropertyCity">
            <Form.Label>Property City</Form.Label>
            <Form.Control
              type="text"
              name="property_city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
              data-testid="property-city-input"
            />
            {errors.property_city && <span style={{ color: "red" }}>{errors.property_city}</span>}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPropertyProvince">
            <Form.Label>Property Province</Form.Label>
            <Form.Select
              defaultValue={formData.property_rovince}
              name="property_province"
              value={formData.property_province}
              onChange={handleChange}
              data-testid="province-select-test">
              <option value="British Colombia" data-testid="BC-test">BC</option>
              <option value="Prince Edward Island" data-testid="PE-test">PE</option>
              <option value="Nova Scotia" data-testid="NS-test">NS</option>
              <option value="New Brunswick" data-testid="NB-test">NB</option>
              <option value="Quebec" data-testid="QC-test">QC</option>
              <option value="Ontario" data-testid="ON-test">ON</option>
              <option value="Manitoba" data-testid="MB-test">MB</option>
              <option value="Saskatchuwan" data-testid="SK-test">SK</option>
              <option value="Alberta" data-testid="AB-test">AB</option>
              {/* <option value="British Colombia">BC</option>
                <option value="British Colombia">YT</option>
                <option value="British Colombia">NT</option>
                <option value="British Colombia">NJ</option> */}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPropertyZip">
            <Form.Label>Property Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="property_postal_code"
              placeholder="Enter Postal Code"
              value={formData.postal_code}
              onChange={handleChange}
              data-testid="property-postal-code-input"
            />
            {errors.property_postal_code && <span style={{ color: "red" }}>{errors.property_postal_code}</span>}
          </Form.Group>

        </Row>
        <Row>
          <Form.Group controlId="formGridPropertyImage" className="mb-4">
            <Form.Group as={Col} controlId="formGridPropertyFees">
              <Form.Label>Fee Rate</Form.Label>
              <Form.Control
                type="text"
                name="property_fee_rate"
                placeholder="Enter Fee Rate"
                value={formData.fee_rate}
                onChange={handleChange}
                data-testid="property-fee_rate-input"
              />
              {errors.property_fee_rate && <span style={{ color: "red" }}>{errors.property_fee_rate}</span>}
            </Form.Group>
            <Form.Label>Upload Property Image</Form.Label>
            <Form.Control
              type="file"
              name="property_image"
              placeholder="H3G 1M8"
              multiple
              onChange={handleImageChange}
              data-testid="property-image-file"
            />
            {errors.property_image && <span style={{ color: "red" }}>{errors.property_image}</span>}
          </Form.Group>

        </Row>

        <Button style={{ marginTop: "20px" }} variant="primary" onClick={handleBackToDashboard}>
          Cancel
        </Button>
        <Button style={{ marginLeft: "20px", marginTop: "20px" }} variant="primary" type="submit" data-testid="submit-button">
          Submit
        </Button>
      </Form>
    </Container >
  )
}

export default CreateProperty