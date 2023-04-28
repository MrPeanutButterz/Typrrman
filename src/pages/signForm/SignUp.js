import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import "./Form.css"
import axios from 'axios';

export default function SignUp() {

  const [details, setDetails] = useState({email: "", username: "", password: "", rememberMe: false})
  const [error, toggleError] = useState({email: true, username: true, password: false})

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

    console.log(details)
    e.preventDefault()



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

        //navigate.push('/signin');
      } catch (e) {
        console.error(e);
      }
    } else {
      toggleError({...error, password: true})
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">

          <h1>Sign Up</h1><span>Please fill in this form to create an account.</span>
          <br/>

          <label htmlFor="email-field">
            <input
              type="email"
              id="email-field"
              name="email"
              autoComplete="email"
              value={details.email}
              placeholder="email"
              onChange={(e) => {
                setDetails({...details, email: e.target.value})
                toggleError({...error, email: false})
              }}
            />
            <div>{error.email && <p className="error">This account already exists.</p>}</div>
          </label>

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
            <div>{error.username && <p className="error">Username may only contain character en numbers.</p>}</div>
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