import "./Profile.css"
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import capitalizeFirstLetter from "../../components/helpers/capitalizeFirstLetter";
import {NavLink} from "react-router-dom";
import axios from "axios";
import unpackScore from "../../components/helpers/unpackScore";

export default function Profile() {

  const {user, logout} = useContext(UserContext);
  const [score, setScore] = useState({})

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
      if (response.data.info !== undefined) {
        setScore(unpackScore(response.data.info))

      } else {
        setScore({WPM: 0, ACC: 0})
      }
    } catch (e) {
      console.error(e);
    }
  }

  return <>
    <section className="profile-wrapper">
      <div className="profile-container">
        <div className="profile">
          <h1>{capitalizeFirstLetter(user.username)}</h1>
          <h2>{user.email}</h2>
          <br/>
          <NavLink to="/changePassword"><p className="change-profile">change password</p></NavLink>
          <NavLink to="/changeEmail"><p className="change-profile">change email</p></NavLink>
          <button className="button-logout" onClick={logout}>logout</button>
        </div>
        <div id="separator"></div>
        <div className="score">
          <h1>Avr wpm: {score.WPM}</h1>
          <h2>Avr accuracy: {score.ACC}%</h2>
          <br/>
          {score.WPM === 0 ? <NavLink to="/"><p className="motivation-link">Take your first test here</p></NavLink> : <NavLink to="/"><p className="motivation-link">Think you can do better?</p></NavLink>}
        </div>
      </div>
    </section>
  </>
}