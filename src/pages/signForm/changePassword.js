import axios from "axios";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

import protectionWhite from "../../assets/protection.png"
import {useNavigate} from "react-router-dom";

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

    if (data.newPwd === data.repeatPwd) {
      try {
        await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', {
          "password": data.newPwd,
          "repeatedPassword": data.repeatPwd,
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
    } else {
      setMessage("New password is not the same")
    }

  }

  return <>
    <>
      <form onSubmit={handleSubmit((data, e) => handleFormSubmit(e, data))}>
        <h3 className="error-message">{message}</h3>

        <div className="login-input-container">
          <img src={protectionWhite} alt="icon" className="login-logos"/>
          <label htmlFor="newPwd"></label>
          <input
            type="password"
            name="newPwd"
            className={!errors.password ? "input-box" : "input-box-error"}
            placeholder={!errors.password ? "new password" : errors.password.message}
            autoComplete="newPwd"
            {...register("newPwd", {
              required: {
                value: true,
                message: "new password is required"
              }
            })}
          />
        </div>

        <div className="login-input-container">
          <img src={protectionWhite} alt="icon" className="login-logos"/>
          <label htmlFor="repeatPwd"></label>
          <input
            type="password"
            name="repeatPwd"
            className={!errors.password ? "input-box" : "input-box-error"}
            placeholder={!errors.password ? "repeat new password" : errors.password.message}
            autoComplete="repeatPwd"
            {...register("repeatPwd", {
              required: {
                value: true,
                message: "repeat new password is required"
              }
            })}
          />
        </div>

        <button className="submit-button" type="submit">Change password</button>
      </form>
    </>
  </>
}
