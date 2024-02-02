import React, { useState } from 'react';
import '../../statics/css/register.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false)  

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
      navigate('/courses');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleExample = () => {
    setActive(!active)
  }


  return (
    <div className='main-reg-cont'>
      <div className={active ? "register-container active" : "register-container"} id='container'>
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
                    <button className="hidden" id="login"  onClick={handleExample} >Log in</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className="hidden" id="register"  onClick={handleExample}>Sign up</button>
                </div>
            </div>
        </div>
      </div>


    </div>
  );
};

export default RegisterPage;
