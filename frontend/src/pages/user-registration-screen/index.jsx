// src/pages/user-registration-screen/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';

const UserRegistrationScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    ageRange: '',
    healthInterests: [],
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const healthInterestOptions = [
    'Reproductive Health',
    'Menstrual Cycle Tracking',
    'Sexual Health',
    'Pregnancy Planning',
    'Birth Control',
    'STD Prevention',
    'Mental Health',
    'Nutrition & Wellness'
  ];

  const ageRanges = [
    '18-24', '25-34', '35-44', '45-54', '55+'
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleHealthInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      healthInterests: prev.healthInterests.includes(interest)
        ? prev.healthInterests.filter(item => item !== interest)
        : [...prev.healthInterests, interest]
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password is too weak';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.ageRange) newErrors.ageRange = 'Please select your age range';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      // Handle registration logic
      console.log('Registration data:', formData);
      alert('Registration successful! Please check your email for verification.');
      navigate('/user-login-screen');
    }
  };

  const handleGoogleSignup = () => {
    console.log('Sign up with Google');
  };

  const handleAppleSignup = () => {
    console.log('Sign up with Apple');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f7f8] to-[#e8edf8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          
          {/* Progress Indicator */}
          <div className="flex space-x-2">
            <div className={`h-2 w-16 rounded-full ${currentStep >= 1 ? 'bg-[#22b8bf]' : 'bg-gray-200'}`} />
            <div className={`h-2 w-16 rounded-full ${currentStep >= 2 ? 'bg-[#22b8bf]' : 'bg-gray-200'}`} />
          </div>
          
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* SafeSense Branding */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] bg-clip-text text-transparent mb-2">
            SafeSense
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Shield size={16} />
            <span className="text-sm">Your data is protected and HIPAA compliant</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-inter font-semibold text-[#02090a] text-center mb-6">
                Create Your Account
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={errors.firstName}
                  required
                />
                <InputField
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                />
              </div>
              
              <InputField
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
              
              <InputField
                type="tel"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
              />
              
              <Button
                type="button"
                onClick={handleNext}
                variant="primary"
                className="w-full h-12 text-base font-medium mt-8"
              >
                Continue
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-inter font-semibold text-[#02090a] text-center mb-6">
                Complete Your Profile
              </h2>
              
              {/* Password Fields */}
              <div className="space-y-4">
                <div className="relative">
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={errors.password}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <InputField
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    error={errors.confirmPassword}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              {/* Age Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.ageRange}
                  onChange={(e) => handleInputChange('ageRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent"
                >
                  <option value="">Select your age range</option>
                  {ageRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.ageRange && (
                  <p className="mt-1 text-sm text-red-600">{errors.ageRange}</p>
                )}
              </div>
              
              {/* Health Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Health Interests (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {healthInterestOptions.map(interest => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.healthInterests.includes(interest)}
                        onChange={() => handleHealthInterestChange(interest)}
                        className="rounded border-gray-300 text-[#22b8bf] focus:ring-[#22b8bf]"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Terms Acceptance */}
              <div>
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-[#22b8bf] focus:ring-[#22b8bf]"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-[#22b8bf] hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-[#22b8bf] hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
                )}
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 text-base font-medium"
              >
                Create Account
              </Button>
              
              {/* Social Signup */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  onClick={handleGoogleSignup}
                  variant="outline"
                  className="h-12 text-base font-medium"
                >
                  Google
                </Button>
                <Button
                  type="button"
                  onClick={handleAppleSignup}
                  variant="outline"
                  className="h-12 text-base font-medium"
                >
                  Apple
                </Button>
              </div>
            </div>
          )}
        </form>
        
        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => navigate('/user-login-screen')}
            className="text-[#22b8bf] hover:underline font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationScreen;