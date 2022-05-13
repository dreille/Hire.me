import React from 'react';
import { useHistory } from 'react-router-dom';

const Signup = props => {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        history.push("/homepage")
      }
      else{
        history.push("/signup")
      }
    })


  }

  return <div className='login-form'>
    <form id="signup" onSubmit={(e) => handleSubmit(e)}>
    <input id="name" name="name" placeholder="name" type="text"></input>
      <br></br>
      <input id="email" name="email" placeholder="email" type="text"></input>
      <br></br>
      <input id="pass" name="pass" placeholder="pass" type="text"></input>
      <br></br>
      <button id="signup-btn" className="btn btn-dark sign-signup-btn" formAction="/auth/signup" type="submit">Sign Up</button>
    </form>
  </div>
}

export default Signup;
