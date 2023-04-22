import "./NavBar.css"
import {NavLink} from "react-router-dom";

import logo from "../../assets/keyboard.png"
import userIcon from "../../assets/user.png"

export default function NavBar() {
  return <>
    <nav>
      <div className="nav-left">
        <NavLink to="/"><img src={logo} alt="Keyboard-icon" id="keyboard-logo"/></NavLink>
        <NavLink to="/"><h1 id="typrr">Typrr</h1></NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/signin"><img src={userIcon} alt="User-icon" id="user-icon"/></NavLink>
      </div>
    </nav>
  </>
}