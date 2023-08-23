import React, { useContext } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import UserContext from '../usercontext';
import logoImage from '../images/MLH-Logo.jpg';
import './customCss.css';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const { loginUser } = useContext(UserContext);

  const handleFormSubmit = (e, role) => {
    e.preventDefault(); //阻止表单默认的提交行为
    loginUser(e, role); //调用 loginUser 函数，将表单事件对象 e 和 role 作为参数传递给它
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="logo-container text-center mb-4">
        <img src={logoImage} alt="Logo" className="custom-logo" />
      </div>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6}>
          <Card className="p-4 custom-card">
            <Card.Header className="text-center custom-cardheader">Login - Staff</Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => handleFormSubmit(e, 'staff')}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="text-center custom-formlabel">Staff Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username here"
                    maxLength="30"
                    className="custom-form-control"
                  />
                </Form.Group>
                <Button as={Link} to="/staffmain" variant="primary" type="submit" className="w-100 custom-button">
                  Log in as Staff
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="p-4 custom-card">
            <Card.Header className="text-center custom-cardheader">Login - Family Member</Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => handleFormSubmit(e, 'family_member')}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="text-center custom-formlabel">Resident Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter resident's username"
                    maxLength="30"
                    className="custom-form-control"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 custom-button">
                  Log in as Family Member
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center mt-3">
        Haven't had an account?
        <a href="/signup"> Sign up Now</a>
      </div>
    </div>
  );
}
