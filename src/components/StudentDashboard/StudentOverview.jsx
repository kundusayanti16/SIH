import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BookOpen,
  Video,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  Users,
  ArrowRight,
  Star,
  Sparkles,
  AlertCircle,
  Radio,
  Wand2,
  Zap,
  Search
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function StudentOverview({ onOpenJoinClass, onOpenDiscover, onLaunchVideoStudio }) {
  const {
    currentUser,
    studentEnrolledClassrooms,
    studentGradeClassrooms,
    enterClassroom,
    teachers
  } = useSchool();
  const { t, localizeSubject, localizeGrade, localizeText } = useLanguage();

  const [quickTopic, setQuickTopic] = useState('');

  // Find class teacher for this student's grade
  const classTeacher = teachers.find(t =>
    t.isClassTeacher && t.classTeacherOf?.includes(currentUser.grade)
  );

  // Check if any classroom currently has a live lecture
  const liveClass = studentGradeClassrooms.find(c => c.liveSession?.isActive);

  // Unjoined classes in student's grade
  const unjoinedCount = studentGradeClassrooms.length - studentEnrolledClassrooms.length;

  const handleQuickGenerate = (e) => {
    e?.preventDefault();
    if (onLaunchVideoStudio) {
      onLaunchVideoStudio(quickTopic || 'Photosynthesis');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">

      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#397257] via-[#5F9F7A] to-[#3AA6A0] text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" /> {localizeGrade(currentUser.grade)} • {t('sectionLabel', 'Section')} {currentUser.section} {t('studentSpace', 'Student Space')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('welcomeBack', 'Welcome back')}, {currentUser.name}! 🌟
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-white/90 max-w-xl">
              {t('studentWelcomeDesc', 'You are viewing all subjects and instructors assigned to your grade. Stay updated with your class teacher and live lectures.')}
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[95px] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-white/80 block">{t('statAttendance', 'Attendance')}</span>
              <span className="text-base font-extrabold text-[#F4C95D]">{currentUser.attendance}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[95px] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-white/80 block">{t('statGPA', 'Grade GPA')}</span>
              <span className="text-base font-extrabold text-white">{currentUser.gpa.split('/')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ AI Instant Topic-to-Video Generator Quick Bar */}
      <div className="bg-gradient-to-r from-white via-[#E7F2EB] to-[#EBF8F7] dark:from-[#14221C] dark:via-[#1A2C24] dark:to-[#14221C] rounded-3xl p-5 sm:p-6 border border-[#CFE4D7] dark:border-[#22382E] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#5F9F7A] text-white shadow-sm">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#24332C] dark:text-[#EAF2ED]">
                {t('needHelpTitle', 'Need Help Understanding Any Subject Topic?')}
              </h3>
              <p className="text-[11px] text-[#718078] dark:text-[#95ADA0]">
                {t('needHelpDesc', 'Type any topic and our AI will dynamically create an animated video lesson with audio voiceover!')}
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#5F9F7A]/20 text-[#397257] dark:text-[#5F9F7A] border border-[#5F9F7A]/40 self-start sm:self-auto">
            ✨ {t('generateAIVideo', 'Instant AI Video Gen')}
          </span>
        </div>

        <form onSubmit={handleQuickGenerate} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718078]" />
            <input
              type="text"
              value={quickTopic}
              onChange={(e) => setQuickTopic(e.target.value)}
              placeholder={t('inputTopicPlaceholder', 'e.g. Photosynthesis, Structure of an Atom, Pythagorean Theorem...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0C1411] border border-[#CFE4D7] dark:border-[#22382E] text-xs text-[#24332C] dark:text-[#EAF2ED] placeholder-[#718078] focus:border-[#5F9F7A] focus:ring-2 focus:ring-[#5F9F7A]/20 outline-none transition-all font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white text-xs font-bold shadow-md shadow-[#5F9F7A]/20 transition-all flex items-center justify-center gap-1.5 shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
            <span>{t('generateAIVideo', 'Create Topic Video')}</span>
          </button>
        </form>
      </div>

      {/* Class Teacher Announcement Spotlight Card */}
      {classTeacher && (
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8DE] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={classTeacher.avatar}
              alt={classTeacher.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-[#5F9F7A] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF8E8] text-[#976C09] border border-[#F8DC8E] font-bold uppercase">
                  {t('yourClassTeacher', '★ Your Class Teacher')}
                </span>
                <span className="text-xs font-bold text-[#24332C]">{classTeacher.name}</span>
              </div>
              <p className="text-xs text-[#718078] mt-0.5">
                {t('headTeacherFor', 'Head Teacher for')} <strong className="text-[#397257]">{localizeGrade(currentUser.grade)}A</strong> • {localizeSubject(classTeacher.subject)}
              </p>
            </div>
          </div>

          <div className="text-xs text-[#718078] sm:text-right">
            <span>{t('cabinLabel', 'Cabin:')} {localizeText(classTeacher.cabin)}</span>
            <span className="block text-[11px] text-[#3AA6A0] font-medium">{classTeacher.email}</span>
          </div>
        </div>
      )}

      {/* Live Class Alert Card (if live) */}
      {liveClass && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500 via-[#3AA6A0] to-[#5F9F7A] text-white border border-rose-400 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse-slow">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center border border-white/30 shrink-0">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-rose-600 font-black uppercase tracking-wider">
                  {t('happeningNow', 'Happening Now')}
                </span>
                <span className="text-xs text-white/90 font-bold">{localizeGrade(liveClass.grade)} • {localizeSubject(liveClass.subject)}</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5">{localizeText(liveClass.liveSession?.title || liveClass.title)}</h3>
              <p className="text-[11px] text-white/80">{t('instructorLabel', 'Instructor:')} {liveClass.teacherName}</p>
            </div>
          </div>

          <button
            onClick={() => enterClassroom(liveClass.id)}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#397257] text-xs font-extrabold shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <Video className="w-4 h-4 text-[#5F9F7A]" />
            <span>{t('joinLiveLecture', 'Join Live Lecture')}</span>
          </button>
        </div>
      )}

      {/* Discover Unjoined Banner if any */}
      {unjoinedCount > 0 && (
        <div className="p-4 rounded-2xl bg-white border border-[#CFE4D7] shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#E7F2EB] text-[#397257]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#24332C]">
                {unjoinedCount} {t('moreClassroomsAvailable', 'More Classrooms available for')} {localizeGrade(currentUser.grade)}!
              </h4>
              <p className="text-[11px] text-[#718078]">
                {t('newSubjectsReady', 'New subjects created by your grade teachers are ready for you to join.')}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenDiscover}
            className="px-3.5 py-1.5 rounded-xl bg-[#5F9F7A] hover:bg-[#4D8A67] text-white text-xs font-bold transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            {t('browseAndJoin', 'Browse & Join')}
          </button>
        </div>
      )}

      {/* Grid: My Enrolled Classrooms (Class 6) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#5F9F7A]" />
              <span>{t('assignedSubjectsTitle', `My ${currentUser.grade} Enrolled Classrooms`)}</span>
            </h2>
            <p className="text-xs text-[#718078] dark:text-[#95ADA0]">{t('assignedSubjectsSubtitle', 'All subjects you are currently attending')}</p>
          </div>

          <span className="text-xs text-[#397257] dark:text-[#5F9F7A] font-semibold bg-[#E7F2EB] dark:bg-[#1A2C24] px-2.5 py-1 rounded-full border border-[#CFE4D7] dark:border-[#22382E]">
            {studentEnrolledClassrooms.length} {t('activeSubjects', 'Active Subjects')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studentEnrolledClassrooms.map((c) => (
            <div
              key={c.id}
              onClick={() => enterClassroom(c.id)}
              className="bg-white dark:bg-[#14221C] rounded-2xl border border-[#E2E8DE] dark:border-[#22382E] hover:border-[#5F9F7A] transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              {/* Header Banner */}
              <div className="p-4 bg-gradient-to-r from-[#397257] to-[#5F9F7A] text-white relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/25 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 text-white">
                    {localizeSubject(c.subject)}
                  </span>
                  {c.isClassTeacherClass && (
                    <span className="text-[10px] font-bold bg-[#F4C95D] text-[#24332C] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-[#24332C]" /> {t('classTeacherNoticeBadge', 'Class Teacher')}
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-base tracking-tight leading-snug line-clamp-1 group-hover:text-white/90">
                  {localizeSubject(c.title)}
                </h3>
                <p className="text-[11px] text-white/80 mt-0.5">{localizeText(c.room)}</p>
              </div>

              {/* Body Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 pb-3 border-b border-[#E2E8DE] dark:border-[#22382E]">
                    <img
                      src={c.teacherAvatar}
                      alt={c.teacherName}
                      className="w-9 h-9 rounded-full object-cover border border-[#CFE4D7] dark:border-[#22382E]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#24332C] dark:text-[#EAF2ED] truncate">{c.teacherName}</div>
                      <div className="text-[10px] text-[#3AA6A0] truncate font-medium">{localizeText(c.teacherRole)}</div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-[#718078] dark:text-[#95ADA0]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#5F9F7A]" />
                      <span className="text-[11px]">{localizeText(c.schedule)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span>{t('tabAssignments', 'Assignments')}: <strong className="text-[#24332C] dark:text-white">{c.assignments?.length || 0}</strong></span>
                      <span>{t('tabMaterials', 'Notes')}: <strong className="text-[#24332C] dark:text-white">{c.materials?.length || 0}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Enter Button */}
                <div className="pt-3 border-t border-[#E2E8DE] dark:border-[#22382E] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#718078] dark:text-[#95ADA0]">{c.code}</span>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-[#5F9F7A] group-hover:text-[#397257] dark:group-hover:text-[#7BC39A]">
                    <span>{t('viewClassBtn', 'Enter Class')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
