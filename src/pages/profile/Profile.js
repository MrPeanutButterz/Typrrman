import "./Profile.css"
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import capitalizeFirstLetter from "../../components/helperFunctions/capitalizeFirstLetter";
import {NavLink} from "react-router-dom";
import axios from "axios";

export default function Profile() {

  const {user, logout} = useContext(UserContext);
  const [score, setScore] = useState(0)

  void getScore()
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
      setScore(response.data.info)
    } catch (e) {
      console.error(e);
    }
  }

  return <>
    <section className="profile-container-out">
      <div className="profile-container-in">
        <div className="profile">
          <h1>{capitalizeFirstLetter(user.username)}</h1>
          <h3>{user.email}</h3>
          <span><NavLink to="/changePassword"><p id="change">change password</p></NavLink></span>
          <span><NavLink to="/changeEmail"><p id="change">change email</p></NavLink></span>
        </div>
        <div className="info">
          <h1>Average Wpm: {score}</h1>
        </div>
      </div>
      <div className="button-container-in">
        <button
          className="button-logout"
          onClick={logout}
        >logout
        </button>
      </div>
    </section>
  </>
}