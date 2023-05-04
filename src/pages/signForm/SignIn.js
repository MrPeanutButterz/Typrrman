import "./Form.css"
import axios from "axios";
import {useEffect} from "react";
import {useContext} from "react";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

export default function SignIn() {

  const {login} = useContext(UserContext);

  const [details, setDetails] = useState({username: "", password: ""})
  const [error, toggleError] = useState({usernameInvalid: false, passwordInvalid: false})

  const source = axios.CancelToken.source();

  useEffect(() => {
    return function cleanup() {
      source.cancel();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
        "username": details.username,
        "password": details.password,
      }, {
        cancelToken: source.token,
      });

      //set user context with JWT token
      login(response.data.accessToken);

    } catch (e) {
      console.error(e);
      toggleError({usernameInvalid: true, passwordInvalid: true})
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">

          <h1>Sign In</h1>
          <p>Please fill in this form to login your account.</p>

          <label htmlFor="username-field">
            <input
              type="text"
              id="username-field"
              name="username"
              className="input-field"
              autoComplete="username"
              value={details.username}
              placeholder="username"
              onChange={(e) => {
                setDetails({...details, username: e.target.value})
                toggleError({...error, usernameInvalid: false})
              }}

            />
            <div className="error-message-container">
              {error.usernameInvalid && <p className="error-message">Invalid username.</p>}</div>
          </label>

          <label htmlFor="password-field">
            <input
              type="password"
              id="password-field"
              name="password"
              className="input-field"
              autoComplete="current-password"
              value={details.password}
              placeholder="password"
              onChange={(e) => {
                setDetails({...details, password: e.target.value})
                toggleError({...error, passwordInvalid: false})
              }}
            />
            <div className="error-message-container">
              {error.passwordInvalid && <p className="error-message">Invalid password.</p>}</div>
          </label>

          <button
            type="submit"
            className="form-button"
          >Login
          </button>

          <div className="link-container">
            <NavLink to="/signup"><p>Don't have an account? <span>Sign up</span> here.</p></NavLink>
          </div>

        </div>
      </form>
    </>
  );
}
