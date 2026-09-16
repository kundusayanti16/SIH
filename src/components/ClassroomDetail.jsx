import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import LiveClassRoom from './LiveClassRoom';
import { 
  ArrowLeft, 
  Video, 
  Radio, 
  MessageSquare, 
  FileText, 
  Users, 
  PlusCircle, 
  Send, 
  Paperclip, 
  Download, 
  CheckCircle2, 
  Clock, 
  Star, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  GraduationCap,
  Calendar,
  Layers,
  Sparkles,
  Upload,
  Wand2
} from 'lucide-react';

export default function ClassroomDetail({ classroom, onBack, onLaunchVideoStudio }) {
  const { 
    currentUser, 
    addAnnouncement, 
    addCommentToAnnouncement, 
    submitAssignment, 
    createAssignment,
    toggleLiveClass,
    students
  } = useSchool();

  const [activeTab, setActiveTab] = useState('stream'); // 'stream' | 'classwork' | 'people' | 'live'
  const [inLiveSession, setInLiveSession] = useState(false);

  // New post state
  const [announcementText, setAnnouncementText] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  // New assignment modal state for teacher
  const [showNewAsgModal, setShowNewAsgModal] = useState(false);
  const [newAsgTitle, setNewAsgTitle] = useState('');
  const [newAsgDue, setNewAsgDue] = useState('Next Monday, 11:59 PM');
  const [newAsgPoints, setNewAsgPoints] = useState(25);
  const [newAsgDesc, setNewAsgDesc] = useState('');

  // Submission modal for student
  const [selectedAsgForSubmit, setSelectedAsgForSubmit] = useState(null);
  const [submissionText, setSubmissionText] = useState('');

  if (!classroom) return null;

  const isTeacher = currentUser?.role === 'teacher';
  const isStudent = currentUser?.role === 'student';

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    addAnnouncement(classroom.id, announcementText.trim());
    setAnnouncementText('');
  };

  const handleCommentSubmit = (annId, e) => {
    e.preventDefault();
    const comment = commentInputs[annId];
    if (!comment || !comment.trim()) return;
    addCommentToAnnouncement(classroom.id, annId, comment.trim());
    setCommentInputs(prev => ({ ...prev, [annId]: '' }));
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newAsgTitle.trim()) return;
    createAssignment(classroom.id, {
      title: newAsgTitle.trim(),
      dueDate: newAsgDue,
      points: Number(newAsgPoints),
      description: newAsgDesc.trim()
    });
    setNewAsgTitle('');
    setNewAsgDesc('');
    setShowNewAsgModal(false);
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!selectedAsgForSubmit) return;
    submitAssignment(classroom.id, selectedAsgForSubmit.id, submissionText.trim() || "Uploaded homework notebook assignment.");
    setSelectedAsgForSubmit(null);
    setSubmissionText('');
  };

  if (inLiveSession) {
    return <LiveClassRoom classroom={classroom} onExit={() => setInLiveSession(false)} />;
  }

  // Get enrolled students details
  const enrolledStudents = students.filter(s => 
    classroom.enrolledStudentIds?.includes(s.id) || s.grade === classroom.grade
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Back button and quick breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F6F8F3] text-[#24332C] text-xs font-semibold border border-[#E2E8DE] shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#5F9F7A]" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#718078]">
          <span>{classroom.grade}</span>
          <span>•</span>
          <span>Sec {classroom.section}</span>
          <span>•</span>
          <code className="text-[#397257] bg-[#E7F2EB] px-2 py-0.5 rounded border border-[#CFE4D7] font-mono font-bold">
            {classroom.code}
          </code>
        </div>
      </div>

      {/* Classroom Hero Card Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#397257] via-[#5F9F7A] to-[#3AA6A0] relative overflow-hidden shadow-lg text-white">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                {classroom.grade} • Sec {classroom.section}
              </span>
              {classroom.isClassTeacherClass && (
                <span className="px-3 py-1 rounded-full bg-[#F4C95D] text-[#24332C] text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-[#24332C] text-[#24332C]" />
                  <span>Class Teacher's Subject</span>
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                {classroom.room}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {classroom.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/90 font-normal leading-relaxed">
              {classroom.description}
            </p>

            {/* Teacher Pill */}
            <div className="mt-4 flex items-center gap-3">
              <img
                src={classroom.teacherAvatar}
                alt={classroom.teacherName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/40"
              />
              <div>
                <div className="text-xs font-bold">{classroom.teacherName}</div>
                <div className="text-[11px] text-white/80">{classroom.teacherRole}</div>
              </div>
            </div>
          </div>

          {/* Action on Hero: Live Lecture & Topic Video */}
          <div className="shrink-0 flex flex-col items-start md:items-end gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {onLaunchVideoStudio && (
                <button
                  onClick={() => onLaunchVideoStudio(classroom.subject)}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-extrabold text-xs border border-white/30 hover:scale-105 active:scale-95 transition-all shadow-sm"
                  title="Generate dynamic animated explainer video for this subject"
                >
                  <Wand2 className="w-4 h-4 text-[#F4C95D]" />
                  <span>AI Topic Video</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (isTeacher) {
                    toggleLiveClass(classroom.id, `${classroom.subject} - Live Session`);
                  }
                  setInLiveSession(true);
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-[#397257] hover:bg-slate-50 font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Video className="w-5 h-5 text-[#5F9F7A]" />
                <span>{isTeacher ? "Launch Live Virtual Class" : "Enter Live Lecture Room"}</span>
              </button>
            </div>

            <div className="text-[11px] text-white/90 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{classroom.schedule}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Inner Navigation Tabs */}
      <div className="flex border-b border-[#E2E8DE] gap-2 overflow-x-auto pb-px">
        {[
          { id: 'stream', label: 'Class Stream & Discussions', icon: MessageSquare },
          { id: 'classwork', label: 'Classwork & Notes', icon: FileText, count: classroom.assignments?.length },
          { id: 'people', label: 'Faculty & Classmates', icon: Users, count: enrolledStudents.length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                isActive
                  ? 'border-[#5F9F7A] text-[#397257] bg-[#E7F2EB]/50'
                  : 'border-transparent text-[#718078] hover:text-[#24332C] hover:border-[#E2E8DE]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#F6F8F3] text-[#718078] border border-[#E2E8DE]">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: STREAM & DISCUSSIONS */}
      {activeTab === 'stream' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left / Main Column: Announcements Feed */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Post Announcement Box */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8DE] shadow-sm">
              <div className="flex items-start gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#CFE4D7] shrink-0 mt-0.5"
                />
                <form onSubmit={handlePostAnnouncement} className="flex-1 space-y-3">
                  <textarea
                    rows={2}
                    placeholder={
                      isTeacher
                        ? `Announce something to ${classroom.grade} students...`
                        : `Ask a doubt or share notes with ${classroom.title}...`
                    }
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs focus:outline-none focus:border-[#5F9F7A] resize-none placeholder:text-[#718078]"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#718078]">
                      Posting as <strong className="text-[#24332C]">{currentUser.name}</strong>
                    </span>
                    <button
                      type="submit"
                      disabled={!announcementText.trim()}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5F9F7A] hover:bg-[#4D8A67] disabled:opacity-50 text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Announcements List */}
            {classroom.announcements && classroom.announcements.length > 0 ? (
              classroom.announcements.map((ann) => (
                <div key={ann.id} className="bg-white rounded-2xl p-5 border border-[#E2E8DE] shadow-sm space-y-4">
                  {/* Author Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={ann.authorAvatar}
                        alt={ann.authorName}
                        className="w-10 h-10 rounded-full object-cover border border-[#CFE4D7]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#24332C]">{ann.authorName}</h4>
                          {ann.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] font-semibold">
                              {ann.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#718078] mt-0.5">{ann.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-xs text-[#24332C] leading-relaxed whitespace-pre-line">
                    {ann.content}
                  </p>

                  {/* Attachments */}
                  {ann.attachments && ann.attachments.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      {ann.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-xs hover:border-[#5F9F7A] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-rose-500" />
                            <span className="font-medium text-[#24332C]">{att.name}</span>
                            <span className="text-[10px] text-[#718078]">({att.size})</span>
                          </div>
                          <button 
                            onClick={() => alert(`Downloading ${att.name}...`)}
                            className="p-1.5 text-[#5F9F7A] hover:text-[#397257]" 
                            title="Download Material"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comments thread */}
                  <div className="pt-3 border-t border-[#E2E8DE] space-y-2.5">
                    {ann.comments && ann.comments.map(c => (
                      <div key={c.id} className="flex items-start gap-2.5 text-xs bg-[#F6F8F3] p-2.5 rounded-xl border border-[#E2E8DE]">
                        <span className="font-bold text-[#397257] shrink-0">{c.author}:</span>
                        <span className="text-[#24332C] flex-1">{c.text}</span>
                        <span className="text-[10px] text-[#718078] shrink-0">{c.time}</span>
                      </div>
                    ))}

                    {/* Add Comment Input */}
                    <form
                      onSubmit={(e) => handleCommentSubmit(ann.id, e)}
                      className="flex items-center gap-2 pt-1"
                    >
                      <input
                        type="text"
                        placeholder="Add a class comment..."
                        value={commentInputs[ann.id] || ''}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [ann.id]: e.target.value }))}
                        className="flex-1 p-2 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs focus:outline-none focus:border-[#5F9F7A]"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-xl bg-white hover:bg-[#E7F2EB] text-[#718078] hover:text-[#24332C] border border-[#E2E8DE] text-xs transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-[#718078] text-xs bg-white rounded-2xl p-6 border border-[#E2E8DE]">
                No announcements posted yet. Start the conversation!
              </div>
            )}
          </div>

          {/* Right Column: Classroom Quick Stats & Upcoming Deadlines */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Class Info Box */}
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DE] shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#24332C] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#5F9F7A]" />
                Classroom Details
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#E2E8DE]">
                  <span className="text-[#718078]">Class & Section:</span>
                  <span className="font-semibold text-[#24332C]">{classroom.grade} - {classroom.section}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E2E8DE]">
                  <span className="text-[#718078]">Subject:</span>
                  <span className="font-semibold text-[#3AA6A0]">{classroom.subject}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E2E8DE]">
                  <span className="text-[#718078]">Class Teacher:</span>
                  <span className="font-semibold text-[#397257]">{classroom.isClassTeacherClass ? "Yes (Dedicated)" : "Subject Teacher"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E2E8DE]">
                  <span className="text-[#718078]">Lecture Timings:</span>
                  <span className="font-semibold text-[#24332C]">{classroom.schedule}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#718078]">Class Code:</span>
                  <span className="font-mono font-bold text-[#976C09]">{classroom.code}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Homework Due */}
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DE] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#24332C] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F4C95D]" />
                  Upcoming Work
                </h3>
                <span className="text-[10px] text-[#397257] font-bold bg-[#E7F2EB] px-2 py-0.5 rounded-full border border-[#CFE4D7]">
                  {classroom.assignments?.length || 0} Total
                </span>
              </div>

              {classroom.assignments && classroom.assignments.length > 0 ? (
                <div className="space-y-2.5">
                  {classroom.assignments.map(asg => (
                    <div key={asg.id} className="p-3 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#24332C] truncate">{asg.title}</span>
                        <span className="text-[10px] text-[#976C09] font-semibold">{asg.points} pts</span>
                      </div>
                      <p className="text-[11px] text-[#718078]">Due: {asg.dueDate}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#718078]">No pending assignments!</p>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: CLASSWORK & NOTES */}
      {activeTab === 'classwork' && (
        <div className="space-y-6">
          
          {/* Top action for teacher */}
          {isTeacher && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewAsgModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white text-xs font-bold shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Assign Homework / Project</span>
              </button>
            </div>
          )}

          {/* Assignments Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#718078] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#5F9F7A]" />
              Assignments & Homework
            </h3>

            {classroom.assignments && classroom.assignments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classroom.assignments.map((asg) => (
                  <div key={asg.id} className="bg-white rounded-2xl p-5 border border-[#E2E8DE] flex flex-col justify-between space-y-4 shadow-sm hover:border-[#5F9F7A] transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7]">
                          {asg.points} Points
                        </span>
                        <span className="text-[11px] text-[#976C09] font-semibold flex items-center gap-1 bg-[#FEF8E8] px-2 py-0.5 rounded-full border border-[#F8DC8E]">
                          <Clock className="w-3.5 h-3.5" />
                          Due: {asg.dueDate}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#24332C] mb-1">{asg.title}</h4>
                      <p className="text-xs text-[#718078] leading-relaxed">{asg.description}</p>
                    </div>

                    {/* Submissions action */}
                    <div className="pt-3 border-t border-[#E2E8DE] flex items-center justify-between">
                      {isStudent && (
                        <div>
                          {asg.submitted ? (
                            <span className="flex items-center gap-1.5 text-xs text-[#397257] font-bold bg-[#E7F2EB] px-3 py-1 rounded-full border border-[#CFE4D7]">
                              <CheckCircle2 className="w-4 h-4 text-[#5F9F7A]" />
                              <span>Submitted</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => setSelectedAsgForSubmit(asg)}
                              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#5F9F7A] hover:bg-[#4D8A67] text-white text-xs font-bold transition-colors shadow-sm"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Submit Homework</span>
                            </button>
                          )}
                        </div>
                      )}

                      {isTeacher && (
                        <div className="text-xs text-[#24332C] font-semibold">
                          <span>{asg.submissionsCount || 0} Submissions Received</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#E2E8DE] text-xs text-[#718078] shadow-sm">
                No assignments created yet for this subject.
              </div>
            )}
          </div>

          {/* Study Materials & Notes Section */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#718078] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#5F9F7A]" />
              Course Study Materials & PDFs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {classroom.materials && classroom.materials.map(mat => (
                <div key={mat.id} className="p-4 rounded-2xl bg-white border border-[#E2E8DE] flex items-center justify-between hover:border-[#5F9F7A] shadow-sm transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#24332C] line-clamp-1">{mat.title}</h5>
                      <span className="text-[10px] text-[#718078]">{mat.type} • {mat.size}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading file: ${mat.title}...`)}
                    className="p-2 text-[#718078] hover:text-[#5F9F7A] transition-colors"
                    title="Download Note"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: FACULTY & CLASSMATES */}
      {activeTab === 'people' && (
        <div className="space-y-6">
          
          {/* Faculty section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#718078]">
              Instructors & Class Teacher
            </h3>

            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DE] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={classroom.teacherAvatar}
                  alt={classroom.teacherName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#5F9F7A]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#24332C]">{classroom.teacherName}</h4>
                    {classroom.isClassTeacherClass && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF8E8] text-[#976C09] border border-[#F8DC8E] font-bold">
                        ★ Dedicated Class Teacher
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#397257] font-semibold mt-0.5">{classroom.teacherRole}</p>
                  <p className="text-[11px] text-[#718078] mt-1">{classroom.room} • Faculty In Charge</p>
                </div>
              </div>
            </div>
          </div>

          {/* Classmates section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#718078]">
                Classmates ({enrolledStudents.length} Students in {classroom.grade})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {enrolledStudents.map((stu) => (
                <div key={stu.id} className="p-3 rounded-xl bg-white border border-[#E2E8DE] shadow-sm flex items-center gap-3">
                  <img
                    src={stu.avatar}
                    alt={stu.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#CFE4D7] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#24332C] truncate flex items-center gap-1.5">
                      {stu.name}
                      {stu.id === currentUser.id && (
                        <span className="text-[9px] bg-[#E7F2EB] text-[#397257] px-1.5 py-0.2 rounded border border-[#CFE4D7]">You</span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#718078] flex items-center justify-between mt-0.5">
                      <span>Roll: {stu.rollNo}</span>
                      <span className="text-[#397257] font-medium">Att: {stu.attendance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Teacher Create Assignment Modal */}
      {showNewAsgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#E2E8DE] rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#24332C]">
            <h3 className="text-base font-bold text-[#24332C] mb-4">Create Homework for {classroom.grade}</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#24332C] block mb-1">Assignment Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Chapter 4 Quiz & Lab Diagrams"
                  value={newAsgTitle}
                  onChange={(e) => setNewAsgTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] placeholder:text-[#718078] focus:border-[#5F9F7A] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#24332C] block mb-1">Due Date</label>
                  <input
                    type="text"
                    value={newAsgDue}
                    onChange={(e) => setNewAsgDue(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] placeholder:text-[#718078] focus:border-[#5F9F7A] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#24332C] block mb-1">Points / Marks</label>
                  <input
                    type="number"
                    value={newAsgPoints}
                    onChange={(e) => setNewAsgPoints(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] focus:border-[#5F9F7A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#24332C] block mb-1">Instructions / Description</label>
                <textarea
                  rows={3}
                  placeholder="Write homework instructions for students..."
                  value={newAsgDesc}
                  onChange={(e) => setNewAsgDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] placeholder:text-[#718078] focus:border-[#5F9F7A] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8DE]">
                <button
                  type="button"
                  onClick={() => setShowNewAsgModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#718078] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white font-bold shadow-sm"
                >
                  Publish Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Submit Homework Modal */}
      {selectedAsgForSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#E2E8DE] rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#24332C]">
            <h3 className="text-base font-bold text-[#24332C] mb-2">Submit: {selectedAsgForSubmit.title}</h3>
            <p className="text-xs text-[#718078] mb-4">{selectedAsgForSubmit.description}</p>

            <form onSubmit={handleStudentSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#24332C] block mb-1">Submission Notes / Answer Text</label>
                <textarea
                  rows={3}
                  placeholder="Type your notes or attach link here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] placeholder:text-[#718078] focus:border-[#5F9F7A] outline-none resize-none"
                />
              </div>

              {/* Upload file dummy button */}
              <div className="p-4 rounded-xl border-2 border-dashed border-[#CFE4D7] bg-[#F6F8F3] text-center">
                <Upload className="w-5 h-5 text-[#5F9F7A] mx-auto mb-1" />
                <span className="text-[11px] text-[#24332C] block font-semibold">Attach Homework PDF or Image</span>
                <span className="text-[10px] text-[#718078]">Supported: PDF, JPG, PNG (Max 25MB)</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8DE]">
                <button
                  type="button"
                  onClick={() => setSelectedAsgForSubmit(null)}
                  className="px-4 py-2 rounded-xl bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#718078] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white font-bold shadow-sm"
                >
                  Confirm Turn In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
