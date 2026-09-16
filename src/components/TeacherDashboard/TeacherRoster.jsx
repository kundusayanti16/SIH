import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Users, Search, Phone, Mail, Award, CheckCircle2, ShieldAlert, Star } from 'lucide-react';

export default function TeacherRoster() {
  const { currentUser, students } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState(
    currentUser.classTeacherOf ? currentUser.classTeacherOf.split('-')[0].trim() : 'Class 6'
  );

  const filteredStudents = students.filter(s => {
    const matchesGrade = s.grade === gradeFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] text-xs font-bold uppercase mb-2">
            <Users className="w-3.5 h-3.5" /> Student Directory & Attendance
          </div>
          <h1 className="text-2xl font-extrabold text-[#24332C] tracking-tight">
            Class Roster & Academic Records
          </h1>
          <p className="text-xs text-[#718078]">
            {currentUser.isClassTeacher ? `Official Class Teacher Roster for ${currentUser.classTeacherOf}` : 'Student records and performance'}
          </p>
        </div>

        {/* Grade Filter */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E2E8DE] shadow-sm self-start sm:self-auto">
          {['Class 6', 'Class 8', 'Class 10'].map(g => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                gradeFilter === g ? 'bg-[#5F9F7A] text-white shadow-sm' : 'text-[#718078] hover:text-[#24332C]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#718078] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={`Search ${gradeFilter} students by name or roll...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E2E8DE] text-[#24332C] text-xs placeholder:text-[#718078] focus:outline-none focus:border-[#5F9F7A]"
        />
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((stu) => (
          <div
            key={stu.id}
            className="bg-white rounded-2xl p-5 border border-[#E2E8DE] flex flex-col justify-between space-y-4 shadow-sm hover:border-[#5F9F7A] transition-all"
          >
            <div>
              <div className="flex items-center gap-3.5 pb-3 border-b border-[#E2E8DE]">
                <img
                  src={stu.avatar}
                  alt={stu.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#CFE4D7] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-[#24332C] truncate">{stu.name}</h3>
                  <div className="text-xs text-[#397257] font-semibold flex items-center gap-2 mt-0.5">
                    <span>{stu.grade} - {stu.section}</span>
                    <span className="text-[#718078]">•</span>
                    <span className="text-[#718078]">Roll: {stu.rollNo}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-xs text-[#24332C]">
                <div className="flex items-center justify-between">
                  <span className="text-[#718078]">Attendance:</span>
                  <span className="font-bold text-[#5F9F7A]">{stu.attendance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718078]">Academic GPA:</span>
                  <span className="font-bold text-[#3AA6A0]">{stu.gpa}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718078]">Parent / Guardian:</span>
                  <span className="font-medium text-[#24332C]">{stu.parentName}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#E2E8DE]">
                  <span className="text-[#718078] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#5F9F7A]" /> Phone:
                  </span>
                  <span className="font-mono text-[#24332C]">{stu.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8DE] flex items-center justify-between">
              <span className="text-[11px] text-[#718078]">
                Enrolled in <strong>{stu.enrolledClassIds?.length || 0}</strong> subjects
              </span>
              <button
                onClick={() => alert(`Opening report card for ${stu.name}...`)}
                className="px-3 py-1.5 rounded-xl bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] text-xs font-bold hover:bg-[#CFE4D7] transition-colors"
              >
                Full Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl p-8 border border-[#E2E8DE] text-xs text-[#718078]">
          No students found matching this criteria.
        </div>
      )}

    </div>
  );
}
