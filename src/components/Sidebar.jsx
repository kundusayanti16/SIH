import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  CalendarDays,
  FileCheck,
  Video,
  PlusCircle,
  Users,
  Megaphone,
  ClipboardList,
  Layers,
  Wand2,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ onOpenCreateClass, onOpenJoinClass }) {
  const { currentUser, activeTab, setActiveTab, setActiveClassroomId, studentGradeClassrooms, teacherMyClassrooms } = useSchool();
  const { t } = useLanguage();

  if (!currentUser) return null;

  const isStudent = currentUser.role === 'student';
  const isTeacher = currentUser.role === 'teacher';
  const isParent = currentUser.role === 'parent';

  const studentNavItems = [
    { id: 'overview', label: t('studentDashboard') || 'Student Dashboard', icon: LayoutDashboard },
    { id: 'video-generator', label: t('aiVideoStudio') || 'AI Dynamic Video Studio', icon: Wand2, highlight: true, badge: '✨ AI' },
    { id: 'my-classes', label: t('myEnrolledClasses') || 'My Enrolled Classes', icon: BookOpen, badge: currentUser.enrolledClassIds?.length },
    { id: 'discover', label: `${t('browseClasses') || 'Browse Classes'} (${currentUser.grade})`, icon: Compass },
    { id: 'timetable', label: t('classTimetable') || 'Class Timetable', icon: CalendarDays },
    { id: 'assignments', label: t('homeworkSubmissions') || 'Homework & Submissions', icon: FileCheck },
    { id: 'live-classes', label: t('liveVideoLectures') || 'Live Video Lectures', icon: Video, badge: 'Live' }
  ];

  const teacherNavItems = [
    { id: 'overview', label: t('facultyDashboard') || 'Faculty Dashboard', icon: LayoutDashboard },
    { id: 'video-generator', label: `${t('aiVideoStudio') || 'AI Video Studio'} (Create)`, icon: Wand2, highlight: true, badge: '✨ AI' },
    { id: 'teacher-classes', label: t('myManagedClasses') || 'My Managed Classes', icon: Layers, badge: teacherMyClassrooms.length },
    { id: 'timetable', label: t('teachingSchedule') || 'Teaching Schedule', icon: CalendarDays },
    { id: 'grading', label: t('assignmentsGradebook') || 'Assignments & Gradebook', icon: ClipboardList },
    { id: 'roster', label: currentUser.isClassTeacher ? `My ${currentUser.classTeacherOf} Roster` : (t('classRoster') || 'Class Roster'), icon: Users }
  ];

  const parentNavItems = [
    { id: 'overview', label: t('parentDashboardTitle') || 'Parent Dashboard', icon: LayoutDashboard },
    { id: 'video-generator', label: t('aiVideoStudio') || 'AI Learning Videos', icon: Wand2, highlight: true, badge: '✨ AI' },
    { id: 'child-classes', label: `${currentUser.childName}'s Classes`, icon: BookOpen },
    { id: 'attendance-grades', label: t('attendanceReports') || 'Attendance & Reports', icon: ClipboardList },
    { id: 'timetable', label: t('classTimetable') || 'Class Timetable', icon: CalendarDays },
    { id: 'teacher-contact', label: t('teacherNotices') || 'Class Teacher Notices', icon: Users, badge: currentUser.unreadNotices || 2 }
  ];

  const navItems = isStudent ? studentNavItems : isTeacher ? teacherNavItems : parentNavItems;

  return (
    <aside className="w-full md:w-64 bg-white/95 dark:bg-[#101B16] backdrop-blur-xl border-r border-[#E2E8DE] dark:border-[#1E3027] p-4 shrink-0 flex flex-col justify-between transition-colors duration-200 shadow-sm">
      <div>
        {/* User Card Pill */}
        <div className="p-3.5 rounded-2xl bg-[#F6F8F3] dark:bg-[#162720] border border-[#E2E8DE] dark:border-[#253D33] shadow-sm mb-6 transition-colors">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={`w-10 h-10 rounded-xl object-cover border-2 shrink-0 ${
                isStudent ? 'border-[#5F9F7A]' : isTeacher ? 'border-[#3AA6A0]' : 'border-[#F4C95D]'
              }`}
            />
            <div className="min-w-0">
              <h3 className="font-extrabold text-xs text-[#24332C] dark:text-[#EAF2ED] truncate">{currentUser.name}</h3>
              <p className={`text-[11px] font-bold truncate mt-0.5 ${
                isStudent ? 'text-[#397257] dark:text-[#6ec493]' : isTeacher ? 'text-[#24706C] dark:text-[#4ecbc4]' : 'text-[#976C09] dark:text-[#F4C95D]'
              }`}>
                {isStudent
                  ? `${currentUser.grade} • Sec ${currentUser.section}`
                  : isTeacher
                    ? currentUser.title?.split('&')[0]
                    : `Parent of ${currentUser.childName}`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-black uppercase tracking-wider text-[#718078] dark:text-[#88A899] px-3 mb-2.5">
            {t('mainNavigation') || 'Main Navigation'}
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setActiveClassroomId(null);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-[#5F9F7A] to-[#397257] text-white shadow-md shadow-[#5F9F7A]/30'
                    : 'text-[#394B42] dark:text-[#CFDFD7] hover:text-[#182821] dark:hover:text-[#FFFFFF] hover:bg-[#E7F2EB] dark:hover:bg-[#182B23]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${
                    isActive 
                      ? 'text-white' 
                      : item.highlight 
                      ? 'text-[#397257] dark:text-[#5F9F7A]' 
                      : 'text-[#5A6E63] dark:text-[#95ADA0]'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold shrink-0 ${
                    item.badge === 'Live'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800 animate-pulse'
                      : isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-white dark:bg-[#1E3028] text-[#394B42] dark:text-[#CFDFD7] border border-[#E2E8DE] dark:border-[#2D4539]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls & Language Switcher */}
      <div className="mt-8 pt-4 border-t border-[#E2E8DE] dark:border-[#1E3027] space-y-3">
        {/* Language Selector */}
        <LanguageSelector variant="sidebar" />

        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F6F8F3] dark:bg-[#162720] border border-[#E2E8DE] dark:border-[#253D33]">
          <span className="text-xs font-bold text-[#24332C] dark:text-[#EAF2ED]">{t('themeMode') || 'Theme Mode'}</span>
          <ThemeToggle variant="pill" />
        </div>

        {isStudent ? (
          <div className="p-3 rounded-xl bg-[#E7F2EB] dark:bg-[#14281E] border border-[#CFE4D7] dark:border-[#214333] text-xs">
            <span className="font-extrabold text-[#397257] dark:text-[#6ec493] block mb-1">💡 {t('gradeLockActive') || 'Grade-Lock Filter Active'}</span>
            <p className="text-[11px] text-[#4D6357] dark:text-[#A8C7B8] leading-relaxed">
              {t('gradeLockDesc') || `You are currently viewing classes tailored strictly for ${currentUser.grade}.`}
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-[#EBF8F7] dark:bg-[#122725] border border-[#ACE3E0] dark:border-[#1E433F] text-xs">
            <span className="font-extrabold text-[#24706C] dark:text-[#4ecbc4] block mb-1">✨ {t('classCreationReady') || 'Class Creation Ready'}</span>
            <p className="text-[11px] text-[#4D6357] dark:text-[#A8C7B8] leading-relaxed">
              {t('classCreationDesc') || 'Create a classroom for any grade and students will immediately receive access.'}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
