import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  HeartHandshake,
  GraduationCap,
  CalendarDays,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  FileText,
  UserCheck,
  Send,
  Phone,
  Mail,
  Sparkles,
  ShieldCheck,
  Bell
} from 'lucide-react';

export default function ParentOverview() {
  const { currentUser, teachers, classrooms, showToast } = useSchool();
  const { t } = useLanguage();

  const [messageTeacherModal, setMessageTeacherModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [messageText, setMessageText] = useState('');

  if (!currentUser || currentUser.role !== 'parent') return null;

  // Find class teacher for child (Class 6A)
  const classTeacher = teachers.find(t => t.isClassTeacher && t.gradeAssigned?.includes('Class 6')) || teachers[0];

  // Find child's subjects
  const childClassrooms = classrooms.filter(c => c.grade === currentUser.childGrade);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    showToast(`Message sent to ${selectedTeacher?.name || classTeacher.name}! They will reply shortly.`, 'success');
    setMessageText('');
    setMessageTeacherModal(false);
  };

  const notices = [
    {
      id: "not-1",
      teacher: classTeacher.name,
      role: "Class Teacher (Class 6A)",
      avatar: classTeacher.avatar,
      title: "Class 6 Science Fair & Working Model Submissions",
      content: `Dear parents, all Class 6 students are requested to prepare their Science model on 'Plant Photosynthesis' or 'Solar Energy' by next Friday.`,
      date: "Today at 09:30 AM",
      priority: "high"
    },
    {
      id: "not-2",
      teacher: "Mr. Rajesh Kumar",
      role: "Mathematics Faculty",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      title: "Quarterly Math Diagnostic Test Results",
      content: `${currentUser.childName} scored 48/50 in the Algebra & Fractions diagnostic test. Excellent conceptual grasping!`,
      date: "Yesterday",
      priority: "normal"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-12">
      
      {/* 1. Parent & Child Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#397257] via-[#5F9F7A] to-[#3AA6A0] text-white p-6 sm:p-8 shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/50 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-[#F4C95D] text-[#24332C] shadow-md">
                <HeartHandshake className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Welcome, {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/30">
                  {currentUser.relation || 'Parent'} Portal
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 mt-1 flex items-center gap-2">
                <span>Monitoring Student:</span>
                <strong className="text-[#24332C] font-bold bg-white px-2 py-0.5 rounded-lg shadow-sm">
                  {currentUser.childName} ({currentUser.childGrade} - Section {currentUser.childSection})
                </strong>
                <span className="text-white/80">• Roll No: {currentUser.childRollNo}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedTeacher(classTeacher);
              setMessageTeacherModal(true);
            }}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#397257] text-xs font-extrabold shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-[#5F9F7A]" />
            <span>Message Class Teacher</span>
          </button>
        </div>

        {/* Quick Child Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-2 text-white/90 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#F4C95D]" />
              <span>Attendance Rate</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {currentUser.childAttendance || "96%"}
            </div>
            <div className="text-[10px] text-white/80 mt-0.5">38 / 40 Days Present</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-2 text-white/90 text-xs font-semibold">
              <Award className="w-4 h-4 text-[#F4C95D]" />
              <span>Academic GPA</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {currentUser.childGpa || "9.4 / 10"}
            </div>
            <div className="text-[10px] text-white/80 mt-0.5">Rank #2 in Class 6A</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-2 text-white/90 text-xs font-semibold">
              <BookOpen className="w-4 h-4 text-white" />
              <span>Enrolled Subjects</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {childClassrooms.length} Subjects
            </div>
            <div className="text-[10px] text-white/80 mt-0.5">Class 6 Full Curriculum</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-2 text-white/90 text-xs font-semibold">
              <Bell className="w-4 h-4 text-[#F4C95D]" />
              <span>Teacher Notices</span>
            </div>
            <div className="text-xl font-black text-[#F4C95D] mt-1">
              {currentUser.unreadNotices || 2} Updates
            </div>
            <div className="text-[10px] text-white/80 mt-0.5">Direct from Class 6A Hub</div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid: Child's Subjects & Teacher Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Child's Grade-6 Subjects & Faculty Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#5F9F7A]" />
              <h2 className="text-lg font-bold text-[#24332C]">
                {currentUser.childName}'s {currentUser.childGrade} Subjects & Teachers
              </h2>
            </div>
            <span className="text-xs text-[#397257] font-semibold bg-[#E7F2EB] px-2.5 py-1 rounded-full border border-[#CFE4D7]">
              Grade Isolation Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {childClassrooms.map((cls) => {
              const teacherObj = teachers.find(t => t.id === cls.teacherId);
              return (
                <div
                  key={cls.id}
                  className="p-5 rounded-3xl bg-white border border-[#E2E8DE] hover:border-[#5F9F7A] transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7]">
                        {cls.subject}
                      </span>
                      <span className="text-[11px] text-[#718078] flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-[#5F9F7A]" />
                        {cls.schedule || "Mon, Wed, Fri"}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#24332C] group-hover:text-[#5F9F7A] transition-colors">
                      {cls.title}
                    </h3>
                    <p className="text-xs text-[#718078] mt-1 line-clamp-2">
                      {cls.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E2E8DE] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={cls.teacherAvatar || teacherObj?.avatar}
                        alt={cls.teacherName}
                        className="w-7 h-7 rounded-full object-cover border border-[#CFE4D7]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#24332C]">{cls.teacherName}</div>
                        <div className="text-[10px] text-[#718078]">Instructor</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTeacher(teacherObj || { name: cls.teacherName, avatar: cls.teacherAvatar });
                        setMessageTeacherModal(true);
                      }}
                      className="p-2 rounded-xl bg-[#F6F8F3] hover:bg-[#5F9F7A] text-[#718078] hover:text-white transition-colors border border-[#E2E8DE]"
                      title="Contact Teacher"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Child Learning Progress Highlights */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8DE] shadow-sm">
            <h3 className="text-sm font-bold text-[#24332C] flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#5F9F7A]" />
              <span>Weekly Academic & Homework Status</span>
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#24332C]">Science Lab (Photosynthesis Experiment)</span>
                  <span className="text-[#397257] font-bold">100% Submitted (Graded A+)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E7F2EB] overflow-hidden">
                  <div className="h-full bg-[#5F9F7A] rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#24332C]">Mathematics (Fractions & Decimal Practice)</span>
                  <span className="text-[#3AA6A0] font-bold">92% Mastery</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E7F2EB] overflow-hidden">
                  <div className="h-full bg-[#3AA6A0] rounded-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#24332C]">English Literature (Poetry Recitation)</span>
                  <span className="text-[#976C09] font-bold">88% Completion</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E7F2EB] overflow-hidden">
                  <div className="h-full bg-[#F4C95D] rounded-full w-[88%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Class Teacher Notice Board & Contact Card */}
        <div className="space-y-6">
          
          {/* Class Teacher Dedicated Profile Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8DE] shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 text-xs font-extrabold text-[#976C09] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Assigned Class Teacher</span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src={classTeacher.avatar}
                alt={classTeacher.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-[#5F9F7A] shadow-sm"
              />
              <div>
                <h4 className="text-sm font-bold text-[#24332C]">{classTeacher.name}</h4>
                <p className="text-xs text-[#397257] font-semibold">{classTeacher.classTeacherOf || "Class 6 - Section A"}</p>
                <p className="text-[11px] text-[#718078]">{classTeacher.qualifications?.split(',')[0]}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E2E8DE] space-y-2 text-xs text-[#24332C]">
              <div className="flex items-center gap-2 text-[#718078]">
                <Mail className="w-3.5 h-3.5 text-[#5F9F7A]" />
                <span>{classTeacher.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#718078]">
                <Phone className="w-3.5 h-3.5 text-[#3AA6A0]" />
                <span>{classTeacher.phone}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedTeacher(classTeacher);
                setMessageTeacherModal(true);
              }}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#5F9F7A] hover:bg-[#4D8A67] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send Direct Inquiry</span>
            </button>
          </div>

          {/* Official Notices */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8DE] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#24332C] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#5F9F7A]" />
                <span>Class 6A Notices</span>
              </h3>
              <span className="text-[10px] text-[#397257] font-bold bg-[#E7F2EB] px-2 py-0.5 rounded-full border border-[#CFE4D7]">
                Live Broadcasts
              </span>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="p-3.5 rounded-2xl bg-[#F6F8F3] border border-[#E2E8DE] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={n.avatar} alt={n.teacher} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs font-bold text-[#24332C]">{n.teacher}</span>
                    </div>
                    <span className="text-[10px] text-[#718078]">{n.date}</span>
                  </div>

                  <h5 className="text-xs font-bold text-[#397257]">{n.title}</h5>
                  <p className="text-[11px] text-[#718078] leading-relaxed">{n.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Direct Message Teacher Modal */}
      {messageTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-[#E2E8DE] p-6 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E8DE] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#E7F2EB] text-[#397257]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#24332C]">
                    Message to {selectedTeacher?.name || classTeacher.name}
                  </h3>
                  <p className="text-xs text-[#718078]">
                    Regarding: {currentUser.childName} ({currentUser.childGrade})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMessageTeacherModal(false)}
                className="p-1.5 rounded-xl text-[#718078] hover:text-[#24332C] hover:bg-[#F6F8F3] transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#24332C] mb-1.5">
                  Your Message / Question
                </label>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Hi ${selectedTeacher?.name || classTeacher.name}, I had a quick question regarding ${currentUser.childName}'s upcoming class schedule...`}
                  className="w-full p-3.5 rounded-2xl bg-[#F6F8F3] border border-[#E2E8DE] focus:border-[#5F9F7A] focus:ring-1 focus:ring-[#5F9F7A] text-[#24332C] text-xs outline-none transition-all placeholder:text-[#718078] resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setMessageTeacherModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#718078] font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#3AA6A0] hover:from-[#4D8A67] hover:to-[#2C8782] text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
