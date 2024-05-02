import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Modal } from 'react-bootstrap'

const Calendar = ({ setTime, timeType, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const formatDate = date => {
    const pad = num => (num < 10 ? '0' + num : num)
    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1) // Month is zero-indexed
    const year = date.getFullYear()
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  }

  const handleConfirm = () => {
    const formattedDate = formatDate(selectedDate)
    setTime(formattedDate) // Assuming setTime expects a string in "dd/mm/yyyy hh:mm:ss" format
    handleClose()
  }

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select {timeType} Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          showTimeSelect
          dateFormat='Pp'
          inline
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Calendar
