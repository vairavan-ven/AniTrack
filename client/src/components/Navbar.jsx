import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Auth from '../utils/auth';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

const AppNavbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    Auth.logout(); // Logout the user
    navigate('/'); // Redirect to the search page after logout using useNavigate
  };

  return (
    <Navbar style={{ backgroundColor: '#4527A0' }} variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/' style={{ fontFamily: 'Bubblegum Sans', fontSize: '24px' }}>
          AniTrack: MERN Anime Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar' />
        <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
          <Nav className='ml-auto d-flex'>
            <Nav.Link as={Link} to='/'>
              Search For Anime
            </Nav.Link>
            <Nav.Link as={Link} to='/profile'> 
              Profile
            </Nav.Link>
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to='/saved'>
                  See Your Anime
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Updated onClick handler */}
              </>
            ) : (
              <>
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Modal for login and signup */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </Navbar>
  );
};

export default AppNavbar;
