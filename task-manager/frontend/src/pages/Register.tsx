import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // for user registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, { email, password });
      alert('Registration successful! Please login.');
      navigate('/Login')
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Set error message from backend
      }
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type="submit">Register</button>
      <p> Already have an account? <Link to={'/login'}> Login </Link></p>
      {/* Display error message if there's an error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;