import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './styles/Navbar.css'; 
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthProvider';

const NavbarMain = () => {

  const {isLoggedIn, user} = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Vjo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex flex-grow-1 justify-content-between align-items-center">
            {/* LEFT SIDE (always visible) */}
            <div className="d-flex">
              <NavDropdown title="Dashboard" id="dashboard-dropdown">
                <NavDropdown.Item href="/feed">Activity feed</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Routes</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Clubs</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="History" id="history-dropdown">
                <NavDropdown.Item href="#action/3.1">My Activities</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Calendar</NavDropdown.Item>
              </NavDropdown>
            </div>  

            {/* RIGHT SIDE (depends on user login) */}
            <div className="d-flex">
              {isLoggedIn ? (
                // If user is logged in
                <> 
                
                  <Nav.Link href="/profile">{user.full_name}</Nav.Link>
                  {/* <Nav.Link href="/notifications">Notifications</Nav.Link> */}
                  <Nav.Link href="/friends">Friends</Nav.Link>
                  <Nav.Link href="/add-activity">Add Activity</Nav.Link>
                  <Nav.Link href="/about-us">About</Nav.Link>
                </>
              ) : (
                // If user is NOT logged in
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign up</Nav.Link>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMain;
