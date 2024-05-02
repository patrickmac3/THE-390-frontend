import React from 'react'

const FacilityCard = ({ facility }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        width: '300px',
      }}
    >
      <h2>{facility.name}</h2>
      <p>
        <strong>Description:</strong> {facility.description}
      </p>
      <p>
        <strong>Capacity:</strong> {facility.capacity} People
      </p>
      <p>
        <strong>Start Time:</strong> {facility.start_time}
      </p>
      <p>
        <strong>End Time:</strong> {facility.end_time}
      </p>
    </div>
  )
}

export default FacilityCard
