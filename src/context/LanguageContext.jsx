import React, { createContext, useContext, useState, useEffect } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
];

export const TRANSLATIONS = {
  en: {
    // Brand
    brandName: "GraspIt",
    tagline: "Apni भाषा, apni सीख, apne सपने.",
    campusEdition: "Campus v2.6",

    // Nav
    navHome: "Home",
    navLearn: "Learn",
    navSubjects: "Subjects",
    navLanguages: "Languages",
    navActivities: "Activities",
    navAbout: "About",
    navSearch: "Search",
    navLogin: "Login / Sign Up",
    loginAsStudent: "Login as Student",
    loginAsTeacher: "Login as Teacher",
    loginAsParent: "Login as Parent",
    enterParentPortal: "Enter Parent Portal",
    parentSubtitle: "Monitor child's attendance, grades & teacher updates",
    choosePortal: "Choose Your Portal",

    // Quote
    quotePart1: "Har bachche ko apni",
    quoteLang: "भाषा",
    quotePart2: "mein",
    quoteLearn: "सीखने",
    quotePart3: ",",
    quoteUnderstand: "समझने",
    quotePart4: "aur",
    quoteDream: "सपने देखने",
    quotePart5: "ka",
    quoteRight: "अधिकार",
    quotePart6: "hai.",

    // Hero
    heroTitle1: "Grasp Every Concept.",
    heroTitle2: "Connect Every Classroom.",
    heroSubtitle: "When a Class Teacher creates a classroom, students of that particular grade (e.g. Class 6) instantly see only their assigned subjects, teachers, and live lectures in their mother tongue.",
    heroBtnStudent: "Login as Student",
    heroBtnTeacher: "Login as Teacher",

    // Feature Cards
    feat1Title: "Grade-Locked Visibility",
    feat1Desc: "Students logged in as Class 6 strictly see Class 6 subjects (Science, Maths, English, Computer Science) and teachers assigned to their grade.",
    feat1Badge: "Automatic Filtering",

    feat2Title: "Live Virtual Studio",
    feat2Desc: "Integrated live video stream with simulated HD audio bars, student participant tiles, live doubt chat, and interactive drawing whiteboard.",
    feat2Badge: "HD Video & Board",

    feat3Title: "Class Teacher Hub",
    feat3Desc: "Designated Class Teachers (e.g., Dr. Priya Sharma for 6A) get special broadcast capabilities, full class roster oversight, and direct student tracking.",
    feat3Badge: "Class Teacher Privileges",

    // How Grasp Works
    howTitle: "How Class 6 Auto-Discovery Works on GraspIt",
    howDesc: "When a teacher creates a subject (e.g. Class 6 - Science Lab), it is immediately tagged with Grade 6. Every Class 6 student instantly receives access and can join in 1-click.",
    liveSync: "Live Sync",
    feedSimulation: "Class 6 Student Feed Simulation",

    // Learn Section
    learnTitle: "Interactive Learning Studio",
    learnSubtitle: "Learn fundamental concepts with bilingual explanations, audio visualizer, and step-by-step interactive breakdowns.",
    startPractice: "Start Practice",
    listenAudio: "Listen Audio",

    // Subjects Section
    subjectsTitle: "Explore Class 6 Curriculum",
    subjectsSubtitle: "Comprehensive curriculum designed in your preferred language with interactive notes and problem sheets.",
    openSubject: "Open Subject",
    viewChapters: "View Chapters",

    // Activities Section
    activitiesTitle: "Learning Games & Interactive Activities",
    activitiesSubtitle: "Gamified quizzes, live pronunciation practice, science simulations, and memory boosters.",
    playQuiz: "Play Daily Quiz",
    practicePronounce: "Pronunciation Practice",
    speedMaths: "Speed Math Duel",

    // About Section
    aboutTitle: "About GraspIt • Our Mission",
    aboutSubtitle: "Bridging the regional language barrier in education so every student across India can understand and master concepts in their own language.",
    problemStatement: "Problem Statement",
    problemText: "Millions of students struggle in school not because concepts are tough, but because they are taught in languages they don't speak at home. GraspIt makes classroom learning multilingual, class-isolated, and intuitive.",

    // Search
    searchPlaceholder: "Search topics, chapters, math formulas, science experiments...",
    quickTopics: "Popular Topics:",

    // Modals & General
    selectAccount: "Select Demo Student Account",
    selectFaculty: "Select Faculty Account",
    enterStudentHub: "Enter Student Classroom Hub",
    enterFacultyStudio: "Enter Faculty Studio",
    close: "Close",
    cancel: "Cancel",
    enrolled: "Enrolled",
    joinClass: "Join Classroom",
    footerText: "GraspIt Smart Classroom & Multilingual Learning Platform • 2026 Academic Edition"
  },
  hi: {
    brandName: "GraspIt",
    tagline: "अपनी भाषा, अपनी सीख, अपने सपने.",
    campusEdition: "कैंपस v2.6",

    navHome: "होम",
    navLearn: "सीखें",
    navSubjects: "विषय",
    navLanguages: "भाषाएं",
    navActivities: "गतिविधियां",
    navAbout: "हमारे बारे में",
    navSearch: "खोजें",
    navLogin: "लॉगिन / साइन अप",
    loginAsStudent: "विद्यार्थी लॉगिन",
    loginAsTeacher: "शिक्षक लॉगिन",
    loginAsParent: "अभिभावक लॉगिन",
    enterParentPortal: "अभिभावक पोर्टल में प्रवेश करें",
    parentSubtitle: "बच्चे की उपस्थिति, रिपोर्ट और शिक्षकों के नोटिस देखें",
    choosePortal: "अपना पोर्टल चुनें",

    quotePart1: "हर बच्चे को अपनी",
    quoteLang: "भाषा",
    quotePart2: "में",
    quoteLearn: "सीखने",
    quotePart3: ",",
    quoteUnderstand: "समझने",
    quotePart4: "और",
    quoteDream: "सपने देखने",
    quotePart5: "का",
    quoteRight: "अधिकार",
    quotePart6: "है।",

    heroTitle1: "हर विषय को आसानी से समझें।",
    heroTitle2: "हर कक्षा को सीधे जोड़ें।",
    heroSubtitle: "जब कक्षा अध्यापक (Class Teacher) एक क्लासरूम बनाते हैं, तो उस कक्षा (जैसे कक्षा 6) के सभी छात्रों को केवल उनके अपने विषय, शिक्षक और लाइव क्लास तुरंत दिखाई देते हैं।",
    heroBtnStudent: "विद्यार्थी लॉगिन करें",
    heroBtnTeacher: "शिक्षक लॉगिन करें",

    feat1Title: "कक्षा अनुसार सुरक्षा व फ़िल्टर",
    feat1Desc: "कक्षा 6 के छात्र केवल कक्षा 6 के विषय (विज्ञान, गणित, अंग्रेज़ी, कंप्यूटर) और अपने शिक्षकों को ही देख सकते हैं।",
    feat1Badge: "स्वचालित फ़िल्टर",

    feat2Title: "लाइव वर्चुअल क्लासरूम",
    feat2Desc: "एचडी वीडियो, लाइव चैट, छात्रों की टाइलें और इंटरएक्टिव वाइटबोर्ड के साथ रीयल-टाइम लाइव लेक्चर।",
    feat2Badge: "लाइव वीडियो व बोर्ड",

    feat3Title: "कक्षा अध्यापक का विशेषाधिकार",
    feat3Desc: "क्लास टीचर (जैसे 6A के लिए डॉ. प्रिया शर्मा) पूरे क्लास के छात्रों को तुरंत नोटिस भेज सकते हैं और हाजिरी देख सकते हैं।",
    feat3Badge: "कक्षा अध्यापक केंद्र",

    howTitle: "GraspIt पर कक्षा 6 का ऑटो-डिस्कवरी कैसे काम करता है",
    howDesc: "जैसे ही कोई शिक्षक नया विषय बनाते हैं, वह तुरंत कक्षा 6 के सभी छात्रों की स्क्रीन पर आ जाता है और वे 1-क्लिक में जुड़ सकते हैं।",
    liveSync: "लाइव सिंक",
    feedSimulation: "कक्षा 6 छात्र फ़ीड सिमुलेशन",

    learnTitle: "इंटरएक्टिव लर्निंग स्टूडियो",
    learnSubtitle: "अपनी मातृभाषा में स्पष्टीकरण, ऑडियो और चित्रों के साथ सभी मुख्य विषय सीखें।",
    startPractice: "अभ्यास शुरू करें",
    listenAudio: "ऑडियो सुनें",

    subjectsTitle: "कक्षा 6 का पूरा पाठ्यक्रम",
    subjectsSubtitle: "आपकी चुनी हुई भाषा में तैयार नोट्स, फॉर्मूले और अभ्यास प्रश्न।",
    openSubject: "विषय खोलें",
    viewChapters: "अध्याय देखें",

    activitiesTitle: "शैक्षिक खेल और अभ्यास",
    activitiesSubtitle: "क्विज़, सही उच्चारण अभ्यास, विज्ञान के मजेदार प्रयोग और मेमोरी गेम।",
    playQuiz: "दैनिक क्विज़ खेलें",
    practicePronounce: "उच्चारण अभ्यास",
    speedMaths: "स्पीड मैथ्स मुकाबला",

    aboutTitle: "GraspIt के बारे में • हमारा उद्देश्य",
    aboutSubtitle: "भाषा की बाधा को मिटाना ताकि भारत का हर बच्चा अपनी मातृभाषा में शिक्षा प्राप्त कर सके।",
    problemStatement: "हमारी सोच",
    problemText: "लाखों बच्चे पढ़ाई में पीछे इसलिए नहीं रहते कि विषय कठिन है, बल्कि इसलिए कि पढ़ाई उस भाषा में नहीं होती जो वे घर पर बोलते हैं। GraspIt हर विषय को अपनी भाषा में आसान बनाता है।",

    searchPlaceholder: "विषय, अध्याय, गणित के सूत्र, विज्ञान के प्रयोग खोजें...",
    quickTopics: "लोकप्रिय विषय:",

    selectAccount: "डेमो विद्यार्थी खाता चुनें",
    selectFaculty: "शिक्षक खाता चुनें",
    enterStudentHub: "विद्यार्थी पोर्टल में प्रवेश करें",
    enterFacultyStudio: "शिक्षक स्टूडियो में प्रवेश करें",
    close: "बंद करें",
    cancel: "रद्द करें",
    enrolled: "नामांकित",
    joinClass: "कक्षा में जुड़ें",
    footerText: "GraspIt स्मार्ट क्लासरूम व बहुभाषी शिक्षा मंच • 2026 शैक्षणिक संस्करण"
  },
  bn: {
    brandName: "GraspIt",
    tagline: "নিজের ভাষায়, নিজের শেখা, নিজের স্বপ্ন.",
    campusEdition: "ক্যাম্পাস v2.6",

    navHome: "হোম",
    navLearn: "শিখুন",
    navSubjects: "বিষয়সমূহ",
    navLanguages: "ভাষাসমূহ",
    navActivities: "অ্যাক্টিভিটি",
    navAbout: "আমাদের সম্পর্কে",
    navSearch: "অনুসন্ধান",
    navLogin: "লগইন / সাইন আপ",
    loginAsStudent: "ছাত্র লগইন",
    loginAsTeacher: "শিক্ষক লগইন",
    loginAsParent: "অভিভাবক লগইন",
    enterParentPortal: "অভিভাবক পোর্টালে প্রবেশ করুন",
    parentSubtitle: "সন্তানের উপস্থিতি, অগ্রগতি এবং নোটিশ দেখুন",
    choosePortal: "আপনার পোর্টাল নির্বাচন করুন",

    quotePart1: "প্রতিটি শিশুর নিজের",
    quoteLang: "ভাষায়",
    quotePart2: "",
    quoteLearn: "শেখা",
    quotePart3: ",",
    quoteUnderstand: "বোঝা",
    quotePart4: "এবং",
    quoteDream: "স্বপ্ন দেখার",
    quotePart5: "",
    quoteRight: "অধিকার",
    quotePart6: "আছে।",

    heroTitle1: "প্রতিটি বিষয় সহজভাবে বুঝুন।",
    heroTitle2: "যুক্ত হোন আপনার ক্লাসরুমে।",
    heroSubtitle: "শ্রেণীশিক্ষক যখন একটি ক্লাসরুম তৈরি করবেন, তখন শুধুমাত্র সেই শ্রেণীর (যেমন ষষ্ঠ শ্রেণী) শিক্ষার্থীরা তাদের নিজস্ব বিষয় এবং লাইভ ক্লাস দেখতে পাবে।",
    heroBtnStudent: "ছাত্র হিসেবে প্রবেশ করুন",
    heroBtnTeacher: "শিক্ষক হিসেবে প্রবেশ করুন",

    feat1Title: "শ্রেণী ভিত্তিক ফিল্টারিং",
    feat1Desc: "ষষ্ঠ শ্রেণীর শিক্ষার্থীরা শুধুমাত্র ষষ্ঠ শ্রেণীর বিষয় (বিজ্ঞান, গণিত, ইংরেজি) এবং বরাদ্দকৃত শিক্ষকদের দেখতে পাবে।",
    feat1Badge: "অটোমেটিক ফিল্টার",

    feat2Title: "লাইভ ভার্চুয়াল ক্লাসরুম",
    feat2Desc: "লাইভ ভিডিও স্ট্রিম, রিয়েল-টাইম চ্যাট এবং ইন্টারঅ্যাক্টিভ ডিজিটাল হোয়াইটবোর্ড।",
    feat2Badge: "এইচডি ভিডিও ও বোর্ড",

    feat3Title: "শ্রেণীশিক্ষক ব্যবস্থাপনা",
    feat3Desc: "শ্রেণীশিক্ষকদের জন্য বিশেষ নোটিশ পাঠানো ও উপস্থিতির সম্পূর্ণ তালিকা।",
    feat3Badge: "ক্লাস টিচার সুবিধা",

    howTitle: "GraspIt-এ ষষ্ঠ শ্রেণীর ক্লাসরুম কীভাবে কাজ করে",
    howDesc: "শিক্ষক নতুন ক্লাসরুম তৈরি করামাত্র তা ষষ্ঠ শ্রেণীর সব শিক্ষার্থীর স্ক্রিনে ভেসে ওঠে।",
    liveSync: "লাইভ সিঙ্ক",
    feedSimulation: "ষষ্ঠ শ্রেণীর ফিড সিমুলেশন",

    learnTitle: "ইন্টারঅ্যাক্টিভ লার্নিং স্টুডিও",
    learnSubtitle: "নিজের ভাষায় সহজ ব্যখ্যা ও অডিওর মাধ্যমে সমস্ত বিষয় শিখুন।",
    startPractice: "অনুশীলন শুরু করুন",
    listenAudio: "অডিও শুনুন",

    subjectsTitle: "ষষ্ঠ শ্রেণীর সম্পূর্ণ পাঠ্যক্রম",
    subjectsSubtitle: "বাংলা ও পছন্দের ভাষায় নোট, সূত্র ও প্রশ্নাবলি।",
    openSubject: "বিষয় খুলুন",
    viewChapters: "অধ্যায়সমূহ দেখুন",

    activitiesTitle: "শিক্ষামূলক খেলা ও কুইজ",
    activitiesSubtitle: "দৈনিক কুইজ, সঠিক উচ্চারণ অনুশীলন এবং আকর্ষণীয় ধাঁধা।",
    playQuiz: "কুইজ খেলুন",
    practicePronounce: "উচ্চারণ অনুশীলন",
    speedMaths: "দ্রুত গণিত প্রতিযোগিতা",

    aboutTitle: "GraspIt সম্পর্কে • আমাদের লক্ষ্য",
    aboutSubtitle: "ভাষাগত দূরত্ব দূর করে ভারতের প্রতিটি শিশুর কাছে নিজের ভাষায় শিক্ষার আলো পৌঁছে দেওয়া।",
    problemStatement: "আমাদের উদ্দেশ্য",
    problemText: "মাতৃভাষায় শিক্ষা শিক্ষার্থীদের যেকোনো কঠিন বিষয় সহজে বুঝতে সাহায্য করে। GraspIt ক্লাসরুম শিক্ষাকে করে তোলে বহুভাষিক ও আনন্দময়।",

    searchPlaceholder: "বিষয়, অধ্যায়, সূত্র বা পরীক্ষা অনুসন্ধান করুন...",
    quickTopics: "জনপ্রিয় বিষয়সমূহ:",

    selectAccount: "ডেমো ছাত্র প্রোফাইল নির্বাচন করুন",
    selectFaculty: "শিক্ষক প্রোফাইল নির্বাচন করুন",
    enterStudentHub: "ছাত্র পোর্টালে প্রবেশ করুন",
    enterFacultyStudio: "শিক্ষক স্টুডিওতে প্রবেশ করুন",
    close: "বন্ধ করুন",
    cancel: "বাতিল করুন",
    enrolled: "যুক্ত আছেন",
    joinClass: "ক্লাসরুমে যুক্ত হন",
    footerText: "GraspIt স্মার্ট ক্লাসরুম ও বহুভাষিক শিক্ষা প্ল্যাটফর্ম • ২০২৬ সংস্করণ"
  },
  pa: {
    brandName: "GraspIt",
    tagline: "ਆਪਣੀ ਭਾਸ਼ਾ, ਆਪਣੀ ਸਿੱਖਿਆ, ਆਪਣੇ ਸੁਪਨੇ.",
    campusEdition: "ਕੈਂਪਸ v2.6",

    navHome: "ਹੋਮ",
    navLearn: "ਸਿੱਖੋ",
    navSubjects: "ਵਿਸ਼ੇ",
    navLanguages: "ਭਾਸ਼ਾਵਾਂ",
    navActivities: "ਗਤੀਵਿਧੀਆਂ",
    navAbout: "ਸਾਡੇ ਬਾਰੇ",
    navSearch: "ਖੋਜੋ",
    navLogin: "ਲਾਗਇਨ / ਸਾਈਨ ਅੱਪ",
    loginAsStudent: "ਵਿਦਿਆਰਥੀ ਲਾਗਇਨ",
    loginAsTeacher: "ਅਧਿਆਪਕ ਲਾਗਇਨ",
    loginAsParent: "ਮਾਪੇ ਲਾਗਇਨ",
    enterParentPortal: "ਮਾਪੇ ਪੋਰਟਲ ਵਿੱਚ ਜਾਓ",
    parentSubtitle: "ਬੱਚੇ ਦੀ ਹਾਜ਼ਰੀ, ਰਿਪੋਰਟਾਂ ਅਤੇ ਨੋਟਿਸ ਦੇਖੋ",
    choosePortal: "ਆਪਣਾ ਪੋਰਟਲ ਚੁਣੋ",

    quotePart1: "ਹਰ ਬੱਚੇ ਨੂੰ ਆਪਣੀ",
    quoteLang: "ਭਾਸ਼ਾ",
    quotePart2: "ਵਿੱਚ",
    quoteLearn: "ਸਿੱਖਣ",
    quotePart3: ",",
    quoteUnderstand: "ਸਮਝਣ",
    quotePart4: "ਅਤੇ",
    quoteDream: "ਸੁਪਨੇ ਦੇਖਣ",
    quotePart5: "ਦਾ",
    quoteRight: "ਅਧਿਕਾਰ",
    quotePart6: "ਹੈ।",

    heroTitle1: "ਹਰ ਵਿਸ਼ੇ ਨੂੰ ਆਸਾਨੀ ਨਾਲ ਸਮਝੋ।",
    heroTitle2: "ਹਰ ਕਲਾਸਰੂਮ ਨਾਲ ਜੁੜੋ।",
    heroSubtitle: "ਜਦੋਂ ਕਲਾਸ ਟੀਚਰ ਕਲਾਸਰੂਮ ਬਣਾਉਂਦੇ ਹਨ, ਤਾਂ ਕਲਾਸ 6 ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਸਿਰਫ ਉਨ੍ਹਾਂ ਦੇ ਵਿਸ਼ੇ ਅਤੇ ਲਾਈਵ ਲੈਕਚਰ ਹੀ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ।",
    heroBtnStudent: "ਵਿਦਿਆਰਥੀ ਲਾਗਇਨ",
    heroBtnTeacher: "ਅਧਿਆਪਕ ਲਾਗਇਨ",

    feat1Title: "ਕਲਾਸ ਮੁਤਾਬਕ ਫਿਲਟਰਿੰਗ",
    feat1Desc: "ਕਲਾਸ 6 ਦੇ ਵਿਦਿਆਰਥੀ ਸਿਰਫ ਕਲਾਸ 6 ਦੇ ਵਿਸ਼ੇ (ਸਾਇੰਸ, ਮੈਥ, ਅੰਗਰੇਜ਼ੀ) ਹੀ ਦੇਖ ਸਕਣਗੇ।",
    feat1Badge: "ਆਟੋਮੈਟਿਕ ਫਿਲਟਰ",

    feat2Title: "ਲਾਈਵ ਵਰਚੁਅਲ ਕਲਾਸਰੂਮ",
    feat2Desc: "ਲਾਈਵ ਵੀਡੀਓ ਲੈਕਚਰ, ਚੈਟ ਅਤੇ ਇੰਟਰਐਕਟਿਵ ਵ੍ਹਾਈਟਬੋਰਡ ਸੁਵਿਧਾ।",
    feat2Badge: "ਐਚ.ਡੀ. ਵੀਡੀਓ ਤੇ ਬੋਰਡ",

    feat3Title: "ਕਲਾਸ ਟੀਚਰ ਵਿਸ਼ੇਸ਼ ਅਧਿਕਾਰ",
    feat3Desc: "ਕਲਾਸ ਇੰਚਾਰਜ ਸਾਰੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਨੋਟਿਸ ਭੇਜ ਸਕਦੇ ਹਨ ਅਤੇ ਹਾਜ਼ਰੀ ਦੇਖ ਸਕਦੇ ਹਨ।",
    feat3Badge: "ਕਲਾਸ ਟੀਚਰ ਹੱਬ",

    howTitle: "GraspIt 'ਤੇ ਕਲਾਸ 6 ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ",
    howDesc: "ਜਿਵੇਂ ਹੀ ਅਧਿਆਪਕ ਨਵੀਂ ਕਲਾਸ ਬਣਾਉਂਦੇ ਹਨ, ਉਹ ਤੁਰੰਤ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਦਿਖਾਈ ਦੇ ਜਾਂਦੀ ਹੈ।",
    liveSync: "ਲਾਈਵ ਸਿੰਕ",
    feedSimulation: "ਕਲਾਸ 6 ਫੀਡ ਸਿਮੂਲੇਸ਼ਨ",

    learnTitle: "ਇੰਟਰਐਕਟਿਵ ਲਰਨਿੰਗ ਸਟੂਡੀਓ",
    learnSubtitle: "ਆਪਣੀ ਮਾਂ-ਬੋਲੀ ਵਿੱਚ ਵਿਗਿਆਨ ਅਤੇ ਗਣਿਤ ਦੇ ਸਾਰੇ ਵਿਸ਼ੇ ਸਮਝੋ।",
    startPractice: "ਅਭਿਆਸ ਸ਼ੁਰੂ ਕਰੋ",
    listenAudio: "ਆਡੀਓ ਸੁਣੋ",

    subjectsTitle: "ਕਲਾਸ 6 ਦਾ ਪੂਰਾ ਸਿਲੇਬਸ",
    subjectsSubtitle: "ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਨੋਟਸ ਅਤੇ ਫਾਰਮੂਲੇ।",
    openSubject: "ਵਿਸ਼ਾ ਖੋਲ੍ਹੋ",
    viewChapters: "ਪਾਠ ਦੇਖੋ",

    activitiesTitle: "ਵਿੱਦਿਅਕ ਖੇਡਾਂ ਅਤੇ ਕੁਇਜ਼",
    activitiesSubtitle: "ਰੋਜ਼ਾਨਾ ਕੁਇਜ਼, ਸ਼ੁੱਧ ਉਚਾਰਨ ਅਭਿਆਸ ਅਤੇ ਮੈਥ ਮੁਕਾਬਲਾ।",
    playQuiz: "ਕੁਇਜ਼ ਖੇਡੋ",
    practicePronounce: "ਉਚਾਰਨ ਅਭਿਆਸ",
    speedMaths: "ਸਪੀਡ ਮੈਥ ਮੁਕਾਬਲਾ",

    aboutTitle: "GraspIt ਬਾਰੇ • ਸਾਡਾ ਮਕਸਦ",
    aboutSubtitle: "ਹਰ ਬੱਚੇ ਨੂੰ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਮਿਆਰੀ ਸਿੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਨਾ।",
    problemStatement: "ਸਾਡੀ ਸੋਚ",
    problemText: "ਬੱਚੇ ਆਪਣੀ ਮਾਤ-ਭਾਸ਼ਾ ਵਿੱਚ ਸਭ ਤੋਂ ਤੇਜ਼ੀ ਨਾਲ ਸਿੱਖਦੇ ਹਨ। GraspIt ਸਿੱਖਿਆ ਨੂੰ ਆਸਾਨ ਬਣਾਉਂਦਾ ਹੈ।",

    searchPlaceholder: "ਵਿਸ਼ਾ, ਪਾਠ, ਗਣਿਤ ਦੇ ਫਾਰਮੂਲੇ ਖੋਜੋ...",
    quickTopics: "ਮੁੱਖ ਵਿਸ਼ੇ:",

    selectAccount: "ਵਿਦਿਆਰਥੀ ਖਾਤਾ ਚੁਣੋ",
    selectFaculty: "ਅਧਿਆਪਕ ਖਾਤਾ ਚੁਣੋ",
    enterStudentHub: "ਵਿਦਿਆਰਥੀ ਪੋਰਟਲ ਵਿੱਚ ਜਾਓ",
    enterFacultyStudio: "ਅਧਿਆਪਕ ਸਟੂਡੀਓ ਵਿੱਚ ਜਾਓ",
    close: "ਬੰਦ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    enrolled: "ਜੁੜੇ ਹੋਏ ਹੋ",
    joinClass: "ਕਲਾਸਰੂਮ ਨਾਲ ਜੁੜੋ",
    footerText: "GraspIt ਸਮਾਰਟ ਕਲਾਸਰੂਮ ਪਲੇਟਫਾਰਮ • 2026"
  },
  ta: {
    brandName: "GraspIt",
    tagline: "உங்கள் மொழியில், உங்கள் கல்வி, உங்கள் கனவுகள்.",
    campusEdition: "Campus v2.6",

    navHome: "முகப்பு",
    navLearn: "கற்க",
    navSubjects: "பாடங்கள்",
    navLanguages: "மொழிகள்",
    navActivities: "செயல்பாடுகள்",
    navAbout: "எங்களைப் பற்றி",
    navSearch: "தேடுக",
    navLogin: "உள்நுழைவு",
    loginAsStudent: "மாணவர் உள்நுழைவு",
    loginAsTeacher: "ஆசிரியர் உள்நுழைவு",
    loginAsParent: "பெற்றோர் உள்நுழைவு",
    enterParentPortal: "பெற்றோர் தளத்தில் நுழைக",
    parentSubtitle: "குழந்தையின் வருகை, மதிப்பெண் & அறிவிப்புகள்",
    choosePortal: "உங்கள் தளத்தை தேர்வு செய்க",

    quotePart1: "ஒவ்வொரு குழந்தைக்கும் தன்",
    quoteLang: "மொழியில்",
    quotePart2: "",
    quoteLearn: "கற்கவும்",
    quotePart3: ",",
    quoteUnderstand: "புரிந்துகொள்ளவும்",
    quotePart4: "மற்றும்",
    quoteDream: "கனவு காணவும்",
    quotePart5: "முழு",
    quoteRight: "உரிமை",
    quotePart6: "உண்டு.",

    heroTitle1: "ஒவ்வொரு பாடத்தையும் எளிதாகப் புரிந்துகொள்ளுங்கள்.",
    heroTitle2: "வகுப்பறையோடு இணையுங்கள்.",
    heroSubtitle: "ஆசிரியர் வகுப்பை உருவாக்கும்போது, 6ஆம் வகுப்பு மாணவர்கள் தங்கள் பாடங்களை மட்டுமே உடனே காண்பார்கள்.",
    heroBtnStudent: "மாணவராக நுழைக",
    heroBtnTeacher: "ஆசிரியராக நுழைக",

    feat1Title: "வகுப்பு சார்ந்த பார்வை",
    feat1Desc: "6ஆம் வகுப்பு மாணவர்கள் தங்கள் பாடங்களை (அறிவியல், கணிதம், ஆங்கிலம்) மட்டுமே காண முடியும்.",
    feat1Badge: "தானியங்கி வடிகட்டி",

    feat2Title: "நேரலை மெய்நிகர் வகுப்பறை",
    feat2Desc: "நேரலை வீடியோ, கலந்துரையாடல் மற்றும் டிஜிட்டல் கரும்பலகை வசதி.",
    feat2Badge: "HD வீடியோ & பலகை",

    feat3Title: "வகுப்பாசிரியர் வசதிகள்",
    feat3Desc: "வகுப்பாசிரியர் மாணவர்களுக்கு அறிவிப்புகளை உடனே அனுப்பலாம்.",
    feat3Badge: "ஆசிரியர் சிறப்புரிமை",

    howTitle: "GraspIt தளத்தில் 6ஆம் வகுப்பு எவ்வாறு இயங்குகிறது",
    howDesc: "ஆசிரியர் பாடம் உருவாக்கியவுடன் அது மாணவர் திரையில் தோன்றும்.",
    liveSync: "நேரலை இணைப்பு",
    feedSimulation: "மாணவர் திரை மாதிரி",

    learnTitle: "ஊடாடும் கற்றல் தளம்",
    learnSubtitle: "உங்கள் தாய்மொழியில் தெளிவான விளக்கங்களுடன் பாடங்களைக் கற்றுக்கொள்ளுங்கள்.",
    startPractice: "பயிற்சியைத் தொடங்குக",
    listenAudio: "ஆடியோ கேளுங்கள்",

    subjectsTitle: "6ஆம் வகுப்பு முழு பாடத்திட்டம்",
    subjectsSubtitle: "தமிழ் மற்றும் விருப்ப மொழியில் குறிப்புகள் மற்றும் சூத்திரங்கள்.",
    openSubject: "பாடத்தைத் திறக்க",
    viewChapters: "அத்தியாயங்களைப் பார்க்க",

    activitiesTitle: "கல்வி விளையாட்டுகள் & வினாடி வினா",
    activitiesSubtitle: "தினசரி வினாடி வினா, சரியான உச்சரிப்பு பயிற்சி மற்றும் கணித போட்டிகள்.",
    playQuiz: "வினாடி வினா விளையாடு",
    practicePronounce: "உச்சரிப்பு பயிற்சி",
    speedMaths: "வேகக் கணிதப் போட்டி",

    aboutTitle: "GraspIt பற்றி • எங்கள் நோக்கம்",
    aboutSubtitle: "மொழி தடையின்றி இந்தியாவின் அனைத்து குழந்தைகளுக்கும் தாய்மொழியில் சிறந்த கல்வி.",
    problemStatement: "எங்கள் கொள்கை",
    problemText: "குழந்தைகள் தாய்மொழியில் கற்கும் போது எந்தவொரு கடினமான பாடத்தையும் எளிதில் கிரகித்துக் கொள்கிறார்கள்.",

    searchPlaceholder: "பாடங்கள், சூத்திரங்கள், சோதனைகளைத் தேடுக...",
    quickTopics: "முக்கிய தலைப்புகள்:",

    selectAccount: "மாணவர் கணக்கைத் தேர்வுசெய்க",
    selectFaculty: "ஆசிரியர் கணக்கைத் தேர்வுசெய்க",
    enterStudentHub: "மாணவர் தளத்திற்குள் நுழைக",
    enterFacultyStudio: "ஆசிரியர் ஸ்டுடியோவுக்குள் நுழைக",
    close: "மூடுக",
    cancel: "ரத்து செய்",
    enrolled: "இணைக்கப்பட்டுள்ளீர்கள்",
    joinClass: "வகுப்பில் இணைக",
    footerText: "GraspIt ஸ்மார்ட் வகுப்பறை & பலமொழி கற்றல் தளம் • 2026"
  },
  te: {
    brandName: "GraspIt",
    tagline: "మీ భాషలో, మీ విద్య, మీ కలలు.",
    campusEdition: "Campus v2.6",

    navHome: "హోమ్",
    navLearn: "నేర్చుకోండి",
    navSubjects: "సబ్జెక్టులు",
    navLanguages: "భాషలు",
    navActivities: "యాక్టివిటీలు",
    navAbout: "మా గురించి",
    navSearch: "వెతకండి",
    navLogin: "లాగిన్ / సైన్ అప్",
    loginAsStudent: "విద్యార్థి లాగిన్",
    loginAsTeacher: "ఉపాధ్యాయుల లాగిన్",
    loginAsParent: "తల్లిదండ్రుల లాగిన్",
    enterParentPortal: "పేరెంట్ పోర్టల్‌లోకి ప్రవేశించండి",
    parentSubtitle: "పిల్లల హాజరు, మార్కులు మరియు నోటీసులు చూడండి",
    choosePortal: "మీ పోర్టల్ ఎంచుకోండి",

    quotePart1: "ప్రతి బిడ్డకు తన",
    quoteLang: "భాషలో",
    quotePart2: "",
    quoteLearn: "నేర్చుకునే",
    quotePart3: ",",
    quoteUnderstand: "అర్థం చేసుకునే",
    quotePart4: "మరియు",
    quoteDream: "కలలు కనే",
    quotePart5: "పూర్తి",
    quoteRight: "హక్కు",
    quotePart6: "ఉంది.",

    heroTitle1: "ప్రతి అంశాన్ని సులభంగా అర్థం చేసుకోండి.",
    heroTitle2: "మీ తరగతి గదితో కనెక్ట్ అవ్వండి.",
    heroSubtitle: "క్లాస్ టీచర్ తరగతిని సృష్టించినప్పుడు, 6వ తరగతి విద్యార్థులకు వారి సబ్జెక్టులు మాత్రమే కనిపిస్తాయి.",
    heroBtnStudent: "విద్యార్థిగా లాగిన్",
    heroBtnTeacher: "టీచర్‌గా లాగిన్",

    feat1Title: "తరగతి ఆధారిత రక్షణ",
    feat1Desc: "6వ తరగతి విద్యార్థులు తమకు కేటాయించిన సబ్జెక్టులను మాత్రమే చూడగలరు.",
    feat1Badge: "ఆటోమేటిక్ ఫిల్టర్",

    feat2Title: "లైవ్ వర్చువల్ క్లాస్‌రూమ్",
    feat2Desc: "లైవ్ వీడియో, చాట్ మరియు ఇంటరాక్టివ్ వైట్‌బోర్డ్ సౌకర్యం.",
    feat2Badge: "HD వీడియో & బోర్డ్",

    feat3Title: "క్లాస్ టీచర్ ప్రత్యేకాధికారాలు",
    feat3Desc: "తరగతి ఉపాధ్యాయులు విద్యార్థులకు నోటీసులు మరియు హాజరును పర్యవేక్షించవచ్చు.",
    feat3Badge: "టీచర్ హబ్",

    howTitle: "GraspIt లో 6వ తరగతి ఎలా పనిచేస్తుంది",
    howDesc: "ఉపాధ్యాయుడు సబ్జెక్ట్ సృష్టించగానే అది విద్యార్థులకు వెంటనే అందుబాటులోకి వస్తుంది.",
    liveSync: "లైవ్ సింక్",
    feedSimulation: "విద్యార్థి ఫీడ్ నమూనా",

    learnTitle: "ఇంటరాక్టివ్ లెర్నింగ్ స్టూడియో",
    learnSubtitle: "మాతృభాషలో వివరణలతో సైన్స్ మరియు మ్యాథ్స్ సులభంగా నేర్చుకోండి.",
    startPractice: "ప్రాక్టీస్ ప్రారంభించండి",
    listenAudio: "ఆడియో వినండి",

    subjectsTitle: "6వ తరగతి పూర్తి సిలబస్",
    subjectsSubtitle: "తెలుగు మరియు ఇతర భాషల్లో నోట్స్ మరియు ఫార్ములాలు.",
    openSubject: "సబ్జెక్ట్ తెరవండి",
    viewChapters: "పాఠాలు చూడండి",

    activitiesTitle: "విద్యా ఆటలు మరియు క్విజ్",
    activitiesSubtitle: "రోజువారీ క్విజ్, సరైన ఉచ్ఛారణ సాధన మరియు గణిత పోటీలు.",
    playQuiz: "క్విజ్ ఆడండి",
    practicePronounce: "ఉచ్ఛారణ సాధన",
    speedMaths: "స్పీడ్ మ్యాథ్స్",

    aboutTitle: "GraspIt గురించి • మా లక్ష్యం",
    aboutSubtitle: "భాషా అడ్డంకులను తొలగించి ప్రతి విద్యార్థికి మాతృభాషలో నాణ్యమైన విద్య.",
    problemStatement: "మా ఉద్దేశం",
    problemText: "పిల్లలు మాతృభాషలో చదివినప్పుడు క్లిష్టమైన విషయాలను కూడా సులభంగా గ్రహిస్తారు.",

    searchPlaceholder: "పాఠాలు, ఫార్ములాలు, సైన్స్ ప్రయోగాలు వెతకండి...",
    quickTopics: "ప్రముఖ అంశాలు:",

    selectAccount: "విద్యార్థి ఖాతాను ఎంచుకోండి",
    selectFaculty: "టీచర్ ఖాతాను ఎంచుకోండి",
    enterStudentHub: "విద్యార్థి పోర్టల్‌లోకి ప్రవేశించండి",
    enterFacultyStudio: "టీచర్ స్టూడియోలోకి ప్రవేశించండి",
    close: "మూసివేయి",
    cancel: "రద్దు చేయి",
    enrolled: "చేరారు",
    joinClass: "తరగతిలో చేరండి",
    footerText: "GraspIt స్మార్ట్ క్లాస్‌రూమ్ ప్లాట్‌ఫామ్ • 2026"
  },
  mr: {
    brandName: "GraspIt",
    tagline: "आपली भाषा, आपली शिकवण, आपली स्वप्ने.",
    campusEdition: "कॅम्पस v2.6",

    navHome: "होम",
    navLearn: "शिका",
    navSubjects: "विषय",
    navLanguages: "भाषा",
    navActivities: "उपक्रम",
    navAbout: "आमच्याबद्दल",
    navSearch: "शोधा",
    navLogin: "लॉगिन / साइन अप",
    loginAsStudent: "विद्यार्थी लॉगिन",
    loginAsTeacher: "शिक्षक लॉगिन",
    loginAsParent: "पालक लॉगिन",
    enterParentPortal: "पालक पोर्टलमध्ये प्रवेश करा",
    parentSubtitle: "मुलाची उपस्थिती, प्रगती आणि शिक्षकांच्या सूचना",
    choosePortal: "आपले पोर्टल निवडा",

    quotePart1: "प्रत्येक मुलाला आपल्या",
    quoteLang: "भाषेत",
    quotePart2: "",
    quoteLearn: "शिकण्याचा",
    quotePart3: ",",
    quoteUnderstand: "समजण्याचा",
    quotePart4: "आणि",
    quoteDream: "स्वप्ने पाहण्याचा",
    quotePart5: "पूर्ण",
    quoteRight: "अधिकार",
    quotePart6: "आहे.",

    heroTitle1: "प्रत्येक संकल्पना सहजपणे समजून घ्या.",
    heroTitle2: "आपल्या वर्गाशी कनेक्ट व्हा.",
    heroSubtitle: "जेव्हा वर्गशिक्षक (Class Teacher) क्लासरूम तयार करतात, तेव्हा इयत्ता ६ वी च्या विद्यार्थ्यांना फक्त त्यांचे विषय आणि लाईव्ह लेक्चर्स दिसतात.",
    heroBtnStudent: "विद्यार्थी लॉगिन",
    heroBtnTeacher: "शिक्षक लॉगिन",

    feat1Title: "इयत्तानुसार सुरक्षित वर्गीकरण",
    feat1Desc: "इयत्ता ६ चे विद्यार्थी फक्त त्यांचे विषय (विज्ञान, गणित, इंग्रजी) आणि शिक्षक पाहू शकतात.",
    feat1Badge: "स्वयंचलित फिल्टर",

    feat2Title: "लाईव्ह व्हर्च्युअल क्लासरूम",
    feat2Desc: "एचडी व्हिडिओ, लाईव्ह चॅट आणि डिजिटल व्हाईटबोर्डसह लाईव्ह शिक्षण.",
    feat2Badge: "एचडी व्हिडिओ व बोर्ड",

    feat3Title: "वर्गशिक्षकांचे विशेषाधिकार",
    feat3Desc: "वर्गशिक्षक सर्व विद्यार्थ्यांना थेट सूचना पाठवू शकतात आणि उपस्थिती पाहू शकतात.",
    feat3Badge: "वर्गशिक्षक केंद्र",

    howTitle: "GraspIt वर इयत्ता ६ वी चे काम कसे चालते",
    howDesc: "शिक्षकांनी नवीन क्लास तयार करताच ती इयत्ता ६ च्या विद्यार्थ्यांच्या स्क्रीनवर दिसते.",
    liveSync: "लाईव्ह सिंक",
    feedSimulation: "इयत्ता ६ वी फीड सिमुलेशन",

    learnTitle: "इंटरअॅक्टिव्ह लर्निंग स्टुडिओ",
    learnSubtitle: "मातृभाषेत सोप्या स्पष्टीकरणासह आणि ऑडिओसह सर्व विषय शिका.",
    startPractice: "सराव सुरू करा",
    listenAudio: "ऑडिओ ऐका",

    subjectsTitle: "इयत्ता ६ वी चा संपूर्ण अभ्यासक्रम",
    subjectsSubtitle: "मराठी व इतर भाषांमध्ये नोट्स आणि सूत्रे.",
    openSubject: "विषय उघडा",
    viewChapters: "धडे पहा",

    activitiesTitle: "शैक्षणिक खेळ आणि क्विझ",
    activitiesSubtitle: "दैनिक क्विझ, योग्य उच्चार सराव आणि वेगवान गणित स्पर्धा.",
    playQuiz: "क्विझ खेळा",
    practicePronounce: "उच्चार सराव",
    speedMaths: "स्पीड मॅथ्स",

    aboutTitle: "GraspIt बद्दल • आमचे ध्येय",
    aboutSubtitle: "भाषेची अडचण दूर करून प्रत्येक मुलाला त्याच्या भाषेत दर्जेदार शिक्षण देणे.",
    problemStatement: "आमचा दृष्टिकोन",
    problemText: "मातृभाषेत शिकल्यामुळे मुले कठीण संकल्पनाही सहज समजून घेतात. GraspIt शिक्षणाला सुलभ बनवते.",

    searchPlaceholder: "विषय, धडे, गणिताची सूत्रे, विज्ञानाचे प्रयोग शोधा...",
    quickTopics: "लोकप्रिय विषय:",

    selectAccount: "विद्यार्थी खाते निवडा",
    selectFaculty: "शिक्षक खाते निवडा",
    enterStudentHub: "विद्यार्थी पोर्टलमध्ये प्रवेश करा",
    enterFacultyStudio: "शिक्षक स्टुडिओमध्ये प्रवेश करा",
    close: "बंद करा",
    cancel: "रद्द करा",
    enrolled: "प्रवेश घेतला आहे",
    joinClass: "वर्गात सामील व्हा",
    footerText: "GraspIt स्मार्ट क्लासरूम प्लॅटफॉर्म • २०२६"
  }
};

export const QUOTE_SEGMENTS = {
  en: [
    { text: "Every child has the ", isHighlight: false },
    { text: "Right", isHighlight: true },
    { text: " to ", isHighlight: false },
    { text: "Learn", isHighlight: true },
    { text: ", ", isHighlight: false },
    { text: "Understand", isHighlight: true },
    { text: ", and ", isHighlight: false },
    { text: "Dream", isHighlight: true },
    { text: " in their own ", isHighlight: false },
    { text: "Language", isHighlight: true },
    { text: ".", isHighlight: false }
  ],
  hi: [
    { text: "हर बच्चे को अपनी ", isHighlight: false },
    { text: "भाषा", isHighlight: true },
    { text: " में ", isHighlight: false },
    { text: "सीखने", isHighlight: true },
    { text: ", ", isHighlight: false },
    { text: "समझने", isHighlight: true },
    { text: " और ", isHighlight: false },
    { text: "सपने देखने", isHighlight: true },
    { text: " का ", isHighlight: false },
    { text: "अधिकार", isHighlight: true },
    { text: " है।", isHighlight: false }
  ],
  bn: [
    { text: "প্রতিটি শিশুর নিজের ", isHighlight: false },
    { text: "ভাষায়", isHighlight: true },
    { text: " ", isHighlight: false },
    { text: "শেখার", isHighlight: true },
    { text: ", ", isHighlight: false },
    { text: "বোঝার", isHighlight: true },
    { text: " এবং ", isHighlight: false },
    { text: "স্বপ্ন দেখার", isHighlight: true },
    { text: " পূর্ণ ", isHighlight: false },
    { text: "অধিকার", isHighlight: true },
    { text: " আছে।", isHighlight: false }
  ],
  pa: [
    { text: "ਹਰ ਬੱਚੇ ਨੂੰ ਆਪਣੀ ", isHighlight: false },
    { text: "ਭਾਸ਼ਾ", isHighlight: true },
    { text: " ਵਿੱਚ ", isHighlight: false },
    { text: "ਸਿੱਖਣ", isHighlight: true },
    { text: ", ", isHighlight: false },
    { text: "ਸਮਝਣ", isHighlight: true },
    { text: " ਅਤੇ ", isHighlight: false },
    { text: "ਸੁਪਨੇ ਦੇਖਣ", isHighlight: true },
    { text: " ਦਾ ", isHighlight: false },
    { text: "ਅਧਿਕਾਰ", isHighlight: true },
    { text: " ਹੈ।", isHighlight: false }
  ],
  ta: [
    { text: "ஒவ்வொரு குழந்தைக்கும் தன் ", isHighlight: false },
    { text: "மொழியில்", isHighlight: true },
    { text: " ", isHighlight: false },
    { text: "கற்கவும்", isHighlight: true },
    { text: ", ", isHighlight: false },
    { text: "புரிந்துகொள்ளவும்", isHighlight: true },
    { text: ", மற்றும் ", isHighlight: false },
    { text: "கனவு காணவும்", isHighlight: true },
    { text: " முழு ", isHighlight: false },
    { text: "உரிமை", isHighlight: true },
    { text: " உண்டு.", isHighlight: false }
  ],
  te: [
    { text: "ప్రతి బిడ్డకు తన ", isHighlight: false },
    { text: "భాషలో", isHighlight: true },
    { text: " ", isHighlight: false },
    { text: "నేర్చుకునే", isHighlight: true },
    { text: ", ", isHighlight: false },
    { text: "అర్థం చేసుకునే", isHighlight: true },
    { text: " మరియు ", isHighlight: false },
    { text: "కలలు కనే", isHighlight: true },
    { text: " పూర్తి ", isHighlight: false },
    { text: "హక్కు", isHighlight: true },
    { text: " ఉంది.", isHighlight: false }
  ],
  mr: [
    { text: "प्रत्येक मुलाला आपल्या ", isHighlight: false },
    { text: "भाषेत", isHighlight: true },
    { text: " ", isHighlight: false },
    { text: "शिकण्याचा", isHighlight: true },
    { text: ", ", isHighlight: false },
    { text: "समजण्याचा", isHighlight: true },
    { text: " आणि ", isHighlight: false },
    { text: "स्वप्ने पाहण्याचा", isHighlight: true },
    { text: " पूर्ण ", isHighlight: false },
    { text: "अधिकार", isHighlight: true },
    { text: " आहे.", isHighlight: false }
  ]
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('grasp_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('grasp_language', currentLang);
  }, [currentLang]);

  const changeLanguage = (langCode) => {
    if (TRANSLATIONS[langCode]) {
      setCurrentLang(langCode);
    }
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || key;
  };

  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const getQuoteSegments = () => QUOTE_SEGMENTS[currentLang] || QUOTE_SEGMENTS['en'];

  return (
    <LanguageContext.Provider value={{
      currentLang,
      changeLanguage,
      t,
      activeLangObj,
      supportedLanguages: SUPPORTED_LANGUAGES,
      quoteSegments: QUOTE_SEGMENTS[currentLang] || QUOTE_SEGMENTS['en'],
      getQuoteSegments
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
