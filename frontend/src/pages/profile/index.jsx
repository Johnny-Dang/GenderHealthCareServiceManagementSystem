import React from 'react';
import { Navigate } from 'react-router-dom';
import CustomerHeader from '../../components/common/CustomerHeader';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-[#22b8bf] border-r-[#22b8bf] border-b-transparent border-l-transparent"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/user-login-screen" />;
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white">
      <CustomerHeader user={user} />
      <main className="max-w-[1440px] mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-[32px] font-merriweather font-bold text-[#02090a] mb-8">
            Your Profile
          </h1>
          
          <div className="bg-[#f8f3e8] p-8 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                {user?.avatar ? (
                  <img 
                    src={user.avatar}
                    alt="User Avatar" 
                    className="h-[120px] w-[120px] rounded-full object-cover border-4 border-[#22b8bf]"
                  />
                ) : (
                  <div className="h-[120px] w-[120px] rounded-full bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] flex items-center justify-center text-white font-merriweather font-bold text-4xl">
                    {getInitials()}
                  </div>
                )}
                <button className="absolute bottom-0 right-0 bg-[#22b8bf] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-[24px] font-merriweather font-bold text-[#02090a] mb-2">
                  {user?.name || 'Customer Name'}
                </h2>
                <p className="text-[16px] font-opensans text-gray-600 mb-4">
                  {user?.email || 'customer@example.com'}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] text-white py-2 px-6 rounded-lg font-opensans hover:opacity-90 transition-opacity">
                    Edit Profile
                  </button>
                  <button className="border border-[#22b8bf] text-[#22b8bf] py-2 px-6 rounded-lg font-opensans hover:bg-[#f2f2f2] transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[18px] font-merriweather font-bold text-[#02090a] mb-4">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[14px] font-opensans text-gray-600">
                      Phone Number
                    </p>
                    <p className="text-[16px] font-opensans text-[#02090a]">
                      {user?.phone || '+1 (555) 123-4567'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] font-opensans text-gray-600">
                      Date of Birth
                    </p>
                    <p className="text-[16px] font-opensans text-[#02090a]">
                      {user?.dob || 'January 1, 1990'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] font-opensans text-gray-600">
                      Gender
                    </p>
                    <p className="text-[16px] font-opensans text-[#02090a]">
                      {user?.gender || 'Female'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-[18px] font-merriweather font-bold text-[#02090a] mb-4">
                  Account Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[14px] font-opensans text-gray-600">
                      Account Type
                    </p>
                    <p className="text-[16px] font-opensans text-[#02090a]">
                      Standard User
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] font-opensans text-gray-600">
                      Member Since
                    </p>
                    <p className="text-[16px] font-opensans text-[#02090a]">
                      {user?.joinDate || 'June 15, 2023'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] font-opensans text-gray-600">
                      Last Login
                    </p>
                    <p className="text-[16px] font-opensans text-[#02090a]">
                      Today
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Privacy Settings */}
            <div className="mt-12">
              <h3 className="text-[18px] font-merriweather font-bold text-[#02090a] mb-4">
                Privacy Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    className="h-5 w-5 text-[#22b8bf] rounded border-gray-300 focus:ring-[#22b8bf]"
                    defaultChecked
                  />
                  <label htmlFor="emailNotifications" className="ml-2 text-[16px] font-opensans text-[#02090a]">
                    Receive email notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    className="h-5 w-5 text-[#22b8bf] rounded border-gray-300 focus:ring-[#22b8bf]"
                    defaultChecked
                  />
                  <label htmlFor="smsNotifications" className="ml-2 text-[16px] font-opensans text-[#02090a]">
                    Receive SMS notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dataSharing"
                    className="h-5 w-5 text-[#22b8bf] rounded border-gray-300 focus:ring-[#22b8bf]"
                  />
                  <label htmlFor="dataSharing" className="ml-2 text-[16px] font-opensans text-[#02090a]">
                    Share anonymous data for research purposes
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile; 