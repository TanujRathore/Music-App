import React, { useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import UserContext from '../usercontext';
import './customCss.css';

export default function LoginForm() {
  const { loginUser } = useContext(UserContext);

  return (
    <Card className="p-4 custom-card">
      <Card.Header className="text-center custom-cardheader ">用户登录</Card.Header>
      <Card.Body>
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className='custom-formlabel'>居民姓名 Name：</Form.Label>
            <Form.Control
              type="text"
              placeholder="请输入居民的姓名"
              maxLength="30"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className='custom-formlabel'>密码 Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="请输入您的密码"
              maxLength="30"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            登录
          </Button>
          <div className="text-center mt-3">
            还没有账户？
            <a href="sign-up"> 立即注册</a>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
