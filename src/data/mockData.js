export const INITIAL_STUDENTS = [
  {
    id: "stu-1",
    name: "Aarav Sharma",
    email: "aarav.6a@grasp.edu",
    grade: "Class 6",
    section: "A",
    rollNo: "6A-101",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    attendance: "96%",
    gpa: "9.4 / 10",
    parentName: "Sanjay Sharma",
    phone: "+91 98765 43210",
    enrolledClassIds: ["cls-6-sci", "cls-6-math", "cls-6-eng", "cls-6-comp"]
  },
  {
    id: "stu-2",
    name: "Diya Patel",
    email: "diya.6a@grasp.edu",
    grade: "Class 6",
    section: "A",
    rollNo: "6A-102",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    attendance: "92%",
    gpa: "8.9 / 10",
    parentName: "Ketan Patel",
    phone: "+91 98765 43211",
    enrolledClassIds: ["cls-6-sci", "cls-6-math", "cls-6-eng"]
  },
  {
    id: "stu-3",
    name: "Kabir Mehta",
    email: "kabir.6a@grasp.edu",
    grade: "Class 6",
    section: "A",
    rollNo: "6A-103",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    attendance: "98%",
    gpa: "9.7 / 10",
    parentName: "Amit Mehta",
    phone: "+91 98765 43212",
    enrolledClassIds: ["cls-6-sci", "cls-6-math", "cls-6-eng", "cls-6-sst", "cls-6-comp"]
  },
  {
    id: "stu-4",
    name: "Rohan Verma",
    email: "rohan.8a@grasp.edu",
    grade: "Class 8",
    section: "A",
    rollNo: "8A-201",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    attendance: "90%",
    gpa: "8.6 / 10",
    parentName: "Rajeev Verma",
    phone: "+91 98765 43213",
    enrolledClassIds: ["cls-8-math", "cls-8-sci", "cls-8-eng"]
  },
  {
    id: "stu-5",
    name: "Ananya Iyer",
    email: "ananya.10a@grasp.edu",
    grade: "Class 10",
    section: "A",
    rollNo: "10A-301",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    attendance: "99%",
    gpa: "9.8 / 10",
    parentName: "Venkatesh Iyer",
    phone: "+91 98765 43214",
    enrolledClassIds: ["cls-10-sci", "cls-10-math"]
  }
];

export const INITIAL_TEACHERS = [
  {
    id: "tea-1",
    name: "Dr. Priya Sharma",
    title: "Head of Science & Class 6-A Class Teacher",
    subject: "Science & Biology",
    gradeAssigned: "Class 6",
    isClassTeacher: true,
    classTeacherOf: "Class 6 - Section A",
    email: "priya.sharma@grasp.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Science Department",
    qualifications: "Ph.D in Environmental Science, M.Sc (Gold Medalist)",
    cabin: "Science Block, Room 204",
    phone: "+91 98234 11223",
    totalStudents: 124,
    createdClassIds: ["cls-6-sci", "cls-8-sci"]
  },
  {
    id: "tea-2",
    name: "Mr. Rajesh Kumar",
    title: "Senior Mathematics Educator",
    subject: "Mathematics & Geometry",
    gradeAssigned: "Class 6, Class 8",
    isClassTeacher: false,
    classTeacherOf: null,
    email: "rajesh.kumar@grasp.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Mathematics Department",
    qualifications: "M.Sc Mathematics, B.Ed",
    cabin: "Academic Block, Room 108",
    phone: "+91 98234 33445",
    totalStudents: 140,
    createdClassIds: ["cls-6-math", "cls-8-math"]
  },
  {
    id: "tea-3",
    name: "Ms. Ananya Sen",
    title: "English Faculty & Class 8-A Class Teacher",
    subject: "English Literature",
    gradeAssigned: "Class 6, Class 8",
    isClassTeacher: true,
    classTeacherOf: "Class 8 - Section A",
    email: "ananya.sen@grasp.edu",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    department: "Languages & Humanities",
    qualifications: "M.A. English Literature, CELTA Certified",
    cabin: "Humanities Wing, Room 302",
    phone: "+91 98234 55667",
    totalStudents: 110,
    createdClassIds: ["cls-6-eng", "cls-8-eng"]
  },
  {
    id: "tea-4",
    name: "Mr. Vikram Aditya",
    title: "Computer Science & Robotics Lead",
    subject: "Computer Science & AI",
    gradeAssigned: "Class 6",
    isClassTeacher: false,
    classTeacherOf: null,
    email: "vikram.aditya@grasp.edu",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    department: "Computer & IT Dept",
    qualifications: "B.Tech Computer Science, AI Educator Certified",
    cabin: "Tech Lab 3, Ground Floor",
    phone: "+91 98234 77889",
    totalStudents: 95,
    createdClassIds: ["cls-6-comp"]
  },
  {
    id: "tea-5",
    name: "Mrs. Sunita Verma",
    title: "Social Studies & Heritage Mentor",
    subject: "Social Studies & Civics",
    gradeAssigned: "Class 6",
    isClassTeacher: false,
    classTeacherOf: null,
    email: "sunita.verma@grasp.edu",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    department: "Social Sciences",
    qualifications: "M.A. History, B.Ed",
    cabin: "Academic Block, Room 112",
    phone: "+91 98234 99001",
    totalStudents: 130,
    createdClassIds: ["cls-6-sst"]
  }
];

export const INITIAL_CLASSROOMS = [
  {
    id: "cls-6-sci",
    title: "Class 6A - Science & Living World",
    grade: "Class 6",
    section: "A",
    subject: "General Science",
    code: "SCI6A-901",
    themeGradient: "from-emerald-600 via-teal-700 to-cyan-800",
    accentColor: "emerald",
    room: "Science Lab 201",
    schedule: "Mon, Wed, Fri • 09:00 AM - 10:00 AM",
    teacherId: "tea-1",
    teacherName: "Dr. Priya Sharma",
    teacherAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    teacherRole: "Class Teacher & Head of Science",
    isClassTeacherClass: true,
    description: "Welcome to Class 6 Science! We will explore plants, motion, light, electricity, water cycle and conduct practical kitchen experiments.",
    liveSession: {
      isActive: true,
      title: "Chapter 4: Plant Anatomy & Photosynthesis Live Demo",
      startedAt: "10 mins ago",
      joinCode: "LIVE-SCI-6A",
      participantsCount: 18
    },
    announcements: [
      {
        id: "ann-1",
        authorName: "Dr. Priya Sharma (Class Teacher)",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        date: "Today at 08:30 AM",
        badge: "Class Teacher Notice",
        content: "Good morning Class 6A students! Reminder that our Science Fair project topics must be submitted by this Friday. Please join today's 9:00 AM live session where I will demonstrate leaf stomata under microscope.",
        attachments: [
          { name: "Science_Fair_Guidelines_2026.pdf", size: "1.4 MB", type: "pdf" }
        ],
        comments: [
          { id: "c-1", author: "Aarav Sharma", text: "Ma'am, can we work in pairs of two?", time: "08:45 AM" },
          { id: "c-2", author: "Dr. Priya Sharma", text: "Yes Aarav, maximum 2 students per team!", time: "08:50 AM" }
        ]
      },
      {
        id: "ann-2",
        authorName: "Dr. Priya Sharma",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        date: "Yesterday at 04:15 PM",
        content: "Uploaded Chapter 3 Mind-Map notes. Please review before next quiz!",
        attachments: [
          { name: "Living_Organisms_MindMap.pdf", size: "3.2 MB", type: "pdf" }
        ],
        comments: []
      }
    ],
    assignments: [
      {
        id: "asg-1",
        title: "Microscopic Observation of Plant Cells Report",
        dueDate: "Tomorrow, 11:59 PM",
        points: 25,
        status: "Pending",
        description: "Draw the labeled diagram of onion peel cells and explain cell wall, nucleus, and cytoplasm functions.",
        submitted: false,
        submissionsCount: 14
      },
      {
        id: "asg-2",
        title: "Worksheet: States of Matter & Evaporation",
        dueDate: "15 Sep 2026",
        points: 20,
        status: "Submitted",
        description: "Complete exercise questions from Page 42-45 in your notebook and upload photos or PDF.",
        submitted: true,
        submittedDate: "10 Sep 2026",
        grade: "19/20",
        feedback: "Excellent diagrams Aarav! Very clear labeling.",
        submissionsCount: 22
      }
    ],
    materials: [
      { id: "mat-1", title: "Chapter 1: Food - Where Does It Come From?", type: "PDF Notes", date: "01 Sep 2026", size: "2.1 MB" },
      { id: "mat-2", title: "Chapter 2: Components of Food & Nutrients Chart", type: "Cheat Sheet", date: "05 Sep 2026", size: "1.8 MB" },
      { id: "mat-3", title: "Video Lecture: How Plants Make Food", type: "Video Link", date: "08 Sep 2026", size: "45 mins" }
    ],
    enrolledStudentIds: ["stu-1", "stu-2", "stu-3"]
  },
  {
    id: "cls-6-math",
    title: "Class 6A - Mathematics & Numbers Mastery",
    grade: "Class 6",
    section: "A",
    subject: "Mathematics",
    code: "MTH6A-402",
    themeGradient: "from-blue-600 via-indigo-700 to-purple-800",
    accentColor: "blue",
    room: "Room 105, Maths Wing",
    schedule: "Mon, Tue, Thu • 10:15 AM - 11:15 AM",
    teacherId: "tea-2",
    teacherName: "Mr. Rajesh Kumar",
    teacherAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    teacherRole: "Subject Teacher (Maths)",
    isClassTeacherClass: false,
    description: "Mastering Integers, Fractions, Decimals, Basic Geometry, and Vedic Math calculation tricks for Class 6th.",
    liveSession: {
      isActive: false,
      title: "Upcoming: Speed Math & Prime Factorization Tricks",
      startedAt: null,
      joinCode: "MATH-6A",
      participantsCount: 0
    },
    announcements: [
      {
        id: "ann-m1",
        authorName: "Mr. Rajesh Kumar",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        date: "Yesterday",
        content: "Weekly Algebra Practice sheet is live. Make sure to attempt all 15 word problems before Thursday.",
        attachments: [{ name: "Class6_Fractions_Drill.pdf", size: "850 KB", type: "pdf" }],
        comments: []
      }
    ],
    assignments: [
      {
        id: "asg-m1",
        title: "Fractions, LCM & HCF Problem Set 3",
        dueDate: "14 Sep 2026",
        points: 30,
        status: "Pending",
        description: "Solve questions 1 through 12 from Chapter 3 drill sheet.",
        submitted: false,
        submissionsCount: 19
      }
    ],
    materials: [
      { id: "mat-m1", title: "Formulas & Number Line Quick Guide", type: "PDF Document", date: "02 Sep 2026", size: "1.1 MB" },
      { id: "mat-m2", title: "Solved Examples: Integers & Decimals", type: "PDF Document", date: "06 Sep 2026", size: "2.4 MB" }
    ],
    enrolledStudentIds: ["stu-1", "stu-2", "stu-3"]
  },
  {
    id: "cls-6-eng",
    title: "Class 6A - English Literature & Creative Writing",
    grade: "Class 6",
    section: "A",
    subject: "English",
    code: "ENG6A-305",
    themeGradient: "from-amber-600 via-orange-700 to-rose-800",
    accentColor: "amber",
    room: "Room 302, Humanities Wing",
    schedule: "Tue, Thu • 11:30 AM - 12:30 PM",
    teacherId: "tea-3",
    teacherName: "Ms. Ananya Sen",
    teacherAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    teacherRole: "Subject Teacher (English)",
    isClassTeacherClass: false,
    description: "Exploring Honeysuckle stories, A Pact with the Sun, poetry recitations, and descriptive paragraph writing.",
    liveSession: {
      isActive: false,
      title: "Poetry Recitation: 'The Kite' Analysis",
      startedAt: null,
      joinCode: "ENG-6A",
      participantsCount: 0
    },
    announcements: [
      {
        id: "ann-e1",
        authorName: "Ms. Ananya Sen",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        date: "2 days ago",
        content: "Please read Chapter 4 'An Indian - American Woman in Space: Kalpana Chawla' before our next session.",
        attachments: [],
        comments: []
      }
    ],
    assignments: [
      {
        id: "asg-e1",
        title: "Essay: 'My Dream Invention for Clean Earth'",
        dueDate: "18 Sep 2026",
        points: 20,
        status: "Pending",
        description: "Write 150-200 words on an invention that can help solve environmental pollution.",
        submitted: false,
        submissionsCount: 16
      }
    ],
    materials: [
      { id: "mat-e1", title: "Grammar Rules: Tenses & Active Voice", type: "PDF Guide", date: "04 Sep 2026", size: "900 KB" }
    ],
    enrolledStudentIds: ["stu-1", "stu-2", "stu-3"]
  },
  {
    id: "cls-6-comp",
    title: "Class 6A - Computer Science & AI Explorers",
    grade: "Class 6",
    section: "A",
    subject: "Computer Science",
    code: "CS6A-108",
    themeGradient: "from-purple-600 via-violet-700 to-indigo-900",
    accentColor: "purple",
    room: "IT Lab 1",
    schedule: "Wed, Fri • 01:30 PM - 02:30 PM",
    teacherId: "tea-4",
    teacherName: "Mr. Vikram Aditya",
    teacherAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    teacherRole: "Subject Teacher (Computer Science)",
    isClassTeacherClass: false,
    description: "Introduction to Scratch Block Coding, Cyber Safety, Computer Hardware, and Fundamentals of Artificial Intelligence.",
    liveSession: {
      isActive: false,
      title: "Building our First Scratch Maze Game",
      startedAt: null,
      joinCode: "CS-6A",
      participantsCount: 0
    },
    announcements: [
      {
        id: "ann-cs1",
        authorName: "Mr. Vikram Aditya",
        authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
        date: "3 days ago",
        content: "Install Scratch 3.0 on your home laptops or tablets for upcoming coding assignments!",
        attachments: [{ name: "Scratch_Setup_Guide.pdf", size: "1.2 MB", type: "pdf" }],
        comments: []
      }
    ],
    assignments: [
      {
        id: "asg-cs1",
        title: "Scratch Project: Animated Greeting Card",
        dueDate: "20 Sep 2026",
        points: 25,
        status: "Pending",
        description: "Create a 3-sprite interactive birthday card with sound and animation effects.",
        submitted: false,
        submissionsCount: 11
      }
    ],
    materials: [
      { id: "mat-cs1", title: "Introduction to Algorithm and Flowcharts", type: "Slide Deck", date: "03 Sep 2026", size: "3.4 MB" }
    ],
    enrolledStudentIds: ["stu-1", "stu-3"]
  },
  {
    id: "cls-6-sst",
    title: "Class 6A - Social Science & Ancient Civilizations",
    grade: "Class 6",
    section: "A",
    subject: "Social Studies",
    code: "SST6A-501",
    themeGradient: "from-rose-600 via-pink-700 to-red-900",
    accentColor: "rose",
    room: "Room 112, Academic Block",
    schedule: "Tue, Thu, Sat • 02:45 PM - 03:30 PM",
    teacherId: "tea-5",
    teacherName: "Mrs. Sunita Verma",
    teacherAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    teacherRole: "Subject Teacher (Social Studies)",
    isClassTeacherClass: false,
    description: "Discover the Indus Valley Civilization, Maps & Globes, Diversity, and Local Government Panchayat systems.",
    liveSession: {
      isActive: false,
      title: "Virtual 3D Tour of Harappa & Mohenjo-daro",
      startedAt: null,
      joinCode: "SST-6A",
      participantsCount: 0
    },
    announcements: [
      {
        id: "ann-sst1",
        authorName: "Mrs. Sunita Verma",
        authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        date: "4 days ago",
        content: "Bring your Physical Map of India sheets to next class for river plotting practice.",
        attachments: [],
        comments: []
      }
    ],
    assignments: [
      {
        id: "asg-sst1",
        title: "Map Work: Major Harappan Cities & Trade Routes",
        dueDate: "16 Sep 2026",
        points: 20,
        status: "Pending",
        description: "Mark Lothal, Kalibangan, Harappa and Ropar on India outline map.",
        submitted: false,
        submissionsCount: 15
      }
    ],
    materials: [
      { id: "mat-sst1", title: "Chapter 3 Summary: From Gathering to Growing Food", type: "PDF Notes", date: "07 Sep 2026", size: "1.9 MB" }
    ],
    enrolledStudentIds: ["stu-3"] // Notice: Aarav (stu-1) hasn't joined this one yet, so it appears in Discover to test joining!
  },

  // Class 8 classrooms (to verify isolation for Class 8 student Rohan)
  {
    id: "cls-8-sci",
    title: "Class 8A - Physics & Chemical Effects of Current",
    grade: "Class 8",
    section: "A",
    subject: "Science",
    code: "SCI8A-801",
    themeGradient: "from-cyan-600 via-blue-700 to-indigo-900",
    accentColor: "cyan",
    room: "Science Lab 301",
    schedule: "Mon, Wed, Fri • 11:00 AM - 12:00 PM",
    teacherId: "tea-1",
    teacherName: "Dr. Priya Sharma",
    teacherAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    teacherRole: "Science Teacher",
    isClassTeacherClass: false,
    description: "Class 8 Advanced Science curriculum covering electroplating, force & pressure, sound waves, and synthetic materials.",
    liveSession: { isActive: false, title: "", startedAt: null, joinCode: "SCI-8A", participantsCount: 0 },
    announcements: [],
    assignments: [],
    materials: [],
    enrolledStudentIds: ["stu-4"]
  },
  {
    id: "cls-8-math",
    title: "Class 8A - Algebraic Identities & Mensuration",
    grade: "Class 8",
    section: "A",
    subject: "Mathematics",
    code: "MTH8A-802",
    themeGradient: "from-indigo-600 via-purple-700 to-pink-900",
    accentColor: "indigo",
    room: "Room 205",
    schedule: "Tue, Thu • 09:00 AM - 10:00 AM",
    teacherId: "tea-2",
    teacherName: "Mr. Rajesh Kumar",
    teacherAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    teacherRole: "Maths Faculty",
    isClassTeacherClass: false,
    description: "Linear equations in one variable, quadrilaterals, data handling, and direct & inverse proportions.",
    liveSession: { isActive: false, title: "", startedAt: null, joinCode: "MATH-8A", participantsCount: 0 },
    announcements: [],
    assignments: [],
    materials: [],
    enrolledStudentIds: ["stu-4"]
  },
  {
    id: "cls-8-eng",
    title: "Class 8A - English Classic Prose & Rhetoric",
    grade: "Class 8",
    section: "A",
    subject: "English",
    code: "ENG8A-803",
    themeGradient: "from-amber-600 via-red-700 to-orange-900",
    accentColor: "amber",
    room: "Room 304",
    schedule: "Mon, Wed • 01:00 PM - 02:00 PM",
    teacherId: "tea-3",
    teacherName: "Ms. Ananya Sen",
    teacherAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    teacherRole: "Class Teacher (8-A)",
    isClassTeacherClass: true,
    description: "Honeydew reader, It So Happened, debate speech craft, and essay composition for Class 8.",
    liveSession: { isActive: false, title: "", startedAt: null, joinCode: "ENG-8A", participantsCount: 0 },
    announcements: [],
    assignments: [],
    materials: [],
    enrolledStudentIds: ["stu-4"]
  }
];

export const AVAILABLE_GRADES = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
export const AVAILABLE_SECTIONS = ["Section A", "Section B", "Section C"];
export const SUBJECT_OPTIONS = [
  "General Science",
  "Mathematics",
  "English Literature",
  "Social Studies",
  "Computer Science & AI",
  "Hindi Sahitya",
  "Physics",
  "Chemistry",
  "Biology",
  "Robotics & Coding",
  "Art & Design",
  "Physical Education"
];
