import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Subtitles,
  Share2,
  Download,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Layers,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Send,
  Globe,
  Sliders,
  MessageSquare,
  Smile,
  GraduationCap
} from 'lucide-react';
import DynamicVideoCanvas from './DynamicVideoCanvas';
import VisualSandbox from './VisualSandbox';
import AskMomentDrawer from './AskMomentDrawer';
import { useSchool } from '../../context/SchoolContext';
import { useLanguage } from '../../context/LanguageContext';
import { VIDEO_LANGUAGES, translateVideoContent, resolveTTSVoice, transliterateIndicToPhonetic } from '../../utils/aiVideoEngine';

function formatTime(totalSeconds) {
  const secs = Math.max(0, Math.floor(totalSeconds || 0));
  const mins = Math.floor(secs / 60);
  const remainingSecs = secs % 60;
  return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
}

export default function DynamicVideoPlayer({
  video,
  onClose,
  onAssignToClassroom
}) {
  const { currentUser, showToast, classrooms } = useSchool();
  const { selectedLanguageCode, changeLanguage, t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(video);
  const [currentLanguage, setCurrentLanguage] = useState(video?.language || selectedLanguageCode || 'en');
  const [voiceInfo, setVoiceInfo] = useState({ available: false, name: '' });

  // Presentation Modes: 'video' | 'sandbox'
  const [activePlayerView, setActivePlayerView] = useState('video');
  // Explanation Complexity: false = Academic Standard, true = Simplified (ELI5 / Aasaan Bhasha)
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  // Ask Moment Doubt Drawer
  const [showAskMoment, setShowAskMoment] = useState(false);
  // Compact HUD Notes toggle
  const [showNotesOverlay, setShowNotesOverlay] = useState(false);

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackTime, setPlaybackTime] = useState(0); // in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);

  const containerRef = useRef(null);
  const speechRef = useRef(null);
  const timerRef = useRef(null);
  const speakTimeoutRef = useRef(null);

  // Proactively load and listen for speechSynthesis voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const vList = window.speechSynthesis.getVoices();
        if (vList && vList.length > 0) {
          setAvailableVoices(vList);
        }
      }
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Keep activeVideo in sync if prop changes
  useEffect(() => {
    setActiveVideo(video);
    setCurrentLanguage(video?.language || 'en');
    setCurrentSceneIndex(0);
    setPlaybackTime(0);
    setShowQuiz(false);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setIsPlaying(true);
  }, [video]);

  const scenes = activeVideo?.scenes || [];
  const currentScene = scenes[currentSceneIndex] || scenes[0];
  const sceneDuration = currentScene?.duration || 15;

  const totalVideoDuration = scenes.reduce((acc, s) => acc + (s.duration || 15), 0);
  const elapsedTotalSeconds = scenes.slice(0, currentSceneIndex).reduce((acc, s) => acc + (s.duration || 15), 0) + playbackTime;
  const progressPercent = Math.min(100, (elapsedTotalSeconds / (totalVideoDuration || 1)) * 100);

  // Continuous timeline seeking across full video without scene interruptions
  const seekToTotalSeconds = (targetSecs) => {
    const clamped = Math.max(0, Math.min(totalVideoDuration, targetSecs));
    let accumulated = 0;
    let foundIndex = 0;
    let sceneTime = 0;
    for (let i = 0; i < scenes.length; i++) {
      const dur = scenes[i].duration || 15;
      if (accumulated + dur > clamped || i === scenes.length - 1) {
        foundIndex = i;
        sceneTime = clamped - accumulated;
        break;
      }
      accumulated += dur;
    }
    setCurrentSceneIndex(foundIndex);
    setPlaybackTime(sceneTime);
  };

  const handleRewind10 = () => {
    seekToTotalSeconds(elapsedTotalSeconds - 10);
  };

  const handleForward10 = () => {
    seekToTotalSeconds(elapsedTotalSeconds + 10);
  };

  // Active scene textual content based on Simple vs Standard mode
  const displayTitle = (isSimpleMode && currentScene?.simpleTitle) ? currentScene.simpleTitle : currentScene?.title;
  const displayHeadline = (isSimpleMode && currentScene?.simpleHeadline) ? currentScene.simpleHeadline : currentScene?.headline;
  const displayPoints = (isSimpleMode && currentScene?.simplePoints) ? currentScene.simplePoints : currentScene?.points;
  const displayNarration = (isSimpleMode && currentScene?.simpleNarration) ? currentScene.simpleNarration : currentScene?.narration;
  const displayPhoneticNarration = (isSimpleMode && (currentScene?.simplePhoneticNarration || currentScene?.simpleNarration))
    ? (currentScene.simplePhoneticNarration || transliterateIndicToPhonetic(currentScene.simpleNarration))
    : (currentScene?.phoneticNarration || transliterateIndicToPhonetic(currentScene?.narration));

  // Web Audio Context & Sound Synthesizer
  const audioCtxRef = useRef(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Generates real physical acoustic chimes on scene transitions
  const playSceneChime = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.16);
      osc2.frequency.setValueAtTime(261.63, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  };

  // Immediate sound unlock on user interaction
  const unlockAndPlayAudio = () => {
    setAudioUnlocked(true);
    setIsMuted(false);
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
      }
      playSceneChime();
      speakCurrentScene(displayNarration);
    }
  };

  // Language change handler
  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    if (changeLanguage) {
      changeLanguage(langCode);
    }
    const translated = translateVideoContent(activeVideo, langCode);
    setActiveVideo(translated);
    const langObj = VIDEO_LANGUAGES.find(l => l.code === langCode);
    showToast(`🌐 Video language changed to ${langObj?.name || langCode} (${langObj?.nativeName})!`, 'info');
  };

  // Sync video language when global language changes
  useEffect(() => {
    if (selectedLanguageCode && selectedLanguageCode !== currentLanguage) {
      setCurrentLanguage(selectedLanguageCode);
      const translated = translateVideoContent(activeVideo, selectedLanguageCode);
      setActiveVideo(translated);
    }
  }, [selectedLanguageCode]);

  // Speech Synthesis narration handler
  const speakCurrentScene = (sceneText) => {
    if (!('speechSynthesis' in window)) return;
    if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);

    window.speechSynthesis.cancel();

    if (isMuted || !isPlaying || !sceneText) return;

    // Small delay ensures cancel() cleanly completes and Chrome doesn't swallow the utterance
    speakTimeoutRef.current = setTimeout(() => {
      try {
        if ('speechSynthesis' in window) window.speechSynthesis.resume();

        const langObj = VIDEO_LANGUAGES.find(l => l.code === currentLanguage) || VIDEO_LANGUAGES[0];
        const targetSpeechLang = langObj?.speechLang || 'en-US';

        const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
        const resolution = resolveTTSVoice(currentLanguage, voices);

        let textToSpeak = sceneText;
        let voiceToUse = null;
        let langToUse = 'en-US';

        if (resolution.voice && resolution.isNative) {
          // Native voice exists in browser for this language!
          voiceToUse = resolution.voice;
          langToUse = resolution.voice.lang || targetSpeechLang;
          textToSpeak = sceneText;
          setVoiceInfo({ available: true, name: resolution.voice.name });
        } else {
          // No native regional voice installed on client OS (e.g. Marathi/Bengali/Punjabi on Mac/Windows).
          // Fall back to a neutral English/Indian-English voice.
          // NEVER fall back to Hindi for non-Hindi languages.
          const neutralVoice = voices.find(v => {
            const vLang = (v.lang || '').toLowerCase();
            return (vLang.startsWith('en') || vLang.includes('us')) && !vLang.startsWith('hi');
          }) || voices.find(v => !v.lang?.toLowerCase().startsWith('hi')) || voices[0];

          voiceToUse = neutralVoice;
          langToUse = neutralVoice?.lang || 'en-US';
          // Non-native voices produce 100% silence on Indic script characters.
          // Transliterate to phonetic Latin text so the voice audibly speaks through speakers!
          textToSpeak = displayPhoneticNarration || transliterateIndicToPhonetic(sceneText);
          setVoiceInfo({ available: false, name: neutralVoice?.name || '' });
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        if (voiceToUse) utterance.voice = voiceToUse;
        utterance.lang = langToUse;
        utterance.rate = playbackSpeed;
        utterance.pitch = isSimpleMode ? 1.05 : 1.0;

        utterance.onstart = () => {
          setAudioUnlocked(true);
          console.log("[TTS Started Playing]", { lang: currentLanguage, voice: utterance.voice?.name, text: textToSpeak.substring(0, 30) });
        };

        utterance.onend = () => {
          console.log("[TTS Ended for scene]", currentSceneIndex);
          // Advance to the next scene after a brief 800ms natural pause so voice narration continues smoothly for whole video
          if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
          speakTimeoutRef.current = setTimeout(() => {
            if (isPlaying && activePlayerView === 'video') {
              setCurrentSceneIndex(curr => {
                if (curr < scenes.length - 1) {
                  return curr + 1;
                } else {
                  setIsPlaying(false);
                  if (activeVideo?.quiz) {
                    setShowQuiz(true);
                  }
                  return curr;
                }
              });
              setPlaybackTime(0);
            }
          }, 800);
        };

        utterance.onerror = (e) => {
          console.warn("[DynamicVideoPlayer TTS Error]", e.error);
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("Speech synthesis failed:", err);
      }
    }, 40);
  };

  // When scene changes, mode changes, or playback changes
  useEffect(() => {
    setPlaybackTime(0);
    if (isPlaying && displayNarration && activePlayerView === 'video') {
      if (!isMuted) {
        playSceneChime();
      }
      speakCurrentScene(displayNarration);
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
    };
  }, [currentSceneIndex, isPlaying, isMuted, playbackSpeed, currentLanguage, isSimpleMode, activePlayerView, availableVoices]);

  // Chromium 15s SpeechSynthesis pause workaround
  useEffect(() => {
    if (!isPlaying || isMuted) return;
    const heartbeat = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 8000);
    return () => clearInterval(heartbeat);
  }, [isPlaying, isMuted]);

  // Main playback timer loop
  useEffect(() => {
    if (!isPlaying || activePlayerView !== 'video') {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setPlaybackTime((prev) => {
        const nextTime = prev + 0.25 * playbackSpeed;
        if (nextTime >= sceneDuration) {
          // Advance to next scene
          if (currentSceneIndex < scenes.length - 1) {
            setCurrentSceneIndex(curr => curr + 1);
            return 0;
          } else {
            // End of video reached
            setIsPlaying(false);
            if (activeVideo?.quiz) {
              setShowQuiz(true);
            }
            return sceneDuration;
          }
        }
        return nextTime;
      });
    }, 250);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, currentSceneIndex, sceneDuration, scenes.length, playbackSpeed, activeVideo, activePlayerView]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => { });
      setIsFullscreen(false);
    }
  };

  const handleNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(curr => curr + 1);
      setPlaybackTime(0);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(curr => curr - 1);
      setPlaybackTime(0);
    }
  };

  const handleRestart = () => {
    setCurrentSceneIndex(0);
    setPlaybackTime(0);
    setIsPlaying(true);
    setShowQuiz(false);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  // Trigger "Ask Moment" Doubt Clearance
  const handleOpenAskMoment = () => {
    setIsPlaying(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setShowAskMoment(true);
  };

  // Export lecture summary notes
  const handleExportNotes = () => {
    const langObj = VIDEO_LANGUAGES.find(l => l.code === currentLanguage);
    const notesContent = `
========================================
DYNAMIC AI LECTURE NOTES: ${activeVideo.title}
Topic: ${activeVideo.topic} | Grade: ${activeVideo.gradeLevel}
Language: ${langObj?.name} (${langObj?.nativeName})
Mode: ${isSimpleMode ? 'Simplified (ELI5)' : 'Academic Standard'}
Generated by Grasp AI Video Studio
========================================

${scenes.map((s, idx) => `
PART ${idx + 1}: ${(isSimpleMode && s.simpleTitle ? s.simpleTitle : s.title).toUpperCase()}
----------------------------------------
Concept: ${isSimpleMode && s.simpleHeadline ? s.simpleHeadline : s.headline}
Formula / Key Rule: ${s.formula || 'N/A'}

Key Takeaways:
${(isSimpleMode && s.simplePoints ? s.simplePoints : s.points).map(p => `• ${p}`).join('\n')}

Narration Transcript:
"${isSimpleMode && s.simpleNarration ? s.simpleNarration : s.narration}"
`).join('\n\n')}

${activeVideo.quiz ? `
PRACTICE COMPREHENSION CHECK:
Question: ${activeVideo.quiz.question}
Answer: ${activeVideo.quiz.options[activeVideo.quiz.correctIndex]}
Explanation: ${activeVideo.quiz.explanation}
` : ''}
    `.trim();

    const blob = new Blob([notesContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeVideo.topic.replace(/\s+/g, '_')}_${currentLanguage}_Lecture_Notes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📄 Multilingual lecture notes downloaded successfully!', 'success');
  };

  // Copy share link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('🔗 Video lesson link copied to clipboard!', 'info');
    }
  };

  // Teacher assigns video to class
  const handleAssignToClass = () => {
    if (!selectedClassId) {
      showToast('Please select a target classroom.', 'error');
      return;
    }
    if (onAssignToClassroom) {
      onAssignToClassroom(selectedClassId, activeVideo);
    }
    setShowAssignModal(false);
    showToast(`Video lesson successfully assigned to classroom!`, 'success');
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#0F1E17] text-white border border-[#2D5B45] flex flex-col ${isFullscreen ? 'h-screen w-screen max-w-none rounded-none' : 'min-h-[600px]'
        }`}
    >
      {/* Top Video Header Bar with Mode Switcher & Language Switcher */}
      <div className="px-5 py-3.5 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-20 flex-wrap gap-2">
        {/* Left: Video Details */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#5F9F7A]/20 border border-[#5F9F7A]/40 text-[#5F9F7A]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#5F9F7A] text-white">
                {activeVideo.category || 'AI Video Lesson'}
              </span>
              <span className="text-[10px] font-semibold text-[#00F5D4] bg-white/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse" />
                {formatTime(totalVideoDuration)} Full Video
              </span>
            </div>
            <h2 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {activeVideo.title}
            </h2>
          </div>
        </div>

        {/* Center/Right Mode Tabs: Video | Simple Mode (ELI5) | Visual Sandbox | Ask Moment */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode Pill Bar */}
          <div className="flex items-center p-1 rounded-2xl bg-white/10 border border-white/15">
            {/* Standard Video Mode */}
            <button
              onClick={() => setActivePlayerView('video')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activePlayerView === 'video'
                ? 'bg-gradient-to-r from-[#5F9F7A] to-[#397257] text-white shadow-md'
                : 'text-white/70 hover:text-white'
                }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Video</span>
            </button>

            {/* Explain Simply (ELI5) Mode Toggle */}
            <button
              onClick={() => {
                setIsSimpleMode(!isSimpleMode);
                setActivePlayerView('video');
                showToast(
                  !isSimpleMode
                    ? '🧸 "Explain More Simply" mode enabled! Using everyday analogies & easy words.'
                    : '🎓 Switched back to Standard Academic mode.',
                  'info'
                );
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isSimpleMode
                ? 'bg-[#F4C95D] text-[#24332C] shadow-md'
                : 'text-white/70 hover:text-white'
                }`}
              title="Toggle super simple explanation with everyday analogies"
            >
              <Smile className="w-3.5 h-3.5" />
              <span>{isSimpleMode ? '✨ Simple (Active)' : 'Explain Simply'}</span>
            </button>

            {/* Visual Way Sandbox Mode */}
            <button
              onClick={() => {
                setActivePlayerView('sandbox');
                setIsPlaying(false);
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activePlayerView === 'sandbox'
                ? 'bg-gradient-to-r from-[#3AA6A0] to-[#24706C] text-white shadow-md'
                : 'text-white/70 hover:text-white'
                }`}
              title="Interactive Visual Sandbox"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Visual Way (3D)</span>
            </button>
          </div>

          {/* Ask Moment Button */}
          <button
            onClick={handleOpenAskMoment}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-extrabold shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 animate-pulse-slow"
            title="Ask a doubt about this specific scene / timestamp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Moment</span>
          </button>

          {/* Language Switcher Dropdown */}
          <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-xl border border-white/15 transition-colors">
            <Globe className="w-3.5 h-3.5 text-[#F4C95D]" />
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer pr-1"
            >
              {VIDEO_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#14281F] text-white">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          {currentUser?.role === 'teacher' && (
            <button
              onClick={() => setShowAssignModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#3AA6A0] hover:bg-[#2C8782] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              title="Assign to Class"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Assign</span>
            </button>
          )}

          <button
            onClick={handleExportNotes}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Export Lecture Notes"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Share Video Link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white text-xs font-bold transition-colors ml-1"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Main Video Viewport OR Interactive Visual Sandbox Viewport */}
      {activePlayerView === 'sandbox' ? (
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <VisualSandbox video={activeVideo} language={currentLanguage} />
        </div>
      ) : (
        <div 
          onClick={() => {
            if (!audioUnlocked) unlockAndPlayAudio();
          }}
          className="relative flex-1 min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {/* Real-time Dynamic 60fps Canvas Animation */}
          <DynamicVideoCanvas
            scene={currentScene}
            isPlaying={isPlaying}
            playbackProgress={playbackTime / sceneDuration}
            theme={activeVideo.theme || 'emerald'}
          />

          {/* Prominent Tap to Enable Audio Narration Banner if browser blocked autoplay */}
          {!audioUnlocked && isPlaying && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                unlockAndPlayAudio();
              }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-30 cursor-pointer animate-pulse shadow-2xl rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-400 p-[2px] hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0F1E17]/95 text-white font-bold text-xs sm:text-sm hover:bg-[#0F1E17]/85 transition-colors">
                <Volume2 className="w-4 h-4 text-amber-300 animate-spin" />
                <span>🔊 {t('enableAudioPrompt', 'Tap to Unmute & Enable Voice Narration')}</span>
              </div>
            </div>
          )}

          {/* Dynamic Compact Concept HUD Overlay (Non-intrusive) */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 max-w-[260px] sm:max-w-[320px] pointer-events-auto transition-all duration-300">
            <div className="p-2.5 sm:p-3 rounded-xl bg-black/65 hover:bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl transition-all">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="w-2 h-2 shrink-0 rounded-full bg-[#F4C95D] animate-ping" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#F4C95D] uppercase tracking-wide truncate">
                    {displayTitle}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotesOverlay(!showNotesOverlay)}
                  className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-white/90 transition-colors flex items-center gap-1 cursor-pointer"
                  title={showNotesOverlay ? "Hide notes" : "View key points & formula"}
                >
                  {showNotesOverlay ? (
                    <>Hide <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>Notes <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              </div>

              <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-2">
                {displayHeadline}
              </h3>

              {/* Collapsible Key Bullet Points & Formula */}
              {showNotesOverlay && (
                <div className="mt-2.5 pt-2 border-t border-white/10 animate-fadeIn">
                  <ul className="space-y-1.5 text-[11px] sm:text-xs text-white/90 max-h-48 overflow-y-auto pr-1">
                    {displayPoints?.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#5F9F7A] font-bold mt-0.5">•</span>
                        <span className="leading-tight">{pt?.replace(/^[•✓\-\s]+/, '')}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Formula or Math Card */}
                  {currentScene?.formula && !isSimpleMode && (
                    <div className="mt-2 px-2.5 py-1 rounded-lg bg-[#5F9F7A]/20 border border-[#5F9F7A]/40 font-mono text-[10px] sm:text-xs text-[#F4C95D] font-bold tracking-wide break-words">
                      {currentScene.formula}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Floating "Ask Doubt at this Second" Quick Trigger */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={handleOpenAskMoment}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-bold shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Pause & Ask doubt about this moment"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI Doubt</span>
            </button>
          </div>

          {/* Live Synchronized Subtitles / Captions Banner */}
          {showCaptions && displayNarration && (
            <div className="absolute bottom-4 left-4 right-4 text-center z-10 pointer-events-none">
              <div className="inline-block max-w-2xl px-5 py-2.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl text-xs sm:text-sm font-semibold text-[#F6F8F3] leading-relaxed">
                <span className="text-[#5F9F7A] mr-1.5 font-bold">
                  {VIDEO_LANGUAGES.find(l => l.code === currentLanguage)?.flag} {isSimpleMode ? (t('storyModeLabel', '🧸 Story Voiceover:')) : (t('voiceNativeActive', '● Live Voiceover:'))}
                </span>
                <span>{displayNarration}</span>
              </div>
            </div>
          )}

          {/* End-of-Video Interactive Quiz Overlay */}
          {showQuiz && activeVideo?.quiz && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-30 animate-fade-in">
              <div className="bg-[#14281F] border border-[#5F9F7A] rounded-3xl p-6 max-w-lg w-full shadow-2xl text-left space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#F4C95D]/20 text-[#F4C95D]">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{t('quizTitle', 'Comprehension Quick Check')}</h3>
                      <p className="text-[11px] text-white/70">{t('quizSubtitle', 'Test what you learned from this video')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="text-white/60 hover:text-white text-xs font-bold px-2 py-1"
                  >
                    {t('quizSkipBtn', 'Skip')}
                  </button>
                </div>

                <p className="text-sm font-semibold text-white">
                  {activeVideo.quiz.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {activeVideo.quiz.options.map((opt, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === activeVideo.quiz.correctIndex;
                    let optStyle = 'bg-white/5 border-white/10 hover:bg-white/10 text-white';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        optStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'bg-rose-600/30 border-rose-500 text-rose-300 line-through';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-[#5F9F7A]/30 border-[#5F9F7A] text-[#F4C95D] font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizOption(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Quiz Submit & Explanation */}
                {!quizSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => setQuizSubmitted(true)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#3AA6A0] hover:from-[#4D8A67] hover:to-[#2C8782] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all"
                  >
                    {t('quizSubmitBtn', 'Submit Answer')}
                  </button>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <p className="text-xs text-white/90 leading-relaxed">
                      <strong className="text-[#F4C95D]">Explanation:</strong> {activeVideo.quiz.explanation}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={handleRestart}
                        className="text-xs text-[#5F9F7A] hover:underline font-bold flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Replay Video
                      </button>
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                      >
                        Back to Player
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Timeline & Player Control Bar */}
      {activePlayerView === 'video' && (
        <div className="p-4 bg-black/60 backdrop-blur-xl border-t border-white/10 space-y-3 z-20">
          {/* Timeline Scrubber Bar */}
          <div className="space-y-1.5">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                const fraction = clickX / rect.width;
                seekToTotalSeconds(fraction * totalVideoDuration);
              }}
              className="relative h-2.5 bg-white/15 hover:bg-white/25 rounded-full overflow-hidden cursor-pointer transition-all group"
              title="Click or drag to seek in video"
            >
              <div
                className="h-full bg-gradient-to-r from-[#5F9F7A] via-[#3AA6A0] to-[#F4C95D] rounded-full transition-all duration-150 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Time Elapsed / Total & Current Topic Status */}
            <div className="flex items-center justify-between text-[11px] text-white/70 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5F9F7A] animate-pulse" />
                  <span>{displayTitle || activeVideo.title}</span>
                </span>
              </div>

              <span className="font-mono text-xs font-bold text-[#F4C95D] shrink-0 ml-2 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                {formatTime(elapsedTotalSeconds)} / {formatTime(totalVideoDuration)}
              </span>
            </div>
          </div>

          {/* Controls Layout */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Left Controls: Play/Pause/Rewind10/Forward10/Restart/Mute */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  unlockAndPlayAudio();
                  setIsPlaying(!isPlaying);
                }}
                className="w-10 h-10 rounded-2xl bg-[#5F9F7A] hover:bg-[#4D8A67] text-white flex items-center justify-center shadow-lg shadow-[#5F9F7A]/30 transition-transform active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <button
                onClick={handleRewind10}
                className="px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                title="Rewind 10 Seconds"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>-10s</span>
              </button>

              <button
                onClick={handleForward10}
                className="px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                title="Forward 10 Seconds"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>+10s</span>
              </button>

              <button
                onClick={handleRestart}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Restart Video From Beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Voice Mute / Narration Toggle */}
              <button
                onClick={() => {
                  const nextMuted = !isMuted;
                  setIsMuted(nextMuted);
                  if (!nextMuted) {
                    unlockAndPlayAudio();
                  } else {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  }
                }}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${isMuted ? 'bg-rose-500/30 text-rose-300' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                title={isMuted ? 'Unmute Audio Narration' : 'Mute Audio Narration'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Right Controls: Speed, Captions, Quiz, Fullscreen */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Speed Multiplier */}
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl px-2 py-1.5 border border-white/10 outline-none cursor-pointer"
              >
                <option value="0.75" className="bg-[#14281F] text-white">0.75x</option>
                <option value="1" className="bg-[#14281F] text-white">1.0x</option>
                <option value="1.25" className="bg-[#14281F] text-white">1.25x</option>
                <option value="1.5" className="bg-[#14281F] text-white">1.5x</option>
              </select>

              {/* Captions Toggle */}
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`p-2 rounded-xl transition-colors ${showCaptions ? 'bg-[#5F9F7A] text-white' : 'bg-white/10 text-white/50 hover:bg-white/20'
                  }`}
                title="Toggle Subtitles / Captions"
              >
                <Subtitles className="w-4 h-4" />
              </button>

              {/* Quiz Button */}
              {activeVideo?.quiz && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#F4C95D] hover:bg-[#E5B84B] text-[#24332C] text-xs font-bold transition-transform active:scale-95 flex items-center gap-1 shadow-sm"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Quiz</span>
                </button>
              )}

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "Ask Moment" Contextual AI Doubt Drawer Modal */}
      {showAskMoment && (
        <AskMomentDrawer
          video={activeVideo}
          scene={currentScene}
          sceneIndex={currentSceneIndex}
          playbackTime={elapsedTotalSeconds}
          language={currentLanguage}
          onClose={() => setShowAskMoment(false)}
          onResumeVideo={() => {
            setShowAskMoment(false);
            setIsPlaying(true);
          }}
        />
      )}

      {/* Assign to Classroom Modal */}
      {showAssignModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-40 animate-fade-in">
          <div className="bg-[#14281F] border border-[#5F9F7A] rounded-3xl p-6 max-w-md w-full shadow-2xl text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#3AA6A0]/20 text-[#3AA6A0]">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Assign Video to Classroom</h3>
                <p className="text-xs text-white/70">Share this dynamic lesson with your enrolled students</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/80 block">Select Classroom</label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                <option value="" className="bg-[#14281F] text-white">-- Choose a classroom --</option>
                {classrooms?.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#14281F] text-white">
                    {c.title} ({c.grade})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignToClass}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#3AA6A0] hover:from-[#4D8A67] hover:to-[#2C8782] text-white text-xs font-bold shadow-md"
              >
                Publish Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
