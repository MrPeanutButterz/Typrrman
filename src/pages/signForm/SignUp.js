import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import "./Form.css"
import axios from 'axios';

export default function SignUp() {

  const [details, setDetails] = useState({email: "", username: "", password: ""})
  const [error, toggleError] = useState({email: false, username: false, password: false})

  // we maken een canceltoken aan voor ons netwerk-request
  const source = axios.CancelToken.source();
  const navigate = useNavigate();

  // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, abort het request
  useEffect(() => {
    return function cleanup() {
      source.cancel();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()

    //todo validate email

    if (details.password.length >= 6) {
      try {
        await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
          "username": details.username,
          "email": details.email,
          "password": details.password,
          "info": "0",
          "role": ["user"],
        }, {
          cancelToken: source.token,
        });

        navigate.push('/signin');
      } catch (e) {
        console.error(e);
        toggleError({...error, email: true})
      }
    } else {
      toggleError({...error, password: true})
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">

          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>

          <label htmlFor="email-field">
            <input
              type="email"
              id="email-field"
              name="email"
              className="input-field"
              autoComplete="email"
              value={details.email}
              placeholder="email"
              onChange={(e) => {
                setDetails({...details, email: e.target.value})
                toggleError({...error, email: false})
              }}
            />
            <div>{error.email && <p className="error-message">This account already exists.</p>}</div>
          </label>

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
                toggleError({...error, username: false})
              }}

            />
            <div>{error.username && <p className="error-message">Username may only contain character en numbers.</p>}</div>
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
                toggleError({...error, password: false})
              }}
            />
            <div>{error.password && <p className="error-message">Create a password with at least 6 characters.</p>}</div>
          </label>

          <button
            type="submit"
            className="form-button form-button-space"
          >Register
          </button>

          <div className="link-container">
            <NavLink to="/signin"><p>Do you already have an account? You
              can <span>sign in</span> here.</p></NavLink>
          </div>

        </div>
      </form>
    </>
  );
}