import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import {
  GraduationCap,
  BookOpen,
  Users,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  X,
  BookCheck,
  Check,
  Globe,
  Search,
  Atom,
  HeartHandshake,
  Sparkles,
  Play
} from 'lucide-react';

// Custom Stack of Books Icon Component
function StackOfBooksIcon({ className = "w-5 h-5 text-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Top Book */}
      <path d="M4 6.5C4 5.67 4.67 5 5.5 5H19a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5.5C4.67 9 4 8.33 4 7.5v-1z" fill="currentColor" fillOpacity="0.3" />
      <path d="M7 5v4" />
      {/* Middle Book */}
      <path d="M3 12.5C3 11.67 3.67 11 4.5 11H19a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4.5C3.67 15 3 14.33 3 13.5v-1z" fill="currentColor" fillOpacity="0.4" />
      <path d="M6 11v4" />
      {/* Bottom Book */}
      <path d="M4 18.5C4 17.67 4.67 17 5.5 17H20a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5.5C4.67 21 4 20.33 4 19.5v-1z" fill="currentColor" fillOpacity="0.5" />
      <path d="M7 17v4" />
    </svg>
  );
}

export default function AuthLanding() {
  const { students, teachers, parents, loginStudent, loginTeacher, loginParent } = useSchool();
  const { currentLang, changeLanguage, t, activeLangObj, supportedLanguages, getQuoteSegments } = useLanguage();

  // Dropdowns & Modals
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginModalRole, setLoginModalRole] = useState(null); // 'student' | 'teacher' | 'parent' | null

  // Selected Profile inside Modal
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || '');
  const [selectedParentId, setSelectedParentId] = useState(parents?.[0]?.id || '');

  const handleStudentSubmit = (e) => {
    e?.preventDefault();
    if (selectedStudentId) {
      loginStudent(selectedStudentId);
    }
  };

  const handleTeacherSubmit = (e) => {
    e?.preventDefault();
    if (selectedTeacherId) {
      loginTeacher(selectedTeacherId);
    }
  };

  const handleParentSubmit = (e) => {
    e?.preventDefault();
    if (selectedParentId) {
      loginParent(selectedParentId);
    }
  };

  const openLoginFor = (role) => {
    setLoginModalRole(role);
    setIsLoginDropdownOpen(false);
  };

  // Search Results Pool
  const searchPool = [
    { title: "Photosynthesis & Plant Cell Stomata", subject: "Science", grade: "Class 6", category: "Learn" },
    { title: "Fractions, Decimals & LCM / HCF", subject: "Mathematics", grade: "Class 6", category: "Subjects" },
    { title: "Indus Valley Civilization & Ancient Cities", subject: "Social Science", grade: "Class 6", category: "Learn" },
    { title: "Scratch Block Coding & Algorithms", subject: "Computer Science", grade: "Class 6", category: "Activities" },
    { title: "English Grammar: Active Voice & Tenses", subject: "English", grade: "Class 6", category: "Subjects" },
    { title: "Speed Math & Vedic Calculation Tricks", subject: "Mathematics", grade: "Class 6", category: "Activities" }
  ];

  const searchResults = searchQuery.trim() === '' ? [] : searchPool.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Floating Multilingual Parchment Pages (Namaste across Indian languages)
  const multilingualPages = [
    { text: "नमस्ते", lang: "Hindi", sub: "Namaste", left: "8%", delay: "0s", duration: "18s", rotate: "-6deg" },
    { text: "নমস্কার", lang: "Bengali", sub: "Nomoshkar", left: "22%", delay: "4s", duration: "16s", rotate: "5deg" },
    { text: "வணக்கம்", lang: "Tamil", sub: "Vanakkam", left: "76%", delay: "4s", duration: "20s", rotate: "-4deg" },
    { text: "నమస్కారం", lang: "Telugu", sub: "Namaskaram", left: "88%", delay: "10s", duration: "17s", rotate: "6deg" },
    { text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", lang: "Punjabi", sub: "Sat Sri Akal", left: "14%", delay: "13s", duration: "19s", rotate: "-7deg" },
    { text: "नमस्कार", lang: "Marathi", sub: "Namaskar", left: "30%", delay: "12s", duration: "20s", rotate: "4deg" },
    { text: "નમસ્તે", lang: "Gujarati", sub: "Namaste", left: "66%", delay: "5s", duration: "23s", rotate: "-5deg" },
    { text: "ನಮಸ್ಕಾರ", lang: "Kannada", sub: "Namaskara", left: "84%", delay: "11s", duration: "16s", rotate: "7deg" },
    { text: "നമസ്കാരം", lang: "Malayalam", sub: "Namaskaram", left: "5%", delay: "14s", duration: "21s", rotate: "3deg" },
    { text: "खम्मा घणी", lang: "Rajasthani", sub: "Khamma Ghani", left: "20%", delay: "8s", duration: "17s", rotate: "-8deg" },
    { text: "प्रणाम", lang: "Sanskrit", sub: "Pranaam", left: "58%", delay: "1s", duration: "19s", rotate: "4deg" },
    { text: "Namaste", lang: "English", sub: "Greetings", left: "42%", delay: "10s", duration: "22s", rotate: "-3deg" }
  ];

  return (
    <div className="min-h-screen bg-[#F6F8F3] text-[#24332C] flex flex-col relative overflow-x-hidden selection:bg-[#5F9F7A] selection:text-white font-sans">

      {/* ================= ANIMATED BACKGROUND: MULTILINGUAL PAGES & SAGE/TEAL AURA ================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F6F8F3]">

        {/* 1. Subtle Background Texture / Warm Ambience */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 filter contrast-105"
          style={{
            backgroundImage: `url('/child-reading-book-bg.jpg')`
          }}
        />

        {/* 2. Soft Ambient Gradients & Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F8F3]/80 via-[#F6F8F3]/40 to-[#F6F8F3]" />

        {/* 3. Pulsing Sage, Teal & Gold Aura Lights */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-[#5F9F7A]/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-[25%] left-[20%] w-[380px] h-[380px] bg-[#3AA6A0]/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[420px] h-[420px] bg-[#F4C95D]/15 rounded-full blur-[130px]" />

        {/* 4. Floating Multilingual Cards Rising Across Screen */}
        {multilingualPages.map((page, idx) => (
          <div
            key={idx}
            className="absolute bottom-0 pointer-events-none select-none"
            style={{
              left: page.left,
              animation: `floatPage ${page.duration} ease-in-out infinite`,
              animationDelay: page.delay
            }}
          >
            <div
              className="px-4 py-3 rounded-2xl bg-[#FFFFFF]/90 border border-[#E2E8DE] backdrop-blur-md shadow-[0_10px_30px_rgba(95,159,122,0.12)] text-center transition-transform transform hover:scale-105"
              style={{ transform: `rotate(${page.rotate})` }}
            >
              <div className="text-[#24332C] font-extrabold text-sm sm:text-base tracking-wide drop-shadow-sm">
                {page.text}
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#397257] bg-[#E7F2EB] px-1.5 py-0.2 rounded border border-[#5F9F7A]/30">
                  {page.lang}
                </span>
                <span className="text-[9px] text-[#718078] italic font-medium">
                  {page.sub}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* 5. Floating Shimmering Light Particles */}
        {[
          { top: "60%", left: "48%", delay: "0s", dur: "3s" },
          { top: "52%", left: "54%", delay: "1.2s", dur: "4s" },
          { top: "45%", left: "46%", delay: "0.5s", dur: "2.5s" },
          { top: "58%", left: "52%", delay: "1.8s", dur: "3.5s" },
          { top: "40%", left: "50%", delay: "2.2s", dur: "3.2s" },
          { top: "65%", left: "44%", delay: "0.8s", dur: "4.5s" }
        ].map((pt, pIdx) => (
          <div
            key={pIdx}
            className="absolute w-2 h-2 rounded-full bg-[#5F9F7A]/40 blur-[0.5px] shadow-[0_0_8px_rgba(95,159,122,0.6)] animate-pulse"
            style={{
              top: pt.top,
              left: pt.left,
              animationDuration: pt.dur,
              animationDelay: pt.delay
            }}
          />
        ))}

      </div>

      {/* ================= COMPREHENSIVE NAVBAR ================= */}
      <nav className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-2xl border-b border-[#E2E8DE] px-4 sm:px-6 lg:px-8 py-3 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* 1. Brand Logo & Tagline */}
          <div className="flex items-center gap-3 text-left group shrink-0 select-none">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#397257] via-[#5F9F7A] to-[#3AA6A0] flex items-center justify-center shadow-lg shadow-[#5F9F7A]/20 group-hover:scale-105 transition-transform ring-1 ring-[#5F9F7A]/30">
              <StackOfBooksIcon className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#397257] via-[#5F9F7A] to-[#3AA6A0]">
                  {t('brandName')}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-[#E7F2EB] border border-[#5F9F7A]/30 text-[#397257]">
                  {t('campusEdition')}
                </span>
              </div>
              <p className="text-[11px] text-[#718078] truncate max-w-[200px]">{t('tagline')}</p>
            </div>
          </div>

          {/* 2. Right Side: Search, Language Switcher, and Login Dropdown */}
          <div className="flex items-center gap-2.5">

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-2xl bg-[#FFFFFF] hover:bg-[#F6F8F3] text-[#24332C] border border-[#E2E8DE] transition-all flex items-center gap-2 text-xs font-semibold shadow-sm hover:border-[#5F9F7A]/50"
              title="Search Topics"
            >
              <Search className="w-4 h-4 text-[#5F9F7A]" />
              <span className="hidden xl:inline text-[#718078]">{t('navSearch')}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsLoginDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#FFFFFF] hover:bg-[#F6F8F3] text-[#24332C] border border-[#E2E8DE] text-xs font-bold transition-all shadow-sm hover:border-[#5F9F7A]/50"
              >
                <Globe className="w-4 h-4 text-[#5F9F7A]" />
                <span className="font-extrabold">{activeLangObj.nativeName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#718078] transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Picker Dropdown */}
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-3xl bg-[#FFFFFF] border border-[#E2E8DE] shadow-2xl p-2.5 z-50 animate-slide-down">
                  <div className="px-3 py-1.5 border-b border-[#E2E8DE] mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#397257]">
                    {t('navLanguages')}
                  </div>
                  <div className="space-y-1">
                    {supportedLanguages.map((lang) => {
                      const isSelected = lang.code === currentLang;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${isSelected
                            ? 'bg-[#5F9F7A] text-white shadow-md font-black'
                            : 'text-[#24332C] hover:bg-[#F6F8F3] hover:text-[#397257]'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.nativeName}</span>
                            <span className="text-[10px] opacity-70 font-normal">({lang.name})</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle variant="button" />

            {/* Login Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLoginDropdownOpen(!isLoginDropdownOpen);
                  setIsLangDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#397257] hover:to-[#5F9F7A] text-white font-bold text-xs shadow-lg shadow-[#5F9F7A]/25 hover:scale-105 active:scale-95 transition-all border border-[#5F9F7A]/40"
              >
                <Users className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">{t('navLogin')}</span>
                <span className="sm:hidden">Login</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Login Dropdown */}
              {isLoginDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 rounded-3xl bg-[#FFFFFF] border border-[#E2E8DE] shadow-2xl p-3 z-50 animate-slide-down">
                  <div className="px-3 py-1.5 border-b border-[#E2E8DE] mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#397257] block">
                      {t('choosePortal')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => openLoginFor('student')}
                      className="w-full p-3 rounded-2xl bg-[#F6F8F3] hover:bg-[#E7F2EB] border border-[#E2E8DE] hover:border-[#5F9F7A]/50 text-left flex items-center gap-3.5 transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-[#5F9F7A]/15 text-[#397257] group-hover:bg-[#5F9F7A] group-hover:text-white transition-colors shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#24332C] group-hover:text-[#397257] flex items-center justify-between">
                          <span>{t('loginAsStudent')}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#5F9F7A]" />
                        </div>
                        <p className="text-[11px] text-[#718078] mt-0.5">Class 6 isolated subjects & live lectures</p>
                      </div>
                    </button>

                    <button
                      onClick={() => openLoginFor('teacher')}
                      className="w-full p-3 rounded-2xl bg-[#F6F8F3] hover:bg-[#E7F2EB] border border-[#E2E8DE] hover:border-[#3AA6A0]/50 text-left flex items-center gap-3.5 transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-[#3AA6A0]/15 text-[#3AA6A0] group-hover:bg-[#3AA6A0] group-hover:text-white transition-colors shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#24332C] group-hover:text-[#3AA6A0] flex items-center justify-between">
                          <span>{t('loginAsTeacher')}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#3AA6A0]" />
                        </div>
                        <p className="text-[11px] text-[#718078] mt-0.5">Create grade classrooms & conduct live</p>
                      </div>
                    </button>

                    <button
                      onClick={() => openLoginFor('parent')}
                      className="w-full p-3 rounded-2xl bg-[#F6F8F3] hover:bg-[#FEF9EC] border border-[#E2E8DE] hover:border-[#F4C95D]/60 text-left flex items-center gap-3.5 transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-[#F4C95D]/20 text-[#B88714] group-hover:bg-[#F4C95D] group-hover:text-[#24332C] transition-colors shrink-0">
                        <HeartHandshake className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#24332C] group-hover:text-[#B88714] flex items-center justify-between">
                          <span>{t('loginAsParent')}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#F4C95D]" />
                        </div>
                        <p className="text-[11px] text-[#718078] mt-0.5">{t('parentSubtitle')}</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </nav>

      {/* ================= MAIN DYNAMIC CONTENT ================= */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-16 max-w-7xl mx-auto w-full">

        {/* Inspirational Quote Showcase with Soft Card Glow */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh] py-10 animate-fade-in">
          <div className="w-full p-8 sm:p-12 md:p-16 lg:p-20 rounded-3xl bg-[#FFFFFF]/95 border border-[#E2E8DE] backdrop-blur-2xl shadow-[0_20px_50px_rgba(95,159,122,0.12)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#5F9F7A]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#5F9F7A]/15 transition-all" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#3AA6A0]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center text-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#24332C] font-semibold tracking-wide leading-[2.6] sm:leading-[3.0] md:leading-[3.4] lg:leading-[3.8]">
                {getQuoteSegments().map((segment, sIdx) => {
                  if (segment.isHighlight) {
                    return (
                      <span
                        key={sIdx}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-['Noto_Sans_Devanagari',sans-serif] bg-clip-text text-transparent bg-gradient-to-r from-[#397257] via-[#5F9F7A] to-[#3AA6A0] px-2 py-1 mx-1 inline-block align-middle drop-shadow-sm"
                      >
                        {segment.text}
                      </span>
                    );
                  }
                  return (
                    <span key={sIdx} className="text-[#24332C] inline align-middle">
                      {segment.text}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>

          {/* Quick Launch Dynamic AI Video Studio Card */}
          <div className="w-full mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#24332C] via-[#397257] to-[#3AA6A0] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-[#5F9F7A]/40">
            <div className="space-y-2 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[#F4C95D] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> AI Dynamic Video Studio & Doubt Solver
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Interactive 60FPS Video Lessons in Any Language
              </h3>
              <p className="text-xs text-white/90 max-w-lg">
                Generate real-time simulations, vector physics & biology diagrams, live voiceover narration, and get instant doubt resolution via Ask Moment AI!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 z-10 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => {
                  if (students[0]?.id) {
                    loginStudent(students[0].id);
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#F4C95D] hover:bg-[#E5B84B] text-[#24332C] font-black text-xs shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Video Studio</span>
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* ================= INSTANT SEARCH MODAL ================= */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] border border-[#E2E8DE] rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative animate-slide-down">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8DE] mb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#397257]">
                <Search className="w-4 h-4 text-[#5F9F7A]" />
                <span>Search GraspIt Knowledge Base</span>
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="text-[#718078] hover:text-[#24332C]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs focus:outline-none focus:border-[#5F9F7A] placeholder:text-[#718078]"
              autoFocus
            />

            {searchResults.length > 0 ? (
              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-1">
                {searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openLoginFor('student');
                    }}
                    className="p-3 rounded-xl bg-[#F6F8F3] hover:bg-[#E7F2EB] border border-[#E2E8DE] cursor-pointer flex items-center justify-between transition-colors text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#24332C] block">{res.title}</span>
                      <span className="text-[11px] text-[#397257] font-medium">{res.subject} • {res.grade}</span>
                    </div>
                    <span className="text-[10px] bg-[#FFFFFF] text-[#3AA6A0] px-2 py-0.5 rounded border border-[#E2E8DE] font-semibold">
                      {res.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : searchQuery.trim() !== '' ? (
              <p className="text-xs text-[#718078] text-center py-6">No matching topics found.</p>
            ) : (
              <div className="mt-4 text-xs text-[#718078]">
                <span className="text-[11px] font-bold uppercase text-[#397257] block mb-2">{t('quickTopics')}</span>
                <div className="flex flex-wrap gap-2">
                  {["Photosynthesis", "Fractions LCM", "Class 6 Science", "Computer Algorithm", "Indus Valley"].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-2.5 py-1 rounded-lg bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#24332C] border border-[#E2E8DE] text-[11px] font-medium transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= LOGIN MODAL WITH GLASSMORPHISM ================= */}
      {loginModalRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] border border-[#E2E8DE] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-slide-down">

            {/* Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 blur-3xl pointer-events-none opacity-20 ${loginModalRole === 'student' ? 'bg-[#5F9F7A]' : loginModalRole === 'teacher' ? 'bg-[#3AA6A0]' : 'bg-[#F4C95D]'
              }`} />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8DE] relative z-10">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${loginModalRole === 'student'
                  ? 'bg-[#E7F2EB] text-[#397257]'
                  : loginModalRole === 'teacher'
                    ? 'bg-[#E0F2F1] text-[#3AA6A0]'
                    : 'bg-[#FEF9EC] text-[#B88714]'
                  }`}>
                  {loginModalRole === 'student' ? (
                    <GraduationCap className="w-6 h-6" />
                  ) : loginModalRole === 'teacher' ? (
                    <BookOpen className="w-6 h-6" />
                  ) : (
                    <HeartHandshake className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#24332C]">
                    {loginModalRole === 'student'
                      ? t('loginAsStudent')
                      : loginModalRole === 'teacher'
                        ? t('loginAsTeacher')
                        : t('loginAsParent')}
                  </h2>
                  <p className="text-xs text-[#718078]">
                    {loginModalRole === 'student'
                      ? 'Select student profile to enter grade dashboard'
                      : loginModalRole === 'teacher'
                        ? 'Select faculty profile to manage classrooms'
                        : 'Select parent profile to monitor student progress'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setLoginModalRole(null)}
                className="p-2 rounded-xl text-[#718078] hover:text-[#24332C] hover:bg-[#F6F8F3] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Switch Tabs */}
            <div className="my-4 p-1 bg-[#F6F8F3] rounded-2xl border border-[#E2E8DE] flex gap-2 relative z-10">
              <button
                type="button"
                onClick={() => setLoginModalRole('student')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${loginModalRole === 'student'
                  ? 'bg-[#5F9F7A] text-white font-bold shadow-md'
                  : 'text-[#718078] hover:text-[#24332C]'
                  }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t('loginAsStudent')}</span>
              </button>
              <button
                type="button"
                onClick={() => setLoginModalRole('teacher')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${loginModalRole === 'teacher'
                  ? 'bg-[#3AA6A0] text-white shadow-md font-bold'
                  : 'text-[#718078] hover:text-[#24332C]'
                  }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('loginAsTeacher')}</span>
              </button>
              <button
                type="button"
                onClick={() => setLoginModalRole('parent')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${loginModalRole === 'parent'
                  ? 'bg-[#F4C95D] text-[#24332C] shadow-md font-bold'
                  : 'text-[#718078] hover:text-[#24332C]'
                  }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{t('loginAsParent')}</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="relative z-10">
              {loginModalRole === 'student' ? (
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#E7F2EB] border border-[#5F9F7A]/30 text-xs text-[#397257] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#397257] shrink-0 mt-0.5" />
                    <span>
                      Logging in as <strong>Aarav Sharma</strong> shows exclusively <strong>Class 6</strong> classrooms, subjects, and teachers!
                    </span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {students.map((stu) => {
                      const isSelected = selectedStudentId === stu.id;
                      return (
                        <button
                          key={stu.id}
                          type="button"
                          onClick={() => setSelectedStudentId(stu.id)}
                          className={`w-full p-3 rounded-2xl text-left border flex items-center gap-3.5 transition-all ${isSelected
                            ? 'bg-[#E7F2EB] border-[#5F9F7A] text-[#24332C] shadow-sm ring-1 ring-[#5F9F7A]'
                            : 'bg-[#F6F8F3] border-[#E2E8DE] text-[#24332C] hover:bg-[#FFFFFF]'
                            }`}
                        >
                          <img
                            src={stu.avatar}
                            alt={stu.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#5F9F7A]/40 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs truncate flex items-center gap-2">
                              {stu.name}
                              {stu.grade === "Class 6" && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#5F9F7A]/20 text-[#397257] border border-[#5F9F7A]/30 font-semibold">
                                  Class 6th
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#718078] flex items-center justify-between mt-0.5">
                              <span className="font-medium text-[#3AA6A0]">{stu.grade} - {stu.section}</span>
                              <span>Roll: {stu.rollNo}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#397257] hover:to-[#5F9F7A] text-white font-bold text-xs shadow-lg shadow-[#5F9F7A]/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{t('enterStudentHub')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : loginModalRole === 'teacher' ? (
                <form onSubmit={handleTeacherSubmit} className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#E0F2F1] border border-[#3AA6A0]/30 text-xs text-[#236864] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA6A0] shrink-0 mt-0.5" />
                    <span>
                      Faculty can create grade-specific classrooms (Class 6, 7, 8 etc.) that instantly appear for students.
                    </span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {teachers.map((tea) => {
                      const isSelected = selectedTeacherId === tea.id;
                      return (
                        <button
                          key={tea.id}
                          type="button"
                          onClick={() => setSelectedTeacherId(tea.id)}
                          className={`w-full p-3 rounded-2xl text-left border flex items-center gap-3.5 transition-all ${isSelected
                            ? 'bg-[#E0F2F1] border-[#3AA6A0] text-[#24332C] shadow-sm ring-1 ring-[#3AA6A0]'
                            : 'bg-[#F6F8F3] border-[#E2E8DE] text-[#24332C] hover:bg-[#FFFFFF]'
                            }`}
                        >
                          <img
                            src={tea.avatar}
                            alt={tea.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#3AA6A0]/40 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs truncate flex items-center gap-2">
                              {tea.name}
                              {tea.isClassTeacher && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FEF9EC] text-[#B88714] border border-[#F4C95D]/40 font-semibold">
                                  ★ Class Teacher ({tea.classTeacherOf?.split('-')[0]})
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#718078] flex items-center justify-between mt-0.5">
                              <span className="font-medium text-[#3AA6A0]">{tea.subject}</span>
                              <span className="text-[10px] text-[#718078]">{tea.department}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#3AA6A0] to-[#236864] hover:from-[#236864] hover:to-[#3AA6A0] text-white font-bold text-xs shadow-lg shadow-[#3AA6A0]/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{t('enterFacultyStudio')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleParentSubmit} className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#FEF9EC] border border-[#F4C95D]/40 text-xs text-[#7A5B0B] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B88714] shrink-0 mt-0.5" />
                    <span>
                      Parents can monitor their child's attendance, academic grades, and receive direct notices from Class Teachers.
                    </span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {(parents || []).map((par) => {
                      const isSelected = selectedParentId === par.id;
                      return (
                        <button
                          key={par.id}
                          type="button"
                          onClick={() => setSelectedParentId(par.id)}
                          className={`w-full p-3 rounded-2xl text-left border flex items-center gap-3.5 transition-all ${isSelected
                            ? 'bg-[#FEF9EC] border-[#F4C95D] text-[#24332C] shadow-sm ring-1 ring-[#F4C95D]'
                            : 'bg-[#F6F8F3] border-[#E2E8DE] text-[#24332C] hover:bg-[#FFFFFF]'
                            }`}
                        >
                          <img
                            src={par.avatar}
                            alt={par.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#F4C95D]/40 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs truncate flex items-center gap-2">
                              {par.name}
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FEF9EC] text-[#B88714] border border-[#F4C95D]/30 font-semibold">
                                {par.relation || 'Parent'}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#718078] flex items-center justify-between mt-0.5">
                              <span className="font-medium text-[#3AA6A0]">Child: {par.childName} ({par.childGrade})</span>
                              <span className="text-[#718078]">Attendance: {par.childAttendance}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F4C95D] via-[#5F9F7A] to-[#397257] hover:from-[#397257] hover:to-[#F4C95D] text-[#24332C] hover:text-white font-bold text-xs shadow-lg shadow-[#5F9F7A]/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{t('enterParentPortal')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 text-center text-xs text-[#718078] border-t border-[#E2E8DE] mt-12">
        {t('footerText')}
      </footer>

    </div>
  );
}
