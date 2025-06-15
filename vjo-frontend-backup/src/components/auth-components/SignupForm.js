import { useNavigate } from 'react-router-dom';
import "./styles/SignupForm.css";
import axios from 'axios';

import { useState } from 'react';
function SignupForm() {
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      try{
        const response = await axios.post('https://localhost:8000/accounts/signup/', {
          email,
          fullName,
          password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/');
      }catch (error) {
        console.error('Error during signup:', error);
      }
    };
  
    return (
      <div className="signup-form">
        <h2>Sign up</h2> 
        
        <div className="alternative-signup">
          <button className="google-signup-button">
            <img src="/images/google-icon.png" alt="Google Icon" className='icon'/>
            Sign up with Google
          </button>
          <button className = "Apple-signup-button">
            <img src="/images/apple-icon.png" alt="Apple Icon" className='icon'/>
            Sign up with Apple
          </button>
        </div>

        <div className="input-wrapper">
          <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="input-wrapper">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button onClick={handleSubmit}>Sign up</button>
      </div>
    );
  }
  
  export default SignupForm;
