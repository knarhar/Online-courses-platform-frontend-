import React, { useState } from 'react';
import '../../statics/css/register.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../assets/AuthContext'
import Cookies from 'js-cookie';

function getCSRFToken() {
  return Cookies.get('csrftoken');
}
const RegisterPage = () => {
  const navigate = useNavigate();

  const { register, login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false)
  const [media, setMedia] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password);
      if (response.ok) {
        await login(username, password);

        navigate('/courses');
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };


  const handleLogin = async (e) => {
    console.log('CSRF Token:', getCSRFToken());
    e.preventDefault();

    try {

      const response = await login(username, password);
      const data = await response.json();
      const accessToken = data.access_token;

      localStorage.setItem('access_token', accessToken);
      navigate('/home')
      console.log('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleExample = () => {
    setActive(!active)
  }

  const handleMedia = () => {
    setMedia(!media)
  }

  return (
    <div className='main-reg-cont'>
      <div className={active ? "register-container active" : "register-container"} id='container'>
        <div className={media ? 'form-container sign-up media-active' : 'form-container sign-up'}>

          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <span>or use E-mail for signing up</span>
            <input type="text" placeholder="Userame" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="E-mail" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {/* <select name="user type" id="user-type">
              <option value="student">Student</option>
              <option value="lector">Lecturer</option>
            </select> */}

            <div className='agr'>
              <input type='radio' name='agr' id='agr' placeholder="I agree with Privacy Policy" />
              <label htmlFor='agr'>I agree with Privacy Policy</label>
            </div>
            <a id="sign-in-media" onClick={handleMedia}>Already have an account? Sign in</a>
            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className={media ? 'form-container sign-in media-active' : 'form-container sign-in'}>

          <form action="">
            <h1>Log in</h1>
            <span>or use Your username for signing in</span>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {/* <a href="/">Forgot your password?</a> */}
            <a id="sign-up-media" onClick={handleMedia}>Don't have an account? Sign up.</a>
            <button type="submit" onClick={(e) => handleLogin(e)} >Log in</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={handleExample} >Log in</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" id="register" onClick={handleExample}>Sign up</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default RegisterPage;
