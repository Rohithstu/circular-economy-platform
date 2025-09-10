// src/components/AuthForm.jsx

import React, { useState } from "react";
import "./AuthForm.css";

const AuthForm = ({ onLogin }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // Normally you’d validate against backend here
    if (formData.email && formData.password) {
      onLogin(); // ✅ triggers App.js login flow
    } else {
      alert("Please enter email and password");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Normally signup API call here
    if (formData.name && formData.email && formData.password) {
      alert("Account created! Please sign in.");
      setIsSignUpMode(false);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In form */}
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>

          {/* Sign Up form */}
          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Sign up and start exploring the marketplace for sustainable materials.</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Already have an account? Just sign in.</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
