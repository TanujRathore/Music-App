import React, { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import UserContext from '../usercontext';

export default function SignupForm() {
  const { registerUser } = useContext(UserContext);
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    
    if (selectedRole === 'staff' || selectedRole === 'family_member') {
      await registerUser(username, selectedRole);
    } else {
      console.error('Invalid role selected');
    }
  };

  return (
    <Card className="p-4 custom-card">
      <Card.Header className="text-center custom-cardheader">Sign Up</Card.Header>
      <Card.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="custom-formlabel">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name without spaces"
              maxLength="30"
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
      </Card.Body>
    </Card>
  );
}
