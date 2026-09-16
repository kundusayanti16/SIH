import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthLanding from './components/AuthLanding';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LanguageSelector from './components/LanguageSelector';
import ToastContainer from './components/ToastContainer';
import CreateClassModal from './components/CreateClassModal';
import JoinClassModal from './components/JoinClassModal';
import ClassroomDetail from './components/ClassroomDetail';

// Student Components
import StudentOverview from './components/StudentDashboard/StudentOverview';
import DiscoverClasses from './components/StudentDashboard/DiscoverClasses';
import Timetable from './components/StudentDashboard/Timetable';
import AssignmentsView from './components/StudentDashboard/AssignmentsView';

// Teacher Components
import TeacherOverview from './components/TeacherDashboard/TeacherOverview';
import TeacherClassManager from './components/TeacherDashboard/TeacherClassManager';
import TeacherGrading from './components/TeacherDashboard/TeacherGrading';
import TeacherRoster from './components/TeacherDashboard/TeacherRoster';

// Parent Components
import ParentOverview from './components/ParentDashboard/ParentOverview';

// AI Dynamic Video Studio
import DynamicVideoStudio from './components/DynamicVideoStudio/DynamicVideoStudio';

function MainApp() {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    currentActiveClassroom,
    setActiveClassroomId,
    studentGradeClassrooms
  } = useSchool();
  const { t, localizeGrade } = useLanguage();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [prefilledVideoTopic, setPrefilledVideoTopic] = useState('');

  // If no user is logged in, show the login portal
  if (!currentUser) {
    return (
      <>
        <AuthLanding />
        <ToastContainer />
      </>
    );
  }

  const isStudent = currentUser.role === 'student';
  const isTeacher = currentUser.role === 'teacher';
  const isParent = currentUser.role === 'parent';

  const handleBackToDashboard = () => {
    setActiveClassroomId(null);
    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-[#F6F8F3] dark:bg-[#0C1411] text-[#24332C] dark:text-[#EAF2ED] flex flex-col selection:bg-[#5F9F7A] selection:text-white font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar
        onOpenCreateClass={() => setShowCreateModal(true)}
        onOpenJoinClass={() => setShowJoinModal(true)}
      />

      {/* Main Workspace Layout with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <Sidebar
          onOpenCreateClass={() => setShowCreateModal(true)}
          onOpenJoinClass={() => setShowJoinModal(true)}
        />

        {/* Dynamic Content Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* AI Dynamic Video Studio View */}
          {activeTab === 'video-generator' && (
            <DynamicVideoStudio initialTopic={prefilledVideoTopic} />
          )}

          {/* Active Classroom View (when opened) */}
          {activeTab === 'classroom-detail' && currentActiveClassroom && (
            <ClassroomDetail
              classroom={currentActiveClassroom}
              onBack={handleBackToDashboard}
              onLaunchVideoStudio={(topic) => {
                setPrefilledVideoTopic(topic || '');
                setActiveTab('video-generator');
              }}
            />
          )}

          {/* Student Specific Views */}
          {isStudent && activeTab !== 'classroom-detail' && activeTab !== 'video-generator' && (
            <>
              {(activeTab === 'overview' || activeTab === 'my-classes') && (
                <StudentOverview
                  onOpenJoinClass={() => setShowJoinModal(true)}
                  onOpenDiscover={() => setActiveTab('discover')}
                  onLaunchVideoStudio={(topic) => {
                    setPrefilledVideoTopic(topic || '');
                    setActiveTab('video-generator');
                  }}
                />
              )}
              {activeTab === 'discover' && (
                <DiscoverClasses
                  onOpenJoinCodeModal={() => setShowJoinModal(true)}
                />
              )}
              {activeTab === 'timetable' && <Timetable />}
              {activeTab === 'assignments' && <AssignmentsView />}
              {activeTab === 'live-classes' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-extrabold text-[#24332C] dark:text-[#EAF2ED]">{t('sideLiveClasses') || 'Live Virtual Lectures'}</h1>
                  <p className="text-xs text-[#718078] dark:text-[#95ADA0]">{t('studentWelcomeDesc') || `Join real-time video lectures for your ${localizeGrade(currentUser.grade)} subjects`}</p>
                  <DiscoverClasses onOpenJoinCodeModal={() => setShowJoinModal(true)} />
                </div>
              )}
            </>
          )}

          {/* Teacher Specific Views */}
          {isTeacher && activeTab !== 'classroom-detail' && activeTab !== 'video-generator' && (
            <>
              {activeTab === 'overview' && (
                <TeacherOverview
                  onOpenCreateClass={() => setShowCreateModal(true)}
                  onLaunchVideoStudio={(topic) => {
                    setPrefilledVideoTopic(topic || '');
                    setActiveTab('video-generator');
                  }}
                />
              )}
              {activeTab === 'teacher-classes' && (
                <TeacherClassManager
                  onOpenCreateClass={() => setShowCreateModal(true)}
                />
              )}
              {activeTab === 'timetable' && <Timetable />}
              {activeTab === 'grading' && <TeacherGrading />}
              {activeTab === 'roster' && <TeacherRoster />}
            </>
          )}

          {/* Parent Specific Views */}
          {isParent && activeTab !== 'classroom-detail' && activeTab !== 'video-generator' && (
            <>
              {(activeTab === 'overview' || activeTab === 'child-classes' || activeTab === 'attendance-grades' || activeTab === 'teacher-contact') && (
                <ParentOverview />
              )}
              {activeTab === 'timetable' && <Timetable />}
            </>
          )}
        </main>
      </div>

      {/* Floating Language Switcher for instant 1-click global language change anywhere */}
      <LanguageSelector variant="floating" />

      {/* Global Modals & Notifications */}
      <CreateClassModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <JoinClassModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SchoolProvider>
          <MainApp />
        </SchoolProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

