import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { 
  School, 
  PlusCircle, 
  KeyRound, 
  Bell, 
  LogOut, 
  User, 
  ChevronDown, 
  Sparkles, 
  CheckCircle, 
  BookOpen,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ onOpenCreateClass, onOpenJoinClass }) {
  const { currentUser, logout, activeTab, setActiveTab, setActiveClassroomId } = useSchool();
  const { t, localizeText, localizeGrade } = useLanguage();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  if (!currentUser) return null;

  const isStudent = currentUser.role === 'student';
  const isTeacher = currentUser.role === 'teacher';
  const isParent = currentUser.role === 'parent';

  return (
    <nav className="sticky top-0 z-40 bg-white/95 dark:bg-[#101B16]/95 backdrop-blur-xl border-b border-[#E2E8DE] dark:border-[#1E3027] px-4 sm:px-6 py-3 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Brand Logo & Current Portal Badge */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setActiveTab('overview');
              setActiveClassroomId(null);
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#397257] via-[#5F9F7A] to-[#3AA6A0] flex items-center justify-center shadow-md shadow-[#5F9F7A]/25 group-hover:scale-105 transition-transform">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-[#24332C] dark:text-[#EAF2ED] group-hover:text-[#5F9F7A] transition-colors">
                  Grasp
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase border ${
                  isStudent 
                    ? 'bg-[#E7F2EB] dark:bg-[#152e23] text-[#397257] dark:text-[#6ec493] border-[#CFE4D7] dark:border-[#204a37]' 
                    : isTeacher
                    ? 'bg-[#EBF8F7] dark:bg-[#152e2a] text-[#24706C] dark:text-[#4ecbc4] border-[#ACE3E0] dark:border-[#204a43]'
                    : 'bg-[#FEF8E8] dark:bg-[#2d2410] text-[#976C09] dark:text-[#F4C95D] border-[#F8DC8E] dark:border-[#4b3c1a]'
                }`}>
                  {isStudent ? (t('studentSpace') || 'Student Space') : isTeacher ? (t('teacherStudio') || 'Teacher Studio') : (t('parentPortal') || 'Parent Portal')}
                </span>
              </div>
              <p className="text-[11px] text-[#718078] dark:text-[#95ADA0]">
                {isStudent 
                  ? `${t('gradeAndSec') || 'Grade & Sec'}: ${currentUser.grade} • Sec ${currentUser.section}` 
                  : isTeacher
                  ? `${localizeText(currentUser.department || 'Faculty')}`
                  : `Child: ${currentUser.childName} (${currentUser.childGrade})`
                }
              </p>
            </div>
          </button>
        </div>

        {/* Center/Right: Actions and Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Action Button: Create Class for Teacher */}
          {isTeacher && (
            <button
              onClick={onOpenCreateClass}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white text-xs font-bold shadow-md shadow-[#5F9F7A]/20 transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t('createClassroom') || 'Create Classroom'}</span>
              <span className="sm:hidden">{t('newClass') || 'New'}</span>
            </button>
          )}

          {/* Action Button: Join with Code for Student */}
          {isStudent && (
            <button
              onClick={onOpenJoinClass}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#3AA6A0] to-[#24706C] hover:from-[#2C8782] hover:to-[#1F5B58] text-white text-xs font-bold shadow-md shadow-[#3AA6A0]/20 transition-all hover:scale-105 active:scale-95"
            >
              <KeyRound className="w-4 h-4" />
              <span className="hidden sm:inline">{t('joinWithCode') || 'Join with Code'}</span>
              <span className="sm:hidden">{t('join') || 'Join'}</span>
            </button>
          )}

          {/* Language Switcher */}
          <LanguageSelector variant="button" />

          {/* Theme Toggle Button */}
          <ThemeToggle variant="button" />

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="p-2 rounded-xl bg-[#F6F8F3] dark:bg-[#162720] hover:bg-[#E7F2EB] dark:hover:bg-[#1e342b] text-[#24332C] dark:text-[#EAF2ED] border border-[#E2E8DE] dark:border-[#253D33] relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-[#718078] dark:text-[#95ADA0]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F4C95D] animate-pulse" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-[#14221C] border border-[#E2E8DE] dark:border-[#253D33] shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8DE] dark:border-[#253D33] mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#24332C] dark:text-[#EAF2ED]">
                    {t('liveAlerts') || 'Live Campus Alerts'}
                  </span>
                  <span className="text-[10px] bg-[#E7F2EB] dark:bg-[#152e23] text-[#397257] dark:text-[#6ec493] px-2 py-0.5 rounded-full font-bold">
                    {t('newAlerts') || '3 New'}
                  </span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#253D33]">
                    <p className="font-semibold text-[#24332C] dark:text-[#EAF2ED]">Science Lab Demo Live</p>
                    <p className="text-[#718078] dark:text-[#95ADA0] text-[11px] mt-0.5">Dr. Priya Sharma started live stream for Class 6A.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#253D33]">
                    <p className="font-semibold text-[#24332C] dark:text-[#EAF2ED]">Maths Assignment Due</p>
                    <p className="text-[#718078] dark:text-[#95ADA0] text-[11px] mt-0.5">Fractions problem set due in 2 days.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white dark:bg-[#162720] hover:bg-[#F6F8F3] dark:hover:bg-[#1e342b] border border-[#E2E8DE] dark:border-[#253D33] transition-all text-left shadow-sm"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover border border-[#CFE4D7] dark:border-[#2d473c]"
              />
              <div className="hidden md:block">
                <div className="text-xs font-bold text-[#24332C] dark:text-[#EAF2ED] truncate max-w-[120px]">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-[#718078] dark:text-[#95ADA0]">
                  {isStudent ? localizeGrade(currentUser.grade) : (currentUser.isClassTeacher ? (t('classTeacherInCharge') || 'Class Teacher') : (t('subjectFaculty') || 'Faculty'))}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#718078] dark:text-[#95ADA0]" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#14221C] border border-[#E2E8DE] dark:border-[#253D33] shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 rounded-xl bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#253D33] mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    {isStudent ? (
                      <GraduationCap className="w-4 h-4 text-[#5F9F7A]" />
                    ) : (
                      <BookOpen className="w-4 h-4 text-[#3AA6A0]" />
                    )}
                    <span className="text-xs font-bold text-[#24332C] dark:text-[#EAF2ED]">{currentUser.name}</span>
                  </div>
                  <p className="text-[11px] text-[#718078] dark:text-[#95ADA0]">{currentUser.email}</p>
                  <div className="mt-2 pt-2 border-t border-[#E2E8DE] dark:border-[#253D33] flex items-center justify-between text-[11px]">
                    <span className="text-[#718078] dark:text-[#95ADA0]">{t('role') || 'Role'}:</span>
                    <span className="font-semibold text-[#5F9F7A] capitalize">{currentUser.role}</span>
                  </div>
                  {isStudent && (
                    <div className="flex items-center justify-between text-[11px] mt-1">
                      <span className="text-[#718078] dark:text-[#95ADA0]">{t('gradeAndSec') || 'Grade & Sec'}:</span>
                      <span className="font-bold text-[#397257] dark:text-[#6ec493]">{currentUser.grade} - {currentUser.section}</span>
                    </div>
                  )}
                  {isTeacher && currentUser.isClassTeacher && (
                    <div className="flex items-center justify-between text-[11px] mt-1">
                      <span className="text-[#718078] dark:text-[#95ADA0]">{t('inCharge') || 'In Charge'}:</span>
                      <span className="font-bold text-[#DDAA2E]">{currentUser.classTeacherOf}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>{t('logOut') || 'Log Out / Switch Portal'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </nav>
  );
}
