import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // make sure this is the dark theme version

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      onLogin(); // call parent to show todo page
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don’t have an account? <button onClick={() => window.location.href = '/register'}>Register</button>
        </p>
      </div>
    </div>
  );
}

export default Login;
