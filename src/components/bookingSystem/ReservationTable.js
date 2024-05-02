import React from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment' // Make sure to run `npm install moment`

const ReservationsTable = ({ reservations }) => {
  return (
    <Table striped bordered hover style={{ marginTop: '90px' }}>
      <thead>
        <tr>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map(reservation => (
          <tr key={reservation.id}>
            <td>
              {moment(reservation.start_time).format('MMMM Do YYYY, h:mm a')}
            </td>
            <td>
              {moment(reservation.end_time).format('MMMM Do YYYY, h:mm a')}
            </td>
            <td>{reservation.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ReservationsTable
