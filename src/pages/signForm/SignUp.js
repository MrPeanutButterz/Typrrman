import axios from "axios";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

import idea from "../../assets/idea.png";
import userWhite from "../../assets/user.png"
import protectionWhite from "../../assets/protection.png"
import {NavLink, useNavigate} from "react-router-dom";

export default function Register() {

  const navigate = useNavigate()

  const [message, setMessage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  async function handleFormSubmit(e, data) {
    e.preventDefault()

    try {

      await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
        "username": data.username,
        "email": data.email,
        "password": data.password,
        "info": "0",
        "role": ["user"],
      });

      // Let op: omdat we geen axios Cancel token gebruiken zul je hier een memory-leak melding krijgen.
      // Om te zien hoe je een cancel token implementeerd kun je de bonus-branch bekijken!

      // als alles goed gegaan is, linken we door naar de login-pagina
      //history.push('/signForm');
      navigate("/signin")

    } catch (e) {
      console.error(e);
      setMessage(e.response.data.message)
    }

  }

  return <>
    <>
      <form onSubmit={handleSubmit((data, e) => handleFormSubmit(e, data))}>
        <h3 className="error-message">{message}</h3>
        <div className="login-input-container">
          <img src={idea} alt="icon" className="login-logos"/>
          <label htmlFor="username"></label>
          <input
            type="text"
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
          <img src={userWhite} alt="icon" className="login-logos"/>
          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            className={!errors.email ? "input-box" : "input-box-error"}
            placeholder={!errors.email ? "email" : errors.email.message}
            autoComplete="email"
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
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

        <button className="submit-button" type="submit">Register</button>
        <NavLink to="/signin"><p className="register-login">Login here</p></NavLink>
      </form>
    </>
  </>
}
