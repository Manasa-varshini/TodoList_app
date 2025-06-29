import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Reusing same CSS for dark theme

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password) {
      alert('Please fill in both fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', {
        username,
        password,
      });

      alert(res.data.message || 'Registration successful!');
      window.location.href = '/'; // Redirect to login page
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <h2>Register</h2>
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
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account?{' '}
          <button onClick={() => window.location.href = '/'}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Register;
