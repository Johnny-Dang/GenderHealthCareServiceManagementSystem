import React from 'react';
import { X, Star, BookOpen, Clock, Calendar, Globe } from 'lucide-react';
import Button from '../../../components/ui/Button';

const DoctorDetailModal = ({ isOpen, onClose, doctor, onBookNow }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] p-4 flex items-center justify-between text-white">
          <h3 className="text-xl font-merriweather font-bold">
            Doctor Profile
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Doctor Image */}
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={doctor.image || "/images/img_placeholder_image_286x286.png"}
                  alt={`Dr. ${doctor.name}`}
                  className="w-full aspect-square object-cover"
                  onError={(e) => {
                    e.target.src = "/images/img_placeholder_image_286x286.png";
                  }}
                />
              </div>
              
              {/* Price & Booking Button (Mobile) */}
              <div className="mt-4 bg-[#f8f3e8] p-4 rounded-lg md:hidden">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Consultation Fee</p>
                    <p className="text-2xl font-merriweather font-bold text-[#22b8bf]">
                      ${doctor.price}
                      <span className="text-sm font-normal text-gray-600">/hour</span>
                    </p>
                  </div>
                  <Button 
                    onClick={onBookNow}
                    variant="primary"
                    className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b]"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Doctor Details */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-merriweather font-bold text-[#02090a] mb-1">
                {doctor.name}
              </h2>
              <p className="text-[#22b8bf] font-opensans font-medium mb-3">
                {doctor.specialty}
              </p>
              
              {/* Rating and Reviews */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-opensans font-medium">{doctor.rating}</span>
                </div>
                <span className="text-gray-600">({doctor.reviews} reviews)</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-600">{doctor.experience} experience</span>
              </div>
              
              {/* Bio */}
              <div className="mb-6">
                <h4 className="text-lg font-merriweather font-semibold mb-2">About</h4>
                <p className="text-gray-700">
                  {doctor.bio}
                </p>
              </div>
              
              {/* Details in Icons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Education */}
                <div className="flex items-start space-x-3">
                  <div className="bg-[#e8f7f8] p-2 rounded-md">
                    <BookOpen className="w-5 h-5 text-[#22b8bf]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Education</p>
                    <p className="text-[#02090a] font-medium">{doctor.education}</p>
                  </div>
                </div>
                
                {/* Experience */}
                <div className="flex items-start space-x-3">
                  <div className="bg-[#e8f7f8] p-2 rounded-md">
                    <Clock className="w-5 h-5 text-[#22b8bf]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="text-[#02090a] font-medium">{doctor.experience}</p>
                  </div>
                </div>
                
                {/* Availability */}
                <div className="flex items-start space-x-3">
                  <div className="bg-[#e8f7f8] p-2 rounded-md">
                    <Calendar className="w-5 h-5 text-[#22b8bf]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available Days</p>
                    <p className="text-[#02090a] font-medium">{doctor.availability.join(', ')}</p>
                  </div>
                </div>
                
                {/* Languages */}
                <div className="flex items-start space-x-3">
                  <div className="bg-[#e8f7f8] p-2 rounded-md">
                    <Globe className="w-5 h-5 text-[#22b8bf]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Languages</p>
                    <p className="text-[#02090a] font-medium">{doctor.languages.join(', ')}</p>
                  </div>
                </div>
              </div>
              
              {/* Price & Booking Button (Desktop) */}
              <div className="hidden md:block bg-[#f8f3e8] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Consultation Fee</p>
                    <p className="text-2xl font-merriweather font-bold text-[#22b8bf]">
                      ${doctor.price}
                      <span className="text-sm font-normal text-gray-600">/hour</span>
                    </p>
                  </div>
                  <Button 
                    onClick={onBookNow}
                    variant="primary"
                    className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] px-6 py-2"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay Click to Close */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      ></div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DoctorDetailModal; 