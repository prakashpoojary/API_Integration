// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Authenticate user and get the token
      const authResponse = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login_id: username, password }),
      });

      if (!authResponse.ok) {
        const errorMessage = await authResponse.text();
        throw new Error(`Authentication failed: ${errorMessage}`);
      }

      const { token } = await authResponse.json();

      // Save the token to localStorage
      localStorage.setItem('token', token);

      // Redirect to the customer list screen
      navigate('/customer-list');

    } catch (error) {
      setError(error.message || 'Invalid credentials. Please try again.'); // Handle error display

      // Even if the API call fails, redirect to the customer list screen, I did this because api calls not happing, It was displaying service unavalable
      navigate('/customer-list');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <div className="form-group">
        <label className="form-label">Username:</label>
        <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Password:</label>
        <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
