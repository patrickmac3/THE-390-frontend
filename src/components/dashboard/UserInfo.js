import React, { useContext, useEffect, useState } from "react";
import profilepic from "../../assets/pp.jpg";
import axiosInstance from "../../api/axios";
import {
    Container,
    Row,
    Col,
    Card,
    ListGroup,
} from "react-bootstrap";
import { useProfile } from "../../utils/hooks/ProfileContext";

// just show the user profile 

const UserInfo = () => {

    const { profileInfo } = useProfile();

    // This call is not needed anymore because the call is made right after sign up
    // get information on active user
    // useEffect(() => {
    //     getProfileInformation()
    //     // This empty dependency 
    // }, []);

    return (
        <Container style={{ width: '400px' }}>
            <h2>Welcome {profileInfo.first_name}</h2>
        </Container>

    );
};

export default UserInfo;
