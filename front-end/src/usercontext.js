import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let [userTokens, setUserTokens] = useState(
    () =>
      localStorage.getItem('userTokens')
        ? JSON.parse(localStorage.getItem('userTokens'))
        : null
  );
  let [user, setUser] = useState(
    () =>
      localStorage.getItem('userTokens')
        ? jwt_decode(localStorage.getItem('userTokens'))
        : null
  );
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  const navigate = useNavigate();

  const loginUser = async (username, role) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + 'api/token/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            role, 
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setUserTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('userTokens', JSON.stringify(data));
        navigate('/home');
      } else {
        setError('Log in failed，Please check your Name.');
      }
    } catch (error) {
      setError('Log in failed，Please try again later.');
    }
  };

  const registerUser = async (username, role) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + 'api/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            role, 
          }),
        }
      );

      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Sign up failed，Please check your Name.');
      }
    } catch (error) {
      setError('Sign up failed，Please try again later.');
    }
  };
  const logoutUser = async () => {
    try {
      setUserTokens(null);
      setUser(null);
      localStorage.removeItem("userTokens");
      navigate("/home");
    } catch (error) {
      setError("Log out failed, Please try again later");
    }
  };

  const contextData = {
    user,
    setUser,
    userTokens,
    setUserTokens,
    error,
    registerUser,
    loginUser,
    logoutUser
  };

  useEffect(() => {
    if (userTokens) {
      setUser(jwt_decode(userTokens.access));
    }
    setLoading(false);
  }, [userTokens, loading]);

  return (
    <UserContext.Provider value={contextData}>
      {loading ? null : children}
    </UserContext.Provider>
  );
};

export default UserContext;
