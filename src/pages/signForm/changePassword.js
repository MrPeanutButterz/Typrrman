import axios from "axios";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

import protectionWhite from "../../assets/protection.png"
import {NavLink, useNavigate} from "react-router-dom";

export default function ChangePassword() {

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
          <img src={protectionWhite} alt="icon" className="login-logos"/>
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            className={!errors.password ? "input-box" : "input-box-error"}
            placeholder={!errors.password ? "old password" : errors.password.message}
            autoComplete="current-password"
            {...register("password", {
              required: {
                value: true,
                message: "old password is required"
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
            placeholder={!errors.password ? "new password" : errors.password.message}
            autoComplete="new-password"
            {...register("password", {
              required: {
                value: true,
                message: "new password is required"
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
            placeholder={!errors.password ? "repeat new password" : errors.password.message}
            autoComplete="current-password"
            {...register("password", {
              required: {
                value: true,
                message: "repeat new password is required"
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
