import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSchool } from '../context/SchoolContext';
import { 
  Globe, 
  Check, 
  ChevronDown, 
  Search, 
  Sparkles, 
  Languages, 
  X
} from 'lucide-react';

export default function LanguageSelector({ 
  variant = 'button', // 'button' | 'compact' | 'floating' | 'sidebar' | 'pill'
  showLabel = true,
  className = ''
}) {
  const { 
    currentLang, 
    changeLanguage, 
    supportedLanguages, 
    activeLangObj, 
    t 
  } = useLanguage();

  const { addToast } = useSchool();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = (langCode) => {
    const selected = supportedLanguages.find(l => l.code === langCode);
    changeLanguage(langCode);
    setIsOpen(false);
    setSearchQuery('');
    
    if (addToast && selected) {
      addToast(`🌐 Language changed to ${selected.nativeName} (${selected.name})`, 'success');
    }
  };

  const filteredLanguages = (supportedLanguages || []).filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 1. FLOATING ACTION BUTTON (Always accessible floating widget)
  if (variant === 'floating') {
    return (
      <div 
        ref={dropdownRef} 
        className={`fixed bottom-6 right-6 z-50 select-none ${className}`}
      >
        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Change Website Language"
          title={`Current Language: ${activeLangObj?.nativeName || 'English'} - Click to Change`}
          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#397257] via-[#5F9F7A] to-[#3AA6A0] text-white shadow-xl shadow-[#5F9F7A]/35 hover:shadow-2xl hover:shadow-[#5F9F7A]/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30 backdrop-blur-xl"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Globe className="w-3.5 h-3.5 text-white animate-spin-slow group-hover:rotate-45 transition-transform" />
          </div>
          
          <div className="flex items-center gap-1.5 font-extrabold text-xs">
            <span className="text-base leading-none">{activeLangObj?.flag || '🇮🇳'}</span>
            <span className="tracking-wide">{activeLangObj?.nativeName || 'Language'}</span>
          </div>

          <span className="w-2 h-2 rounded-full bg-[#F4C95D] animate-ping" />
        </button>

        {/* Floating Menu Modal / Dropdown */}
        {isOpen && (
          <div className="absolute bottom-14 right-0 w-80 sm:w-96 rounded-3xl bg-white/95 dark:bg-[#14221C]/95 backdrop-blur-2xl border border-[#E2E8DE] dark:border-[#22382E] shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8DE] dark:border-[#22382E]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E7F2EB] dark:bg-[#1e2d27] flex items-center justify-center text-[#397257] dark:text-[#86BCA0]">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#24332C] dark:text-[#EAF2ED]">
                    {t('selectLanguage') || 'Select Website Language'}
                  </h4>
                  <p className="text-[10px] text-[#718078] dark:text-[#95ADA0]">
                    Change whole platform language in 1-click
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-xl text-[#718078] hover:bg-[#F6F8F3] dark:hover:bg-[#1e2d27]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative my-3">
              <Search className="w-3.5 h-3.5 text-[#718078] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language (e.g. Hindi, Bengali, தமிழ்)..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#22382E] text-[#24332C] dark:text-[#EAF2ED] focus:outline-none focus:ring-2 focus:ring-[#5F9F7A]"
              />
            </div>

            {/* Language Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#5F9F7A] to-[#397257] text-white border-transparent shadow-md shadow-[#5F9F7A]/25 scale-[1.02]'
                        : 'bg-white dark:bg-[#182821] text-[#24332C] dark:text-[#EAF2ED] border-[#E2E8DE] dark:border-[#22382E] hover:border-[#5F9F7A]/60 hover:bg-[#F6F8F3] dark:hover:bg-[#1E3028]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg leading-none">{lang.flag}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{lang.nativeName}</p>
                        <p className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-[#718078] dark:text-[#95ADA0]'}`}>
                          {lang.name}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Tip */}
            <div className="mt-3 pt-2.5 border-t border-[#E2E8DE] dark:border-[#22382E] flex items-center justify-between text-[11px] text-[#718078] dark:text-[#95ADA0]">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#DDAA2E]" /> Live Multilingual Sync
              </span>
              <span className="font-semibold">{supportedLanguages?.length || 0} Languages</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. SIDEBAR COMPACT / PILL VARIANT
  if (variant === 'sidebar') {
    return (
      <div ref={dropdownRef} className={`relative w-full ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#F6F8F3] dark:bg-[#162720] border border-[#E2E8DE] dark:border-[#253D33] text-xs font-bold text-[#24332C] dark:text-[#EAF2ED] hover:border-[#5F9F7A]/60 transition-all shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#5F9F7A]" />
            <span>{activeLangObj?.nativeName || 'English'}</span>
            <span className="text-[10px] text-[#718078] dark:text-[#95ADA0]">({activeLangObj?.name || 'English'})</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-[#718078] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 left-0 w-64 rounded-2xl bg-white dark:bg-[#162720] border border-[#E2E8DE] dark:border-[#253D33] shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#397257] dark:text-[#6ec493] px-2 py-1 mb-1 border-b border-[#E2E8DE] dark:border-[#253D33]">
              {t('navLanguages') || 'Select Language'}
            </div>
            <div className="max-h-52 overflow-y-auto space-y-1">
              {supportedLanguages.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#E7F2EB] dark:bg-[#152e23] text-[#397257] dark:text-[#6ec493] font-black'
                        : 'text-[#24332C] dark:text-[#EAF2ED] hover:bg-[#F6F8F3] dark:hover:bg-[#1f382d]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-[#718078] dark:text-[#95ADA0]">({lang.name})</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#397257] dark:text-[#6ec493]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. DEFAULT NAVBAR BUTTON VARIANT
  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Change Website Language"
        title={`Change Language (Current: ${activeLangObj?.nativeName || 'English'})`}
        className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white dark:bg-[#162720] hover:bg-[#F6F8F3] dark:hover:bg-[#1f382d] text-[#24332C] dark:text-[#EAF2ED] border border-[#E2E8DE] dark:border-[#253D33] text-xs font-bold transition-all shadow-sm hover:border-[#5F9F7A]/60 active:scale-95 group"
      >
        <Globe className="w-4 h-4 text-[#5F9F7A] group-hover:rotate-45 transition-transform duration-300" />
        <span className="text-sm leading-none">{activeLangObj?.flag || '🇮🇳'}</span>
        <span className="font-extrabold tracking-wide">{activeLangObj?.nativeName || 'Language'}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#718078] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Language Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 rounded-3xl bg-white/95 dark:bg-[#162720]/95 backdrop-blur-2xl border border-[#E2E8DE] dark:border-[#253D33] shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#E2E8DE] dark:border-[#253D33]">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#397257] dark:text-[#6ec493] flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" />
              {t('navLanguages') || 'Platform Languages'}
            </span>
            <span className="text-[10px] bg-[#E7F2EB] dark:bg-[#152e23] text-[#397257] dark:text-[#6ec493] px-2 py-0.5 rounded-full font-bold">
              {supportedLanguages?.length || 0} Languages
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 text-[#718078] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language..."
              className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#253D33] text-[#24332C] dark:text-[#EAF2ED] focus:outline-none focus:ring-1 focus:ring-[#5F9F7A]"
            />
          </div>

          {/* Language Item List */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-0.5">
            {filteredLanguages.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#5F9F7A] to-[#397257] text-white font-bold shadow-md shadow-[#5F9F7A]/25'
                      : 'text-[#24332C] dark:text-[#EAF2ED] hover:bg-[#F6F8F3] dark:hover:bg-[#1f382d]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div className="text-left">
                      <div className="font-extrabold">{lang.nativeName}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#718078] dark:text-[#95ADA0]'}`}>
                        {lang.name}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
