import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Sliders,
  Play,
  RotateCcw,
  Zap,
  Layers,
  ArrowRight,
  HelpCircle,
  Activity,
  Maximize2
} from 'lucide-react';

export default function VisualSandbox({ video, language = 'en' }) {
  const topic = (video?.topic || '').toLowerCase();

  // General Interactive Simulation State
  const [sliderVal1, setSliderVal1] = useState(65);
  const [sliderVal2, setSliderVal2] = useState(40);
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);

  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Determine Sandbox Mode based on topic
  const isPhotosynthesis = topic.includes('photo') || topic.includes('plant') || topic.includes('leaf');
  const isBlackHole = topic.includes('black hole') || topic.includes('gravity') || topic.includes('space') || topic.includes('singularity');
  const isNewton = topic.includes('newton') || topic.includes('force') || topic.includes('motion');
  const isPythagoras = topic.includes('pythag') || topic.includes('triangle') || topic.includes('math') || topic.includes('geometry');
  const isAtom = topic.includes('atom') || topic.includes('electron') || topic.includes('chem');

  // Real-time Canvas Rendering for Sandbox
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    let frame = 0;

    const render = () => {
      frame += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Radial Dark Background
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width / 1.2);
      bgGrad.addColorStop(0, '#13281E');
      bgGrad.addColorStop(1, '#09130E');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const cx = width / 2;
      const cy = height / 2;

      if (isPhotosynthesis) {
        // --- Interactive Solar-Leaf Laboratory ---
        const sunPower = sliderVal1 / 100;
        const waterAmount = sliderVal2 / 100;

        // Radiant Sun
        ctx.fillStyle = '#F4C95D';
        ctx.beginPath();
        ctx.arc(80, 80, 28 + Math.sin(frame * 2) * 2, 0, Math.PI * 2);
        ctx.fill();

        // Sunlight Photon Beams heading to leaf
        const rayCount = Math.floor(sunPower * 12) + 3;
        for (let i = 0; i < rayCount; i++) {
          const prog = (frame * 1.5 + i / rayCount) % 1;
          const px = 80 + (cx - 80) * prog;
          const py = 80 + (cy - 80) * prog;
          ctx.fillStyle = '#FFF5B8';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Chloroplast Cell in Center
        ctx.strokeStyle = '#5F9F7A';
        ctx.fillStyle = 'rgba(57, 114, 87, 0.4)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 140, 85, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Thylakoid Stacks with glowing reactions
        [-50, 0, 50].forEach((ox) => {
          for (let oy = -30; oy <= 30; oy += 20) {
            ctx.fillStyle = sunPower > 0.4 ? '#3AA6A0' : '#2D5B45';
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(cx + ox - 22, cy + oy - 6, 44, 12, 4);
            } else {
              ctx.rect(cx + ox - 22, cy + oy - 6, 44, 12);
            }
            ctx.fill();
            ctx.stroke();
          }
        });

        // Floating Output Oxygen (O2) and Glucose bubbles
        const bubbleCount = Math.floor(sunPower * waterAmount * 8);
        for (let i = 0; i < bubbleCount; i++) {
          const angle = (frame * 1.5 + (i * Math.PI * 2) / bubbleCount);
          const bx = cx + Math.cos(angle) * 170;
          const by = cy + Math.sin(angle) * 110;
          ctx.fillStyle = i % 2 === 0 ? '#3AA6A0' : '#F4C95D';
          ctx.beginPath();
          ctx.arc(bx, by, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#111';
          ctx.font = 'bold 8px monospace';
          ctx.fillText(i % 2 === 0 ? 'O₂' : 'C₆', bx - 5, by + 3);
        }
      } else if (isBlackHole) {
        // --- Interactive Spacetime Warp & Gravitational Lensing ---
        const mass = sliderVal1; // 1 to 100 Solar Masses
        const horizonRadius = 25 + (mass / 100) * 55;

        // Warping Coordinate Grid Rings
        for (let r = 200; r >= horizonRadius + 10; r -= 25) {
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(cx, cy, r + Math.sin(frame + r) * 5, (r / 2.3) + Math.cos(frame + r) * 3, frame * 0.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Swirling Accretion Disk
        const accGrad = ctx.createRadialGradient(cx, cy, horizonRadius, cx, cy, horizonRadius + 90);
        accGrad.addColorStop(0, '#000000');
        accGrad.addColorStop(0.3, '#FFAE33');
        accGrad.addColorStop(0.7, '#8E44AD');
        accGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = accGrad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, horizonRadius + 80, horizonRadius + 25, -0.2 + Math.sin(frame * 0.5) * 0.05, 0, Math.PI * 2);
        ctx.fill();

        // Event Horizon Core Sphere
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, horizonRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (isPythagoras) {
        // --- Pythagorean Interactive Geometry ---
        const legA = 30 + (sliderVal1 / 100) * 90; // base
        const legB = 30 + (sliderVal2 / 100) * 80; // height
        const hyp = Math.sqrt(legA * legA + legB * legB);

        const p1 = { x: cx - legA / 2, y: cy + legB / 2 };
        const p2 = { x: cx + legA / 2, y: cy + legB / 2 };
        const p3 = { x: cx - legA / 2, y: cy - legB / 2 };

        // Draw Triangle
        ctx.fillStyle = 'rgba(95, 159, 122, 0.3)';
        ctx.strokeStyle = '#5F9F7A';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right angle marker
        ctx.strokeStyle = '#F4C95D';
        ctx.lineWidth = 2;
        ctx.strokeRect(p1.x, p1.y - 15, 15, 15);

        // Square A Box
        ctx.fillStyle = 'rgba(58, 166, 160, 0.3)';
        ctx.strokeStyle = '#3AA6A0';
        ctx.fillRect(p1.x, p1.y, legA, 35);
        ctx.strokeRect(p1.x, p1.y, legA, 35);

        // Square B Box
        ctx.fillStyle = 'rgba(244, 201, 93, 0.3)';
        ctx.strokeStyle = '#F4C95D';
        ctx.fillRect(p1.x - 35, p3.y, 35, legB);
        ctx.strokeRect(p1.x - 35, p3.y, 35, legB);

        // Labels
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`a = ${Math.round(legA)}`, cx, p1.y + 22);
        ctx.fillText(`b = ${Math.round(legB)}`, p1.x - 30, cy);
        ctx.fillStyle = '#F4C95D';
        ctx.fillText(`c = ${Math.round(hyp)}`, cx + 15, cy - 10);
      } else {
        // --- Universal Interactive System Hub ---
        const nodeCount = 5;
        const radius = 110 + Math.sin(frame) * 5;

        // Central Core
        ctx.fillStyle = '#5F9F7A';
        ctx.strokeStyle = '#F4C95D';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, 38, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(video?.topic?.slice(0, 14) || 'Concept', cx, cy + 4);

        // Satellite Nodes
        for (let i = 0; i < nodeCount; i++) {
          const ang = (i * Math.PI * 2) / nodeCount + frame * 0.4;
          const nx = cx + Math.cos(ang) * radius;
          const ny = cy + Math.sin(ang) * radius;

          ctx.strokeStyle = i === selectedNode ? '#F4C95D' : '#3AA6A0';
          ctx.lineWidth = i === selectedNode ? 3 : 1.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.stroke();

          ctx.fillStyle = i === selectedNode ? '#F4C95D' : '#3AA6A0';
          ctx.beginPath();
          ctx.arc(nx, ny, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(`Node ${i + 1}`, nx, ny + 26);
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [topic, sliderVal1, sliderVal2, selectedNode, isPhotosynthesis, isBlackHole, isPythagoras]);

  return (
    <div className="bg-[#0A1610] rounded-3xl p-5 border border-[#397257] text-white space-y-4 shadow-xl animate-fade-in">
      {/* Top Title & Interactive Badge */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#5F9F7A] text-white shadow-md">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                Interactive Visual Sandbox (Visual Way)
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F4C95D] text-[#24332C]">
                Live 3D Simulation
              </span>
            </div>
            <p className="text-xs text-white/70">
              Drag sliders & click buttons to observe real-time cause-and-effect visual reactions!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Visual Canvas Viewport */}
      <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Live HUD Reaction Overlay */}
        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-white/15 p-3 rounded-xl text-xs space-y-1.5 min-w-[150px]">
          <span className="text-[10px] font-bold text-[#F4C95D] uppercase block">
            Live HUD Meters
          </span>
          {isPhotosynthesis && (
            <>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Sunlight Rate:</span>
                <span className="font-bold text-[#F4C95D]">{sliderVal1}%</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Water Inflow:</span>
                <span className="font-bold text-[#3AA6A0]">{sliderVal2}%</span>
              </div>
              <div className="flex justify-between text-[11px] pt-1 border-t border-white/10">
                <span className="text-white/70">O₂ Production:</span>
                <span className="font-bold text-emerald-400">{Math.round((sliderVal1 * sliderVal2) / 100)} units/s</span>
              </div>
            </>
          )}

          {isBlackHole && (
            <>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Star Mass:</span>
                <span className="font-bold text-[#F4C95D]">{sliderVal1} M_☉</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Horizon Size:</span>
                <span className="font-bold text-[#00E5FF]">{Math.round(sliderVal1 * 2.95)} km</span>
              </div>
              <div className="flex justify-between text-[11px] pt-1 border-t border-white/10">
                <span className="text-white/70">Time Slowdown:</span>
                <span className="font-bold text-rose-400">{(sliderVal1 * 0.12).toFixed(1)}x Slower</span>
              </div>
            </>
          )}

          {isPythagoras && (
            <>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Base a:</span>
                <span className="font-bold text-[#3AA6A0]">{Math.round(30 + (sliderVal1 / 100) * 90)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Height b:</span>
                <span className="font-bold text-[#F4C95D]">{Math.round(30 + (sliderVal2 / 100) * 80)}</span>
              </div>
              <div className="flex justify-between text-[11px] pt-1 border-t border-white/10">
                <span className="text-white/70">Hypotenuse c:</span>
                <span className="font-bold text-emerald-400">
                  {Math.round(Math.sqrt(Math.pow(30 + (sliderVal1 / 100) * 90, 2) + Math.pow(30 + (sliderVal2 / 100) * 80, 2)))}
                </span>
              </div>
            </>
          )}

          {!isPhotosynthesis && !isBlackHole && !isPythagoras && (
            <>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">System Input:</span>
                <span className="font-bold text-[#5F9F7A]">{sliderVal1}%</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Energy Flow:</span>
                <span className="font-bold text-[#F4C95D]">{sliderVal2}%</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
        {/* Slider 1 */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-white/90">
              {isPhotosynthesis ? '☀️ Sunlight Radiation Intensity' : isBlackHole ? '🌌 Star Core Mass (Solar Masses)' : isPythagoras ? '📐 Base Length (Leg a)' : '⚡ Input Variable 1'}
            </span>
            <span className="text-[#F4C95D] font-mono">{sliderVal1}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={sliderVal1}
            onChange={(e) => setSliderVal1(parseInt(e.target.value, 10))}
            className="w-full accent-[#5F9F7A] cursor-pointer"
          />
        </div>

        {/* Slider 2 */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-white/90">
              {isPhotosynthesis ? '💧 Root Water Absorption (H₂O)' : isBlackHole ? '🪐 Observer Distance (AU)' : isPythagoras ? '📐 Height Length (Leg b)' : '🔄 System Feedback Rate'}
            </span>
            <span className="text-[#3AA6A0] font-mono">{sliderVal2}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={sliderVal2}
            onChange={(e) => setSliderVal2(parseInt(e.target.value, 10))}
            className="w-full accent-[#3AA6A0] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
