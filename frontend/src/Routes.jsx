// src/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthModalProvider } from './pages/authentication-choice-modal/components/AuthenticationModal';
import { AuthProvider } from './context/AuthContext';

// Import page components
import SafeSenseWomensHealthPlatform from './pages/SafeSenseWomensHealthPlatform';
import AuthenticationChoiceModal from './pages/authentication-choice-modal';
import UserRegistrationScreen from './pages/user-registration-screen';
import UserLoginScreen from './pages/user-login-screen';
import MenstrualCycleTracking from './pages/menstrual-cycle-tracking';
import CustomerHome from './pages/customer-home';
import Profile from './pages/profile';
import BookConsultant from './pages/book-consultant';

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <AuthModalProvider>
          <Routes>
            {/* Guest Routes */}
            <Route path="/" element={<SafeSenseWomensHealthPlatform />} />
            <Route path="/authentication-choice-modal" element={<AuthenticationChoiceModal />} />
            <Route path="/user-registration-screen" element={<UserRegistrationScreen />} />
            <Route path="/user-login-screen" element={<UserLoginScreen />} />
            
            {/* Shared Routes */}
            <Route path="/menstrual-cycle-tracking" element={<MenstrualCycleTracking />} />
            
            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerHome />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book-consultant" element={<BookConsultant />} />
          </Routes>
        </AuthModalProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;