import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const UserContext = createContext();

const STATUS_BAD_REQUEST = 400; //for signup is username already taken, for login is invalid username(not found)
const STATUS_CREATED = 200; //success status
const STATUS_FORBIDDEN = 403; //username and role don't match

// get the saved token from localStorage
const getSavedTokens = () => {
  const savedTokens = localStorage.getItem('userTokens');
  return savedTokens ? JSON.parse(savedTokens) : null;
};

export const UserProvider = ({ children }) => {
  const initialTokens = getSavedTokens();

  let [userTokens, setUserTokens] = useState(initialTokens);
  let [user, setUser] = useState(initialTokens ? jwt_decode(initialTokens.access) : null);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const loginUser = async (username, role) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, role }),
      });

      const data = await response.json();
      console.log(data)
      switch (response.status) {
        case STATUS_CREATED:
          // setUserTokens(data);
          // setUser(jwt_decode(data.access));
          // localStorage.setItem('userTokens', JSON.stringify(data));
          return true;

        case STATUS_BAD_REQUEST:
          handleError('Invalid Username, please check your username!');
          break;

        case STATUS_FORBIDDEN:
          handleError('Username and role do not match, please check youe log in with the right block!');
          break;

        default:
          handleError('Log in failed, please try again later.');
          break;
      }
    } catch (error) {
      handleError('Log in failed due to network or server issues, please try again later.');
    }
    return false;
  };

  const registerUser = async (firstname, lastname, username, role) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/manage/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, username, role }),
      });

      switch (response.status) {
        case STATUS_CREATED:
          console.log("Registered successfully");
          return true;

        case STATUS_BAD_REQUEST:
          handleError('Username already taken');
          break;

        default:
          handleError('Sign up failed, please try again later.');
          break;
      }
    } catch (error) {
      handleError('Sign up failed due to network or server issues, please try again later.');
    }
    return false;
  };

  const logoutUser = () => {
    setUserTokens(null);
    setUser(null);
    localStorage.removeItem("userTokens");
  };

  const contextData = { user, setUser, userTokens, setUserTokens, error, registerUser, loginUser, logoutUser,setError };

  useEffect(() => {
    setLoading(false);
  }, [userTokens]);

  return (
    <UserContext.Provider value={contextData}>
      {loading ? null : children}
    </UserContext.Provider>
  );
};

export default UserContext;
