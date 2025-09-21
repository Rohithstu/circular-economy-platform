import React, { useState, useEffect } from 'react';
import './AuthForm.css';

const AuthForm = ({ onLogin, onRegister, mode, switchMode, onSuccess, onCancel, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyType: 'buyer'
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize the panel based on the mode
    const container = document.getElementById('container');
    if (container) {
      if (mode === 'register') {
        container.classList.add("right-panel-active");
      } else {
        container.classList.remove("right-panel-active");
      }
    }
  }, [mode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formType === 'login') {
        const success = await onLogin(formData.email, formData.password);
        if (success) {
          onSuccess();
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords don't match");
          return;
        }
        
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          company: formData.companyName,
          role: formData.companyType
        };
        
        const success = await onRegister(userData);
        if (success) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {error && (
        <div style={{
          color: 'red',
          padding: '10px',
          margin: '10px',
          border: '1px solid red',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          Error: {error}
        </div>
      )}
      
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => handleSubmit(e, 'register')}>
            <h1>Create Account</h1>
            <div className="social-container">
              <button type="button" className="social" aria-label="Sign up with Facebook">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="social" aria-label="Sign up with Google">
                <i className="fab fa-google-plus-g"></i>
              </button>
              <button type="button" className="social" aria-label="Sign up with LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
            <span>or use your email for registration</span>
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
            <input 
              type="text" 
              name="companyName" 
              placeholder="Company Name" 
              value={formData.companyName}
              onChange={handleChange}
              required 
            />
            <select 
              name="companyType" 
              value={formData.companyType}
              onChange={handleChange}
              required
              className="company-type-select"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="both">Both</option>
            </select>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => handleSubmit(e, 'login')}>
            <h1>Sign in</h1>
            <div className="social-container">
              <button type="button" className="social" aria-label="Sign in with Facebook">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="social" aria-label="Sign in with Google">
                <i className="fab fa-google-plus-g"></i>
              </button>
              <button type="button" className="social" aria-label="Sign in with LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
            <span>or use your account</span>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <button type="button" className="forgot-password-link">
              Forgot your password?
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => switchMode('login')}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => switchMode('register')}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back button to return to home */}
      <div className="back-to-home">
        <button onClick={onCancel} className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
      </div>
    </div>
  );
};

export default AuthForm;