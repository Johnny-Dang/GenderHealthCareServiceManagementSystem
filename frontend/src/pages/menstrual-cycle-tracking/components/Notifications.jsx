import React from 'react';

const Notifications = ({ cycleData, markPillAsTaken, userData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntil = (dateString) => {
    if (!dateString) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(dateString);
    
    const differenceInTime = targetDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays;
  };

  const getNotificationText = (type, date) => {
    const daysUntil = getDaysUntil(date);
    
    if (daysUntil === 0) {
      switch (type) {
        case 'period':
          return 'Your period is expected to start today';
        case 'ovulation':
          return 'Today is your ovulation day';
        case 'fertile':
          return 'You are in your fertile window today';
        default:
          return '';
      }
    } else if (daysUntil === 1) {
      switch (type) {
        case 'period':
          return 'Your period is expected to start tomorrow';
        case 'ovulation':
          return 'Tomorrow is your ovulation day';
        case 'fertile':
          return 'Your fertile window starts tomorrow';
        default:
          return '';
      }
    } else if (daysUntil > 0 && daysUntil <= 3) {
      switch (type) {
        case 'period':
          return `Your period is expected to start in ${daysUntil} days`;
        case 'ovulation':
          return `Your ovulation day is in ${daysUntil} days`;
        case 'fertile':
          return `Your fertile window starts in ${daysUntil} days`;
        default:
          return '';
      }
    }
    
    return '';
  };

  // Get upcoming notifications
  const getUpcomingNotifications = () => {
    if (!cycleData.nextPeriod && !cycleData.ovulationDay) return [];
    
    const notifications = [];
    
    // Period notification
    if (cycleData.nextPeriod) {
      const periodDaysUntil = getDaysUntil(cycleData.nextPeriod);
      if (periodDaysUntil >= 0 && periodDaysUntil <= 3) {
        notifications.push({
          type: 'period',
          date: cycleData.nextPeriod,
          message: getNotificationText('period', cycleData.nextPeriod)
        });
      }
    }
    
    // Ovulation notification
    if (cycleData.ovulationDay) {
      const ovulationDaysUntil = getDaysUntil(cycleData.ovulationDay);
      if (ovulationDaysUntil >= 0 && ovulationDaysUntil <= 3) {
        notifications.push({
          type: 'ovulation',
          date: cycleData.ovulationDay,
          message: getNotificationText('ovulation', cycleData.ovulationDay)
        });
      }
    }
    
    // Fertile days notifications
    if (cycleData.fertileDays && cycleData.fertileDays.length > 0) {
      const earliestFertileDay = cycleData.fertileDays[0];
      const fertileDaysUntil = getDaysUntil(earliestFertileDay);
      
      if (fertileDaysUntil >= 0 && fertileDaysUntil <= 3) {
        notifications.push({
          type: 'fertile',
          date: earliestFertileDay,
          message: getNotificationText('fertile', earliestFertileDay)
        });
      }
    }
    
    return notifications;
  };

  // Get today's pill reminder if any
  const getTodayPillReminder = () => {
    if (!userData.pillReminder || !cycleData.pillReminders || cycleData.pillReminders.length === 0) {
      return null;
    }
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    return cycleData.pillReminders.find(pill => pill.date === todayString);
  };

  const todayPill = getTodayPillReminder();
  const upcomingNotifications = getUpcomingNotifications();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-[24px] font-merriweather font-bold mb-4 text-[#02090a]">
        Notifications
      </h2>

      {/* Pill Reminder */}
      {userData.pillReminder && (
        <div className={`p-4 rounded-lg mb-4 ${todayPill && !todayPill.taken ? 'bg-[#22b8bf20]' : 'bg-[#f2f2f2]'}`}>
          <h3 className="text-[18px] font-merriweather font-semibold mb-2 text-[#02090a]">
            Birth Control Pill
          </h3>
          
          {todayPill ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-[16px] font-opensans text-[#02090a]">
                  Take your pill at {userData.pillTime}
                </p>
                {!todayPill.taken && (
                  <button 
                    onClick={() => markPillAsTaken(todayPill.date)}
                    className="bg-[#22b8bf] text-white px-3 py-1 rounded text-sm font-opensans hover:bg-opacity-90 transition-colors"
                  >
                    Mark as Taken
                  </button>
                )}
                {todayPill.taken && (
                  <span className="text-green-500 text-[14px] font-opensans font-medium">
                    ✓ Taken
                  </span>
                )}
              </div>
            </>
          ) : (
            <p className="text-[16px] font-opensans text-[#02090a]">
              No pill reminder for today
            </p>
          )}
        </div>
      )}

      {/* Cycle Notifications */}
      <div className="space-y-4">
        {upcomingNotifications.length > 0 ? (
          upcomingNotifications.map((notification, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                notification.type === 'period' 
                  ? 'border-[#b122bf75] bg-[#feeaeb]' 
                  : notification.type === 'ovulation'
                    ? 'border-[#22b8bf] bg-[#e8f7f8]'
                    : 'border-[#8124b79b] bg-[#f3d3f3]'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[16px] font-merriweather font-semibold text-[#02090a]">
                    {notification.type === 'period' 
                      ? 'Period Alert' 
                      : notification.type === 'ovulation'
                        ? 'Ovulation Alert'
                        : 'Fertility Alert'
                    }
                  </h3>
                  <p className="text-[15px] font-opensans text-[#02090a]">
                    {notification.message}
                  </p>
                </div>
                <div className="text-[14px] font-opensans text-[#02090a70] bg-white px-2 py-1 rounded">
                  {formatDate(notification.date)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[16px] font-opensans text-[#02090a] text-center py-4">
            No upcoming alerts at this time
          </p>
        )}
      </div>

      {!userData.lastPeriod && (
        <div className="mt-4 bg-[#f2f2f2] p-4 rounded-lg">
          <p className="text-[16px] font-opensans text-[#02090a] text-center">
            Enter your cycle information to see notifications
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications; 