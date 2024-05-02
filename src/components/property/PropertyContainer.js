import React, { useEffect } from 'react'
import PropertyCard from './PropertyCard'
import { useState } from 'react'
import { useProperty } from '../../utils/hooks/PropertyContext'
import { useProfile } from '../../utils/hooks/ProfileContext'
import '../../index.css'

const PropertyContainer = () => {
  // receive property states and property methods from the property context
  const {
    properties,
    fetchCompanyProperties,
    setProperties,
    fetchAllCondoUnitsForProfile,
    condoUnits,
    fetchAllStorageUnitsForProfile,
    storageUnits,
    fetchAllParkingUnitsForProfile,
    parkingUnits,
  } = useProperty()
  // get role of the user from the profile context
  const { role } = useProfile()

  // get information on db properties
  useEffect(() => {
    // get the id from local storage
    const id = localStorage.getItem('ID')
    const fetchData = async () => {
      try {
        if (role === 'COMPANY') {
          // fetch all the properties for the company if the user is a company employee
          fetchCompanyProperties(id)
        } else if (role === 'PUBLIC') {
          // fetch all the units for the user if the user is a public user
          console.log('fetching properties for public user')
          fetchAllCondoUnitsForProfile(id)
          fetchAllParkingUnitsForProfile(id)
          fetchAllStorageUnitsForProfile(id)
        }
      } catch (error) {
        console.error('Error fetching properties: ', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='grid-container'>
      {/* if properties don't exist for a company or user show message, if not show properties */}
      {/* {   show the property cards based on the type passed to be able to recycle the same card for properties and units */}
      {/* {if it's a company, show properties, if it's a user show units */}
      {role === 'COMPANY' && Object.values(properties).length === 0 ? (
        <h1>No properties found</h1>
      ) : (
        Object.values(properties).map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            type={'Property'}
          />
        ))
      )}
      {role === 'PUBLIC' && Object.values(condoUnits).length === 0 ? (
        <h1>No Condo Units</h1>
      ) : (
        Object.values(condoUnits).map(condoUnit => (
          <PropertyCard
            key={condoUnit.id}
            property={condoUnit}
            type={'Condo'}
          />
        ))
      )}
      {role === 'PUBLIC' &&
      parkingUnits !== null &&
      parkingUnits !== undefined &&
      Object.values(parkingUnits).length === 0 ? (
        <h1>No Parking Units Found</h1>
      ) : parkingUnits ? (
        Object.values(parkingUnits).map(parkingUnit => (
          <PropertyCard
            key={parkingUnit.id}
            property={parkingUnit}
            type={'Parking'}
          />
        ))
      ) : null}
      {role === 'PUBLIC' &&
      storageUnits !== null &&
      storageUnits !== undefined &&
      Object.values(storageUnits).length === 0 ? (
        <h1>No Storage Units Found</h1>
      ) : storageUnits ? (
        Object.values(storageUnits).map(storageUnit => (
          <PropertyCard
            key={storageUnit.id}
            property={storageUnit}
            type={'Storage'}
          />
        ))
      ) : null}
    </div>
  )
}

export default PropertyContainer
