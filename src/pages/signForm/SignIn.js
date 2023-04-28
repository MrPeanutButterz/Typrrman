import "./Form.css"
import axios from "axios";
import {useEffect} from "react";
import {useContext} from "react";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

export default function SignIn() {

  const {login} = useContext(UserContext);

  const [details, setDetails] = useState({username: "", password: "", rememberMe: false})
  const [error, toggleError] = useState({username: false, password: false})

  // we maken een canceltoken aan voor ons netwerk-request
  const source = axios.CancelToken.source();

  // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, abort het request
  useEffect(() => {
    return function cleanup() {
      source.cancel();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()

    if (details.password.length >= 6) {
      try {
        const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
          "username": details.username,
          "password": details.password,
        }, {
          cancelToken: source.token,
        });

        //set user context with JWT token
        login(response.data.accessToken, details.rememberMe);

      } catch (e) {
        console.error(e);
        toggleError({...error, username: true})
      }
    } else {
      toggleError({...error, password: true})
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">

          <h1>Sign In</h1><span>Please fill in this form to login your account.</span>
          <br/>

          <label htmlFor="username-field">
            <input
              type="text"
              id="username-field"
              name="username"
              autoComplete="username"
              value={details.username}
              placeholder="username"
              onChange={(e) => {
                setDetails({...details, username: e.target.value})
                toggleError({...error, username: false})
              }}

            />
            <div>{error.username && <p className="error">This is unknown account.</p>}</div>
          </label>

          <label htmlFor="password-field">
            <input
              type="password"
              id="password-field"
              name="password"
              autoComplete="current-password"
              value={details.password}
              placeholder="password"
              onChange={(e) => {
                setDetails({...details, password: e.target.value})
                toggleError({...error, password: false})
              }}
            />
            <div>{error.password && <p className="error">Passwords must contain 6 characters.</p>}</div>
          </label>

          <label>
            <input
              type="checkbox"
              name="remember"
              className="remember"
              onChange={() => setDetails({...details, rememberMe: !details.rememberMe})}
            /> Remember me
          </label>

          <button
            type="submit"
            className="form-button"
          >Login
          </button>

          <div className="link-container">
            <NavLink to="/signup"><p>Do you don't have an account? You
              can <span>sign up</span> here.</p></NavLink>
          </div>

        </div>
      </form>
    </>
  );
}
