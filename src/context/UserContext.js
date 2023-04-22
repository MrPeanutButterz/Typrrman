import React, { createContext, useState } from 'react';
import {useNavigate} from "react-router-dom";
export const UserContext = createContext({});


export default function UserContextProvider({ children }) {

  const history = useNavigate();

  const [isAuth, setAuth] = useState({
    isAuth: false,
    username: null,
    email: null,
    id: null,
  })

  function register(email, username, accessToken) {
    console.log('Gebruiker is geregistreerd!');

    setAuth({
      ...isAuth,
      isAuth: true,
      username: username,
      email: email,
    })

    history.push('/signin');
  }

  function login(email, username, id, accessToken) {
    console.log('Gebruiker is ingelogd!');

    localStorage.setItem("accessToken", accessToken)

    setAuth({
      ...isAuth,
      isAuth: true,
      username: username,
      email: email,
      id: id,
    })

    history.push('/profile');
  }

  function logout() {
    console.log('Gebruiker is uitgelogd!');

    localStorage.clear()

    setAuth({
      ...isAuth,
      isAuth: false,
      username: null,
      email: null,
      id: null,
    })

    history.push('/');
  }

  const contextData = {
    ...isAuth,
    register,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
}
