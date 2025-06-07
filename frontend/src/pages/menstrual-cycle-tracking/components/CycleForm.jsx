import React, { useState } from 'react';

const CycleForm = ({ userData, onDataChange }) => {
  const [formData, setFormData] = useState({
    lastPeriod: userData.lastPeriod || '',
    cycleLength: userData.cycleLength || 28,
    periodLength: userData.periodLength || 5,
    notifications: userData.notifications || true,
    pillReminder: userData.pillReminder || false,
    pillTime: userData.pillTime || '08:00'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataChange(formData);
  };

  return (
    <div className="mb-8">
      <h2 className="text-[28px] font-merriweather font-bold mb-6 text-[#02090a]">
        Cycle Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[16px] font-opensans font-medium mb-2 text-[#02090a]">
              First day of last period
            </label>
            <input
              type="date"
              name="lastPeriod"
              value={formData.lastPeriod}
              onChange={handleInputChange}
              className="w-full p-3 border border-[#b122bf75] rounded-lg focus:outline-none focus:border-[#22b8bf] font-opensans"
              required
            />
          </div>

          <div>
            <label className="block text-[16px] font-opensans font-medium mb-2 text-[#02090a]">
              Average cycle length (days)
            </label>
            <div className="flex items-center">
              <input
                type="range"
                name="cycleLength"
                min="21"
                max="35"
                step="1"
                value={formData.cycleLength}
                onChange={handleInputChange}
                className="w-full accent-[#22b8bf]"
              />
              <span className="ml-3 font-opensans font-medium text-[18px] text-[#02090a] w-8">
                {formData.cycleLength}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[16px] font-opensans font-medium mb-2 text-[#02090a]">
              Average period length (days)
            </label>
            <div className="flex items-center">
              <input
                type="range"
                name="periodLength"
                min="2"
                max="10"
                step="1"
                value={formData.periodLength}
                onChange={handleInputChange}
                className="w-full accent-[#22b8bf]"
              />
              <span className="ml-3 font-opensans font-medium text-[18px] text-[#02090a] w-8">
                {formData.periodLength}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifications"
                id="notifications"
                checked={formData.notifications}
                onChange={handleInputChange}
                className="w-5 h-5 accent-[#22b8bf]"
              />
              <label htmlFor="notifications" className="ml-2 text-[16px] font-opensans text-[#02090a]">
                Enable cycle notifications
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="pillReminder"
                id="pillReminder"
                checked={formData.pillReminder}
                onChange={handleInputChange}
                className="w-5 h-5 accent-[#22b8bf]"
              />
              <label htmlFor="pillReminder" className="ml-2 text-[16px] font-opensans text-[#02090a]">
                Birth control pill reminders
              </label>
            </div>

            {formData.pillReminder && (
              <div className="pl-7">
                <label className="block text-[16px] font-opensans font-medium mb-2 text-[#02090a]">
                  Reminder time
                </label>
                <input
                  type="time"
                  name="pillTime"
                  value={formData.pillTime}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-[#b122bf75] rounded-lg focus:outline-none focus:border-[#22b8bf] font-opensans"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button 
            type="submit"
            className="bg-gradient-to-r from-[#b122bff4] to-[#9724b75e] text-white py-3 px-8 rounded-lg font-opensans font-medium hover:opacity-90 transition-opacity"
          >
            Update Cycle Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default CycleForm; 