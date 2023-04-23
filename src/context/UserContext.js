import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const UserContext = createContext({});
export default function UserContextProvider({ children }) {

  const [isAuth, toggleIsAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending',
  });

  const history = useNavigate();

  // MOUNTING EFFECT
  useEffect(() => {
    // haal de JWT op uit Local Storage
    const token = localStorage.getItem('token');

    // als er WEL een token is, haal dan opnieuw de gebruikersdata op
    if (token) {
      const decoded = jwt_decode(token);
      void fetchUserData(decoded.sub, token);
    } else {
      // als er GEEN token is doen we niks, en zetten we de status op 'done'
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }, []);

  function login(data) {
    // zet de token in de Local Storage
    localStorage.setItem('token', data.accessToken);
    // decode de token zodat we de ID van de gebruiker hebben en data kunnen ophalen voor de context
    const decoded = jwt_decode(data.accessToken);

    // geef de ID, token en redirect-link mee aan de fetchUserData functie (staat hieronder)
    void fetchUserData(data, decoded,'/');
    // link de gebruiker door naar de profielpagina
    // history.push('/profile');
  }

  function logout() {
    localStorage.clear();
    toggleIsAuth({
      isAuth: false,
      user: null,
      status: 'done',
    });

    console.log('Gebruiker is uitgelogd!');
    history.push('/');
  }

  // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
  async function fetchUserData(data, JWT, redirectUrl) {
    try {
      // haal gebruikersdata op met de token en id van de gebruiker
      const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      });
      console.log(result)
      // zet de gegevens in de state
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

      // als er een redirectURL is meegegeven (bij het mount-effect doen we dit niet) linken we hier naar toe door
      // als we de history.push in de login-functie zouden zetten, linken we al door voor de gebruiker is opgehaald!
      if (redirectUrl) {history.push(redirectUrl);}

    } catch (e) {
      console.error(e);
      // ging er iets mis? Plaatsen we geen data in de state
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
    <UserContext.Provider value={contextData}>
      {isAuth.status === 'done' ? children : <p>Loading...</p>}
    </UserContext.Provider>
  );


/*
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

    history.push('/sign in');
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
  );*/
}
