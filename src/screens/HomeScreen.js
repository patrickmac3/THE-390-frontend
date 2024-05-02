import React from 'react'
import { Link } from 'react-router-dom'
import CarouselHomeScreen from './homeScreenCarousel/CarouselHomeScreen'
import { useProfile } from '../utils/hooks/ProfileContext'
import { useEffect } from 'react'

const HomeScreen = () => {
  const { role, fetchProfileRole } = useProfile()
  useEffect(() => {
    fetchProfileRole()
  }, [])
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        {/* add a page title with a welcoming message */}
        <div className='col-lg-10 col-md-13 mt-5'>
          <div className='d-flex flex-column align-items-center'>
            <h1
              style={{
                fontSize: '50px',
                marginBottom: '30px',
                fontWeight: 'bold',
              }}
            >
              Welcome to CondoCare!
            </h1>
            <h4 style={{ marginBottom: '30px' }}>
              Get Ready for Easy Property Management!
            </h4>
          </div>
          <CarouselHomeScreen />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
