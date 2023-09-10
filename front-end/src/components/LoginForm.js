import React, { useContext, useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import UserContext from '../usercontext';
import logoImage from '../images/MLH-Logo.jpg';
import './customCss.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const { loginUser, error } = useContext(UserContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [staffUsername, setStaffUsername] = useState('');
  const [familyMemberUsername, setFamilyMemberUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  const handleStaffUsernameChange = (event) => {
    setStaffUsername(event.target.value);
  };

  const handleFamilyMemberUsernameChange = (event) => {
    setFamilyMemberUsername(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const role = e.target.getAttribute('data-role');
    const username = role === 'staff' ? staffUsername : familyMemberUsername;

    await loginUser(username, role);

    if (role === 'family_member' && !error) {
      navigate(`/musiclisthome/${username}`);
    }
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
              <Form onSubmit={handleFormSubmit} data-role="staff">
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="text-center custom-formlabel">Staff Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username here"
                    maxLength="30"
                    className="custom-form-control"
                    value={staffUsername}
                    onChange={handleStaffUsernameChange}
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
              <Form onSubmit={handleFormSubmit} data-role="family_member">
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="text-center custom-formlabel">Resident Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter resident's username"
                    maxLength="30"
                    className="custom-form-control"
                    value={familyMemberUsername}
                    onChange={handleFamilyMemberUsernameChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 custom-button">
                  Log in as Family Member
                </Button>
              </Form>
              <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="error-modal-message">{error}</div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
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
