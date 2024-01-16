import React, { useState, useEffect } from 'react';



const RegisterPage = () => {

  useEffect(() => {
    const container = document.querySelector('#container');
    const registerBtn = document.querySelector('#register');
    const loginBtn = document.querySelector('#login');

    const signupMediaBtn = document.querySelector('#sign-up-media');
    const signinMediaBtn = document.querySelector('#sign-in-media');
    const formContainer = document.querySelector('.form-container');

    if (registerBtn && loginBtn && container) {
      registerBtn.addEventListener('click', () => {
        container.classList.add('active');
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
      });
    }

    if (signupMediaBtn && signinMediaBtn && formContainer) {
      signupMediaBtn.addEventListener('click', () => {
        formContainer.classList.add('media-active');
        formContainer.classList.remove('media-passive');
      });

      signinMediaBtn.addEventListener('click', () => {
        formContainer.classList.add('media-passive');
        formContainer.classList.remove('media-active');
      });
    }
  }, []);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();



    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();


    console.log(data.message);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('Token:', data.access);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <div className='main-reg-cont'>
      <div className='register-container' id='container'>
        <div className='form-container sign-up'>

          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <span>or use E-mail for signing up</span>
            <input type="text" placeholder="Name" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="E-mail" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select name="user type" id="user-type">
              <option value="student">Student</option>
              <option value="lector">Lecturer</option>
            </select>
            <a href="/" id="sign-in-media">Already have an account? Sign in</a>
            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className='form-container sign-in'>

          <form action="">
            <h1>Log in</h1>
            <span>or use E-mail for signing in</span>
            <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href="/">Forgot your password?</a>
            <a href="/" id="sign-up-media">Don't have an account? Sign up.</a>
            <button type="submit" onClick={handleLogin} >Log in</button>
          </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="login">Log in</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className="hidden" id="register">Sign up</button>
                </div>
            </div>
        </div>
      </div>


    </div>
  );
};

export default RegisterPage;
