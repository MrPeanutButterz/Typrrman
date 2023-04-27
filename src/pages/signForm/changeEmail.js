import axios from "axios";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

import protectionWhite from "../../assets/protection.png"
import {useNavigate} from "react-router-dom";
import userWhite from "../../assets/user.png";

export default function ChangePassword() {

  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const JWT = localStorage.getItem('token')

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  async function handleFormSubmit(e, data) {
    e.preventDefault()

    try {
      await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', {
        "email": data.newEmail,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      });
      navigate("/")
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
          <img src={userWhite} alt="icon" className="login-logos"/>
          <label htmlFor="newEmail"></label>
          <input
            type="email"
            name="newEmail"
            className={!errors.email ? "input-box" : "input-box-error"}
            placeholder={!errors.email ? "new email" : errors.email.message}
            autoComplete="email"
            {...register("newEmail", {
              required: {
                value: true,
                message: "email is required",
              }
            })}
          />
        </div>
        <button className="submit-button" type="submit">Change Email</button>
      </form>
    </>
  </>
}
