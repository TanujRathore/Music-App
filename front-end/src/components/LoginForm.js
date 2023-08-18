import React, { useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import UserContext from '../usercontext';
import './customCss.css';

export default function LoginForm() {
  const { loginUser } = useContext(UserContext);

  return (
    <Card className="p-4 custom-card">
      <Card.Header className="text-center custom-cardheader ">User Log In</Card.Header>
      <Card.Body>
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className='custom-formlabel'>Name：</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name here"
              maxLength="30"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className='custom-formlabel'>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password here"
              maxLength="30"
            />
            <div className="mt-2">
              <a href="re-identification" className='underline-on-hover'>I forgot my password</a>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Log in
          </Button>
          <div className="text-center mt-3">
            Not a member yet?
            <a href="sign-up" className='underline-on-hover'> Sign up now</a>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
