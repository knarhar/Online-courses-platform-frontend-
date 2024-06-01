import React, { useState } from 'react';
import '../../statics/css/register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../assets/AuthContext'
import Cookies from 'js-cookie';


const RegisterPage = () => {
  const navigate = useNavigate();

  const { register, login, errorMessage, loginErrorMessage } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false)
  const [media, setMedia] = useState(false);
  const [userType, setUserType] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password, userType);
      if (response && response.ok) {
        await login(username, password);
        navigate('/');
      } else {
        console.error('Registration failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await login(username, password);
      const data = await response.json();
      const accessToken = data.access_token;

      localStorage.setItem('access_token', accessToken);
      navigate('/')
    } catch (error) {
      let i = true;

    }
  };

  const handleExample = () => {
    setActive(!active)
  }

  const handleMedia = () => {
    setMedia(!media)
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
};

  return (
    <div className='main-reg-cont'>
      <Link className='back-to-home' to='/'>
        <span><i className="fa-solid fa-arrow-left"></i>
        </span>
      </Link>
      <div className={active ? "register-container active" : "register-container"} id='container'>
        <div className={media ? 'form-container sign-up media-active' : 'form-container sign-up'}>

          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <span>or use E-mail for signing up</span>
            <input type="text" placeholder="Userame" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="E-mail" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            {errorMessage && <p className='errormessage'>{errorMessage}</p>}

            {/* <select value={userType} onChange={handleUserTypeChange} required>
              <option value="false">Student</option>
              <option value="true">Lecturer</option>
            </select>  */}

            <div className='agr'>
              <input type="checkbox" name='agr' id='agr' placeholder="I agree with Privacy Policy" />
              <label htmlFor='agr'>I agree with <Link to='/policy'>Privacy Policy</Link></label>
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
            {loginErrorMessage && <p className='errormessage'>{loginErrorMessage}</p>}

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
