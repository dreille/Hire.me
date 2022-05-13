import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = props => {
  const [error, setError] = useState([]);
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    let status;
    (email === '' && password === '') ? setError(['Email and Password needed']) : fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => {
        status = res.status;
        return res.json();
        // history.push('/homepage');
      })
      .then(res => {
        if (status === 200) {
          props.setAuthUser(true);
          props.setUserName(res.name)
          history.push('/homepage');
        }
        else if (status === 401) {
          history.push('/signup');
        }
        else if (status === 400 || status === 500) {
          setError(['Wrong Email or Password'])
        } 
      })
      .catch((err) => {
        console.log('in error');
        console.log(err);
        setError([err]);
      });
  }

  const errView = error.map(err => {
    return <div class="alert alert-danger" role="alert">
      {err}
    </div>
  })

  return (
    <div className="login-form">
      <h1>Hire.me</h1>
      <form id="signin" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group align-items-center">
          <input id="email" name="email" placeholder="email" type="text"></input>
          <br></br>
        </div>
        <input id="pass" name="pass" placeholder="password" type="password"></input>
        <br></br>
        {errView}
        <div className="signin-btnbox">
          <button id="signup-btn" className="btn btn-dark" onClick={() => history.push('/signup')} type="button">Sign Up</button>
          <button id="login-btn" className="btn btn-dark" formAction="/auth/login" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
