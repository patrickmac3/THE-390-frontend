import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../../api/axios';

const PropertyContext = createContext();

export const useProperty = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {

    const [properties, setProperties] = useState({});
    const [property, setProperty] = useState({
        id: -1,
        company: -1,
        num_condo_units: -1,
        num_parking_units: -1,
        num_storage_units: -1,
        address: "",
        city: "",
        province: "",
        postal_code: "",
        condo_units: [],
        parking_units: [],
        storage_units: [],
        image: "",
        name: ""
    }
    );
    const [companyFinances, setCompanyFinances] = useState({});

    // clear all property states on logout to avoid showing the previous user's data
    const clearAllPropertyStatesOnLogout = () => [
        setProperties({}),
        setCondoUnits({}),
        setParkingUnits({}),
        setStorageUnits({}),
    ]

    // create state for condo units, parking units, and storage units
    // they will store the units to show for public user
    const [condoUnits, setCondoUnits] = useState({});
    const [parkingUnits, setParkingUnits] = useState({})
    const [StorageUnits, setStorageUnits] = useState({})

    // fetch all properties for a specific company, to be used in the dashboard 
    // of a company employee to see all the properties they have
    const fetchCompanyProperties = async (company_id) => {
        const parsedCompanyId = parseInt(company_id, 10); // 10 is the radix parameter to specify decimal base
        axiosInstance
            .get(`profiles/company-profile/${parsedCompanyId}/property-profiles/`) //endpoint for fetching all properties for a company
            .then((response) => {
                console.log("fetching properties for company id: ", parsedCompanyId) //confirmation to console
                console.log(response); //send response to console
                setProperties(response.data); // use the properties state to store the response data
                console.log(response.data);
                console.log(properties);
            })
            .catch((error) => {
                console.error("Error fetching property profile:", error.message);
            });
    };

    const fetchCompanyFinance = async (company_id) => {
        try {
            const parsedCompanyId = parseInt(company_id, 10);
            const response = await axiosInstance.get(`profiles/company-profile/${parsedCompanyId}/finance-report/`);
            console.log("Fetching finances for company id:", parsedCompanyId); // Log the confirmation to the console
            setCompanyFinances(response.data); // Use the state setter to store the response data
        } catch (error) {
            console.error("Error fetching property profile:", error.message); // Log any errors that occur
        }
    };

    const updateCompanyFinance = async (company_id, updatedFinance) => {
        try {
            const parsedCompanyId = parseInt(company_id, 10); // Ensure the company ID is an integer
            // Await the async call to complete and catch any errors that occur
            const response = await axiosInstance.put(`profiles/company-profile/${parsedCompanyId}/finance-report/`, updatedFinance);

            // Log or handle the successful response, if necessary
            console.log("Finance updated successfully for company id:", parsedCompanyId);
            console.log(response.data); // Log the response data to see what was returned (optional)
        } catch (error) {
            // Log the error with a more appropriate error message
            console.error("Error updating company finance profile:", error.message);
        }
    };


    // call to get all the condo units present for a specific user profile
    // to be used when seeing condo units on the user dashboard
    const fetchAllCondoUnitsForProfile = async (user_id) => {
        try { //get the condo units for a specific user from the backend
            const response = await axiosInstance.get(`profiles/public-profile/${user_id}/condo-units/`);
            console.log(response); //output the response for confirmation
            setCondoUnits(response.data); //set local state to the response data
        } catch (error) {
            console.error("Error fetching property profile:", error.message);
        }
    };
    // call to get all the parking units present for a specific user profile
    // to be used when seeing parking units on the user dashboard
    const fetchAllParkingUnitsForProfile = async (user_id) => {
        try {
            const response = await axiosInstance.get(`profiles/public-profile/${user_id}/parking-units/`);
            console.log(response);
            setParkingUnits(response.data);
        } catch (error) {
            console.error("Error fetching property profile:", error.message);
        }
    };
    // call to get all the parking units present for a specific user profile
    // to be used when seeing storage units on the user dashboard
    const fetchAllStorageUnitsForProfile = async (user_id) => {
        try {
            const response = await axiosInstance.get(`profiles/public-profile/${user_id}/storage-units/`);
            console.log(response);
            setStorageUnits(response.data);
        } catch (error) {
            console.error("Error fetching property profile:", error.message);
        }
    };

    //to be used when seeing properties on the compnay dashboard
    const fetchPropertyById = async (id) => {
        axiosInstance
            .get(`/properties/property-profile/${id}`)
            .then((response) => {
                console.log(response);
                setProperty({
                    id: response.data.id,
                    company: response.data.company,
                    num_condo_units: response.data.num_condo_units,
                    num_parking_units: response.data.num_parking_units,
                    num_storage_units: response.data.num_storage_units,
                    address: response.data.address,
                    city: response.data.city,
                    province: response.data.province,
                    postal_code: response.data.postal_code,
                    condo_units: response.data.condo_units,
                    parking_units: response.data.parking_units,
                    storage_units: response.data.storage_units,
                    image: response.data.image,
                    name: response.data.name
                });
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching property profile:", error.message);
            });
    };

    const addProperty = async (property) => {
        // Implement adding a new property
    };

    const updateProperty = async (id, updatedProperty) => {
        // Implement updating a property
    };

    const deleteProperty = async (id) => {
        // Implement deleting a property
    };

    // add a value object to the provider for clarity
    const value = {
        properties,
        setProperties,
        fetchCompanyProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        property,
        setProperty,
        fetchPropertyById,
        fetchAllCondoUnitsForProfile,
        condoUnits,
        parkingUnits,
        fetchAllParkingUnitsForProfile,
        StorageUnits,
        fetchAllStorageUnitsForProfile,
        clearAllPropertyStatesOnLogout,
        companyFinances,
        fetchCompanyFinance
    }

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};
