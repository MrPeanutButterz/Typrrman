import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

export default function ChangePassword() {

  const navigate = useNavigate()
  const JWT = localStorage.getItem('token')
  const {user} = useContext(UserContext);

  const [details, setDetails] = useState({newPwd: "", repeatPwd: ""})
  const [error, toggleError] = useState({
    toShort: false,
    dontMatch: false,
  })

  async function handleSubmit(e) {
    e.preventDefault()

    if (details.newPwd.length < 6) {
      toggleError({...error, toShort: true})

    } else if (details.newPwd !== details.repeatPwd) {
      toggleError({...error, dontMatch: true})

    } else {
      try {
        await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', {
          "password": details.newPwd,
          "repeatedPassword": details.repeatPwd,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        });
        navigate("/profile")
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">

          <h1>Changes</h1>
          <p>Please fill in this form to change you password.</p>

          <input //Password forms should have (optionally hidden) username fields for accessibility in console even with hidden username field.
            type="text"
            name="email"
            value={user.email}
            autoComplete="email"
            hidden={true}
            readOnly={true}
          />

          <label htmlFor="username-field">
            <input
              type="password"
              id="new-password-field"
              name="new-password"
              className="input-field"
              autoComplete="new-password"
              value={details.newPwd}
              placeholder="new password"
              onChange={(e) => {
                setDetails({...details, newPwd: e.target.value})
                toggleError({...error, toShort: false})
              }}
            />
            <div className="error-message-container">
              {error.toShort && <p className="error-message">Create a password with at least 6 characters.</p>}
            </div>
          </label>

          <label htmlFor="password-field">
            <input
              type="password"
              id="repeat-password-field"
              name="password"
              className="input-field"
              autoComplete="current-password"
              value={details.repeatPwd}
              placeholder="repeat password"
              onChange={(e) => {
                setDetails({...details, repeatPwd: e.target.value})
                toggleError({...error, dontMatch: false})
              }}
            />
            <div className="error-message-container">
              {error.dontMatch && <p className="error-message">Passwords don't match.</p>}
            </div>
          </label>

          <button
            type="submit"
            className="form-button"
          >Save
          </button>
        </div>
      </form>
    </>
  )
}
