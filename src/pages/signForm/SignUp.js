import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {

  const [details, setDetails] = useState({email: "", username: "", password: ""})
  const [error, toggleError] = useState({email: false, username: false, password: false})

  //const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);

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

    e.preventDefault();
    toggleError(false);
    toggleLoading(true);

    try {
      /*await axios.post('http://localhost:3000/register', {
        email: email,
        password: password,
        username: username,
      }, {
        cancelToken: source.token,
      });*/

      // als alles goed gegaan is, linken we door naar de login-pagina
      //navigate.push('/signin');
    } catch (e) {
      console.error(e);
      toggleError(true);
    }

    toggleLoading(false);
  }

  return (
    <>


      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Register</h1>

        <label htmlFor="email-field">
          <input
            type="email"
            id="email-field"
            name="email"
            autoComplete="email"
            value={details.email}
            placeholder="email"
            onChange={(e) =>
              setDetails({...details, email: e.target.value})}
          />
          {error.email && <p className="error">This account already exists.</p>}
        </label>

        <label htmlFor="username-field">
          <input
            type="text"
            id="username-field"
            name="username"
            autoComplete="username"
            value={details.username}
            placeholder="username"
            onChange={(e) =>
              setDetails({...details, username: e.target.value})}
          />
          {error.username && <p className="error">This username already exists.</p>}
        </label>

        <label htmlFor="password-field">
          <input
            type="password"
            id="password-field"
            name="password"
            autoComplete="current-password"
            value={details.password}
            placeholder="password"
            onChange={(e) =>
              setDetails({...details, password: e.target.value})}
          />
          {error.password && <p className="error">Passwords must contain 6 characters.</p>}
        </label>


        <button
          type="submit"
          className="form-button"
          disabled={loading}
        >Register
        </button>

      <NavLink to="/signin"><p className="register-login">Do you already have an account? You can <span>sign in</span> here.</p></NavLink>


      </form>
    </>
  );
}