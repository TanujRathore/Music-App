import React from 'react';
import LoginForm from '../components/LoginForm';
import backgroundImage from '../images/bluebackground.png';
import HomeNavbar from '../navibars/HomeNavbar'; 

export default function Login() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div>
      <HomeNavbar />
      <div style={backgroundStyle} className="d-flex justify-content-center align-items-center">
        <LoginForm />
      </div>
    </div>
  );
}




