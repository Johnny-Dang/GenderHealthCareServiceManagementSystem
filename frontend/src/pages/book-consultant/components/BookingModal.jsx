import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, CreditCard, Smartphone, AlertCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';

const BookingModal = ({ isOpen, onClose, doctor }) => {
  const [step, setStep] = useState(1); // 1: Date & Time, 2: Details, 3: Payment, 4: Confirmation
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: '',
    contactMethod: 'video',
    agreeToTerms: false,
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardName: '',
    savePaymentInfo: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  if (!isOpen || !doctor) return null;

  // Generate available dates (next 7 days)
  const availableDates = [];
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Only include days that the doctor is available
    // If no availability info or empty array, include all days
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (!doctor.availability || doctor.availability.length === 0 || doctor.availability.includes(dayName)) {
      const formattedDate = date.toISOString().split('T')[0];
      availableDates.push({
        value: formattedDate,
        label: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      });
    }
  }

  // Ensure there's at least one date available (fallback)
  if (availableDates.length === 0) {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    availableDates.push({
      value: formattedDate,
      label: tomorrow.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    });
  }

  // Generate time slots (9 AM to 5 PM, 1-hour intervals)
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    timeSlots.push({
      value: `${hour}:00`,
      label: `${formattedHour}:00 ${amPm}`
    });
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user fixes the field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.date) newErrors.date = 'Please select a date';
      if (!formData.time) newErrors.time = 'Please select a time';
    } else if (step === 2) {
      if (!formData.reason.trim()) newErrors.reason = 'Please enter your reason for consultation';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    } else if (step === 3) {
      if (formData.paymentMethod === 'credit-card') {
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Please enter your card number';
        else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
          newErrors.cardNumber = 'Please enter a valid 16-digit card number';
          
        if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Please enter expiry date';
        else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) 
          newErrors.cardExpiry = 'Please use MM/YY format';
          
        if (!formData.cardCVV.trim()) newErrors.cardCVV = 'Please enter CVV';
        else if (!/^\d{3,4}$/.test(formData.cardCVV)) 
          newErrors.cardCVV = 'CVV must be 3 or 4 digits';
          
        if (!formData.cardName.trim()) newErrors.cardName = 'Please enter name on card';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate a random booking ID
        const generatedBookingId = `BK${Math.floor(100000 + Math.random() * 900000)}`;
        setBookingId(generatedBookingId);
        
        // Success: Move to confirmation step
        setStep(4);
      } catch (err) {
        // Use err instead of error to avoid linter error
        console.error("Payment processing failed:", err);
        setErrors({ submit: 'Failed to process payment. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatAppointmentDetails = () => {
    const date = new Date(formData.date);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    // Format time (converting 24h to 12h format)
    const [hours] = formData.time.split(':');
    const hourNum = parseInt(hours, 10);
    const formattedHour = hourNum % 12 === 0 ? 12 : hourNum % 12;
    const amPm = hourNum < 12 ? 'AM' : 'PM';
    const formattedTime = `${formattedHour}:00 ${amPm}`;
    
    return { formattedDate, formattedTime };
  };

  // Format credit card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format card expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Header with Close Button */}
        <div className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] p-4 flex items-center justify-between text-white">
          <h3 className="text-xl font-merriweather font-bold">
            {step === 4 ? 'Booking Confirmed' : 'Book Consultation'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-center mb-6">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-[#22b8bf] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-12 h-1 ${
                    step > stepNumber ? 'bg-[#22b8bf]' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-2 mb-6">
            <span>Select Date</span>
            <span>Details</span>
            <span>Payment</span>
            <span>Confirm</span>
          </div>
        </div>
        
        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto flex-1 px-6 pb-6">
          {step === 1 && (
            <div className="animate-fadeIn">
              {/* Doctor Info */}
              <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                <img
                  src={doctor.image || "/images/img_placeholder_image_286x286.png"}
                  alt={doctor.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  onError={(e) => {
                    e.target.src = "/images/img_placeholder_image_286x286.png";
                  }}
                />
                <div>
                  <h4 className="text-lg font-merriweather font-bold text-[#02090a]">
                    {doctor.name}
                  </h4>
                  <p className="text-[#22b8bf]">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm">${doctor.price}/hour</p>
                </div>
              </div>
              
              {/* Step Instructions */}
              <p className="text-lg font-merriweather font-semibold mb-6">
                Select your preferred date and time
              </p>
              
              {/* Date Selection */}
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <select
                  id="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`w-full px-4 py-2 rounded-md border ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent`}
                >
                  <option value="" disabled>Select a date</option>
                  {availableDates.map(date => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
                {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
              </div>
              
              {/* Time Selection */}
              <div className="mb-8">
                <label htmlFor="time" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                  Appointment Time <span className="text-red-500">*</span>
                </label>
                <select
                  id="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className={`w-full px-4 py-2 rounded-md border ${errors.time ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent`}
                >
                  <option value="" disabled>Select a time</option>
                  {timeSlots.map(time => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
              </div>
              
              {/* Information Notes */}
              <div className="bg-[#e8f7f8] p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Note:</span> Appointments can be canceled or rescheduled up to 24 hours before the scheduled time without any charges.
                </p>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="animate-fadeIn">
              <p className="text-lg font-merriweather font-semibold mb-6">
                Enter consultation details
              </p>
              
              {/* Reason for Consultation */}
              <div className="mb-6">
                <label htmlFor="reason" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                  Reason for Consultation <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  placeholder="Please describe your health concerns or reasons for this consultation"
                  className={`w-full px-4 py-2 rounded-md border ${errors.reason ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent h-24`}
                ></textarea>
                {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason}</p>}
              </div>
              
              {/* Additional Notes */}
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any other information you'd like to share with the doctor"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent h-24"
                ></textarea>
              </div>
              
              {/* Contact Method */}
              <div className="mb-6">
                <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.contactMethod === 'video'}
                      onChange={() => handleInputChange('contactMethod', 'video')}
                      className="rounded-full text-[#22b8bf] focus:ring-[#22b8bf] h-4 w-4"
                    />
                    <span className="text-gray-700">Video Call</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.contactMethod === 'voice'}
                      onChange={() => handleInputChange('contactMethod', 'voice')}
                      className="rounded-full text-[#22b8bf] focus:ring-[#22b8bf] h-4 w-4"
                    />
                    <span className="text-gray-700">Voice Call</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.contactMethod === 'in-person'}
                      onChange={() => handleInputChange('contactMethod', 'in-person')}
                      className="rounded-full text-[#22b8bf] focus:ring-[#22b8bf] h-4 w-4"
                    />
                    <span className="text-gray-700">In-Person Visit</span>
                  </label>
                </div>
              </div>
              
              {/* Terms & Conditions */}
              <div className="mb-6">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className={`mt-1 rounded text-[#22b8bf] focus:ring-[#22b8bf] h-4 w-4 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the terms and conditions, including the cancellation policy and privacy notice.
                  </span>
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>}
              </div>
              
              {/* Booking Summary */}
              <div className="bg-[#f8f3e8] p-4 rounded-lg mb-6">
                <h4 className="text-sm font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialty:</span>
                    <span className="font-medium">{doctor.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatAppointmentDetails().formattedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{formatAppointmentDetails().formattedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-medium">${doctor.price}</span>
                  </div>
                </div>
              </div>
              
              {/* Error Message */}
              {errors.submit && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="animate-fadeIn">
              <p className="text-lg font-merriweather font-semibold mb-6">
                Payment Information
              </p>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-opensans font-medium text-gray-700 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => handleInputChange('paymentMethod', 'credit-card')}
                    className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                      formData.paymentMethod === 'credit-card' 
                        ? 'border-[#22b8bf] bg-[#e8f7f8]' 
                        : 'border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mr-2 text-[#22b8bf]" />
                    <span>Credit Card</span>
                  </div>
                  <div
                    onClick={() => handleInputChange('paymentMethod', 'mobile')}
                    className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                      formData.paymentMethod === 'mobile' 
                        ? 'border-[#22b8bf] bg-[#e8f7f8]' 
                        : 'border-gray-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mr-2 text-[#22b8bf]" />
                    <span>Mobile Payment</span>
                  </div>
                </div>
              </div>
              
              {formData.paymentMethod === 'credit-card' && (
                <>
                  {/* Card Number */}
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        if (formatted.length <= 19) { // 16 digits + 3 spaces
                          handleInputChange('cardNumber', formatted);
                        }
                      }}
                      className={`w-full px-4 py-2 rounded-md border ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent`}
                      maxLength={19}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                  </div>
                  
                  {/* Card Details Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                        Expiry Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d]/g, '');
                          if (value.length <= 4) {
                            handleInputChange('cardExpiry', formatExpiryDate(value));
                          }
                        }}
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent`}
                        maxLength={5}
                      />
                      {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="cardCVV" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardCVV"
                        placeholder="123"
                        value={formData.cardCVV}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d]/g, '');
                          if (value.length <= 4) {
                            handleInputChange('cardCVV', value);
                          }
                        }}
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.cardCVV ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent`}
                        maxLength={4}
                      />
                      {errors.cardCVV && <p className="mt-1 text-sm text-red-500">{errors.cardCVV}</p>}
                    </div>
                  </div>
                  
                  {/* Name on Card */}
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-sm font-opensans font-medium text-gray-700 mb-1">
                      Name on Card <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className={`w-full px-4 py-2 rounded-md border ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-[#22b8bf] focus:border-transparent`}
                    />
                    {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
                  </div>
                  
                  {/* Save Payment Info */}
                  <div className="mb-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.savePaymentInfo}
                        onChange={(e) => handleInputChange('savePaymentInfo', e.target.checked)}
                        className="rounded text-[#22b8bf] focus:ring-[#22b8bf] h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">Save this card for future payments</span>
                    </label>
                  </div>
                </>
              )}
              
              {formData.paymentMethod === 'mobile' && (
                <div className="text-center p-6 border rounded-lg mb-6">
                  <img 
                    src="/images/qr-code-placeholder.png" 
                    alt="Payment QR Code"
                    className="w-48 h-48 mx-auto mb-4"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200x200?text=Scan+QR+Code";
                    }}
                  />
                  <p className="text-gray-700 mb-2">Scan this QR code with your mobile payment app</p>
                  <p className="text-sm text-gray-500">Amount: <span className="font-semibold">${doctor.price}</span></p>
                </div>
              )}
              
              {/* Security Notice */}
              <div className="flex items-start bg-yellow-50 p-3 rounded-lg mb-6">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Your payment information is encrypted and secure. We never store your complete card details on our servers.
                </p>
              </div>
              
              {/* Booking Summary */}
              <div className="bg-[#f8f3e8] p-4 rounded-lg mb-6">
                <h4 className="text-sm font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialty:</span>
                    <span className="font-medium">{doctor.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatAppointmentDetails().formattedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{formatAppointmentDetails().formattedTime}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-gray-600 font-semibold">Total:</span>
                    <span className="font-medium">${doctor.price}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="text-center py-4 animate-fadeIn">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              
              <h4 className="text-xl font-merriweather font-bold text-green-600 mb-2">
                Appointment Confirmed!
              </h4>
              <p className="text-gray-600 mb-2">
                Your appointment has been successfully scheduled.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Booking Reference: <span className="font-semibold">{bookingId}</span>
              </p>
              
              <div className="bg-[#f8f3e8] p-6 rounded-lg mx-auto max-w-md mb-6 text-left">
                <h5 className="font-merriweather font-semibold mb-4 text-center">Appointment Details</h5>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-[#e8f7f8] p-2 rounded-md mr-3">
                      <Calendar className="w-5 h-5 text-[#22b8bf]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-[#02090a] font-medium">{formatAppointmentDetails().formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#e8f7f8] p-2 rounded-md mr-3">
                      <Clock className="w-5 h-5 text-[#22b8bf]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="text-[#02090a] font-medium">{formatAppointmentDetails().formattedTime}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <p className="text-sm text-gray-500 mb-1">Doctor</p>
                    <div className="flex items-center">
                      <img
                        src={doctor.image || "/images/img_placeholder_image_286x286.png"}
                        alt={doctor.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                        onError={(e) => {
                          e.target.src = "/images/img_placeholder_image_286x286.png";
                        }}
                      />
                      <div>
                        <p className="font-medium text-[#02090a]">{doctor.name}</p>
                        <p className="text-sm text-[#22b8bf]">{doctor.specialty}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <p className="text-sm text-gray-500 mb-1">Consultation Method</p>
                    <p className="text-[#02090a] font-medium capitalize">{formData.contactMethod === 'in-person' ? 'In-person Visit' : `${formData.contactMethod} Call`}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#e8f7f8] p-4 rounded-lg mb-6 max-w-md mx-auto">
                <h5 className="font-medium text-center mb-3">What's Next?</h5>
                <ul className="text-sm text-left space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-[#22b8bf] rounded-full mr-2 mt-1 flex-shrink-0"></span>
                    <span>A confirmation email has been sent to your registered email address</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-[#22b8bf] rounded-full mr-2 mt-1 flex-shrink-0"></span>
                    <span>You'll receive a reminder 24 hours before your appointment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-[#22b8bf] rounded-full mr-2 mt-1 flex-shrink-0"></span>
                    <span>For video/voice calls, check your email for connection details</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                Need to make changes? You can manage your appointments in your profile.
              </p>
            </div>
          )}
        </div>
        
        {/* Footer with Action Buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          {step === 1 && (
            <>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-gray-300 text-gray-700 px-5"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleNextStep}
                className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] px-8"
              >
                Continue
              </Button>
            </>
          )}
          
          {step === 2 && (
            <>
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="border-gray-300 text-gray-700"
              >
                Back
              </Button>
              <Button 
                variant="primary" 
                onClick={handleNextStep}
                className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] px-8"
              >
                Continue to Payment
              </Button>
            </>
          )}
          
          {step === 3 && (
            <>
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="border-gray-300 text-gray-700"
              >
                Back
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] px-8"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Confirm & Pay'
                )}
              </Button>
            </>
          )}
          
          {step === 4 && (
            <Button 
              variant="primary" 
              onClick={onClose}
              className="mx-auto bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] px-8"
            >
              Done
            </Button>
          )}
        </div>
      </div>
      
      {/* Overlay Click to Close */}
      <div 
        className="fixed inset-0 z-[99]" 
        onClick={step === 4 ? onClose : undefined}
      ></div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BookingModal; 