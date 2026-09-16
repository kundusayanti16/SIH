import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Video,
  Play,
  Layers,
  Palette,
  Clock,
  GraduationCap,
  Wand2,
  Zap,
  BookOpen,
  ArrowRight,
  Compass,
  CheckCircle2,
  Search,
  Filter,
  Share2,
  Bookmark,
  Globe
} from 'lucide-react';
import { generateDynamicVideo, TRENDING_TOPICS, VIDEO_LANGUAGES } from '../../utils/aiVideoEngine';
import DynamicVideoPlayer from './DynamicVideoPlayer';
import { useSchool } from '../../context/SchoolContext';
import { useLanguage } from '../../context/LanguageContext';

export default function DynamicVideoStudio({ initialTopic = '' }) {
  const { currentUser, showToast, addAnnouncement, classrooms } = useSchool();
  const { currentLang, selectedLanguageCode, changeLanguage, activeLangObj, t } = useLanguage();

  const [topicInput, setTopicInput] = useState(initialTopic || '');
  const [gradeLevel, setGradeLevel] = useState(currentUser?.grade || 'Class 10');
  const [durationMinutes, setDurationMinutes] = useState(1);
  const [theme, setTheme] = useState('emerald');
  const [language, setLanguage] = useState(selectedLanguageCode || currentLang || 'en');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);

  const playerRef = useRef(null);

  // Saved / Recent Generated Videos
  const [recentVideos, setRecentVideos] = useState(() => {
    const initialLang = selectedLanguageCode || currentLang || 'en';
    return [
      generateDynamicVideo("Photosynthesis", { theme: "emerald", durationMinutes: 1, language: initialLang }),
      generateDynamicVideo("Black Holes", { theme: "cosmos", durationMinutes: 1, language: initialLang }),
      generateDynamicVideo("Newton's Laws", { theme: "tech", durationMinutes: 1, language: initialLang })
    ];
  });

  // Active Video (Default to first video so user always has a working video on screen)
  const [activeVideo, setActiveVideo] = useState(() => {
    const initialLang = selectedLanguageCode || currentLang || 'en';
    return generateDynamicVideo(initialTopic || "Photosynthesis", { theme: "emerald", durationMinutes: 1, language: initialLang });
  });

  // Keep studio language and active videos in sync when global language changes
  useEffect(() => {
    const targetLang = selectedLanguageCode || currentLang || 'en';
    setLanguage(targetLang);

    // Immediately translate/regenerate current video to new global language
    setActiveVideo(prev => {
      if (!prev) return prev;
      return generateDynamicVideo(prev.topic, {
        gradeLevel: prev.gradeLevel,
        durationMinutes: prev.durationMinutes,
        theme: prev.theme,
        language: targetLang
      });
    });

    setRecentVideos(prevList => {
      return prevList.map(v => generateDynamicVideo(v.topic, {
        gradeLevel: v.gradeLevel,
        durationMinutes: v.durationMinutes,
        theme: v.theme,
        language: targetLang
      }));
    });
  }, [selectedLanguageCode, currentLang]);

  // Handle prefilled or initial topic if provided
  useEffect(() => {
    if (initialTopic && initialTopic.trim()) {
      setTopicInput(initialTopic);
      handleGenerate(initialTopic);
    }
  }, [initialTopic]);

  const handleGenerate = (customTopic) => {
    const rawTopic = (typeof customTopic === 'string' && customTopic.trim()) ? customTopic.trim() : (topicInput.trim() || 'Photosynthesis');
    const topicToUse = rawTopic;
    if (!topicInput.trim()) {
      setTopicInput(topicToUse);
    }

    const activeLangToUse = selectedLanguageCode || language || 'en';

    setIsGenerating(true);
    setGenerationProgress(20);
    setGenerationStep(t('generatingStep1', 'Deconstructing academic ontology & core concepts...'));

    setTimeout(() => {
      setGenerationProgress(50);
      setGenerationStep(t('generatingStep2', 'Synthesizing 60fps vector physics & biological simulations...'));
    }, 350);

    setTimeout(() => {
      setGenerationProgress(80);
      setGenerationStep(t('generatingStep3', 'Composing synchronized voice narration & multilingual subtitles...'));
    }, 700);

    setTimeout(() => {
      setGenerationProgress(95);
      setGenerationStep(t('generatingStep4', 'Assembling interactive hotspots & comprehension check...'));
    }, 1000);

    setTimeout(() => {
      try {
        const generated = generateDynamicVideo(topicToUse, {
          gradeLevel,
          durationMinutes: parseInt(durationMinutes, 10) || 5,
          theme,
          language: activeLangToUse
        });

        if (generated) {
          setRecentVideos(prev => [generated, ...prev.filter(v => v.id !== generated.id)]);
          setActiveVideo(generated);
          showToast(`🎉 Interactive animated video created for "${generated.topic}" in ${activeLangObj?.nativeName || activeLangToUse}!`, 'success');
          setTimeout(() => {
            playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 80);
        }
      } catch (err) {
        console.error("Video generation error:", err);
        showToast("Error synthesizing video. Please try again.", "error");
      } finally {
        setIsGenerating(false);
        setGenerationProgress(100);
        setGenerationStep('');
      }
    }, 1250);
  };

  const handleAssignToClassroom = (classId, videoToAssign) => {
    const targetClass = classrooms.find(c => c.id === classId);
    if (!targetClass) return;

    addAnnouncement(
      classId,
      `🎥 Assigned Dynamic AI Video Lesson: "${videoToAssign.title}". All students please review the animated lecture and complete the comprehension quiz.`,
      "Video Lesson Assignment",
      [{ name: `${videoToAssign.topic} - AI Video Lesson`, type: "Dynamic Video", size: "Interactive WebM" }]
    );
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Studio Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#24332C] via-[#397257] to-[#3AA6A0] text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-3 text-[#F4C95D]">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" /> AI Dynamic Video Studio
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Write Any Topic, Generate Dynamic Videos Instantly
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed">
            Enter any concept from physics, biology, mathematics, history, or coding. Our AI engine dynamically composes an interactive animated video with 60fps canvas graphics, synchronized voiceover narration, and comprehension quizzes!
          </p>
        </div>
      </div>

      {/* Dynamic Video Player Section */}
      <div ref={playerRef} className="space-y-3">
        {activeVideo ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-2">
                <Play className="w-4 h-4 text-[#5F9F7A]" />
                <span>Now Playing: {activeVideo.title}</span>
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#5F9F7A]/20 text-[#5F9F7A] border border-[#5F9F7A]/30">
                ● Live 60FPS Simulation
              </span>
            </div>

            <DynamicVideoPlayer
              video={activeVideo}
              onClose={() => setActiveVideo(null)}
              onAssignToClassroom={handleAssignToClassroom}
            />
          </>
        ) : (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#14221C] border border-[#E2E8DE] dark:border-[#22382E] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#5F9F7A]/20 text-[#5F9F7A] flex items-center justify-center mx-auto">
              <Play className="w-6 h-6 ml-0.5" />
            </div>
            <h3 className="text-sm font-bold text-[#24332C] dark:text-white">No Video Currently Active</h3>
            <p className="text-xs text-[#718078] dark:text-[#95ADA0] max-w-sm mx-auto">
              Generate a new video lesson using the form below or pick one from the library!
            </p>
          </div>
        )}
      </div>

      {/* Main Generator Studio Form Card */}
      <div className="bg-white dark:bg-[#14221C] rounded-3xl p-6 sm:p-8 border border-[#E2E8DE] dark:border-[#22382E] shadow-md space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-[#5F9F7A]" />
            <span>AI Dynamic Topic Synthesizer</span>
          </h2>
          <p className="text-xs text-[#718078] dark:text-[#95ADA0] mt-0.5">
            Type any topic or question below to generate a real-time animated lesson video with 60fps canvas graphics
          </p>
        </div>

        {/* Search / Input Bar */}
        <div className="relative flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718078]" />
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleGenerate();
              }}
              placeholder="e.g. Photosynthesis, Black Holes, Pythagorean Theorem, DNA Replication, Newton's Laws..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#CFE4D7] dark:border-[#22382E] text-sm text-[#24332C] dark:text-[#EAF2ED] placeholder-[#718078] focus:bg-white dark:focus:bg-[#14221C] focus:border-[#5F9F7A] focus:ring-4 focus:ring-[#5F9F7A]/15 outline-none transition-all font-medium"
            />
          </div>

          <button
            disabled={isGenerating}
            onClick={() => handleGenerate()}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#5F9F7A] via-[#397257] to-[#3AA6A0] hover:from-[#4D8A67] hover:to-[#24706C] disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-[#5F9F7A]/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 animate-spin text-[#F4C95D]" />
                <span>Generating Animation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#F4C95D]" />
                <span>Generate Video</span>
              </>
            )}
          </button>
        </div>

        {/* High-Tech Animated Holographic Generation Portal */}
        {isGenerating && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0F2119] to-[#08130E] border-2 border-[#5F9F7A]/60 shadow-2xl text-white space-y-4 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5F9F7A]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3AA6A0]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#397257] to-[#5F9F7A] flex items-center justify-center shadow-lg shadow-[#5F9F7A]/40">
                  <Zap className="w-7 h-7 text-[#F4C95D] animate-bounce" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F5D4]" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest font-black text-[#F4C95D]">
                      AI 60FPS Video Synthesis Engine
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-[#00F5D4]">
                      {generationProgress}%
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">{generationStep}</h3>
                </div>
              </div>

              {/* Animated Mini Waveform Visualizer */}
              <div className="flex items-center gap-1.5 h-8 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10">
                {[18, 28, 12, 34, 22, 14, 30, 20, 36, 16].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-[#5F9F7A] animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDuration: `${0.4 + (i % 4) * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Glowing Animated Progress Bar */}
            <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden p-0.5 border border-white/10 relative z-10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#3AA6A0] via-[#5F9F7A] to-[#F4C95D] transition-all duration-300 shadow-[0_0_12px_rgba(95,159,122,0.8)]"
                style={{ width: `${generationProgress}%` }}
              />
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-semibold text-white/80 relative z-10">
              <div className={`p-2 rounded-xl border transition-all ${generationProgress >= 20 ? 'bg-[#5F9F7A]/25 border-[#5F9F7A] text-white' : 'bg-black/30 border-white/10 text-white/40'}`}>
                1. Concept Taxonomy
              </div>
              <div className={`p-2 rounded-xl border transition-all ${generationProgress >= 50 ? 'bg-[#5F9F7A]/25 border-[#5F9F7A] text-white' : 'bg-black/30 border-white/10 text-white/40'}`}>
                2. 60fps Vector Sim
              </div>
              <div className={`p-2 rounded-xl border transition-all ${generationProgress >= 80 ? 'bg-[#5F9F7A]/25 border-[#5F9F7A] text-white' : 'bg-black/30 border-white/10 text-white/40'}`}>
                3. Voice & Subtitles
              </div>
              <div className={`p-2 rounded-xl border transition-all ${generationProgress >= 95 ? 'bg-[#5F9F7A]/25 border-[#5F9F7A] text-white' : 'bg-black/30 border-white/10 text-white/40'}`}>
                4. Interactive Hotspots
              </div>
            </div>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#718078] dark:text-[#95ADA0] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#5F9F7A]" />
            <span>Popular Academic Topics (Click to Instant Generate)</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {TRENDING_TOPICS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTopicInput(item.topic);
                  handleGenerate(item.topic);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#F6F8F3] dark:bg-[#0C1411] hover:bg-[#E7F2EB] dark:hover:bg-[#1C2F27] border border-[#E2E8DE] dark:border-[#22382E] hover:border-[#5F9F7A] text-xs font-semibold text-[#24332C] dark:text-[#EAF2ED] transition-all flex items-center gap-1.5 hover:scale-105 cursor-pointer"
              >
                <span>{item.icon}</span>
                <span>{item.topic}</span>
                <span className="text-[10px] text-[#718078] dark:text-[#95ADA0] bg-white dark:bg-[#14221C] px-1.5 py-0.5 rounded-md border border-[#E2E8DE] dark:border-[#22382E]">
                  {item.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Customization Options */}
        <div className="pt-4 border-t border-[#E2E8DE] dark:border-[#22382E] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Target Grade Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#5F9F7A]" />
              <span>Audience & Grade</span>
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#22382E] rounded-xl px-3 py-2 text-xs font-medium text-[#24332C] dark:text-[#EAF2ED] outline-none focus:border-[#5F9F7A]"
            >
              <option value="Class 6">Class 6 (Middle School)</option>
              <option value="Class 7">Class 7 (Middle School)</option>
              <option value="Class 8">Class 8 (Middle School)</option>
              <option value="Class 9">Class 9 (High School)</option>
              <option value="Class 10">Class 10 (Secondary)</option>
              <option value="Class 11">Class 11 (Senior Secondary)</option>
              <option value="Class 12">Class 12 (Advanced)</option>
              <option value="College">College / Undergraduate</option>
            </select>
          </div>

          {/* Scene Depth & Length */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#5F9F7A]" />
              <span>Video Length & Depth</span>
            </label>
            <select
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              className="w-full bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#22382E] rounded-xl px-3 py-2 text-xs font-medium text-[#24332C] dark:text-[#EAF2ED] outline-none focus:border-[#5F9F7A]"
            >
              <option value="5">5 Minutes (~5:00 min Full Video)</option>
              <option value="8">8 Minutes (~8:00 min Full Video)</option>
              <option value="10">10 Minutes (~10:00 min Full Video)</option>
              <option value="15">15 Minutes (~15:00 min Full Video)</option>
            </select>
          </div>

          {/* Visual Theme */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#5F9F7A]" />
              <span>{t('selectThemeLabel', 'Visual Art Style')}</span>
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#22382E] rounded-xl px-3 py-2 text-xs font-medium text-[#24332C] dark:text-[#EAF2ED] outline-none focus:border-[#5F9F7A]"
            >
              <option value="emerald">Bio-Emerald Nature</option>
              <option value="cosmos">Cosmic Deep Space</option>
              <option value="cyber">Cyberpunk Neo Tech</option>
              <option value="tech">Modern Science Slate</option>
              <option value="sunset">Sunset Studio Gold</option>
            </select>
          </div>

          {/* Narration Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#5F9F7A]" />
              <span>{t('selectLanguageLabel', 'Narration & Video Language')}</span>
            </label>
            <select
              value={selectedLanguageCode || language}
              onChange={(e) => {
                const newLang = e.target.value;
                setLanguage(newLang);
                changeLanguage(newLang);
              }}
              className="w-full bg-[#F6F8F3] dark:bg-[#0C1411] border border-[#E2E8DE] dark:border-[#22382E] rounded-xl px-3 py-2 text-xs font-medium text-[#24332C] dark:text-[#EAF2ED] outline-none focus:border-[#5F9F7A]"
            >
              {VIDEO_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white dark:bg-[#14281F] text-[#24332C] dark:text-white">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Gallery of Generated & Ready-to-Watch Videos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#24332C] dark:text-[#EAF2ED] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#5F9F7A]" />
              <span>Interactive Dynamic Video Library</span>
            </h2>
            <p className="text-xs text-[#718078] dark:text-[#95ADA0]">Instant click-to-play dynamic video modules</p>
          </div>

          <span className="text-xs font-semibold text-[#397257] dark:text-[#68D391] bg-[#E7F2EB] dark:bg-[#14281F] px-2.5 py-1 rounded-full border border-[#CFE4D7] dark:border-[#2D5B45]">
            {recentVideos.length} Video Lessons Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => {
                setActiveVideo(vid);
                setTimeout(() => {
                  playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
              }}
              className="bg-white dark:bg-[#14221C] rounded-2xl border border-[#E2E8DE] dark:border-[#22382E] hover:border-[#5F9F7A] transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              {/* Thumbnail Banner with Play Button */}
              <div className="h-36 bg-[#0F1E17] relative flex items-center justify-center overflow-hidden p-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-[#397257]/30 to-transparent z-10" />

                <div className="relative z-20 flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#5F9F7A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    ~{vid.durationMinutes ? `${vid.durationMinutes} mins` : `${Math.round((vid.scenes?.reduce((a, s) => a + (s.duration || 60), 0) || 300) / 60)} mins`} Full Video
                  </span>
                </div>

                <div className="absolute top-3 left-3 z-20">
                  <span className="text-[10px] font-bold bg-[#5F9F7A] text-white px-2 py-0.5 rounded-md uppercase">
                    {vid.category}
                  </span>
                </div>
              </div>

              {/* Video Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#24332C] dark:text-[#EAF2ED] group-hover:text-[#5F9F7A] line-clamp-1">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-[#718078] dark:text-[#95ADA0] mt-1 line-clamp-2">
                    {vid.scenes?.[0]?.headline || `Interactive dynamic breakdown of ${vid.topic}.`}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E8DE] dark:border-[#22382E] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-[#3AA6A0]">
                    {vid.gradeLevel}
                  </span>
                  <div className="flex items-center gap-1 text-[#5F9F7A] font-bold group-hover:translate-x-0.5 transition-transform">
                    <span>Watch Video</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
