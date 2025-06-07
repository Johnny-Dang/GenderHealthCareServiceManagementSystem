import React from 'react';
import { Star } from 'lucide-react';
import Button from '../../../components/ui/Button';

const DoctorCard = ({ doctor, onViewDetails, onBookNow }) => {
  // Default placeholder image if doctor image is not available
  const doctorImage = doctor.image || "/images/img_placeholder_image_286x286.png";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-[200px]">
        {/* Doctor Image */}
        <img
          src={doctorImage}
          alt={`Dr. ${doctor.name}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/images/img_placeholder_image_286x286.png";
          }}
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-[#22b8bf] text-white py-1 px-3 rounded-full font-opensans text-sm">
          ${doctor.price}/hour
        </div>
      </div>
      
      <div className="p-5">
        {/* Doctor Name and Specialty */}
        <h3 className="text-lg font-merriweather font-bold text-[#02090a] mb-1">
          {doctor.name}
        </h3>
        <p className="text-[#22b8bf] font-opensans font-medium mb-3">
          {doctor.specialty}
        </p>
        
        {/* Rating and Reviews */}
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-opensans font-medium">{doctor.rating}</span>
          </div>
          <span className="text-sm text-gray-600">({doctor.reviews} reviews)</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-600">{doctor.experience} exp</span>
        </div>
        
        {/* Brief Bio */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {doctor.bio}
        </p>
        
        {/* Available Days */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Available on:</p>
          <div className="flex flex-wrap gap-1">
            {doctor.availability.map((day, index) => (
              <span
                key={index}
                className="bg-[#e8f7f8] text-xs px-2 py-1 rounded font-opensans"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onViewDetails}
            className="flex-1 text-[#22b8bf] border-[#22b8bf] hover:bg-[#e8f7f8]"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            onClick={onBookNow}
            className="flex-1 bg-gradient-to-r from-[#22b8bf] to-[#8124b79b]"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 