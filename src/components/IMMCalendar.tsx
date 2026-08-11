"use client";

import React, { useState, useEffect } from 'react';

// Example events - could be fetched from an API in the future
const dummyEvents = [
  { date: new Date(2026, 7, 15), title: 'Kajian Rutin NDP' }, // August 15, 2026 (Month is 0-indexed)
  { date: new Date(2026, 7, 20), title: 'Rapat Bidang Organisasi' },
  { date: new Date(2026, 7, 25), title: 'Diskusi Isu Terkini' },
  { date: new Date(2026, 7, 2), title: 'Darul Arqam Dasar' },
  { date: new Date(2026, 7, 3), title: 'Darul Arqam Dasar' },
  { date: new Date(2026, 7, 4), title: 'Darul Arqam Dasar' },
];

export default function IMMCalendar() {
  // Use state but initialize with current date to be "real-time"
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch by rendering fully only on client
    setMounted(true);
    setCurrentDate(new Date());
  }, []);

  if (!mounted) return <div className="w-full min-h-[500px] bg-white rounded-2xl animate-pulse"></div>;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();

  // Generate calendar grid
  const days = [];
  
  // Empty slots for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="p-2 md:p-4 border-b border-r border-gray-100 bg-gray-50/30 min-h-[100px] md:min-h-[120px]"></div>
    );
  }

  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
    const currentDayDate = new Date(year, month, i);
    
    // Check if this date has events
    const dayEvents = dummyEvents.filter(
      e => e.date.getDate() === i && e.date.getMonth() === month && e.date.getFullYear() === year
    );

    days.push(
      <div 
        key={`day-${i}`} 
        className={`p-2 md:p-4 border-b border-r border-gray-100 min-h-[100px] md:min-h-[120px] transition-colors hover:bg-red-50/50 flex items-center justify-center
        ${isToday ? 'bg-red-50/30' : 'bg-white'}`}
      >
        <span className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-lg md:text-xl font-medium ${isToday ? 'bg-[#6d0100] text-white shadow-md' : 'text-gray-700'}`}>
          {i}
        </span>
      </div>
    );
  }

  // Fill remaining slots to complete the grid (optional, but makes it perfectly rectangular)
  const remainingSlots = (7 - ((firstDay + daysInMonth) % 7)) % 7;
  for (let i = 0; i < remainingSlots; i++) {
    days.push(
      <div key={`empty-end-${i}`} className="p-2 md:p-4 border-b border-r border-gray-100 bg-gray-50/30 min-h-[100px] md:min-h-[120px]"></div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-[#6d0100] text-white gap-4">
        <div className="flex flex-col">
          <h3 className="text-2xl md:text-3xl font-serif">{monthNames[month]} {year}</h3>
          <p className="text-white/70 text-sm mt-1">Agenda & Jadwal Kegiatan Komisariat</p>
        </div>
        <div className="flex gap-2 bg-black/20 p-1.5 rounded-lg backdrop-blur-sm">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-white/20 rounded-md transition-colors" aria-label="Previous Month">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 hover:bg-white/20 rounded-md transition-colors text-sm font-semibold tracking-wide">
            HARI INI
          </button>
          <button onClick={handleNextMonth} className="p-2 hover:bg-white/20 rounded-md transition-colors" aria-label="Next Month">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {dayNames.map((day, idx) => (
          <div key={day} className={`p-3 text-center text-xs md:text-sm font-bold tracking-wider uppercase ${idx === 0 ? 'text-red-600' : 'text-gray-600'}`}>
            <span className="hidden md:inline">{day}</span>
            <span className="md:hidden">{day.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 bg-gray-100/50">
        {days}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(109, 1, 0, 0.2);
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}
