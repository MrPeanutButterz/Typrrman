import "./Profile.css"
import axios from "axios";
import {NavLink} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import unpackScore from "../../components/helpers/unpackScore";
import capitalizeFirstLetter from "../../components/helpers/capitalizeFirstLetter";
import addPhoto from "../../assets/add-photo.png"

export default function Profile() {

  //todo add profile picture

  const {user, logout} = useContext(UserContext);
  const [score, setScore] = useState({})
  const [profilePic, setProfilePic] = useState("")

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

  function addProfilePic() {
    const inputImage = document.getElementById('upload-img');
    const JWT = localStorage.getItem('token')
    let base64String = ""

    inputImage.addEventListener('change', () => {
      const file = inputImage.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', async () => {
        base64String = reader.result
        setProfilePic(base64String)

        try {
          //get user data with JWT
          console.log(base64String)
          const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/user/image`, {
            "base64Image": reader.result,
          }, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JWT}`,
            },
          });

          console.log(response)

          if (response.status === 200) {
            window.location.reload()
          }

        } catch (e) {
          console.error(e);
        }
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  return <>
    <section className="profile-wrapper">

      {!user.profilePicture ?
        <input type="file" id="upload-img" accept="image/png, image/jpg, image/jpeg" onClick={addProfilePic}/> :
        <img id="profile-pic" src={user.profilePicture} alt="profile picture"/>
      }

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
          {score.WPM === 0 ? <NavLink to="/"><p className="motivation-link">Take your first test here</p></NavLink> :
            <NavLink to="/"><p className="motivation-link">Think you can do better?</p></NavLink>}
        </div>
      </div>
    </section>
  </>
}