import React from 'react';
import LoginForm from '../components/LoginForm';
import backgroundImage from '../images/Martin-Luther-view-village_small-scaled.jpg'; 

export default function Login() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle} className="d-flex justify-content-center align-items-center">
      <LoginForm />
    </div>
  );
}



