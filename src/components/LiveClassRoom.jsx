import React, { useState, useRef, useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  MonitorUp, 
  Hand, 
  MessageSquare, 
  Users, 
  PenTool, 
  Eraser, 
  RotateCcw, 
  PhoneOff, 
  Sparkles, 
  Send,
  Radio,
  Volume2
} from 'lucide-react';

export default function LiveClassRoom({ classroom, onExit }) {
  const { currentUser } = useSchool();
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeSidePanel, setActiveSidePanel] = useState('chat'); // 'chat' | 'whiteboard' | 'participants'
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: classroom.teacherName, role: 'teacher', text: `Welcome everyone to ${classroom.subject} live class! Please keep your notes ready.`, time: "Just now" },
    { id: 2, sender: "Diya Patel", role: 'student', text: "Good morning Professor!", time: "Just now" }
  ]);
  const [inputText, setInputText] = useState("");

  // Canvas Whiteboard state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("#5F9F7A");
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState('pen'); // 'pen' | 'eraser'

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [activeSidePanel]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize;
    ctx.strokeStyle = tool === 'eraser' ? '#1B2621' : drawColor;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: currentUser.name,
      role: currentUser.role,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#1B2621] rounded-3xl border border-[#2D3F37] overflow-hidden relative animate-fade-in shadow-2xl">
      
      {/* Top Session Bar */}
      <div className="bg-[#24332C]/95 px-6 py-3 border-b border-[#2D3F37] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>Live Class Stream</span>
          </div>
          <div className="h-4 w-px bg-[#397257]/40" />
          <h2 className="text-sm font-bold text-[#F6F8F3] truncate">{classroom.title}</h2>
          <span className="hidden sm:inline text-xs text-[#718078] font-medium">({classroom.subject})</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#E2E8DE] bg-[#1E2D27] px-3 py-1.5 rounded-full border border-[#2D3F37]">
            <Users className="w-3.5 h-3.5 text-[#3AA6A0]" />
            <span>12 Connected</span>
          </div>
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>Leave</span>
          </button>
        </div>
      </div>

      {/* Main Lecture Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Main Stage (Teacher Stream + Student Tiles) */}
        <div className="flex-1 flex flex-col p-4 bg-[#141E1A] overflow-y-auto">
          
          {/* Main Stage Screen: Teacher / Whiteboard broadcast */}
          <div className="relative flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-[#2D3F37] bg-[#1B2621] flex items-center justify-center group shadow-xl">
            {activeSidePanel === 'whiteboard' ? (
              /* Live Whiteboard Mode */
              <div className="w-full h-full flex flex-col bg-[#1B2621] relative">
                {/* Whiteboard Controls */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 p-1.5 rounded-xl bg-[#24332C]/90 border border-[#397257]/40 backdrop-blur-md shadow-lg">
                  <button
                    onClick={() => setTool('pen')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      tool === 'pen' ? 'bg-[#5F9F7A] text-white' : 'text-[#718078] hover:text-[#F6F8F3]'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Pen</span>
                  </button>
                  <button
                    onClick={() => setTool('eraser')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      tool === 'eraser' ? 'bg-[#5F9F7A] text-white' : 'text-[#718078] hover:text-[#F6F8F3]'
                    }`}
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>Eraser</span>
                  </button>

                  <div className="h-4 w-px bg-[#397257]/40 mx-1" />

                  {/* Colors */}
                  <div className="flex items-center gap-1">
                    {['#5F9F7A', '#3AA6A0', '#F4C95D', '#34d399', '#f87171', '#FFFFFF'].map(c => (
                      <button
                        key={c}
                        onClick={() => { setDrawColor(c); setTool('pen'); }}
                        style={{ backgroundColor: c }}
                        className={`w-4 h-4 rounded-full border transition-transform ${drawColor === c && tool === 'pen' ? 'scale-125 border-white ring-1 ring-[#5F9F7A]' : 'border-transparent'}`}
                      />
                    ))}
                  </div>

                  <div className="h-4 w-px bg-[#397257]/40 mx-1" />

                  <button
                    onClick={clearCanvas}
                    className="p-1.5 rounded-lg text-[#718078] hover:text-rose-400 text-xs transition-colors"
                    title="Clear Board"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-full cursor-crosshair bg-[#141E1A]"
                />

                <div className="absolute bottom-3 right-3 text-[11px] text-[#718078] bg-[#24332C]/80 px-2.5 py-1 rounded-md border border-[#2D3F37]">
                  Interactive Live Blackboard • Draw anywhere
                </div>
              </div>
            ) : (
              /* Simulated Teacher Camera View */
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1B2621] via-[#24332C] to-[#1E2D27]">
                <img
                  src={classroom.teacherAvatar}
                  alt={classroom.teacherName}
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-[#5F9F7A]/40 shadow-2xl animate-float"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-extrabold text-base text-[#F6F8F3]">{classroom.teacherName}</h3>
                  <p className="text-xs text-[#3AA6A0] font-semibold">{classroom.teacherRole}</p>
                  <p className="text-[11px] text-[#718078] mt-1">Presenting: Plant Stomata & Cell Structure Demonstration</p>
                </div>

                {/* Simulated Audio Bars */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#24332C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#397257]/40">
                  <Volume2 className="w-4 h-4 text-[#5F9F7A]" />
                  <span className="text-xs font-semibold text-[#5F9F7A]">Speaking</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-3 bg-[#5F9F7A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-5 bg-[#5F9F7A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-2 bg-[#5F9F7A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-[#397257]/30 border border-[#5F9F7A]/40 px-3 py-1 rounded-full text-[#5F9F7A] text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
                  <span>HD 1080p Stream</span>
                </div>
              </div>
            )}
          </div>

          {/* Participant Thumbnail Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 h-24">
            {/* Student 1: Current User */}
            <div className="relative rounded-xl overflow-hidden border border-[#5F9F7A]/40 bg-[#1B2621] flex items-center justify-center p-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover border border-[#5F9F7A]"
              />
              <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                You ({currentUser.name.split(' ')[0]})
              </span>
              {!micActive && (
                <MicOff className="w-3.5 h-3.5 text-rose-400 absolute top-1.5 right-1.5" />
              )}
            </div>

            {/* Student 2: Diya */}
            <div className="relative rounded-xl overflow-hidden border border-[#2D3F37] bg-[#1B2621] flex items-center justify-center p-2">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
                alt="Diya"
                className="w-10 h-10 rounded-full object-cover border border-[#2D3F37]"
              />
              <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-[#E2E8DE] bg-black/60 px-1.5 py-0.5 rounded">
                Diya P.
              </span>
            </div>

            {/* Student 3: Kabir */}
            <div className="relative rounded-xl overflow-hidden border border-[#2D3F37] bg-[#1B2621] flex items-center justify-center p-2">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Kabir"
                className="w-10 h-10 rounded-full object-cover border border-[#2D3F37]"
              />
              <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-[#E2E8DE] bg-black/60 px-1.5 py-0.5 rounded">
                Kabir M.
              </span>
            </div>

            {/* Class info thumbnail */}
            <div className="rounded-xl border border-dashed border-[#2D3F37] bg-[#1E2D27]/50 flex flex-col items-center justify-center text-center p-2 text-[#718078]">
              <span className="text-xs font-bold text-[#3AA6A0]">+9 More</span>
              <span className="text-[10px] text-[#718078]">{classroom.grade}</span>
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-center gap-3 mt-4 pt-2">
            <button
              onClick={() => setMicActive(!micActive)}
              className={`p-3 rounded-2xl transition-all ${
                micActive
                  ? 'bg-[#24332C] text-[#E2E8DE] hover:bg-[#2D3F37] border border-[#397257]/40'
                  : 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              }`}
              title={micActive ? "Mute Microphone" : "Unmute Microphone"}
            >
              {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setVideoActive(!videoActive)}
              className={`p-3 rounded-2xl transition-all ${
                videoActive
                  ? 'bg-[#24332C] text-[#E2E8DE] hover:bg-[#2D3F37] border border-[#397257]/40'
                  : 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              }`}
              title={videoActive ? "Turn Off Camera" : "Turn On Camera"}
            >
              {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`p-3 rounded-2xl transition-all ${
                isHandRaised
                  ? 'bg-[#F4C95D] text-[#24332C] font-bold shadow-lg shadow-[#F4C95D]/30'
                  : 'bg-[#24332C] text-[#E2E8DE] hover:bg-[#2D3F37] border border-[#397257]/40'
              }`}
              title="Raise Hand for Doubt"
            >
              <Hand className="w-5 h-5" />
            </button>

            <div className="h-6 w-px bg-[#2D3F37] mx-1" />

            <button
              onClick={() => setActiveSidePanel(activeSidePanel === 'whiteboard' ? 'chat' : 'whiteboard')}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeSidePanel === 'whiteboard'
                  ? 'bg-gradient-to-r from-[#5F9F7A] to-[#397257] text-white shadow-lg shadow-[#5F9F7A]/30'
                  : 'bg-[#24332C] text-[#E2E8DE] hover:bg-[#2D3F37] border border-[#397257]/40'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Interactive Whiteboard</span>
            </button>
          </div>
        </div>

        {/* Right Side Panel: Live Chat & Doubts */}
        <div className="w-80 bg-[#1B2621] border-l border-[#2D3F37] flex flex-col justify-between">
          <div className="p-4 border-b border-[#2D3F37] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#3AA6A0]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F6F8F3]">
                Live Classroom Chat
              </span>
            </div>
            <span className="text-[10px] bg-[#24332C] text-[#5F9F7A] px-2 py-0.5 rounded-full font-semibold border border-[#397257]/30">
              {chatMessages.length} msgs
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold ${msg.role === 'teacher' ? 'text-[#F4C95D]' : 'text-[#3AA6A0]'}`}>
                    {msg.sender} {msg.role === 'teacher' && '(Faculty)'}
                  </span>
                  <span className="text-[10px] text-[#718078]">{msg.time}</span>
                </div>
                <div className={`p-2.5 rounded-xl ${
                  msg.role === 'teacher'
                    ? 'bg-[#24332C] border border-[#397257]/50 text-[#F6F8F3]'
                    : 'bg-[#1E2D27] border border-[#2D3F37] text-[#E2E8DE]'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-[#2D3F37] bg-[#141E1A] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 p-2 rounded-xl bg-[#24332C] border border-[#397257]/40 text-[#F6F8F3] placeholder-[#718078] text-xs focus:outline-none focus:border-[#5F9F7A]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#5F9F7A] hover:bg-[#397257] text-white transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
