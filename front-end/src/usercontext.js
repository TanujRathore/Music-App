import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let [userTokens, setUserTokens] = useState(() => 
    localStorage.getItem('userTokens') ? JSON.parse(localStorage.getItem('userTokens')) : null)
  let [user, setUser] = useState(() => 
    localStorage.getItem('userTokens') ? jwt_decode(localStorage.getItem('userTokens')) : null)
  let [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      }
    );
    const data = await response.json();

    if (response.status === 200) {
      setUserTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("userTokens", JSON.stringify(data));
      navigate("/home");
    } else {
      alert("200--Something is wrong");
    }
  };

  const registerUser = async (username, password, password2) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password2,
        }),
      }
    );

    if (response.status === 201) {
      navigate("/login");
    } else {
      alert(
        "201--Your username or your password is invalid."
      );
    }
  };

  const logoutUser = () => {
    setUserTokens(null);
    setUser(null);
    localStorage.removeItem("userTokens");
    navigate("/home");
  };

  const contextData = {
    user,
    setUser,
    userTokens,
    setUserTokens,
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