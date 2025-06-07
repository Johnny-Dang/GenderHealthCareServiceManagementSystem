import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useNavigate } from 'react-router-dom';
import CycleCalendar from './components/CycleCalendar';
import CycleForm from './components/CycleForm';
import CycleStats from './components/CycleStats';
import Notifications from './components/Notifications';

const MenstrualCycleTracking = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    lastPeriod: null,
    cycleLength: 28,
    periodLength: 5,
    notifications: true,
    pillReminder: false,
    pillTime: '08:00',
  });
  
  const [cycleData, setCycleData] = useState({
    ovulationDay: null,
    fertileDays: [],
    nextPeriod: null,
    pillReminders: [],
  });

  // Calculate cycle data based on user input
  useEffect(() => {
    if (userData.lastPeriod) {
      const lastPeriodDate = new Date(userData.lastPeriod);
      
      // Calculate ovulation day (typically 14 days before the next period)
      const ovulationDate = new Date(lastPeriodDate);
      ovulationDate.setDate(lastPeriodDate.getDate() + Math.floor(userData.cycleLength / 2));
      
      // Calculate fertile window (typically 5 days before ovulation and the day of ovulation)
      const fertileDays = [];
      for (let i = -5; i <= 0; i++) {
        const fertileDate = new Date(ovulationDate);
        fertileDate.setDate(ovulationDate.getDate() + i);
        fertileDays.push(fertileDate.toISOString().split('T')[0]);
      }
      
      // Calculate next period
      const nextPeriod = new Date(lastPeriodDate);
      nextPeriod.setDate(lastPeriodDate.getDate() + userData.cycleLength);
      
      // Generate pill reminders if enabled
      const pillReminders = [];
      if (userData.pillReminder) {
        const currentDate = new Date();
        for (let i = 0; i < 30; i++) {
          const reminderDate = new Date(currentDate);
          reminderDate.setDate(currentDate.getDate() + i);
          pillReminders.push({
            date: reminderDate.toISOString().split('T')[0],
            time: userData.pillTime,
            taken: false
          });
        }
      }
      
      setCycleData({
        ovulationDay: ovulationDate.toISOString().split('T')[0],
        fertileDays,
        nextPeriod: nextPeriod.toISOString().split('T')[0],
        pillReminders
      });
    }
  }, [userData]);

  const handleUserDataChange = (newData) => {
    setUserData({ ...userData, ...newData });
  };

  const markPillAsTaken = (date) => {
    setCycleData({
      ...cycleData,
      pillReminders: cycleData.pillReminders.map(pill => 
        pill.date === date ? { ...pill, taken: true } : pill
      )
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <h1 className="text-[42px] font-merriweather font-bold text-[#02090a] mb-8">
            Menstrual Cycle Tracker
          </h1>
          <p className="text-[18px] font-opensans mb-12 text-[#02090a]">
            Track your menstrual cycle to get insights about ovulation timing, pregnancy possibility, and birth control pill reminders.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-[#feeaeb] p-6 rounded-xl shadow-md">
              <CycleForm 
                userData={userData} 
                onDataChange={handleUserDataChange} 
              />
              <CycleCalendar 
                lastPeriod={userData.lastPeriod}
                periodLength={userData.periodLength}
                cycleLength={userData.cycleLength}
                ovulationDay={cycleData.ovulationDay}
                fertileDays={cycleData.fertileDays}
                nextPeriod={cycleData.nextPeriod}
              />
            </div>
            <div className="md:col-span-1">
              <CycleStats 
                userData={userData}
                cycleData={cycleData}
              />
              <Notifications 
                cycleData={cycleData}
                markPillAsTaken={markPillAsTaken}
                userData={userData}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenstrualCycleTracking; 