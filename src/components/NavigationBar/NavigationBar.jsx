import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './NavigationBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

import logo from "../../img/avivavoz_logo_white.png";

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <div className="navigationBar">
      <Navbar expand="lg" expanded={expanded} onToggle={handleToggle}>
        <Container fluid>
          <Row className="w-100 align-items-center">
            {/* Mobile/Tablet Layout */}
            <Col xs={6} className="d-flex align-items-center d-lg-none">
              <Navbar.Brand as={Link} to="/" onClick={handleClose}>
                <div className="d-flex align-items-center">
                  <img
                    alt="A Viva Voz Logo"
                    src={logo}
                    className="d-inline-block align-top"
                  />
                </div>
              </Navbar.Brand>
            </Col>
            
            <Col xs={6} className="d-flex align-items-center justify-content-end d-lg-none">
              <div className="number-text-mobile d-flex align-items-center me-3">
                <a href="tel:787-379-9456" className="custom-call-button">
                  <FontAwesomeIcon icon={faPhone} />
                  <h3 className="icon-text">787-379-9456</h3>
                </a>
              </div>
              <Navbar.Toggle 
                aria-controls="basic-navbar-nav" 
                className="custom-toggler"
                onClick={handleToggle}
              >
                <FontAwesomeIcon icon={faBars} />
              </Navbar.Toggle>
            </Col>

            {/* Desktop Layout */}
            <Col lg={3} className="d-none d-lg-flex align-items-center">
              <Navbar.Brand as={Link} to="/" onClick={handleClose}>
                <div className="d-flex align-items-center">
                  <img
                    alt="A Viva Voz Logo"
                    src={logo}
                    className="d-inline-block align-top"
                  />
                </div>
              </Navbar.Brand>
            </Col>

            <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center">
              <Nav className="horizontal-nav d-flex align-items-center">
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  onClick={handleClose}
                  className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/consejos" 
                  onClick={handleClose}
                  className={`nav-link-custom ${location.pathname === '/consejos' ? 'active' : ''}`}
                >
                  Consejos para seguimiento en casa
                </Nav.Link>
              </Nav>
            </Col>

            <Col lg={3} className="d-none d-lg-flex align-items-center justify-content-end">
              <div className="number-text-desktop d-flex align-items-center">
                <a href="tel:787-379-9456" className="custom-call-button">
                  <FontAwesomeIcon icon={faPhone} />
                  <h3 className="icon-text">787-379-9456</h3>
                </a>
              </div>
            </Col>
            
            {/* Mobile Collapse Menu */}
            <Col xs={12} className="d-lg-none">
              <Navbar.Collapse id="basic-navbar-nav" className="mobile-collapse">
                <div className="mobile-nav-items">
                  <Nav.Link 
                    as={Link} 
                    to="/" 
                    onClick={handleClose}
                    className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/consejos" 
                    onClick={handleClose}
                    className={`mobile-nav-link ${location.pathname === '/consejos' ? 'active' : ''}`}
                  >
                    Consejos para seguimiento en casa
                  </Nav.Link>
                </div>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
