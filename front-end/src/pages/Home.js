import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

function Home() {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Welcome to Music Library</Card.Title>
              <Card.Text className="text-center">
                Explore and enjoy a wide variety of music in our library.
              </Card.Text>
              <div className="text-center">
                <Button as={Link} to="/login" variant="primary">
                  登录
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
