
const ConfirmEmail = ({ email }) => (
  <div className="confirmation-screen">
    <h2>Confirm Your Email</h2>
    <p>
      We've sent a verification link to <strong>{email}</strong>. <br />
      Please check your inbox to activate your account.
    </p>
  </div>
);
export default ConfirmEmail;
