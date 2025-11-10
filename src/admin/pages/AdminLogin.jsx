import logo from "../../assets/apexionlogo.png";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import adminApi from '../services/adminApi';
import '../styles/admin.scss';
import '../styles/components.scss';
import '../styles/pages.scss';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the backend API to authenticate
      const response = await adminApi.login(formData);

      // Check if login was successful
      if (response.success) {
        // Show success message
        toast.success(`Welcome back, ${response.user.username}!`);
        
        // Navigate to admin dashboard
        navigate('/admin/dashboard');
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error) {
      // Handle errors
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="login-title">Admin Login</h2>
          <p className="login-subtitle">
            Apexion Dental Clinic
          </p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="form-group">
            <div className="form-input-container">
              <User className="input-icon" />
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="form-input-container">
              <Lock className="input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid transparent', 
                  borderTop: '2px solid white', 
                  borderRadius: '50%', 
                  marginRight: '8px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing in...
              </div>
            ) : (
              'Login to Admin Dashboard'
            )}
          </button>

          {/* Footer */}
          <div className="login-footer">
            <p>Designed and Developed by</p>
              <p>Gratia Technology Pvt Ltd</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;