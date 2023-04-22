import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [isAuth, toggleIsAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending',
  });
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwt_decode(token);
      void fetchUserData(decoded.sub, token);

    } else {
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }, []);

  function login(JWT) {
     localStorage.setItem('token', JWT);
    const decoded = jwt_decode(JWT);
    void fetchUserData(decoded.sub, JWT, '/profile');
  }

  function logout() {
    localStorage.clear();
    toggleIsAuth({
      isAuth: false,
      user: null,
      status: 'done',
    });

    console.log('User has logged out');
    history.push('/');
  }

  async function fetchUserData(id, token, redirectUrl) {
    try {
      const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toggleIsAuth({
        ...isAuth,
        isAuth: true,
        user: {
          username: result.data.username,
          email: result.data.email,
          id: result.data.id,
        },
        status: 'done',
      });

      if (redirectUrl) {
        history.push(redirectUrl);
      }

    } catch (e) {
      console.error(e);
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }

  const contextData = {
    isAuth: isAuth.isAuth,
    user: isAuth.user,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {isAuth.status === 'done' ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}
