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
      {/* Signup form */}
        {/* Email field */}
        <div className="input-wrapper">
          <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        {/* Name field */}
        <div className="input-wrapper">
          <label>Full Name</label>
          <input
            type="text"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        {/* Password field */}
        <div className="input-wrapper">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button onClick={handleSubmit}>Sign up</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

      </div>
    );
  }
  
  export default SignupForm;
