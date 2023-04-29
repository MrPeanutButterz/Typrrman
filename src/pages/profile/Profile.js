import "./Profile.css"
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import capitalizeFirstLetter from "../../components/helpers/capitalizeFirstLetter";
import {NavLink} from "react-router-dom";
import axios from "axios";

export default function Profile() {

  const {user, logout} = useContext(UserContext);
  const [score, setScore] = useState(0)

  useEffect(() => {
    void getScore()
  }, [])


  async function getScore() {

    const JWT = localStorage.getItem('token')

    try {
      //get user data with JWT
      const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      });
      //push to state
      console.log(response.data)
      setScore(response.data.info)
    } catch (e) {
      console.error(e);
    }
  }

  return <>
    <section className="profile-wrapper">
      <div className="profile-container">
        <div className="profile">
          <h1>{capitalizeFirstLetter(user.username)}</h1>
          <h3>{user.email}</h3>
          <br/>
          <span><NavLink to="/changePassword"><p className="change-detail">change password</p></NavLink></span>
          <span><NavLink to="/changeEmail"><p className="change-detail">change email</p></NavLink></span>
          <button className="logout" onClick={logout}>logout</button>
        </div>
        <div id="separator"></div>
        <div className="info-container">
          <h1>Average wpm: {score}</h1>
        </div>
      </div>
    </section>
  </>
}