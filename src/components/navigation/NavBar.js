import "./NavBar.css"
import {useContext} from "react";
import {NavLink} from "react-router-dom";
import logo from "../../assets/keyboard.png"
import userIcon from "../../assets/user.png"
import loginIcon from "../../assets/039-login.png"
import {UserContext} from "../../context/UserContext";
import capitalizeFirstLetter from "../helperFunctions/capitalizeFirstLetter";

export default function NavBar() {

  const {isAuth, user} = useContext(UserContext);

  return <>
    <nav>
      <div className="nav-left">
        <NavLink to="/"><img src={logo} alt="Keyboard-icon" id="keyboard-logo"/></NavLink>
        <NavLink to="/"><h1 id="typrr">Typrr</h1></NavLink>
      </div>
      {isAuth ?
        <div className="nav-right">
          <p>Hi, {capitalizeFirstLetter(user.username)}</p>
          <NavLink to="/profile"><img src={userIcon} alt="User-icon" className="nav-icon"/></NavLink>
        </div> :
        <div className="nav-right">
          <h1 id="typrr">Login</h1>
          <NavLink to="/signin"><img src={loginIcon} alt="User-icon" className="nav-icon"/></NavLink>
        </div>}
    </nav>
  </>
}