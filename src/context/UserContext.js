import React, {createContext, useEffect, useState} from 'react';
import Loading from "../pages/loading/Loading"
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const UserContext = createContext({})
export default function UserContextProvider({children}) {

  const [isAuth, toggleIsAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending',
  });

  const navigate = useNavigate()

  useEffect(() => {

    //get JWT-token
    const token = localStorage.getItem('token')

    if (token) {
      //if JWT get user data
      void fetchUserData(token)

    } else {
      //status done en continue
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }, [])

  function login(token) {
    //push JWT in storage
    localStorage.setItem('token', token)
    //const decoded = jwt_decode(data.accessToken);

    //fetch user data
    void fetchUserData(token, '/')
  }

  function logout() {
    localStorage.clear();
    toggleIsAuth({
      isAuth: false,
      user: null,
      status: 'done',
    });

    navigate('/');
  }

  async function fetchUserData(JWT, redirectUrl) {
    try {
      //get user data with JWT
      const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      });

      //push user data in state
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

      //form login go to home page
      if (redirectUrl) {
        navigate(redirectUrl)
      }

    } catch (e) {
      console.error(e);

      //status done en continue
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
      {isAuth.status === 'done' ? children : <Loading />}
    </UserContext.Provider>
  );
}
