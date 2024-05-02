import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useProfile } from '../../utils/hooks/ProfileContext'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import LargeTitle from '../LargeTitle.js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditRequest = () => {
  return (
    <Container className='w-75 p-3 bg-secondary mt-5 text-dark'>
      <Row className='justify-content-center'>
        {/* a page title */}
        <LargeTitle title='Create New Request' />
      </Row>
    </Container>
  )
}

export default EditRequest
