import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async() => {
   try{
    const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      });

      if (response.data.status === 1) {
        const token = response.data.data.token;
        localStorage.setItem('authToken', token);

        navigate('/kanban'); 
      } else {
        alert('Invalid credentials'); 
      }
   }catch(error) {
    console.error('Login Error: ', error);
    alert('An error occurred. Please try again later.');
   }
  };

  return (
    <div className='cus-login-container'>
     <div className='cus-login-form'>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
