import { useNavigate } from 'react-router-dom';
import "./styles/SignupForm.css";
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthProvider';
function SignupForm() {
    // Constants and hooks
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // Function to handle form submission
    const handleSubmit = async(e) => {
      e.preventDefault();
      // Sending the request to the server
      try{
        const response = await axios.post('http://localhost:8000/accounts/signup/', {
          email,
          full_name,
          password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          // Storing the tokens in localStorage and logging in the user
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      login(response.data.access);
      // Redirecting the user to the home page after successful signup

      navigate('/');
      }catch (error) {
        if (error.response){
          console.error('Server error:', error.response.status);
          setError(error.response.data.detail || 'An error occurred. Please try again.');
        }
      }
    };
  
    return (
      <div className="signup-form">
        <div className='signup-text mb-4'>
          <h2>Sign up</h2> 
        </div>
        {/* Alternative login buttons */}
      <div className="alternative-login mb-3 d-flex gap-2 justify-content-flex">
        <div className = "button-wrapper mb-4 w-100">
          <button className="google-login-button">
            <img src="/images/google-icon.png" alt="Google Icon" className='icon'/>
            Log in with Google
          </button>
        </div>
        <div className='button-wrapper mb-4 w-100'>
          <button className = "Apple-login-button">
            <img src="/images/apple-icon.png" alt="Apple Icon" className='icon'/>
            Log in with Apple
          </button>
          </div>
        </div>
      {/* Signup form */}
        {/* Email field */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter Email..."
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
        {/* Name field */}
         <div className="mb-3">
        <label htmlFor="full-name" className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          id="fullname"
          placeholder="Full Name..."
          aria-label="FullName"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
        {/* Password field */}
       <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      {/* Submit button  */}
      <button type="submit" className = "w-50" onClick={handleSubmit}>
        Sign Up
      </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </div>
    );
  }
  
  export default SignupForm;
