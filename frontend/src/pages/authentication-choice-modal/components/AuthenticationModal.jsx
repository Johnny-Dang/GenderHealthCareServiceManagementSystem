// src/pages/authentication-choice-modal/components/AuthenticationModal.jsx
import React, { createContext, useContext, useState } from 'react';
import AuthenticationChoiceModal from '../index';

const AuthModalContext = createContext();

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      <AuthenticationChoiceModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
      />
    </AuthModalContext.Provider>
  );
};

export default AuthModalProvider;