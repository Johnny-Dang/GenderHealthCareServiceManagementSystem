// src/pages/user-login-screen/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Remove Lucide React imports
// import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import { useAuth } from '../../context/AuthContext';

// Add custom SVG icon components
const Eye = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOff = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94"></path>
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"></path>
    <path d="m1 1 22 22"></path>
  </svg>
);

const ArrowLeft = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"></path>
    <path d="M19 12H5"></path>
  </svg>
);

const UserLoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data (in a real app, this would come from the API)
      const userData = {
        id: '123456',
        name: 'Jane Doe',
        email: formData.email,
        phone: '+1 (555) 123-4567',
        dob: 'January 15, 1990',
        gender: 'Female',
        joinDate: 'June 15, 2023'
      };
      
      // Log the user in using auth context
      login(userData);
      
      // Check if there's a redirect path stored
      const redirectPath = sessionStorage.getItem('redirectAfterAuth');
      
      if (redirectPath) {
        // Clear the stored path
        sessionStorage.removeItem('redirectAfterAuth');
        // Redirect to the intended page
        navigate(redirectPath);
      } else {
        // Default redirect to customer home page
        navigate('/customer');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    alert('Forgot password functionality will be implemented');
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  const handleAppleLogin = () => {
    console.log('Login with Apple');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f7f8] to-[#e8edf8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* SafeSense Branding */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] bg-clip-text text-transparent mb-4">
            SafeSense
          </div>
          <h2 className="text-2xl font-inter font-semibold text-[#02090a] mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">
            Sign in to access your personalized health dashboard
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            type="email"
            label="Email Address"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />
          
          <div className="relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                className="rounded border-gray-300 text-[#22b8bf] focus:ring-[#22b8bf]"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#22b8bf] hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          
          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full h-12 text-base font-medium"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              'Login'
            )}
          </Button>
        </form>
        
        {/* Social Login */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="outline"
            className="h-12 text-base font-medium"
          >
            Google
          </Button>
          <Button
            type="button"
            onClick={handleAppleLogin}
            variant="outline"
            className="h-12 text-base font-medium"
          >
            Apple
          </Button>
        </div>
        
        {/* Register Link */}
        <div className="text-center">
          <span className="text-gray-600">New to SafeSense? </span>
          <button
            onClick={() => navigate('/user-registration-screen')}
            className="text-[#22b8bf] hover:underline font-medium"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLoginScreen;