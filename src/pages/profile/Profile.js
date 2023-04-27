import "./Profile.css"
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import capitalizeFirstLetter from "../../components/helperFunctions/capitalizeFirstLetter";

export default function Profile() {

  const {user, logout} = useContext(UserContext);
  console.log(user)

  return <>
    <section className="profile-container-out">
      <div className="profile-container-in">

        <div className="profile">
          <h1>{capitalizeFirstLetter(user.username)}</h1>
          <h3>{user.email}</h3>
        </div>
        <div className="info">
          <h1>Average Wpm: {user.info}</h1>
        </div>
      </div>
      <div className="button-container-in">
        <button
          className="button-logout"
          onClick={logout}
        >Change Password
        </button>
        <button
          className="button-logout"
          onClick={logout}
        >logout
        </button>
      </div>
    </section>
  </>
}