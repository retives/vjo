import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './styles/LoginForm.css';
import axios from 'axios';
function LoginForm() {
  // useStates
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    //Sending the data to the server
    const response = await axios.post('http://localhost:8000/accounts/login/', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //Get the tokens
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh); 
    localStorage.setItem('user', JSON.stringify(response.data.user));
    navigate('/');
  } catch (error) {
    console.error('Error during login:', error);
    setError('Wrong username or password');
  }
};


  return (
    <div className='login-form'>
      <h2>Log in</h2>

      <div className="alternative-login">
          <button className="google-login-button">
            <img src="/images/google-icon.png" alt="Google Icon" className='icon'/>
            Log in with Google
          </button>
          <button className = "Apple-login-button">
            <img src="/images/apple-icon.png" alt="Apple Icon" className='icon'/>
            Log in with Apple
          </button>
        </div>

      <div className='input-wrapper'>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className='input-wrapper'>
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
        </div>

      <button onClick={handleSubmit}>Log in</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginForm;