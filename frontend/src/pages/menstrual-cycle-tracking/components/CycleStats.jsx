import React from 'react';

const CycleStats = ({ userData, cycleData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
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

  const isFertileToday = () => {
    if (!cycleData.fertileDays || cycleData.fertileDays.length === 0) return false;
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    return cycleData.fertileDays.includes(todayString);
  };

  const isOvulationToday = () => {
    if (!cycleData.ovulationDay) return false;
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    return cycleData.ovulationDay === todayString;
  };

  const isPeriodToday = () => {
    if (!userData.lastPeriod) return false;
    
    const today = new Date();
    const lastPeriod = new Date(userData.lastPeriod);
    
    const differenceInTime = today.getTime() - lastPeriod.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays >= 0 && differenceInDays < userData.periodLength;
  };

  const getCyclePhase = () => {
    if (!userData.lastPeriod) return 'Unknown';
    
    if (isPeriodToday()) return 'Menstrual';
    if (isOvulationToday()) return 'Ovulation';
    if (isFertileToday()) return 'Fertile';
    
    const today = new Date();
    const lastPeriod = new Date(userData.lastPeriod);
    
    const differenceInTime = today.getTime() - lastPeriod.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    if (differenceInDays >= userData.periodLength && differenceInDays < 14) {
      return 'Follicular';
    } else if (differenceInDays >= 14 && differenceInDays < 21) {
      return 'Luteal';
    } else {
      return 'Pre-menstrual';
    }
  };

  const getPregnancyChance = () => {
    if (isFertileToday()) return 'High';
    if (isOvulationToday()) return 'Peak';
    return 'Low';
  };

  const recommendedActions = () => {
    const phase = getCyclePhase();
    switch(phase) {
      case 'Menstrual':
        return [
          'Consider taking iron-rich foods',
          'Rest if you experience cramps',
          'Stay hydrated'
        ];
      case 'Follicular':
        return [
          'Great time for high-intensity workouts',
          'Energy levels begin to increase',
          'Good time for starting new projects'
        ];
      case 'Ovulation':
        return [
          'Peak fertility day',
          'Good time for physical activity',
          'High energy levels'
        ];
      case 'Fertile':
        return [
          'High fertility window',
          'Use protection if avoiding pregnancy',
          'Track any ovulation symptoms'
        ];
      case 'Luteal':
        return [
          'Consider more rest and recovery',
          'May experience slight mood changes',
          'Focus on self-care'
        ];
      case 'Pre-menstrual':
        return [
          'Prepare for upcoming period',
          'May experience PMS symptoms',
          'Consider reducing caffeine'
        ];
      default:
        return [
          'Track your cycle regularly',
          'Stay hydrated and active',
          'Note any symptoms or changes'
        ];
    }
  };

  return (
    <div className="bg-[#feeaeb] p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-[24px] font-merriweather font-bold mb-4 text-[#02090a]">
        Cycle Insights
      </h2>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-[18px] font-merriweather font-semibold mb-2 text-[#02090a]">
            Current Phase
          </h3>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${getCyclePhase() === 'Fertile' || getCyclePhase() === 'Ovulation' ? 'bg-[#22b8bf]' : 'bg-[#b122bf75]'}`}></div>
            <p className="text-[16px] font-opensans text-[#02090a]">
              {getCyclePhase()} Phase
            </p>
          </div>
        </div>

        {cycleData.ovulationDay && (
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-[18px] font-merriweather font-semibold mb-2 text-[#02090a]">
              Ovulation Day
            </h3>
            <p className="text-[16px] font-opensans text-[#02090a]">
              {formatDate(cycleData.ovulationDay)}
              {getDaysUntil(cycleData.ovulationDay) > 0 && (
                <span className="ml-2 text-[14px] text-[#22b8bf] font-medium">
                  (in {getDaysUntil(cycleData.ovulationDay)} days)
                </span>
              )}
              {getDaysUntil(cycleData.ovulationDay) === 0 && (
                <span className="ml-2 text-[14px] text-[#22b8bf] font-medium">
                  (today)
                </span>
              )}
            </p>
          </div>
        )}

        {cycleData.nextPeriod && (
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-[18px] font-merriweather font-semibold mb-2 text-[#02090a]">
              Next Period
            </h3>
            <p className="text-[16px] font-opensans text-[#02090a]">
              {formatDate(cycleData.nextPeriod)}
              {getDaysUntil(cycleData.nextPeriod) > 0 && (
                <span className="ml-2 text-[14px] text-[#b122bf75] font-medium">
                  (in {getDaysUntil(cycleData.nextPeriod)} days)
                </span>
              )}
              {getDaysUntil(cycleData.nextPeriod) === 0 && (
                <span className="ml-2 text-[14px] text-[#b122bf75] font-medium">
                  (today)
                </span>
              )}
            </p>
          </div>
        )}

        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-[18px] font-merriweather font-semibold mb-2 text-[#02090a]">
            Pregnancy Chance Today
          </h3>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              getPregnancyChance() === 'Low' 
                ? 'bg-green-500' 
                : getPregnancyChance() === 'High'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}></div>
            <p className="text-[16px] font-opensans text-[#02090a]">
              {getPregnancyChance()}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-[18px] font-merriweather font-semibold mb-2 text-[#02090a]">
            Recommended Actions
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {recommendedActions().map((action, index) => (
              <li key={index} className="text-[15px] font-opensans text-[#02090a]">
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CycleStats; 