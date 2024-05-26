import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const getCSRFToken = () => {
    return Cookies.get('csrftoken');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const fetchUserData = async () => {
   if (isAuthenticated){ try {
    const response = await fetch('http://127.0.0.1:8000/api/profile/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User data:', data.user);
      setUserData(data.user);
    } else {
      console.error('Failed to fetch user data:', response.statusText);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }}
  };

  const register = async (username, email, password, userType) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, userType }),
      });
      const data = await response.json();
      if (response.ok) {
        login(username, password);
      } else {
        console.error('Registration failed:', data.error);
        if (data.error) {
          setErrorMessage(data.error); 
        } else {  
          setErrorMessage('Registration failed'); 
        }
      }
      return response;
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Error during registration'); 
      throw error;
    }
  };
  
  

  const login = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const accessToken = data.access_token;
        localStorage.setItem('access_token', accessToken);
        setIsAuthenticated(true);
        navigate('/');
        fetchUserData();
        setUserData(data.user);
      } else {
        setLoginErrorMessage(data.error)
      }
    } catch (error) {
      let i = true;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setUserData(null);
    navigate('/home');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, fetchUserData, register, errorMessage, loginErrorMessage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
