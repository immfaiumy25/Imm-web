"use client";

import React, { useState, useEffect } from 'react';

// Example events
const dummyEvents = [
  { date: new Date(2026, 7, 15), title: 'Kajian Rutin NDP', time: '15:30 WIB', location: 'Masjid KH Ahmad Dahlan' },
  { date: new Date(2026, 7, 20), title: 'Rapat Bidang Organisasi', time: '20:00 WIB', location: 'Sekretariat IMM' },
  { date: new Date(2026, 7, 25), title: 'Diskusi Isu Terkini', time: '16:00 WIB', location: 'Plaza Bintang' },
  { date: new Date(2026, 7, 2), title: 'Darul Arqam Dasar', time: '08:00 WIB', location: 'Pusbang' },
  { date: new Date(2026, 7, 3), title: 'Darul Arqam Dasar', time: '08:00 WIB', location: 'Pusbang' },
  { date: new Date(2026, 7, 4), title: 'Darul Arqam Dasar', time: '08:00 WIB', location: 'Pusbang' },
];

export default function IMMCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());
    setSelectedDate(new Date());
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

  // Selected date events
  const selectedDayEvents = dummyEvents.filter(
    e => e.date.getDate() === selectedDate.getDate() && 
         e.date.getMonth() === selectedDate.getMonth() && 
         e.date.getFullYear() === selectedDate.getFullYear()
  );

  const days = [];
  
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="p-2 md:p-4 border-b border-r border-gray-100 bg-gray-50/30 min-h-[80px] md:min-h-[100px]"></div>
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
    const isSelected = selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
    const currentDayDate = new Date(year, month, i);
    
    // Check if this date has events to show a small dot
    const hasEvents = dummyEvents.some(
      e => e.date.getDate() === i && e.date.getMonth() === month && e.date.getFullYear() === year
    );

    days.push(
      <div 
        key={`day-${i}`} 
        onClick={() => setSelectedDate(currentDayDate)}
        className={`p-2 md:p-4 border-b border-r border-gray-100 min-h-[80px] md:min-h-[100px] transition-colors cursor-pointer hover:bg-red-50/50 flex flex-col items-center justify-center relative
        ${isToday && !isSelected ? 'bg-red-50/30' : 'bg-white'}
        ${isSelected ? 'bg-red-50' : ''}`}
      >
        <span className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-lg md:text-xl font-normal transition-all
          ${isSelected ? 'bg-[#6d0100] text-white shadow-md scale-110' : 
            isToday ? 'border border-[#6d0100] text-[#6d0100]' : 'text-gray-700'}`}>
          {i}
        </span>
        {hasEvents && !isSelected && (
          <div className="absolute bottom-2 md:bottom-3 w-1.5 h-1.5 rounded-full bg-[#f8cf0f]"></div>
        )}
      </div>
    );
  }

  const remainingSlots = (7 - ((firstDay + daysInMonth) % 7)) % 7;
  for (let i = 0; i < remainingSlots; i++) {
    days.push(
      <div key={`empty-end-${i}`} className="p-2 md:p-4 border-b border-r border-gray-100 bg-gray-50/30 min-h-[80px] md:min-h-[100px]"></div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
      
      {/* Calendar Area (2 parts) */}
      <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-[#6d0100] text-white gap-4">
          <div className="flex flex-col">
            <h3 className="text-2xl md:text-3xl font-serif font-normal">{monthNames[month]} {year}</h3>
            <p className="text-white/70 text-sm mt-1 font-normal">Kalender Kegiatan Komisariat</p>
          </div>
          <div className="flex gap-2 bg-black/20 p-1.5 rounded-lg backdrop-blur-sm">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-white/20 rounded-md transition-colors" aria-label="Bulan Sebelumnya">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => { setCurrentDate(new Date()); setSelectedDate(new Date()); }} className="px-4 py-2 hover:bg-white/20 rounded-md transition-colors text-sm font-normal tracking-wide">
              Hari Ini
            </button>
            <button onClick={handleNextMonth} className="p-2 hover:bg-white/20 rounded-md transition-colors" aria-label="Bulan Berikutnya">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {dayNames.map((day, idx) => (
            <div key={day} className={`p-3 text-center text-xs md:text-sm font-normal tracking-wider ${idx === 0 ? 'text-red-600' : 'text-gray-600'}`}>
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{day.slice(0, 3)}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 bg-gray-100/50 flex-grow">
          {days}
        </div>
      </div>

      {/* Agenda Area (1 part) */}
      <div className="w-full lg:w-1/3 bg-[#f8f9fa] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <h4 className="text-xl font-serif text-[#6d0100] font-normal mb-1">Agenda Harian</h4>
          <p className="text-sm text-gray-500 font-normal">
            {dayNames[selectedDate.getDay()]}, {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </p>
        </div>
        
        <div className="p-6 flex-grow">
          {selectedDayEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDayEvents.map((evt, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#f8cf0f]">
                  <h5 className="font-normal text-lg text-[#280000] mb-2">{evt.title}</h5>
                  {evt.time && (
                    <div className="flex items-center text-sm text-gray-500 mb-1 font-normal">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {evt.time}
                    </div>
                  )}
                  {evt.location && (
                    <div className="flex items-center text-sm text-gray-500 font-normal">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {evt.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 opacity-70 mt-10">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-normal text-lg">Tidak ada agenda</p>
              <p className="text-sm font-normal mt-1">pada tanggal ini</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
