import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STUDENTS, INITIAL_TEACHERS, INITIAL_CLASSROOMS } from '../data/mockData';

const SchoolContext = createContext();

export function SchoolProvider({ children }) {
  // 1. Current Auth User (Student or Teacher or null)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('grasp_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 2. Classrooms State
  const [classrooms, setClassrooms] = useState(() => {
    const saved = localStorage.getItem('grasp_classrooms');
    return saved ? JSON.parse(saved) : INITIAL_CLASSROOMS;
  });

  // 3. Students list
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('grasp_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // 4. Teachers list
  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem('grasp_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  // 5. Active View (e.g. 'dashboard', 'classroom-detail', 'timetable', 'assignments', 'discover')
  const [activeTab, setActiveTab] = useState('overview');
  const [activeClassroomId, setActiveClassroomId] = useState(null);

  // 6. Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('grasp_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('grasp_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('grasp_classrooms', JSON.stringify(classrooms));
  }, [classrooms]);

  useEffect(() => {
    localStorage.setItem('grasp_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('grasp_teachers', JSON.stringify(teachers));
  }, [teachers]);

  // Auth methods
  const loginStudent = (studentId) => {
    const found = students.find(s => s.id === studentId) || students[0];
    const userObj = { ...found, role: 'student' };
    setCurrentUser(userObj);
    setActiveTab('overview');
    setActiveClassroomId(null);
    showToast(`Welcome back, ${found.name}! Signed in as ${found.grade} student.`, 'success');
  };

  const loginTeacher = (teacherId) => {
    const found = teachers.find(t => t.id === teacherId) || teachers[0];
    const userObj = { ...found, role: 'teacher' };
    setCurrentUser(userObj);
    setActiveTab('overview');
    setActiveClassroomId(null);
    showToast(`Welcome Professor ${found.name}! Teacher portal active.`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('overview');
    setActiveClassroomId(null);
    showToast('Logged out successfully.', 'info');
  };

  // Switch active classroom interior
  const enterClassroom = (classId) => {
    setActiveClassroomId(classId);
    setActiveTab('classroom-detail');
  };

  // Create new classroom (by Teacher)
  const createClassroom = (classData) => {
    const id = `cls-${Date.now()}`;
    const gradients = [
      "from-blue-600 via-indigo-700 to-purple-800",
      "from-emerald-600 via-teal-700 to-cyan-800",
      "from-purple-600 via-violet-700 to-indigo-900",
      "from-amber-600 via-orange-700 to-rose-800",
      "from-rose-600 via-pink-700 to-red-900",
      "from-cyan-600 via-teal-700 to-blue-900"
    ];
    const randomGrad = gradients[Math.floor(Math.random() * gradients.length)];

    const newClass = {
      id,
      title: classData.title || `${classData.grade}${classData.section ? ' - ' + classData.section : ''} - ${classData.subject}`,
      grade: classData.grade,
      section: classData.section || "A",
      subject: classData.subject,
      code: `${classData.subject.substring(0, 3).toUpperCase()}-${classData.grade.replace('Class ', '')}${classData.section || 'A'}-${Math.floor(100 + Math.random() * 900)}`,
      themeGradient: randomGrad,
      accentColor: "indigo",
      room: classData.room || "Room 101",
      schedule: classData.schedule || "Mon, Wed • 10:00 AM - 11:00 AM",
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      teacherAvatar: currentUser.avatar,
      teacherRole: currentUser.isClassTeacher && currentUser.classTeacherOf?.includes(classData.grade)
        ? `Class Teacher (${classData.grade})`
        : `Subject Teacher (${classData.subject})`,
      isClassTeacherClass: Boolean(currentUser.isClassTeacher && currentUser.classTeacherOf?.includes(classData.grade)),
      description: classData.description || `Official ${classData.subject} classroom for ${classData.grade}.`,
      liveSession: {
        isActive: false,
        title: "",
        startedAt: null,
        joinCode: `LIVE-${Math.floor(1000 + Math.random() * 9000)}`,
        participantsCount: 0
      },
      announcements: [
        {
          id: `ann-${Date.now()}`,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          date: "Just now",
          badge: currentUser.isClassTeacher ? "Class Teacher Welcome" : "Welcome Post",
          content: `Welcome to the new ${classData.subject} classroom for ${classData.grade}! All course materials, lecture schedules, and assignments will be posted here.`,
          attachments: [],
          comments: []
        }
      ],
      assignments: [],
      materials: [
        {
          id: `mat-${Date.now()}`,
          title: `${classData.subject} - Term 1 Syllabus & Overview`,
          type: "PDF Document",
          date: "Today",
          size: "1.2 MB"
        }
      ],
      enrolledStudentIds: []
    };

    setClassrooms(prev => [newClass, ...prev]);

    // Update teacher's created class IDs
    setTeachers(prev => prev.map(t => {
      if (t.id === currentUser.id) {
        return { ...t, createdClassIds: [...(t.createdClassIds || []), id] };
      }
      return t;
    }));

    showToast(`🎉 Classroom "${newClass.title}" created for ${newClass.grade}! All ${newClass.grade} students can now see and join it.`, 'success');
    return newClass;
  };

  // Student joins a classroom
  const joinClassroom = (classId) => {
    if (!currentUser || currentUser.role !== 'student') return;

    setClassrooms(prev => prev.map(c => {
      if (c.id === classId) {
        if (!c.enrolledStudentIds.includes(currentUser.id)) {
          return { ...c, enrolledStudentIds: [...c.enrolledStudentIds, currentUser.id] };
        }
      }
      return c;
    }));

    setStudents(prev => prev.map(s => {
      if (s.id === currentUser.id) {
        const updatedClasses = s.enrolledClassIds.includes(classId)
          ? s.enrolledClassIds
          : [...s.enrolledClassIds, classId];
        const updated = { ...s, enrolledClassIds: updatedClasses };
        setCurrentUser({ ...currentUser, enrolledClassIds: updatedClasses });
        return updated;
      }
      return s;
    }));

    showToast(`Joined classroom successfully!`, 'success');
  };

  // Student joins by code
  const joinByCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = classrooms.find(c => c.code.toUpperCase() === cleanCode);
    if (!found) {
      showToast(`No classroom found with code "${code}". Please verify with your teacher.`, 'error');
      return false;
    }
    joinClassroom(found.id);
    enterClassroom(found.id);
    return true;
  };

  // Add announcement
  const addAnnouncement = (classId, content, badge = null, attachments = []) => {
    const newAnn = {
      id: `ann-${Date.now()}`,
      authorName: currentUser.name + (currentUser.role === 'teacher' && currentUser.isClassTeacher ? " (Class Teacher)" : ""),
      authorAvatar: currentUser.avatar,
      date: "Just now",
      badge: badge || (currentUser.role === 'teacher' ? "Faculty Post" : "Student Post"),
      content,
      attachments,
      comments: []
    };

    setClassrooms(prev => prev.map(c => {
      if (c.id === classId) {
        return { ...c, announcements: [newAnn, ...c.announcements] };
      }
      return c;
    }));

    showToast('Announcement posted to class stream!', 'success');
  };

  // Add comment to announcement
  const addCommentToAnnouncement = (classId, announcementId, commentText) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: currentUser.name,
      text: commentText,
      time: "Just now"
    };

    setClassrooms(prev => prev.map(c => {
      if (c.id === classId) {
        const updatedAnnouncements = c.announcements.map(a => {
          if (a.id === announcementId) {
            return { ...a, comments: [...(a.comments || []), newComment] };
          }
          return a;
        });
        return { ...c, announcements: updatedAnnouncements };
      }
      return c;
    }));
  };

  // Teacher creates assignment
  const createAssignment = (classId, assignmentData) => {
    const newAsg = {
      id: `asg-${Date.now()}`,
      title: assignmentData.title,
      dueDate: assignmentData.dueDate || "Next Week",
      points: assignmentData.points || 20,
      status: "Pending",
      description: assignmentData.description || "",
      submitted: false,
      submissionsCount: 0,
      submissions: []
    };

    setClassrooms(prev => prev.map(c => {
      if (c.id === classId) {
        return { ...c, assignments: [newAsg, ...(c.assignments || [])] };
      }
      return c;
    }));

    showToast(`Assignment "${assignmentData.title}" published!`, 'success');
  };

  // Student submits assignment
  const submitAssignment = (classId, assignmentId, submissionText = "Submitted solution PDF & homework notes.") => {
    setClassrooms(prev => prev.map(c => {
      if (c.id === classId) {
        const updated = (c.assignments || []).map(a => {
          if (a.id === assignmentId) {
            const submissionRecord = {
              studentId: currentUser.id,
              studentName: currentUser.name,
              submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Today",
              text: submissionText,
              grade: null,
              status: "Under Review"
            };
            return {
              ...a,
              submitted: true,
              submissionsCount: (a.submissionsCount || 0) + 1,
              submissions: [...(a.submissions || []), submissionRecord]
            };
          }
          return a;
        });
        return { ...c, assignments: updated };
      }
      return c;
    }));

    showToast(`Assignment submitted successfully!`, 'success');
  };

  // Toggle Live Virtual Class
  const toggleLiveClass = (classId, title) => {
    setClassrooms(prev => prev.map(c => {
      if (c.id === classId) {
        const currentActive = c.liveSession?.isActive;
        return {
          ...c,
          liveSession: {
            isActive: !currentActive,
            title: !currentActive ? (title || `${c.subject} - Live Interactive Class`) : "",
            startedAt: !currentActive ? "Just started" : null,
            joinCode: c.liveSession?.joinCode || `LIVE-${c.subject.substring(0, 3)}`,
            participantsCount: !currentActive ? 1 : 0
          }
        };
      }
      return c;
    }));

    showToast('Live virtual class status updated!', 'info');
  };

  // Helpers
  const studentEnrolledClassrooms = classrooms.filter(c => {
    if (!currentUser || currentUser.role !== 'student') return false;
    return c.enrolledStudentIds?.includes(currentUser.id) || currentUser.enrolledClassIds?.includes(c.id);
  });

  // Core requirement: Class 6 student sees all classrooms belonging to Class 6!
  const studentGradeClassrooms = classrooms.filter(c => {
    if (!currentUser || currentUser.role !== 'student') return false;
    return c.grade === currentUser.grade;
  });

  const teacherMyClassrooms = classrooms.filter(c => {
    if (!currentUser || currentUser.role !== 'teacher') return false;
    return c.teacherId === currentUser.id || currentUser.createdClassIds?.includes(c.id);
  });

  const currentActiveClassroom = classrooms.find(c => c.id === activeClassroomId) || null;

  return (
    <SchoolContext.Provider value={{
      currentUser,
      students,
      teachers,
      classrooms,
      activeTab,
      setActiveTab,
      activeClassroomId,
      setActiveClassroomId,
      currentActiveClassroom,
      enterClassroom,
      loginStudent,
      loginTeacher,
      logout,
      createClassroom,
      joinClassroom,
      joinByCode,
      addAnnouncement,
      addCommentToAnnouncement,
      createAssignment,
      submitAssignment,
      toggleLiveClass,
      studentEnrolledClassrooms,
      studentGradeClassrooms,
      teacherMyClassrooms,
      toasts,
      showToast
    }}>
      {children}
    </SchoolContext.Provider>
  );
}

export const useSchool = () => useContext(SchoolContext);
