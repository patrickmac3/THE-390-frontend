import React from 'react'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import HomeScreen from './screens/HomeScreen.js'
import Login from './components/log/Login.js'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/log/SignUp.js'
import SignUpCompany from './components/log/SignUpCompany.js'
import UserProfile from './components/userProfile/UserProfile.js'
import LogOut from './components/log/LogOut'
import PropertyCard from './components/property/PropertyCard.js'
import DashBoard from './components/dashboard/DashBoard.js'
import PropertyPage from './components/property/PropertyPage.js'
//import PropertyCard from "./components/property/PropertyCard.js";
import CreateUnit from './components/createProperty/CreateUnit.js'
import CreateParking from './components/createProperty/CreateParking.js'
import CreateLocker from './components/createProperty/CreateLocker.js'
import CreateProperty from './components/createProperty/CreateProperty.js'
import { useAuth } from './utils/hooks/AuthContext.js'
import { useEffect } from 'react'
import OperationCost from './components/operationCost/OperationCopy.js'
import FacilityBooking from './components/bookingSystem/FacilityBooking.js'
import CommonFacilities from './components/commonFacilities/CommonFacilities.js'
import CreateCommonFacilities from './components/commonFacilities/CreateCommonFacilities.js'
import EditRequest from './components/request/EditRequest.js'
import CreateRequest from './components/request/CreateRequest.js'

function App() {
  //check for the token in case of a refresh
  let { checkAuthState } = useAuth()
  useEffect(() => {
    checkAuthState()
  }, [])

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<LogOut />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signup-company' element={<SignUpCompany />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/property-card' element={<PropertyCard />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route
              path='/property-page/:propertyId/create-condo-unit'
              element={<CreateUnit />}
            />
            <Route
              path='/property-page/:propertyId/create-parking-unit'
              element={<CreateParking />}
            />
            <Route
              path='/property-page/:propertyId/create-locker-unit'
              element={<CreateLocker />}
            />
            <Route
              path='/property-page/:propertyId'
              element={<PropertyPage />}
            />
            <Route
              path='/property-page/:propertyId/common-facilities'
              element={<CommonFacilities />}
            />
            <Route
              path='/property-page/:propertyId/create-common-facilities'
              element={<CreateCommonFacilities />}
            />
            <Route path='/create-property' element={<CreateProperty />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/operation' element={<OperationCost />} />
            <Route
              path='/booking-facility/:propertyId'
              element={<FacilityBooking />}
            />
            <Route
              path='/property-page/:propertyId/create-request'
              element={<CreateRequest />}
            />
            <Route
              path='/property-page/:propertyId/edit-request'
              element={<EditRequest />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
