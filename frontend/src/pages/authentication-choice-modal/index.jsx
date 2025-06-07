// src/pages/authentication-choice-modal/index.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Button from '../../components/ui/Button';

const AuthenticationChoiceModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onClose?.();
    navigate('/user-login-screen');
  };

  const handleRegisterClick = () => {
    onClose?.();
    navigate('/user-registration-screen');
  };

  const handleContinueAsGuest = () => {
    onClose?.();
    // Handle guest navigation logic
    console.log('Continue as guest');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* SafeSense Branding */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] bg-clip-text text-transparent mb-2">
            SafeSense
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-inter font-semibold text-[#02090a] mb-3">
            Welcome to SafeSense
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            To access our personalized health services and consultations, please choose how you'd like to proceed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-6">
          <Button
            onClick={handleLoginClick}
            variant="primary"
            className="w-full h-12 text-base font-medium"
          >
            Login to Existing Account
          </Button>
          
          <Button
            onClick={handleRegisterClick}
            variant="outline"
            className="w-full h-12 text-base font-medium"
          >
            Create New Account
          </Button>
        </div>

        {/* Continue as Guest */}
        <div className="text-center">
          <button
            onClick={handleContinueAsGuest}
            className="text-sm text-gray-500 hover:text-[#22b8bf] transition-colors underline"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationChoiceModal;