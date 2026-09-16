import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  PlusCircle, 
  BookOpen, 
  Video, 
  Users, 
  Award, 
  CheckCircle2, 
  Clock, 
  Star, 
  Megaphone, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Send, 
  Wand2, 
  Search 
} from 'lucide-react';

export default function TeacherOverview({ onOpenCreateClass, onLaunchVideoStudio }) {
  const { 
    currentUser, 
    teacherMyClassrooms, 
    enterClassroom, 
    toggleLiveClass, 
    addAnnouncement,
    students 
  } = useSchool();

  const { t, localizeText, localizeSubject, localizeGrade, selectedLanguageCode } = useLanguage();

  const [broadcastText, setBroadcastText] = useState('');
  const [teacherTopic, setTeacherTopic] = useState('');

  // Class teacher grade students (e.g. Class 6 students if Priya is 6A Class Teacher)
  const myGradeStudents = students.filter(s => 
    currentUser.classTeacherOf ? currentUser.classTeacherOf.includes(s.grade) : true
  );

  const handleClassTeacherBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;

    // Broadcast to all teacher's classrooms
    teacherMyClassrooms.forEach(c => {
      addAnnouncement(c.id, broadcastText.trim(), localizeText("Class Teacher Priority Notice"));
    });

    setBroadcastText('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#397257] via-[#5F9F7A] to-[#3AA6A0] text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" /> {t('facultyAcademicCommand')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('welcomeTeacher')}, {currentUser.name}! 📚
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-white/90 max-w-xl">
              {localizeText(currentUser.title || 'Senior Mathematics Educator')}. {t('createClassroomsForGrades')}
            </p>
          </div>

          <button
            onClick={onOpenCreateClass}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-[#397257] text-xs font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4 text-[#5F9F7A]" />
            <span>{t('createNewClassroom')}</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#162720] border border-[#E2E8DE] dark:border-[#253D33] shadow-sm text-center">
          <span className="text-[10px] uppercase font-bold text-[#718078] dark:text-[#95ADA0] block mb-1">
            {t('teachingClasses')}
          </span>
          <span className="text-xl font-extrabold text-[#24332C] dark:text-[#EAF2ED]">{teacherMyClassrooms.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#162720] border border-[#E2E8DE] dark:border-[#253D33] shadow-sm text-center">
          <span className="text-[10px] uppercase font-bold text-[#718078] dark:text-[#95ADA0] block mb-1">
            {t('activeStudents')}
          </span>
          <span className="text-xl font-extrabold text-[#3AA6A0]">{currentUser.totalStudents || 140}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#162720] border border-[#E2E8DE] dark:border-[#253D33] shadow-sm text-center">
          <span className="text-[10px] uppercase font-bold text-[#718078] dark:text-[#95ADA0] block mb-1">
            {t('classTeacherInCharge')}
          </span>
          <span className="text-xs font-extrabold text-[#976C09] dark:text-[#F4C95D] truncate block mt-1">
            {currentUser.isClassTeacher ? localizeGrade(currentUser.classTeacherOf) : t('subjectFaculty')}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#162720] border border-[#E2E8DE] dark:border-[#253D33] shadow-sm text-center">
          <span className="text-[10px] uppercase font-bold text-[#718078] dark:text-[#95ADA0] block mb-1">
            {t('department')}
          </span>
          <span className="text-xs font-extrabold text-[#5F9F7A] truncate block mt-1">
            {localizeText(currentUser.department?.split(' ')[0] || 'Mathematics')}
          </span>
        </div>
      </div>

      {/* ✨ Faculty Dynamic AI Video Lesson Studio Quick Bar */}
      <div className="bg-gradient-to-r from-white via-[#EBF8F7] to-[#E7F2EB] dark:from-[#162720] dark:via-[#193229] dark:to-[#14231c] rounded-3xl p-5 sm:p-6 border border-[#CFE4D7] dark:border-[#253D33] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#3AA6A0] text-white shadow-sm">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#24332C] dark:text-[#EAF2ED]">
                {t('createAssignAIVideo')}
              </h3>
              <p className="text-[11px] text-[#718078] dark:text-[#95ADA0]">
                {t('createAssignAIVideoDesc')}
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#3AA6A0]/20 text-[#24706C] dark:text-[#4ecbc4] border border-[#3AA6A0]/40 self-start sm:self-auto">
            ✨ {t('facultyVideoGen')}
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onLaunchVideoStudio) onLaunchVideoStudio(teacherTopic || "Newton's Laws");
          }}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718078]" />
            <input
              type="text"
              value={teacherTopic}
              onChange={(e) => setTeacherTopic(e.target.value)}
              placeholder={t('topicPlaceholderTeacher')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#101B16] border border-[#CFE4D7] dark:border-[#253D33] text-xs text-[#24332C] dark:text-[#EAF2ED] placeholder-[#718078] focus:border-[#3AA6A0] focus:ring-2 focus:ring-[#3AA6A0]/20 outline-none transition-all font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3AA6A0] to-[#24706C] hover:from-[#2C8782] hover:to-[#1F5B58] text-white text-xs font-bold shadow-md shadow-[#3AA6A0]/20 transition-all flex items-center justify-center gap-1.5 shrink-0 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
            <span>{t('generateAndAssign')}</span>
          </button>
        </form>
      </div>

      {/* Class Teacher Dedicated Broadcast Section */}
      {currentUser.isClassTeacher && (
        <div className="bg-white dark:bg-[#162720] rounded-2xl p-5 border border-[#E2E8DE] dark:border-[#253D33] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FEF8E8] dark:bg-[#2d2410] text-[#976C09] dark:text-[#F4C95D] border border-[#F8DC8E] dark:border-[#4b3c1a]">
                <Star className="w-5 h-5 fill-[#F4C95D]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#24332C] dark:text-[#EAF2ED]">
                  {t('broadcastCenter')} ({localizeGrade(currentUser.classTeacherOf)})
                </h3>
                <p className="text-xs text-[#718078] dark:text-[#95ADA0]">
                  {t('broadcastDesc')}
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-[#976C09] dark:text-[#F4C95D] bg-[#FEF8E8] dark:bg-[#2d2410] px-3 py-1 rounded-full border border-[#F8DC8E] dark:border-[#4b3c1a]">
              {myGradeStudents.length} {t('studentsInRoster')}
            </span>
          </div>

          <form onSubmit={handleClassTeacherBroadcast} className="flex gap-2">
            <input
              type="text"
              placeholder={t('postNoticePlaceholder')}
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              className="flex-1 p-2.5 rounded-xl bg-[#F6F8F3] dark:bg-[#101B16] border border-[#E2E8DE] dark:border-[#253D33] text-[#24332C] dark:text-[#EAF2ED] text-xs focus:outline-none focus:border-[#5F9F7A] placeholder:text-[#718078]"
            />
            <button
              type="submit"
              disabled={!broadcastText.trim()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#5F9F7A] hover:bg-[#4D8A67] disabled:opacity-50 text-white text-xs font-bold transition-all shrink-0 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('broadcastNotice')}</span>
            </button>
          </form>
        </div>
      )}

      {/* Grid: My Managed Teaching Classes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#5F9F7A]" />
              <span>{t('myTeachingClassrooms')}</span>
            </h2>
            <p className="text-xs text-[#718078] dark:text-[#95ADA0]">{t('allClassroomsManaged')}</p>
          </div>

          <button
            onClick={onOpenCreateClass}
            className="text-xs font-bold text-[#5F9F7A] hover:text-[#397257] flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t('addGradeClass')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teacherMyClassrooms.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-[#162720] rounded-2xl border border-[#E2E8DE] dark:border-[#253D33] hover:border-[#5F9F7A] transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-[#397257] to-[#5F9F7A] text-white relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/25 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                    {localizeGrade(c.grade)} • {t('sectionLabel') || 'Sec'} {c.section}
                  </span>
                  {c.isClassTeacherClass && (
                    <span className="text-[10px] font-bold bg-[#F4C95D] text-[#24332C] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-[#24332C]" /> {t('classTeacherSubject')}
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
                  <p className="text-xs text-[#718078] dark:text-[#95ADA0] line-clamp-2 leading-relaxed">
                    {localizeText(c.description)}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-[#718078] dark:text-[#95ADA0]">
                    <Clock className="w-3.5 h-3.5 text-[#5F9F7A]" />
                    <span className="text-[11px]">{localizeText(c.schedule)}</span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E2E8DE] dark:border-[#253D33] flex items-center justify-between text-xs text-[#718078] dark:text-[#95ADA0]">
                    <span>{t('code')}: <code className="font-mono text-[#397257] dark:text-[#6ec493] font-bold bg-[#E7F2EB] dark:bg-[#152e23] px-1.5 py-0.5 rounded border border-[#CFE4D7] dark:border-[#204a37]">{c.code}</code></span>
                    <span>{c.enrolledStudentIds?.length || 0} {t('studentsCount')}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-[#E2E8DE] dark:border-[#253D33] flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleLiveClass(c.id, `${localizeSubject(c.subject)} - Live Session`)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      c.liveSession?.isActive
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-[#F6F8F3] dark:bg-[#101B16] hover:bg-[#E7F2EB] dark:hover:bg-[#182B23] text-[#24332C] dark:text-[#EAF2ED] border border-[#E2E8DE] dark:border-[#253D33]'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>{c.liveSession?.isActive ? t('liveStreamOn') : t('startLive')}</span>
                  </button>

                  <button
                    onClick={() => enterClassroom(c.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5F9F7A] hover:bg-[#4D8A67] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>{t('manageClass')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
