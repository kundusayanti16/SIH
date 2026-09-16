import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ 
  variant = 'button', // 'button' | 'pill' | 'compact'
  showLabel = false,
  className = '' 
}) {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Current: ${isDark ? 'Dark' : 'Light'} Mode (Click to switch)`}
        className={`relative inline-flex items-center h-8 w-16 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#5F9F7A]/50 shadow-inner ${
          isDark 
            ? 'bg-[#1e2d27] border border-[#2d473c]' 
            : 'bg-[#E7F2EB] border border-[#CFE4D7]'
        } ${className}`}
      >
        {/* Track Icons */}
        <span className="absolute left-2 text-[#F4C95D]">
          <Sun className="w-3.5 h-3.5" />
        </span>
        <span className="absolute right-2 text-[#86BCA0]">
          <Moon className="w-3.5 h-3.5" />
        </span>

        {/* Sliding Thumb */}
        <span
          className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 transform shadow-md ${
            isDark
              ? 'translate-x-8 bg-gradient-to-tr from-[#397257] to-[#5F9F7A] text-white'
              : 'translate-x-0 bg-white text-[#DDAA2E] shadow-sm'
          }`}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 animate-in spin-in-180 duration-300" />
          ) : (
            <Sun className="w-3.5 h-3.5 animate-in spin-in-180 duration-300" />
          )}
        </span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        className={`p-2.5 rounded-2xl transition-all duration-200 border group relative overflow-hidden shadow-sm active:scale-95 ${
          isDark
            ? 'bg-[#14221C] text-[#F8DC8E] border-[#22382E] hover:bg-[#1A2D25] hover:border-[#5F9F7A]/50'
            : 'bg-white text-[#5F9F7A] border-[#E2E8DE] hover:bg-[#F6F8F3] hover:text-[#397257]'
        } ${className}`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <Sun
            className={`w-4 h-4 absolute inset-0 transition-all duration-300 transform ${
              isDark
                ? 'rotate-90 scale-0 opacity-0'
                : 'rotate-0 scale-100 opacity-100 text-[#DDAA2E]'
            }`}
          />
          <Moon
            className={`w-4 h-4 absolute inset-0 transition-all duration-300 transform ${
              isDark
                ? 'rotate-0 scale-100 opacity-100 text-[#86BCA0]'
                : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </div>
      </button>
    );
  }

  // Default 'button' with optional label & rich micro-animations
  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all duration-300 border flex items-center gap-2 group shadow-sm active:scale-95 ${
        isDark
          ? 'bg-[#14221C] text-[#EAF2ED] border-[#22382E] hover:border-[#5F9F7A]/60 hover:bg-[#1A2D25] shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
          : 'bg-white text-[#24332C] border-[#E2E8DE] hover:border-[#5F9F7A]/50 hover:bg-[#F6F8F3]'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 transition-all duration-300 transform ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100 text-[#DDAA2E] group-hover:rotate-45'
          }`}
        />
        <Moon
          className={`w-4 h-4 absolute transition-all duration-300 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 text-[#86BCA0] group-hover:-rotate-12'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>

      {showLabel ? (
        <span className="transition-colors font-semibold">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      ) : (
        <span className="hidden sm:inline-block text-[11px] font-semibold text-inherit">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}
