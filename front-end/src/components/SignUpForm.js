import React, { useContext, useState } from 'react';
import { Card, Form, Button, Toast, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../usercontext';
import './customCss.css';

export default function SignupForm() {
  // Extract the registration function from context
  const { registerUser, error } = useContext(UserContext);

  // Define states for the component
  const [selectedRole, setSelectedRole] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [username, setUsername] = useState('');
  const [roleNotSelected, setRoleNotSelected] = useState(false);
  const [isInvalidRole, setIsInvalidRole] = useState(false);

  // Handlers to update state variables based on user input
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

  // Handles form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setRoleNotSelected(true);
      setShowErrorModal(true);
      return;
    }

    if (selectedRole === 'staff' || selectedRole === 'family_member') {
      const registrationSuccess = await registerUser(firstName, lastName, username, selectedRole);

      if (registrationSuccess) {
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 5000);
      } else {
        setShowErrorModal(true);
      }
    } else {
      setIsInvalidRole(true);
      setShowErrorModal(true);
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
            <div className="error-modal-message">
              {roleNotSelected ? "Please select the right role in the following Role selection bar." :
                isInvalidRole ? "Invalid role selected, please try again." : error}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowErrorModal(false);
              setIsInvalidRole(false);  
              setRoleNotSelected(false);  
            }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}
