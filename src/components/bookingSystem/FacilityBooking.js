import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LargeTitle from '../LargeTitle.js'
import { Button, Row, Col, Modal } from 'react-bootstrap'
import Calendar from './Calendar.js'
import { useProperty } from '../../utils/hooks/PropertyContext'
import { Dropdown } from 'react-bootstrap'
import axiosInstance from '../../api/axios'
import ReservationsTable from './ReservationTable.js'

const FacilityBooking = () => {
  const { propertyId } = useParams()
  const { fetchAllFacilities, facilities } = useProperty()
  const [unitFacilities, setUnitFacilities] = useState([])
  const {
    fetchAllCondoUnitsForProfile,
    condoUnits,
    fetchAllStorageUnitsForProfile,
    fetchAllParkingUnitsForProfile,
  } = useProperty()
  const navigate = useNavigate()
  const [selectedFactility, setSelectedFacility] = useState('Select a Facility')

  const [showStartTimeModal, setShowStartTimeModal] = useState(false)
  const [showEndTimeModal, setShowEndTimeModal] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [matchedUnit, setMatchedUnit] = useState(null)
  const [reservations, setReservations] = useState([])

  const handleOpenStartTimeModal = () => setShowStartTimeModal(true)
  const handleCloseStartTimeModal = () => setShowStartTimeModal(false)

  const handleOpenEndTimeModal = () => setShowEndTimeModal(true)
  const handleCloseEndTimeModal = () => setShowEndTimeModal(false)

  let filteredFacilities = []
  useEffect(() => {
    const userId = localStorage.getItem('ID')
    const fetchData = async () => {
      await fetchAllFacilities() // fetch all facilities for all properties
      await fetchAllCondoUnitsForProfile(userId)
      await fetchAllStorageUnitsForProfile(userId)
      await fetchAllParkingUnitsForProfile(userId)
    }
    fetchData().then(() => {
      // Ensure data fetching is complete before running the filter
      // This assumes that these states are properly updated by the above fetch calls

      const propertyIds = new Set()
      let propertyIdforUnit // Use let for variables that need to be reassigned
      if (condoUnits) {
        // Find the first unit that matches the propertyId and get its ID
        setMatchedUnit(condoUnits.find(unit => unit.id === Number(propertyId)))
        if (matchedUnit) {
          propertyIdforUnit = matchedUnit.property // Now storing the ID correctly
          console.log('property id for unit is: ', propertyIdforUnit)

          // Assuming you want to gather all properties that match this propertyId
          condoUnits.forEach(unit => {
            if (unit.property === propertyIdforUnit) {
              // This seems redundant or incorrect based on the previous description
              propertyIds.add(unit.property)
            }
          })
          console.log('property ids are: ', propertyIds)
        } else {
          console.log('No matching unit found for propertyId.')
        }
      }
      // Filter facilities that have a property matching any of the propertyIds in the Set
      filteredFacilities = facilities.filter(facility =>
        propertyIds.has(facility.property),
      )
      setUnitFacilities(filteredFacilities)
      console.log('Filtered Facilities: ', filteredFacilities)
    })

    try {
      axiosInstance.get('reservations/reservations/').then(res => {
        setReservations(res.data)
      })
    } catch (error) {
      console.log('Error fetching reservations:', error)
    }
  }, [])

  //make a post request to create a booking
  const handleCreateBooking = async () => {
    try {
      // Post request to create a booking
      const response = await axiosInstance.post('reservations/reservations/', {
        facility: selectedFactility.id,
        user: localStorage.getItem('ID'),
        start_time: startTime,
        end_time: endTime,
      })

      // Assuming the response includes the reservation data, otherwise adjust as necessary
      if (response.data) {
        window.alert(
          `Reservation made successfully!\n\nFacility: ${selectedFactility.name}\nStart Time: ${startTime}\nEnd Time: ${endTime}`,
        )
      } else {
        window.alert(
          'Reservation made successfully but no details were returned.',
        )
      }
    } catch (error) {
      console.log('Error creating booking:', error)
      window.alert('Failed to create reservation. Please try again.')
    }
  }

  const handleConfirm = () => {
    handleCreateBooking()
    setStartTime(null)
    setEndTime(null)
    setSelectedFacility('Select a Facility')
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className='container mt-5'>
      <LargeTitle
        title={`Reservation for Unit ${matchedUnit && matchedUnit.location}`}
      />

      <Row>
        <Col>
          <Dropdown
            className='mb-4 text-center mx-auto'
            style={{ width: '200px', marginTop: '100px' }}
          >
            <Dropdown.Toggle
              variant='success'
              id='dropdown-Unit'
              style={{ width: '200px' }}
            >
              {selectedFactility === 'Select a Facility'
                ? 'Select a Facility'
                : `${selectedFactility.name}`}
            </Dropdown.Toggle>
            <Dropdown.Menu className='text-center' style={{ width: '200px' }}>
              {unitFacilities.map(facility => (
                <Dropdown.Item
                  key={facility.id}
                  eventKey={facility.id}
                  onClick={() => setSelectedFacility(facility)}
                >
                  Facility {facility.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Row>
            <Col style={{ justifyContent: 'center' }}>
              <Button
                onClick={handleOpenStartTimeModal}
                style={{ width: '100px' }}
              >
                Start Time
              </Button>
            </Col>
            <Col>
              <span
                className='badge bg-success'
                style={{ fontSize: '18px', width: '220px' }}
              >
                {startTime && `${startTime}`}
              </span>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                onClick={handleOpenEndTimeModal}
                style={{
                  width: '100px',
                  marginTop: '20px',
                  marginBottom: '20px',
                }}
              >
                End Time
              </Button>
            </Col>
            <Col>
              <span
                className='badge bg-success'
                style={{ fontSize: '18px', width: '220px', marginTop: '20px' }}
              >
                {endTime && `${endTime}`}
              </span>
            </Col>
          </Row>

          {showStartTimeModal && (
            <Calendar
              setTime={setStartTime}
              timeType='Start'
              handleClose={handleCloseStartTimeModal}
            />
          )}
          {showEndTimeModal && (
            <Calendar
              setTime={setEndTime}
              timeType='End'
              handleClose={handleCloseEndTimeModal}
            />
          )}

          <Row>
            <Col md={8}>
              <Button
                variant='primary'
                onClick={handleConfirm}
                disabled={!startTime || !endTime}
                style={{ width: '100px' }}
              >
                Confirm
              </Button>
              <Button variant='secondary' onClick={goBack}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          {/* table for the reservations */}
          <ReservationsTable reservations={reservations} unit={matchedUnit} />
        </Col>
      </Row>
    </div>
  )
}

export default FacilityBooking
