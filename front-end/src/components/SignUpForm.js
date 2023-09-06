import React, { useContext, useState } from 'react';
import { Card, Form, Button, Toast, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../usercontext';
import './customCss.css';

export default function SignupForm() {
  const { registerUser } = useContext(UserContext);
  const [selectedRole, setSelectedRole] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [username, setUsername] = useState('');
  
  // basic update of state variables based on user's selection
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    // prevent form from being submitted if it fails validation
    // instead, validate before it's submitted
    e.preventDefault();

    if (selectedRole === 'staff' || selectedRole === 'family_member') {
      try {
          await registerUser(firstName, lastName, username, selectedRole);
          // show success toast upon successful registration for a set amount of time
          setShowSuccessToast(true);
          setTimeout(() => {
            setShowSuccessToast(false);
          }, 5000); 
      } catch (error) {
        console.error('Error registering user:', error);
        if (error.message === 'Username already taken') {
          setErrorMessage('Username is already taken. Please choose another.');
          setShowErrorModal(true)
        } else if (error.message === 'Sign up failed') {
          setErrorMessage('Sign up failed. Please try again later.');
          setShowErrorModal(true)
        } else {
          setErrorMessage('An error occurred. Please try again.');
          setShowErrorModal(true)
        }
      }
    } else {
      setErrorMessage('Invalid role selected.');
      setShowErrorModal(true)
    }
  };


  return (
    <Card className="p-4 custom-card">
    <Card.Header className="text-center custom-cardheader">Sign Up</Card.Header>
      <Card.Body>
        <Form onSubmit={handleFormSubmit}>
          <div className="d-flex mb-3">
            <Form.Group controlId="firstName" className="flex-fill me-2">
              <Form.Label className="custom-formlabel">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                maxLength="50"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="flex-fill ms-2">
              <Form.Label className="custom-formlabel">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                maxLength="50"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="custom-formlabel">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              maxLength="30"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label className="custom-formlabel">Role</Form.Label>
            <Form.Select value={selectedRole} onChange={handleRoleChange}>
              <option value="" disabled>Select your role</option>
              <option value="staff">Staff</option>
              <option value="family_member">Family Member</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 custom-button">
            Sign Up Now
          </Button>
        </Form>
        <Toast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          delay={10000}
          autohide
          className="custom-toast">
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            Signup successfully! You can now <Link to="/login">Log In</Link>.
          </Toast.Body>
        </Toast>
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
             <div className="error-modal-message">{errorMessage}</div></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}
