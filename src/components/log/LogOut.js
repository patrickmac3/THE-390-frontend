import React, { useContext, useEffect } from 'react'
import axiosInstance from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/hooks/AuthContext'
import { useProperty } from '../../utils/hooks/PropertyContext'
import { useProfile } from '../../utils/hooks/ProfileContext'

const LogOut = () => {
  const history = useNavigate()
  const { setIsLoggedIn, setAuthUser } = useAuth()
  const { clearAllPropertyStatesOnLogout } = useProperty() // added this line to clear all states on logout
  const { role, setRole } = useProfile() // added this line to clear the user role on logout

  useEffect(() => {
    const response = axiosInstance.post('logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    })

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('ID') // added this line to remove the user id from local storage
    axiosInstance.defaults.headers['Authorization'] = null
    setIsLoggedIn(false)
    setAuthUser('')
    clearAllPropertyStatesOnLogout() // added this line to clear all states on logout so that the next login won't hold pervious user's data
    history('/login')
    setRole('') // added this line to clear the user role on logout
  })

  return <div>logout</div>
}

export default LogOut
