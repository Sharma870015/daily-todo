import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);

  // Validate username
  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/; // Alphanumeric + underscore, 3-15 characters
    return usernameRegex.test(username);
  };

  // Validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    // Minimum 6 characters, at least one uppercase, one lowercase, one number, and one special character
    return passwordRegex.test(password);
  };

  const handleContinue = () => {
    let isValid = true;

    if (!username || !validateUsername(username)) {
      setUsernameError('Username must be 3-15 characters long and can only contain alphanumeric characters and underscores');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Store the username in localStorage
      localStorage.setItem('username', username);

      // Navigate to the todos page with the username
      navigate('/todos', { state: { username } });
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError(''); // Clear the error when user types

    if (!validateUsername(value) && value !== '') {
      setUsernameError('Username must be 3-15 characters long and can only contain alphanumeric characters and underscores');
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(''); // Clear the error when user types

    if (!validatePassword(value) && value !== '') {
      setPasswordError('Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
    } else {
      setPasswordError('');
    }
  };

  const handleForgotPassword = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFocus = (e) => {
    if (e.target.id === 'username') {
      setUsernameError('');
    } else if (e.target.id === 'password') {
      setPasswordError('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="header-text">Welcome to TaskMaster<br />Your Ultimate Todo Application</h2>
      </div>
      <div className="login-box">
        <h2 className='for-Login'>TaskMaster</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              className='for-padding'
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              onFocus={handleFocus}
              required
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              className='for-padding'
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={handleFocus}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="login-button" disabled={usernameError || passwordError}>
            Continue
          </button>
        </form>
        
        <button onClick={handleForgotPassword} className="forgot-password-button">
          Forgot Password?
        </button>
      </div>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LoginPage;
