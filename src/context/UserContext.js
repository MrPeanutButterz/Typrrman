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
    //const decoded = jwt_decode(data.accessToken);

    //fetch user data
    void fetchUserData(token, '/')
  }

  function logout() {
    localStorage.clear();
    setUser({
      isAuth: false,
      user: null,
      status: 'done',
    });

    navigate('/');
  }

  async function uploadScore(score) {

    //get JWT-token
    const JWT = localStorage.getItem('token')
    let result = 0

    try {
      //get user data with JWT
      result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      });
    } catch (e) {
      console.error(e);
    }

    let avrScore;

    if (result.data.info === undefined) {
      avrScore = 0
    } else {
      avrScore = parseInt(result.data.info)
    }


    const newScore = Math.round(avrScore + score / 2)

    if (JWT) {
      try {
        await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', {
          "info": newScore,
        },{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        });

      } catch (e) {
        console.error(e);
      }
    }

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

      console.log(result)

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

      //form login go to home page
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

  const contextData = {
    isAuth: user.isAuth,
    user: user.user,
    login: login,
    logout: logout,
    uploadScore: uploadScore,
  };

  return (
    <UserContext.Provider value={contextData}>
      {user.status === 'done' ? children : <Loading/>}
    </UserContext.Provider>
  );
}
