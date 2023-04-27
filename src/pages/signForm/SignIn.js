import "./SignForm.css"
import {useForm} from "react-hook-form";

import userWhite from "../../assets/user.png"
import protectionWhite from "../../assets/protection.png"
import axios from "axios";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import {NavLink} from "react-router-dom";

export default function SignIn() {

  const {login} = useContext(UserContext);
  const {register, handleSubmit, formState: {errors},} = useForm();

  async function handleFormSubmit(e, data) {
    e.preventDefault();

    //post login
    try {
      const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
        "username": data.username,
        "password": data.password,
      });

      //set user context with JWT token
      login(response.data.accessToken);

    } catch (e) {
      console.error(e);
    }
  }

  return <>
    <form onSubmit={handleSubmit((data, e) => handleFormSubmit(e, data))}>

      <div className="login-input-container">
        <img src={userWhite} alt="icon" className="login-logos"/>
        <label htmlFor="username"></label>
        <input
          type="username"
          name="username"
          className={!errors.username ? "input-box" : "input-box-error"}
          placeholder={!errors.username ? "username" : errors.username.message}
          autoComplete="username"
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            }
          })}
        />
      </div>

      <div className="login-input-container">
        <img src={protectionWhite} alt="icon" className="login-logos"/>
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          className={!errors.password ? "input-box" : "input-box-error"}
          placeholder={!errors.password ? "password" : errors.password.message}
          autoComplete="current-password"
          {...register("password", {
            required: {
              value: true,
              message: "password is required"
            }
          })}
        />
      </div>

      <button className="submit-button" type="submit">Login</button>
      <NavLink to="/signup"><p className="register-login">Register here</p></NavLink>
    </form>
  </>
}
