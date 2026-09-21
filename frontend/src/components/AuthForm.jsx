import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ShieldCheck,
  Zap,
  Leaf
} from 'lucide-react';
import './AuthForm.css';

const AuthForm = ({ onLogin, onRegister, mode = 'login', switchMode, onSuccess, onCancel, error }) => {
  const [authMode, setAuthMode] = useState(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyType: 'buyer'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(error || null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (localError) setLocalError(null);
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, companyType: role }));
  };

  const setDemoAccount = (roleType) => {
    if (roleType === 'buyer') {
      setFormData({
        ...formData,
        email: 'procurement@greentech-mfg.com',
        password: 'password123',
        name: 'Alex Vance',
        companyName: 'GreenTech Manufacturing Ltd',
        companyType: 'buyer'
      });
      if (authMode !== 'login') setAuthMode('login');
    } else {
      setFormData({
        ...formData,
        email: 'circular@novamaterials.com',
        password: 'password123',
        name: 'Sarah Chen',
        companyName: 'Nova Recycled Materials Co.',
        companyType: 'seller'
      });
      if (authMode !== 'login') setAuthMode('login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError(null);

    try {
      if (authMode === 'login') {
        const success = await onLogin(formData.email, formData.password);
        if (success) {
          if (onSuccess) onSuccess();
        } else {
          setLocalError('Invalid credentials. Try our 1-click demo accounts below!');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setLocalError("Passwords do not match. Please verify your confirmation password.");
          setIsLoading(false);
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
          if (onSuccess) onSuccess();
        } else {
          setLocalError('Registration failed. Please try again or use another email.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setLocalError(err.message || 'Authentication failed. Please check network.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden bg-slate-950">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Back Button */}
      <div className="w-full max-w-xl mb-4 flex items-center justify-between z-10">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>256-bit Encrypted Portal</span>
        </div>
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-xl glass-panel-dark rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/25 mb-4">
            <Leaf className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {authMode === 'login' ? 'Welcome Back to CircularNet' : 'Create Enterprise Account'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-md mx-auto">
            {authMode === 'login' 
              ? 'Access verified industrial surplus lots, secondary feedstock & ESG certificates.' 
              : 'Join 1,200+ certified corporations trading industrial byproducts with zero landfill.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-white/5 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => { setAuthMode('login'); if(switchMode) switchMode('login'); }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              authMode === 'login'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('register'); if(switchMode) switchMode('register'); }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              authMode === 'register'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Facility
          </button>
        </div>

        {/* Error Alert */}
        {(localError || error) && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>{localError || error}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authMode === 'register' && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Contact Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Dr. Arthur Pendelton"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Enterprise / Facility Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Apex Polymer Recycling Corp"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Enterprise Role Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Trading Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'buyer', label: 'Buyer', icon: '🏗️' },
                    { id: 'seller', label: 'Supplier', icon: '🏭' },
                    { id: 'both', label: 'Both', icon: '♻️' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleSelect(r.id)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        formData.companyType === r.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Corporate Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="procurement@corporation.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary-glow py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{authMode === 'login' ? 'Sign In to Workspace' : 'Complete Verification & Register'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Fast Demo Logins */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-center mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              1-Click Instant Demo Credentials
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setDemoAccount('buyer')}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group"
            >
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Demo Buyer Account</span>
                <span className="text-emerald-400 text-xxs font-mono">Fill & Ready</span>
              </div>
              <p className="text-xxs text-slate-400 mt-0.5">GreenTech Manufacturing (Buyer)</p>
            </button>

            <button
              type="button"
              onClick={() => setDemoAccount('seller')}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group"
            >
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Demo Supplier Account</span>
                <span className="text-teal-400 text-xxs font-mono">Fill & Ready</span>
              </div>
              <p className="text-xxs text-slate-400 mt-0.5">Nova Recycled Materials (Seller)</p>
            </button>
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-panel-dark rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/10 relative">
            <h3 className="text-lg font-black text-white mb-2">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-6">
              Enter your corporate email address to receive an instant Scope 3 cryptographic reset token.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-white mb-1">Reset Instructions Sent!</h4>
                <p className="text-xxs text-slate-400 mb-4">
                  We have dispatched a verification email to <span className="text-emerald-300 font-mono">{forgotPasswordEmail}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => { setShowForgotPassword(false); setForgotSent(false); }}
                  className="w-full btn-primary-glow py-2.5 rounded-xl text-xs font-bold"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-1/2 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-1/2 btn-primary-glow py-2.5 rounded-xl text-xs font-bold"
                  >
                    {isLoading ? 'Sending...' : 'Send Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;