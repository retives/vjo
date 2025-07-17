import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './styles/LoginForm.css';
import axios from 'axios';
function LoginForm() {
  // useStates
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  // Function to handle form submission
  const handleSubmit = async(e) => {
    setError('')
    e.preventDefault();
    try{
      if (!email || !password){
      setError('The fields can\'t be empty!')
      return false
    }
    if (email.length > 255 || password.length > 255){
      setError('The entered information is too long')
      return ;
    }
    //Sending the data to the server
    const response = await axios.post('http://localhost:8000/accounts/login/', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    login(response.data.user, response.data.access, response.data.refresh);
    navigate(-1);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error('Server error:', error.response.status);
      setError('The server is currently unavailable. Please try again later.');
    }
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized:', error.response.status);
      setError('Invalid email or password. Please try again.');
    }
  };
}

  return (
    // Wrapper
  <form className = "login-form" onSubmit={ handleSubmit }>
      {/* Label */}
      <div className = "login-text mb-4">
        <h2>Log in</h2>
      </div>
      {/* Alternative login buttons */}
      <div className="alternative-login mb-3 d-flex gap-2">
          <button className="google-login-button">
            <img src="/images/google-icon.png" alt="Google Icon" className='icon'/>
            Log in with Google
          </button>
          <button className = "Apple-login-button">
            <img src="/images/apple-icon.png" alt="Apple Icon" className='icon'/>
            Log in with Apple
          </button>
        </div>

      {/* Email input */}  
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter Email..."
          aria-label="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
    </div>
      {/* Password input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label" id = "password-field">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password..."
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      {/* Submit button  */}
      <button type="submit"  onClick={handleSubmit}>
        Log in
    </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='left-text'>
        <span >
          Want to create an account?<Link to={"/signup"}>Sign Up</Link>
        </span>
      </div>
    </form>
  );
}

export default LoginForm;