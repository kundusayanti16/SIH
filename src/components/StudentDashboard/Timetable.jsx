import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CalendarDays, Clock, MapPin, Video, BookOpen, Star } from 'lucide-react';

export default function Timetable() {
  const { currentUser, studentGradeClassrooms, enterClassroom } = useSchool();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Mock slot data mapped from classrooms
  const slots = [
    { time: "09:00 AM - 10:00 AM", subject: "Science & Living World", room: "Lab 201", teacher: "Dr. Priya Sharma", isClassTeacher: true, classId: "cls-6-sci", days: ["Monday", "Wednesday", "Friday"] },
    { time: "10:15 AM - 11:15 AM", subject: "Mathematics & Numbers", room: "Room 105", teacher: "Mr. Rajesh Kumar", isClassTeacher: false, classId: "cls-6-math", days: ["Monday", "Tuesday", "Thursday"] },
    { time: "11:30 AM - 12:30 PM", subject: "English Literature", room: "Room 302", teacher: "Ms. Ananya Sen", isClassTeacher: false, classId: "cls-6-eng", days: ["Tuesday", "Thursday", "Friday"] },
    { time: "12:30 PM - 01:30 PM", isBreak: true, label: "🍱 Lunch & Campus Recess" },
    { time: "01:30 PM - 02:30 PM", subject: "Computer Science & AI", room: "IT Lab 1", teacher: "Mr. Vikram Aditya", isClassTeacher: false, classId: "cls-6-comp", days: ["Wednesday", "Friday"] },
    { time: "02:45 PM - 03:30 PM", subject: "Social Science & Civics", room: "Room 112", teacher: "Mrs. Sunita Verma", isClassTeacher: false, classId: "cls-6-sst", days: ["Tuesday", "Thursday"] }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] text-xs font-bold uppercase mb-2">
            <CalendarDays className="w-3.5 h-3.5" /> Official Class Routine
          </div>
          <h1 className="text-2xl font-extrabold text-[#24332C] tracking-tight">
            Weekly Timetable ({currentUser.grade} - Section {currentUser.section})
          </h1>
          <p className="text-xs text-[#718078]">Class periods scheduled for your grade</p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-xl border border-[#E2E8DE] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#5F9F7A] animate-pulse" />
          <span className="text-[#24332C] font-semibold">Current Week: Mon - Fri</span>
        </div>
      </div>

      {/* Routine Grid */}
      <div className="space-y-4">
        {slots.map((slot, idx) => {
          if (slot.isBreak) {
            return (
              <div key={idx} className="p-3 rounded-2xl bg-[#E7F2EB]/50 border border-dashed border-[#CFE4D7] text-center text-xs font-bold text-[#397257]">
                {slot.time} • {slot.label}
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8DE] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#5F9F7A] shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3 rounded-xl bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] shrink-0 font-mono text-xs font-bold text-center min-w-[130px]">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-[#5F9F7A]" />
                  <span>{slot.time}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-[#24332C]">{slot.subject}</h3>
                    {slot.isClassTeacher && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF8E8] text-[#976C09] border border-[#F8DC8E] font-bold flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-[#F4C95D]" /> Class Teacher
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#718078] mt-1">
                    <span>Teacher: <strong className="text-[#24332C]">{slot.teacher}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#5F9F7A]" />
                      {slot.room}
                    </span>
                  </div>
                </div>
              </div>

              {/* Day Badges */}
              <div className="flex items-center gap-1.5 self-start md:self-auto">
                {days.map(d => {
                  const isActiveDay = slot.days?.includes(d);
                  return (
                    <span
                      key={d}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                        isActiveDay
                          ? 'bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7]'
                          : 'bg-[#F6F8F3] text-[#718078] border border-[#E2E8DE]'
                      }`}
                    >
                      {d.substring(0, 3)}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
