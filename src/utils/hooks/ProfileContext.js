import { useState, useContext, createContext } from 'react';
import axiosInstance from '../../api/axios';
import profilepic from "../../assets/pp.jpg"

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}
export function ProfileProvider(props) {

    const [profileInfo, setProfileInfo] = useState({
        avatar: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        city: "",
        province: "",
        registration_key: "",
        postal_code: "",
    });
    const [role, setRole] = useState(null)
    const fetchProfileRole = () => {
        const id = localStorage.getItem("ID");
        if (id) {
            axiosInstance.get(`profiles/user/${id}/`)
                .then((response) => {
                    if (response && response.data) {
                        const role = response.data.role;
                        setRole(role);
                        console.log(role);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                });
        }
    }

    const getProfileInformation = async () => {
        let role = ''
        const id = localStorage.getItem("ID");
        axiosInstance
            .get(`profiles/user/${id}/`)
            .then((response) => {
                role = response.data.role;
                console.log(role);
                if (role == "COMPANY") {
                    axiosInstance
                        .get(`profiles/company-profile/${id}/`)
                        .then((response) => {
                            console.log(response);
                            setProfileInfo({        
                                // get information from the user model
                                first_name: response.data.user.first_name,
                                last_name: response.data.user.last_name,
                                email: response.data.user.email,
                                // get information from the public-profile model
                                phone_number: response.data.phone_number,
                                address: response.data.address,
                                city: response.data.city,
                                province: response.data.province,
                                postal_code: response.data.postal_code,
                                avatar: response.data.avatar,
                            });
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error("Error fetching user profile:", error.message);
                        });
                } else if (role == "PUBLIC") {
                    axiosInstance
                        .get(`profiles/public-profile/${id}/`)
                        .then((response) => {
                            console.log(response);
                            setProfileInfo({
                                // get information from the user model
                                first_name: response.data.user.first_name,
                                last_name: response.data.user.last_name,
                                email: response.data.user.email,
                                // get information from the public-profile model
                                phone_number: response.data.phone_number,
                                address: response.data.address,
                                city: response.data.city,
                                province: response.data.province,
                                postal_code: response.data.postal_code,
                                avatar: response.data.avatar
                            });
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error("Error fetching user profile:", error.message);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error.message);
            });

    }

    const setProfileInformation = (profile) => {
        setProfileInfo(profile);
    }

    return (
        <ProfileContext.Provider value={{ profileInfo, getProfileInformation, setProfileInformation, fetchProfileRole, role}} > {props.children} </ProfileContext.Provider>
    )
}