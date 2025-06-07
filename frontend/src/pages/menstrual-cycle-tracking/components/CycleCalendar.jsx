import React, { useState, useEffect } from 'react';

const CycleCalendar = ({ 
  lastPeriod, 
  periodLength, 
  cycleLength, 
  ovulationDay,
  fertileDays,
  nextPeriod 
}) => {
  const [calendar, setCalendar] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  // Generate calendar days
  useEffect(() => {
    if (!lastPeriod) return;
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, type: 'empty' });
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      
      const lastPeriodDate = new Date(lastPeriod);
      const periodEndDate = new Date(lastPeriod);
      periodEndDate.setDate(lastPeriodDate.getDate() + periodLength - 1);
      
      // Next period calculation
      const nextPeriodDate = new Date(lastPeriodDate);
      nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);
      
      const nextPeriodEndDate = new Date(nextPeriodDate);
      nextPeriodEndDate.setDate(nextPeriodDate.getDate() + periodLength - 1);
      
      // Ovulation day calculation
      const ovulationDate = new Date(lastPeriodDate);
      ovulationDate.setDate(lastPeriodDate.getDate() + Math.floor(cycleLength / 2));
      const ovulationDateString = ovulationDate.toISOString().split('T')[0];

      // Fertile days calculation (more detailed)
      const fertileDaysDetailed = [];
      // 5 days before ovulation and ovulation day
      for (let i = -5; i <= 1; i++) {
        const fertileDate = new Date(ovulationDate);
        fertileDate.setDate(ovulationDate.getDate() + i);
        fertileDaysDetailed.push({
          date: fertileDate.toISOString().split('T')[0],
          daysFromOvulation: i
        });
      }

      // Check different date types
      let type = 'regular';
      
      // Check if this is a test pregnancy date (7 days after ovulation)
      const pregnancyTestDate = new Date(ovulationDate);
      pregnancyTestDate.setDate(ovulationDate.getDate() + 7);
      const isPregnancyTestDay = 
        date.getFullYear() === pregnancyTestDate.getFullYear() &&
        date.getMonth() === pregnancyTestDate.getMonth() &&
        date.getDate() === pregnancyTestDate.getDate();
      
      if (isPregnancyTestDay) {
        type = 'pregnancy-test';
      }
      
      // Check if this day is in the first period
      else if (date >= lastPeriodDate && date <= periodEndDate) {
        type = 'period';
      }
      
      // Check if this day is in the next period
      else if (date >= nextPeriodDate && date <= nextPeriodEndDate) {
        type = 'next-period';
      }
      
      // Check if this is ovulation day
      else if (dateString === ovulationDateString) {
        type = 'ovulation';
      }
      
      // Check detailed fertile days
      else {
        const detailedFertileDay = fertileDaysDetailed.find(fd => fd.date === dateString);
        
        if (detailedFertileDay) {
          switch (detailedFertileDay.daysFromOvulation) {
            case -5:
              type = 'fertile-start';
              break;
            case -4:
              type = 'fertile-second';
              break;
            case -3:
              type = 'fertile-third';
              break;
            case -2:
              type = 'fertile-high';
              break;
            case -1:
              type = 'fertile-highest';
              break;
            case 1:
              type = 'fertile-decreasing';
              break;
            default:
              type = 'fertile';
          }
        } else {
          // Safe days
          const dayAfterPeriod = new Date(periodEndDate);
          dayAfterPeriod.setDate(periodEndDate.getDate() + 1);
          
          const dayBeforeFertile = new Date(ovulationDate);
          dayBeforeFertile.setDate(ovulationDate.getDate() - 6);
          
          const dayAfterFertile = new Date(ovulationDate);
          dayAfterFertile.setDate(ovulationDate.getDate() + 2);
          
          const dayBeforeNextPeriod = new Date(nextPeriodDate);
          dayBeforeNextPeriod.setDate(nextPeriodDate.getDate() - 1);
          
          if ((date > dayAfterPeriod && date < dayBeforeFertile) || 
              (date > dayAfterFertile && date < dayBeforeNextPeriod)) {
            // Determine if it's absolutely safe or relatively safe
            if ((date > dayAfterPeriod && date < dayBeforeFertile) && 
                (dayBeforeFertile.getTime() - date.getTime()) > 172800000) { // More than 2 days before fertile period
              type = 'safe-absolute';
            } else if ((date > dayAfterFertile && date < dayBeforeNextPeriod) && 
                      (date.getTime() - dayAfterFertile.getTime()) > 172800000) { // More than 2 days after fertile period
              type = 'safe-absolute';
            } else {
              type = 'safe-relative';
            }
          }
        }
      }
      
      days.push({ day, date: dateString, type });
    }
    
    setCalendar(days);
  }, [lastPeriod, periodLength, cycleLength, currentMonth, ovulationDay, fertileDays, nextPeriod]);
  
  // Navigate to previous month
  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };
  
  // Navigate to next month
  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };
  
  // Format month display
  const formatMonth = () => {
    return currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const getDayStyle = (type) => {
    switch(type) {
      case 'period':
        return 'bg-[#b122bf75] text-white';
      case 'next-period':
        return 'bg-[#d680db] text-white';
      case 'ovulation':
        return 'bg-[#ff4d4d] text-white';
      case 'fertile-start':
        return 'bg-[#ffcc00] text-[#02090a]';
      case 'fertile-second':
        return 'bg-[#ffbb00] text-[#02090a]';
      case 'fertile-third':
        return 'bg-[#ffaa00] text-[#02090a]';
      case 'fertile-high':
        return 'bg-[#ff9900] text-[#02090a]';
      case 'fertile-highest':
        return 'bg-[#ff6600] text-white';
      case 'fertile-decreasing':
        return 'bg-[#ff9900] text-[#02090a]';
      case 'safe-relative':
        return 'bg-[#96d2a4] text-[#02090a]';
      case 'safe-absolute':
        return 'bg-[#39ac73] text-white';
      case 'pregnancy-test':
        return 'bg-[#8e44ad] text-white';
      default:
        return 'bg-white text-[#02090a]';
    }
  };

  const getDayIcon = (type) => {
    switch(type) {
      case 'period':
        return '🩸';
      case 'next-period':
        return '🩸';
      case 'ovulation':
        return '⭐';
      case 'fertile-start':
        return '📈';
      case 'fertile-second':
        return '📈';
      case 'fertile-third':
        return '📈';
      case 'fertile-high':
        return '🔺';
      case 'fertile-highest':
        return '🔺';
      case 'fertile-decreasing':
        return '📉';
      case 'safe-relative':
        return '🟢';
      case 'safe-absolute':
        return '✅';
      case 'pregnancy-test':
        return '🧪';
      default:
        return '';
    }
  };

  const getDayDescription = (type) => {
    switch(type) {
      case 'period':
        return 'Ngày có kinh nguyệt: Đây là ngày có kỳ kinh nguyệt của bạn';
      case 'next-period':
        return 'Ngày có kinh nguyệt (chu kỳ tiếp theo): Đây là ngày dự kiến có kỳ kinh nguyệt của bạn';
      case 'fertile-start':
        return 'Ngày bắt đầu có khả năng thụ thai: Đây là ngày đầu trong giai đoạn có khả năng thụ thai của bạn';
      case 'fertile-second':
        return 'Ngày có khả năng thụ thai: Ngày thứ hai trong giai đoạn có khả năng thụ thai của bạn';
      case 'fertile-third':
        return 'Ngày có khả năng thụ thai';
      case 'fertile-high':
        return 'Ngày có khả năng thụ thai cao: Hai ngày trước khi trứng rụng, bạn sẽ có nhiều khả năng thụ thai vào ngày này';
      case 'fertile-highest':
        return 'Ngày có khả năng thụ thai cao: Một ngày trước khi trứng rụng, bạn sẽ có nhiều khả năng thụ thai vào ngày này';
      case 'ovulation':
        return 'Ngày trứng rụng, có khả năng thụ thai cao nhất: Dựa trên thời gian về chu kỳ kinh nguyệt bạn cung, đây là ngày trứng rụng nên khả năng thụ thai của ngày này là cao nhất';
      case 'fertile-decreasing':
        return 'Tỷ lệ thụ thai giảm: Một ngày sau ngày trứng rụng, tỷ lệ thụ thai bắt đầu giảm';
      case 'safe-relative':
        return 'Ngày an toàn tương đối: Ngày an toàn tương đối là những ngày trong chu kỳ kinh nguyệt khi khả năng thụ thai thấp hơn, nhưng không hoàn toàn loại trừ vẫn có thể thụ thai thành công';
      case 'safe-absolute':
        return 'Ngày an toàn tuyệt đối: Ngày an toàn tuyệt đối là những ngày trong chu kỳ kinh nguyệt của phụ nữ được coi là an toàn nhất để quan hệ tình dục mà không cần sử dụng biện pháp tránh thai, vì khả năng mang thai là cực kỳ thấp';
      case 'pregnancy-test':
        return 'Thử thai: Một tuần sau khi thụ tinh, bạn nên dùng các biện pháp thử thai để kiểm tra kết quả thụ tinh có thành công hay không nhé.';
      default:
        return '';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[28px] font-merriweather font-bold text-[#02090a]">
          Cycle Calendar
        </h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-[18px] font-opensans font-medium text-[#02090a]">
            {formatMonth()}
          </span>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 border border-[#b122bf20]">
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-opensans font-medium p-2">
              {day}
            </div>
          ))}
          
          {calendar.map((day, index) => (
            <div 
              key={index} 
              className={`aspect-square p-1 ${day.day ? 'border border-[#f2f2f2] cursor-pointer' : ''} rounded-md`}
              onClick={() => day.day && handleDayClick(day)}
            >
              {day.day && (
                <div className={`h-full flex flex-col items-center justify-center rounded-md ${getDayStyle(day.type)}`}>
                  <span className="text-[14px] font-opensans">{day.day}</span>
                  <span className="text-sm">{getDayIcon(day.type)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedDay && (
        <div className="mt-4 bg-white p-4 rounded-lg border border-[#b122bf20]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[18px] font-merriweather font-semibold text-[#02090a]">
                {selectedDay.date}
              </h3>
              <p className="text-[15px] font-opensans text-[#02090a] mt-2">
                {getDayDescription(selectedDay.type)}
              </p>
            </div>
            <button 
              onClick={() => setSelectedDay(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#b122bf75]"></div>
          <span className="text-[14px] font-opensans text-[#02090a]">Kinh nguyệt 🩸</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ff4d4d]"></div>
          <span className="text-[14px] font-opensans text-[#02090a]">Ngày rụng trứng ⭐</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ffaa00]"></div>
          <span className="text-[14px] font-opensans text-[#02090a]">Ngày có khả năng thụ thai 📈</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ff6600]"></div>
          <span className="text-[14px] font-opensans text-[#02090a]">Khả năng thụ thai cao 🔺</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#96d2a4]"></div>
          <span className="text-[14px] font-opensans text-[#02090a]">An toàn tương đối 🟢</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#39ac73]"></div>
          <span className="text-[14px] font-opensans text-[#02090a]">An toàn tuyệt đối ✅</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#8e44ad]"></div>
          <span className="text-[14px] font-opensans text-[#02090a]">Ngày thử thai 🧪</span>
        </div>
      </div>
    </div>
  );
};

export default CycleCalendar; 