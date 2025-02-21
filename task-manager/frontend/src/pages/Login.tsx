import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/Authcontext';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // when user try to login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email, password });
      login(response.data.token);
      navigate('/tasks')
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Set error message from backend
      }
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type="submit">Login</button>
      {/* navigation to registration page for creating account*/}
      <p>Do not have an account ?
        <Link to={'/register'}> register here!</Link>
      </p>
      {/* Display error message if there's an error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;