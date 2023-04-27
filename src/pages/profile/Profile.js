import "./Profile.css"
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import capitalizeFirstLetter from "../../components/helperFunctions/capitalizeFirstLetter";
import {NavLink} from "react-router-dom";

export default function Profile() {

  const {user, logout} = useContext(UserContext);

  return <>
    <section className="profile-container-out">
      <div className="profile-container-in">

        <div className="profile">
          <h1>{capitalizeFirstLetter(user.username)}</h1>
          <h3>{user.email}</h3>
          <NavLink to="/changePassword"><p id="change-pwd">change password</p></NavLink>
        </div>
        <div className="info">
          <h1>Average Wpm: {user.info}</h1>
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