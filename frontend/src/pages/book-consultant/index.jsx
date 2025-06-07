import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import CustomerHeader from '../../components/common/CustomerHeader';
import Footer from '../../components/common/Footer';
import DoctorCard from './components/DoctorCard';
import BookingModal from './components/BookingModal';
import DoctorDetailModal from './components/DoctorDetailModal';
import { useAuth } from '../../context/AuthContext';

// Mock data for doctors
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Gynecologist',
    experience: '15 years',
    rating: 4.9,
    reviews: 124,
    price: 75,
    availability: ['Mon', 'Wed', 'Fri'],
    education: 'Harvard Medical School',
    bio: "Dr. Sarah Johnson is a board-certified gynecologist with over 15 years of experience. She specializes in women's reproductive health, prenatal care, and menopause management. Her approach emphasizes preventative care and patient education.",
    languages: ['English', 'Spanish'],
    image: '/images/img_placeholder_image_286x286.png',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Obstetrician',
    experience: '10 years',
    rating: 4.7,
    reviews: 98,
    price: 85,
    availability: ['Tue', 'Thu', 'Sat'],
    education: 'Stanford University School of Medicine',
    bio: "Dr. Michael Chen is a compassionate obstetrician dedicated to providing comprehensive prenatal care and safe deliveries. He combines the latest medical advancements with a personalized approach to ensure the best outcomes for mothers and babies.",
    languages: ['English', 'Mandarin'],
    image: '/images/img_placeholder_image_2.png',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Reproductive Endocrinologist',
    experience: '12 years',
    rating: 4.8,
    reviews: 112,
    price: 95,
    availability: ['Mon', 'Tue', 'Thu'],
    education: 'Johns Hopkins School of Medicine',
    bio: "Dr. Emily Rodriguez specializes in fertility treatments and reproductive health. With her extensive experience in reproductive endocrinology, she has helped countless families overcome fertility challenges. Her research contributions have advanced the field of reproductive medicine.",
    languages: ['English', 'Portuguese'],
    image: '/images/img_placeholder_image_3.png',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: "Women's Health Specialist",
    experience: '8 years',
    rating: 4.5,
    reviews: 87,
    price: 70,
    availability: ['Wed', 'Fri', 'Sat'],
    education: 'Yale School of Medicine',
    bio: "Dr. James Wilson is dedicated to comprehensive women's healthcare across all life stages. His approach emphasizes preventative care, hormonal health, and addressing both physical and emotional aspects of women's wellbeing.",
    languages: ['English'],
    image: '/images/img_placeholder_image_4.png',
  },
  {
    id: 5,
    name: 'Dr. Aisha Patel',
    specialty: 'Gynecological Surgeon',
    experience: '14 years',
    rating: 4.9,
    reviews: 145,
    price: 90,
    availability: ['Mon', 'Thu', 'Fri'],
    education: 'University of California, San Francisco',
    bio: "Dr. Aisha Patel is a skilled gynecological surgeon specializing in minimally invasive procedures. Her expertise includes laparoscopic surgery, hysteroscopy, and robotic surgery for various gynecological conditions. She's known for her precise technique and excellent patient outcomes.",
    languages: ['English', 'Hindi', 'Gujarati'],
    image: '/images/img_placeholder_image_5.png',
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'Sexual Health Specialist',
    experience: '11 years',
    rating: 4.6,
    reviews: 93,
    price: 80,
    availability: ['Tue', 'Wed', 'Sat'],
    education: 'Columbia University College of Physicians and Surgeons',
    bio: "Dr. Robert Kim specializes in sexual health counseling and treatment. He provides a safe, non-judgmental environment for patients to discuss intimate concerns. His expertise includes addressing sexual dysfunction, STI prevention and treatment, and promoting overall sexual wellbeing.",
    languages: ['English', 'Korean'],
    image: '/images/img_placeholder_image_6.png',
  },
];

const BookConsultant = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [priceRange, setPriceRange] = useState(100);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect for filtering
  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

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

  // Get unique specialties for filter
  const specialties = ['All', ...new Set(doctorsData.map(doctor => doctor.specialty))];

  // Filter doctors based on search, specialty and price
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesPrice = doctor.price <= priceRange;
    
    return matchesSearch && matchesSpecialty && matchesPrice;
  });

  // Sort doctors based on selected option
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default: recommended (sort by a combination of rating and reviews)
    return (b.rating * b.reviews) - (a.rating * a.reviews);
  });

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailModal(true);
  };

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleFilterChange = () => {
    triggerAnimation();
  };

  return (
    <div className="min-h-screen bg-white">
      <CustomerHeader user={user} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#e8f7f8] to-[#e8edf8] py-16">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-merriweather font-bold text-[#02090a] mb-4">
              Book a Consultation
            </h1>
            <p className="text-lg font-opensans text-gray-600 max-w-2xl mx-auto">
              Connect with our experienced healthcare professionals for personalized advice and care. Choose from our network of specialists and schedule a consultation today.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="bg-[#f8f3e8] rounded-xl shadow-md p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search Box */}
            <div>
              <label htmlFor="search" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                Search Doctors
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or specialty"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <label htmlFor="specialty" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                id="specialty"
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="price" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                Max Price: ${priceRange}
              </label>
              <input
                type="range"
                id="price"
                min="50"
                max="100"
                step="5"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(Number(e.target.value));
                  handleFilterChange();
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="sort" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h2 className="text-2xl font-merriweather font-bold text-[#02090a] mb-6">
            Available Healthcare Professionals 
            {sortedDoctors.length > 0 && 
              <span className="text-lg font-opensans font-normal text-gray-600 ml-2">
                ({sortedDoctors.length} found)
              </span>
            }
          </h2>

          {sortedDoctors.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <img 
                src="/images/img_no_results.svg" 
                alt="No results" 
                className="h-32 mx-auto mb-4 opacity-60"
              />
              <h3 className="text-xl font-merriweather font-bold text-[#02090a] mb-2">
                No doctors found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search terms to find more healthcare professionals.
              </p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isAnimating ? 'animate-pulse' : ''}`}>
              {sortedDoctors.map(doctor => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                  onViewDetails={() => handleViewDetails(doctor)}
                  onBookNow={() => handleBookNow(doctor)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <DoctorDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          doctor={selectedDoctor}
          onBookNow={() => {
            setShowDetailModal(false);
            setShowBookingModal(true);
          }}
        />
      )}

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          doctor={selectedDoctor}
        />
      )}

      <Footer />
    </div>
  );
};

export default BookConsultant; 