import checkJWTTokenExp from "../components/helpers/checkJWTTokenExp";
import React, {createContext, useEffect, useState} from 'react';
import Loading from "../pages/loading/Loading"
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const UserContext = createContext({})
export default function UserContextProvider({children}) {

  const [user, setUser] = useState({
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
      setUser({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }, [])

  function login(token) {
    //push JWT in storage
    localStorage.setItem('token', token)
    if (checkJWTTokenExp(token)) {
      //fetch user data if JWT valid
      void fetchUserData(token, '/')
    }
  }

  function logout() {
    //clear local storage
    localStorage.clear();
    //set user
    setUser({
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
      setUser({
        ...user,
        isAuth: true,
        user: {
          username: result.data.username,
          email: result.data.email,
          id: result.data.id,
          info: result.data.info,
        },
        status: 'done',
      });

      //from form login go to home page
      if (redirectUrl) {
        navigate(redirectUrl)
      }

    } catch (e) {
      console.error(e);

      //status done en continue
      setUser({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }

  //send the package
  const contextData = {
    isAuth: user.isAuth,
    user: user.user,
    login: login,
    logout: logout,
  };

  return (
    <UserContext.Provider value={contextData}>
      {user.status === 'done' ? children : <Loading/>}
    </UserContext.Provider>
  );
}
