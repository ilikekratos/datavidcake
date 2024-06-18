// src/Login.js
import React, { useState } from 'react';
import LogoHeader from './logoHeader';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {

        await login(username, password);

        // Redirect to /home upon successful login
        navigate('/home');
  
      } catch (error) {
        setError('Invalid username or password. Please try again.');
        console.error('Error logging in:', error);
      }
    };
  
    return (
      <div className="form-container" id="login">
        <LogoHeader />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="form-group" id="button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default LoginPage;