import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EmailConfirmPage() {
  const { uidb64, token } = useParams();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/accounts/activate/${uidb64}/${token}/`);
        setStatus('success');
        setMessage(response.data.detail);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.detail || 'Something went wrong.');
      }
    };
    confirmEmail();
  }, [uidb64, token]);

  return (
    <div className="email-confirm-page">
      <h2>Email Confirmation</h2>
      {status === 'pending' && <p>Confirming your email...</p>}
      {status === 'success' && <p style={{ color: 'green' }}>{message}</p>}
      {status === 'error' && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}

export default EmailConfirmPage;
