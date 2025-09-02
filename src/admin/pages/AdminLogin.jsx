import logo from "../../assets/apexionlogo.png";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
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
      const tempCredentials = {
        username: 'admin',
        password: 'apexion@2025'
      };

      if (formData.username === tempCredentials.username && 
          formData.password === tempCredentials.password) {
        
        localStorage.setItem('adminToken', 'temp-admin-token');
        localStorage.setItem('adminUser', JSON.stringify({
          id: 1,
          username: 'admin',
          name: 'Dr. Deepika Medhi',
          role: 'admin'
        }));

        toast.success('Welcome back, Dr. Deepika!');
        navigate('/admin');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
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
            Apexion Dental Clinic Management System
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="demo-credentials">
            <h4 className="demo-title">Demo Credentials:</h4>
            <p className="demo-info">
              Username: <strong>admin</strong><br />
              Password: <strong>apexion@2025</strong>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
              'Sign in to Admin Panel'
            )}
          </button>

          {/* Footer */}
          <div className="login-footer">
            <p>Built with ❤️ by Gratia Technologies</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;