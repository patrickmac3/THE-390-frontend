import React, { useContext } from "react";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios.js";
import { useAuth } from "../../utils/hooks/AuthContext.js";
import PropertyCard from "../property/PropertyCard.js";
import LargeTitle from "../LargeTitle.js";
// Login Page

const Login = () => {

  const history = useNavigate();
  const { authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn } = useAuth();
  
    // Login information
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // updating formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    //Clear existing error if there is change to input
    setErrors({ ...errors, [e.target.name]: '' });
  };

  //Validate login form
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    //Validate input fields
    //Email must be filled, must not exceed 30 chars, and must be a valid email-form input
    if (!formData.email){
      errors.email = "Please enter your email";
      isValid = false;
    } else if (formData.email.length > 30){
      errors.email = "Your email must be under 30 characters";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) { //Make sure email format is correct
      errors.email = 'Invalid email address';
      isValid = false;
    }
    //Password must be filled, and must not exceed 20 chars
    if (!formData.password){
      errors.password = "Please enter your password";
      isValid = false;
    } else if (formData.password.length > 20){
      errors.password = "Your password must be under 20 characters";
      isValid = false;
    } // Possible to validate that password include a symbol, number and capital letter in future sprints

    //If there are errors, set errors in state and prevent submit
    if (Object.keys(errors).length >0){
      setErrors(errors);
    }

    return isValid;
  }

  // Handle form when submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    //If form is valid then post the form
    if (validateForm()){
      console.log(formData);

      //post form data
      axiosInstance
        .post(`api/token/`, {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          // store JWT tokens in localStorage
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          localStorage.setItem("ID", res.data.id);
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          history("/home");
          console.log(res);
          console.log(res.data);
          setIsLoggedIn(true);
          // TODO must confirm i need to use user id?
          setAuthUser(formData.email);
          // confirm to user that they have been successfully logged in
          if (res.status == 200)
            window.alert(`you have been logged in as ${formData.email}`);
        })
        .catch((err) => {
          console.log(err);
          window.alert("Something went wrong when loggin in");
        });
    } else{
      //If form input is not valid then do not post
      return;
    }
  };

  return (
    <Container className="w-75 p-3 bg-secondary mt-5">
      <LargeTitle title="Welcome Back!" />
      <Form className="py-5 text-dark" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGridEmailAddress">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="your-email@email.com"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
          />
          {/*Show error if submitting invalid input*/}
          {errors.email && <span style={{color: "red"}}>{errors.email}</span>}
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
            data-testid="password-input"
          />
          {errors.password && <span style={{color: "red"}}>{errors.password}</span>}
        </Form.Group>

        <Button variant="primary" type="submit" data-testid="submit-button">
          Submit
        </Button>
        <Form.Text className='py-3'> Don't have an account? <Link to='/signup' data-testid="sign-up-link">Sign Up</Link> or <Link to='/signup-company' data-testid="sign-up-company-link">Company Sign Up </Link></Form.Text>
      </Form>
    </Container>
  );
};

export default Login;
