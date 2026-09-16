import React from 'react';
import { useSchool } from '../context/SchoolContext';
import ThemeToggle from './ThemeToggle';
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

  if (!currentUser) return null;

  const isStudent = currentUser.role === 'student';
  const isTeacher = currentUser.role === 'teacher';
  const isParent = currentUser.role === 'parent';

  const studentNavItems = [
    { id: 'overview', label: 'Student Dashboard', icon: LayoutDashboard },
    { id: 'video-generator', label: 'AI Dynamic Video Studio', icon: Wand2, highlight: true, badge: '✨ AI' },
    { id: 'my-classes', label: 'My Enrolled Classes', icon: BookOpen, badge: currentUser.enrolledClassIds?.length },
    { id: 'discover', label: `Browse ${currentUser.grade} Classes`, icon: Compass },
    { id: 'timetable', label: 'Class Timetable', icon: CalendarDays },
    { id: 'assignments', label: 'Homework & Submissions', icon: FileCheck },
    { id: 'live-classes', label: 'Live Video Lectures', icon: Video, badge: 'Live' }
  ];

  const teacherNavItems = [
    { id: 'overview', label: 'Faculty Dashboard', icon: LayoutDashboard },
    { id: 'video-generator', label: 'AI Video Studio (Create)', icon: Wand2, highlight: true, badge: '✨ AI' },
    { id: 'teacher-classes', label: 'My Managed Classes', icon: Layers, badge: teacherMyClassrooms.length },
    { id: 'timetable', label: 'Teaching Schedule', icon: CalendarDays },
    { id: 'grading', label: 'Assignments & Gradebook', icon: ClipboardList },
    { id: 'roster', label: currentUser.isClassTeacher ? `My ${currentUser.classTeacherOf} Roster` : 'Class Roster', icon: Users }
  ];

  const parentNavItems = [
    { id: 'overview', label: 'Parent Dashboard', icon: LayoutDashboard },
    { id: 'video-generator', label: 'AI Learning Videos', icon: Wand2, highlight: true, badge: '✨ AI' },
    { id: 'child-classes', label: `${currentUser.childName}'s Classes`, icon: BookOpen },
    { id: 'attendance-grades', label: 'Attendance & Reports', icon: ClipboardList },
    { id: 'timetable', label: 'Class Timetable', icon: CalendarDays },
    { id: 'teacher-contact', label: 'Class Teacher Notices', icon: Users, badge: currentUser.unreadNotices || 2 }
  ];

  const navItems = isStudent ? studentNavItems : isTeacher ? teacherNavItems : parentNavItems;

  return (
    <aside className="w-full md:w-64 bg-white/70 backdrop-blur-md border-r border-[#E2E8DE] p-4 shrink-0 flex flex-col justify-between">
      <div>
        {/* User Card Pill */}
        <div className="p-3 rounded-2xl bg-white border border-[#E2E8DE] shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={`w-10 h-10 rounded-xl object-cover border-2 shrink-0 ${isStudent ? 'border-[#5F9F7A]' : isTeacher ? 'border-[#3AA6A0]' : 'border-[#F4C95D]'
                }`}
            />
            <div className="min-w-0">
              <h3 className="font-bold text-xs text-[#24332C] truncate">{currentUser.name}</h3>
              <p className={`text-[11px] font-semibold truncate ${isStudent ? 'text-[#397257]' : isTeacher ? 'text-[#24706C]' : 'text-[#976C09]'
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
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#718078] px-3 mb-2">
            Main Navigation
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
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${isActive
                  ? 'bg-gradient-to-r from-[#5F9F7A] to-[#397257] text-white shadow-md shadow-[#5F9F7A]/25'
                  : 'text-[#718078] hover:text-[#24332C] hover:bg-[#E7F2EB]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-[#5F9F7A]' : 'text-[#718078]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.badge === 'Live'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse'
                    : isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F6F8F3] text-[#718078] border border-[#E2E8DE]'
                    }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Promo / Helper Box & Theme Toggle */}
      <div className="mt-8 pt-4 border-t border-[#E2E8DE] space-y-3">
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/70 border border-[#E2E8DE]">
          <span className="text-xs font-semibold text-[#24332C]">Theme Mode</span>
          <ThemeToggle variant="pill" />
        </div>

        {isStudent ? (
          <div className="p-3 rounded-xl bg-[#E7F2EB] border border-[#CFE4D7] text-xs">
            <span className="font-bold text-[#397257] block mb-1">💡 Grade-Lock Filter Active</span>
            <p className="text-[11px] text-[#718078] leading-relaxed">
              You are currently viewing classes tailored strictly for <strong className="text-[#24332C]">{currentUser.grade}</strong>.
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-[#EBF8F7] border border-[#ACE3E0] text-xs">
            <span className="font-bold text-[#24706C] block mb-1">✨ Class Creation Ready</span>
            <p className="text-[11px] text-[#718078] leading-relaxed">
              Create a classroom for any grade and students will immediately receive access.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
