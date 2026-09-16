import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  Play,
  HelpCircle,
  CheckCircle2,
  X,
  Zap,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { resolveSceneDoubt, VIDEO_LANGUAGES, ASK_MOMENT_I18N } from '../../utils/aiVideoEngine';

export default function AskMomentDrawer({
  video,
  scene,
  sceneIndex,
  playbackTime,
  language = 'en',
  onClose,
  onResumeVideo
}) {
  const [questionText, setQuestionText] = useState('');
  const [doubtResponse, setDoubtResponse] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isSpeakingDoubt, setIsSpeakingDoubt] = useState(false);

  // Normalize language key
  const langKey = (language || 'en').toLowerCase();
  const i18n = ASK_MOMENT_I18N[langKey] || ASK_MOMENT_I18N['en'];

  // Native instant quick questions based on the active video language
  const suggestedQuestions = [
    i18n.qSimple,
    i18n.qAnalogy,
    i18n.qWhy,
    i18n.qFormula
  ];

  const handleAskDoubt = (qText) => {
    const q = (typeof qText === 'string' && qText) ? qText : questionText;
    if (!q.trim()) return;

    setIsAnswering(true);
    setTimeout(() => {
      const res = resolveSceneDoubt(video?.topic || 'Science', scene, q, langKey);
      setDoubtResponse(res);
      setIsAnswering(false);
    }, 450);
  };

  const handleListenDoubt = () => {
    if (!('speechSynthesis' in window) || !doubtResponse?.answer) return;
    window.speechSynthesis.cancel();

    if (isSpeakingDoubt) {
      setIsSpeakingDoubt(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(doubtResponse.answer);
    utterance.rate = 1.0;

    const langObj = VIDEO_LANGUAGES.find(l => l.code === langKey);
    const targetSpeechLang = langObj?.speechLang || 'en-US';
    utterance.lang = targetSpeechLang;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetSpeechLang.split('-')[0]));
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onend = () => setIsSpeakingDoubt(false);
    utterance.onerror = () => setIsSpeakingDoubt(false);

    setIsSpeakingDoubt(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#12241C] border border-[#5F9F7A] rounded-3xl p-6 max-w-xl w-full shadow-2xl text-left space-y-5 flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#3AA6A0] text-white shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  {i18n.title}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F4C95D] text-[#24332C]">
                  {i18n.liveTimestamp}
                </span>
              </div>
              <p className="text-[11px] text-white/70">
                {i18n.pausedAt}: <strong className="text-white">"{scene?.title}"</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={i18n.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Suggested Quick Question Pills */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4C95D] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
            <span>{i18n.instantQuestions}</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestionText(sug);
                  handleAskDoubt(sug);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#5F9F7A]/20 border border-white/10 hover:border-[#5F9F7A] text-left text-xs text-white/90 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="truncate pr-2">{sug}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5F9F7A] opacity-0 group-hover:opacity-100 shrink-0 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Question Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskDoubt();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder={i18n.placeholder}
            className="flex-1 bg-white/10 border border-white/20 focus:border-[#5F9F7A] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/50 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={isAnswering}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#3AA6A0] hover:from-[#4D8A67] hover:to-[#2C8782] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {isAnswering ? <Zap className="w-3.5 h-3.5 animate-spin text-[#F4C95D]" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isAnswering ? i18n.asking : i18n.askBtn}</span>
          </button>
        </form>

        {/* AI Answer Card */}
        {doubtResponse && (
          <div className="p-4 rounded-2xl bg-[#173026] border border-[#5F9F7A]/60 shadow-lg space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-[#F4C95D] uppercase tracking-wide">
                  {i18n.aiExplanation}
                </span>
              </div>

              <button
                onClick={handleListenDoubt}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSpeakingDoubt ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={isSpeakingDoubt ? i18n.stopAudio : i18n.listen}
              >
                {isSpeakingDoubt ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeakingDoubt ? i18n.stopAudio : i18n.listen}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
              {doubtResponse.answer}
            </p>

            {doubtResponse.keyTakeaway && (
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#5F9F7A] font-semibold">
                ✓ {doubtResponse.keyTakeaway}
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] text-white/60">
            {i18n.poweredBy}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
            >
              {i18n.close}
            </button>
            <button
              onClick={() => {
                if (onResumeVideo) onResumeVideo();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#3AA6A0] hover:from-[#4D8A67] hover:to-[#2C8782] text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{i18n.resumeVideo}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
