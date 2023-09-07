import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
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


  const loginUser = async (username, role) => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/user/login/',  //API?
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

      if (response.status === 201) {
        setUserTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('userTokens', JSON.stringify(data));
      } else if(response.status === 400){
        setError('Username - Log in failed');
      }else{
        setError('Log in failed');
      }
    } catch (error) {
      setError('Log in failed');
    }
  };

  const registerUser = async (firstname,lastname, username, role) => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/user/manage/',   //API?
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname,
            lastname,
            username,
            role, 
          }),
        }
      );

      if (response.status === 201) {
        console.log("register")
      } else if(response.status === 400){
        setError('Username already taken');
      }else{
        setError('Sign up failed')
      }
    } catch (error) {
      setError('Sign up failed');
    }
  };
  
  const logoutUser = async () => {
    try {
      setUserTokens(null);
      setUser(null);
      localStorage.removeItem("userTokens");
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
