import React from 'react'
import { useAuth } from "../../utils/hooks/AuthContext";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { useProfile } from '../../utils/hooks/ProfileContext';

const NavigationBar = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();  // Using useLocation to access the current path
  const { role } = useProfile();

  const getActiveKey = () => {
    // This function determines the active key based on the current pathname
    const path = location.pathname;
    if (path.includes('/profile')) {
      return 'profile';
    } else if (path.includes('/dashboard')) {
      return 'dashboard';
    } else if (path.includes('/logout')) {
      return 'logout';
    }
    return '/';
  };
  return (
    <header>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CondoCare</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn ? "" : <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> LOGIN
                </Nav.Link>
              </LinkContainer>}
            </Nav>
            <Nav className="ms-auto justify-content-end" variant="tabs" activeKey={getActiveKey()}>
              {isLoggedIn && role === "COMPANY" ?
                <Nav.Item evenKey="/operation">
                  <LinkContainer to="/operation">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Operation
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                : ''}
              {isLoggedIn ?
                <Nav.Item eventkey="/profile">
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Profile
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                : ''}
              {isLoggedIn ?
                <Nav.Item eventkey="/dashboard">
                  <LinkContainer to="/dashboard">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Dashboard
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                : ''}
              {isLoggedIn ?
                <Nav.Item eventkey="/logout">
                  <LinkContainer to="/logout" data-testid="logout">
                    <Nav.Link>
                      <i className="fas fa-user"></i> LOGOUT
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                : ''}
              {/* {isLoggedIn ?
                <NavDropdown data-testid="dropdown" title="Dropdown" id="basic-nav-dropdown">
                  <LinkContainer to="/profile"><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
                  <LinkContainer to="/dashboard"><NavDropdown.Item>Dashboard</NavDropdown.Item></LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer data-testid="logout" to="/logout"><NavDropdown.Item>LOGOUT</NavDropdown.Item></LinkContainer>
                </NavDropdown>
                : ""} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>)
}

export default NavigationBar