import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import logoImage from '../images/MLH-Logo.jpg';
import staffmainIcon from '../images/staffmain.png';
import '../components/customCss.css';

export default function StaffNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <img
            src={logoImage}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Music Library Logo"
          />
          <span className="custom-font">Music Library</span>
        </Navbar.Brand>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip">Return to Resident Gallery</Tooltip>}>
          {({ ref, ...triggerHandler }) => (
            <Button as={Link} to="/staffmain" variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
              <Image ref={ref} src={staffmainIcon} width='30' height='30'/>
            </Button>
          )}
        </OverlayTrigger>
        <Button as={Link} to="/" variant="outline-primary" className="ml-auto custom-button2">
          Sign out
        </Button>
      </Container>
    </Navbar>
  );
}