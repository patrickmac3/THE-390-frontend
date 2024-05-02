import React, { useState } from 'react'
import FacilityCard from './FacilityCard'

const FacilitiesList = ({ facilities }) => {
  return (
    <div>
      {facilities &&
        Object.values(facilities).map(facility => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
    </div>
  )
}

export default FacilitiesList
