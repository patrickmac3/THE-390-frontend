import React from 'react'
import { Container } from 'react-bootstrap'
import SignUp from './log/SignUp.js'
import Login from './log/Login.js'

const Content = () => {
  return (
    <main>
      <Container>
        <Login />
        <SignUp />
      </Container>
    </main>
  )
}

export default Content
