import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { 
  Compass, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  PlusCircle, 
  ArrowRight, 
  Star, 
  Clock, 
  MapPin, 
  Users, 
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';

export default function DiscoverClasses({ onOpenJoinCodeModal }) {
  const { 
    currentUser, 
    studentGradeClassrooms, 
    joinClassroom, 
    enterClassroom 
  } = useSchool();
  const { t, localizeSubject, localizeGrade, localizeText } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');

  const filtered = studentGradeClassrooms.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'All' || c.subject.includes(filterSubject);
    return matchesSearch && matchesSubject;
  });

  const handleJoin = (classId) => {
    joinClassroom(classId);
    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    } catch (err) {}
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#397257] via-[#5F9F7A] to-[#3AA6A0] text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-[#F4C95D]" /> {localizeGrade(currentUser.grade)} {t('studentSpace', 'Hub')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('discoverTitle', 'Discover Classrooms')} - {localizeGrade(currentUser.grade)}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-white/90 max-w-xl">
              {t('discoverSubtitle', 'Explore all active academic classrooms created by teachers for your grade.')}
            </p>
          </div>

          <button
            onClick={onOpenJoinCodeModal}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#397257] font-bold text-xs shadow-md flex items-center gap-2 shrink-0 transition-all self-start md:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#5F9F7A]" />
            <span>{t('enterWithCode', 'Have a Code? Join Here')}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#718078] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('searchPlaceholderClasses', `Search ${currentUser.grade} subjects or teachers...`)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E2E8DE] text-[#24332C] text-xs placeholder:text-[#718078] focus:outline-none focus:border-[#5F9F7A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Science', 'Mathematics', 'English', 'Computer', 'Social'].map(sub => (
            <button
              key={sub}
              onClick={() => setFilterSubject(sub)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterSubject === sub
                  ? 'bg-[#5F9F7A] text-white shadow-sm'
                  : 'bg-white border border-[#E2E8DE] text-[#718078] hover:text-[#24332C] hover:bg-[#F6F8F3]'
              }`}
            >
              {sub === 'All' ? t('filterAllGrades', 'All') : localizeSubject(sub)}
            </button>
          ))}
        </div>
      </div>

      {/* Classrooms Grid for Grade */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => {
          const isEnrolled = c.enrolledStudentIds?.includes(currentUser.id) || currentUser.enrolledClassIds?.includes(c.id);

          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-[#E2E8DE] hover:border-[#5F9F7A] transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              {/* Header Gradient */}
              <div className="p-4 bg-gradient-to-r from-[#397257] to-[#5F9F7A] text-white relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/25 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                    {localizeSubject(c.subject)}
                  </span>
                  {c.isClassTeacherClass ? (
                    <span className="text-[10px] font-bold bg-[#F4C95D] text-[#24332C] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-[#24332C]" /> {t('classTeacherNoticeBadge', 'Class Teacher')}
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-md">
                      {localizeGrade(c.grade)} • Sec {c.section}
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-base tracking-tight leading-snug line-clamp-1">
                  {localizeSubject(c.title)}
                </h3>
                <p className="text-[11px] text-white/80 mt-0.5">{localizeText(c.room)}</p>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 pb-3 border-b border-[#E2E8DE]">
                    <img
                      src={c.teacherAvatar}
                      alt={c.teacherName}
                      className="w-10 h-10 rounded-full object-cover border border-[#CFE4D7]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#24332C] truncate">{c.teacherName}</div>
                      <div className="text-[10px] text-[#3AA6A0] truncate font-medium">{localizeText(c.teacherRole)}</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#718078] mt-3 line-clamp-2 leading-relaxed">
                    {localizeText(c.description)}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-[#718078]">
                    <Clock className="w-3.5 h-3.5 text-[#5F9F7A]" />
                    <span className="text-[11px]">{localizeText(c.schedule)}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#E2E8DE] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#718078]">{c.code}</span>

                  {isEnrolled ? (
                    <button
                      onClick={() => enterClassroom(c.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] text-xs font-bold hover:bg-[#CFE4D7] transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5F9F7A]" />
                      <span>{t('btnAlreadyEnrolled', 'Enrolled')} • {t('viewClassBtn', 'Enter')}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoin(c.id)}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{t('btnJoinClassroom', 'Join Classroom')}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl p-8 border border-[#E2E8DE] shadow-sm">
          <BookOpen className="w-8 h-8 text-[#718078] mx-auto mb-2" />
          <h3 className="text-sm font-bold text-[#24332C]">No matching classrooms found</h3>
          <p className="text-xs text-[#718078] mt-1">Try searching with a different keyword.</p>
        </div>
      )}

    </div>
  );
}
