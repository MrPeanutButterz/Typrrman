import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import checkEmail from "../../components/helpers/checkEmail";

export default function ChangePassword() {

  const navigate = useNavigate()
  const JWT = localStorage.getItem('token')

  const [details, setDetails] = useState({newEmail: ""})
  const [error, toggleError] = useState({
    emailInvalid: false,
    emailInUse: false,
  })

  async function handleSubmit(e) {
    e.preventDefault()

    if (!checkEmail(details.newEmail)) {
      toggleError({...error, emailInvalid: true})

    } else {
      try {
        await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', {
          "email": details.newEmail,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        });
        navigate("/profile")
      } catch (e) {
        console.error(e);

        if (e.response.status === 400) {

          if (e.response.data.message === "This email is already in use") {
            toggleError({...error, emailInUse: true})
            //novi backend does not check if email is in use
          }
        }
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">

          <h1>Changes</h1>
          <p>Please fill in this form to change your email.</p>

          <label htmlFor="email-field">
            <input
              type="email"
              id="new-email-field"
              name="new-email"
              className="input-field"
              autoComplete="email"
              value={details.newEmail}
              placeholder="new email"
              onChange={(e) => {
                setDetails({...details, newEmail: e.target.value})
                toggleError({...error, emailInvalid: false, emailInUse: false})
              }}
            />
            <div className="error-message-container">
              {error.emailInvalid && <p className="error-message">This email doesn't seem right.</p>}
              {error.emailInUse && <p className="error-message">This email is already in use.</p>}
            </div>
          </label>

          <button
            type="submit"
            className="form-button form-button-space"
          >Save
          </button>
        </div>
      </form>
    </>
  );
}
