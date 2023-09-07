import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SignupForm from '../components/SignupForm';
import backgroundImage from '../images/bluebackground.png';
import HomeNavbar from '../navibars/HomeNavbar'; 

function Signup() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div>
      <HomeNavbar />
    <div style={backgroundStyle} className="d-flex justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <SignupForm />
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  );
}

export default Signup;

