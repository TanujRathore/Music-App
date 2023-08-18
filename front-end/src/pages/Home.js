import React from 'react';
import { Container, Row, Col, Card, Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

function Home() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Music Library</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#link">Gallery</Nav.Link>
          </Nav>
          <Button as={Link} to="/sign-up" variant="outline-primary" className="ml-auto">
            Sign Up
          </Button>
        </Container>
      </Navbar>
    
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Img className="mb-3"variant="top" src="https://www.nevadaadultdaycare.com/wp-content/uploads/2022/10/senior-woman-listening-to-music-at-home-2022-04-11-14-11-12-utc-scaled-2560x1280.jpg"/>
                <Card.Title className="text-center">Welcome to Music Library</Card.Title>
                <Card.Text className="text-center">
                  Explore and enjoy a wide variety of music in our library.
                </Card.Text>
                <div className="text-center">
                  <Button as={Link} to="/login" variant="outline-primary">
                    Log In
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
