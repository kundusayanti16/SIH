import React, { useRef, useEffect } from 'react';

/**
 * Dynamic HTML5 Canvas Animation Engine
 * Renders real-time 60fps dynamic visual simulations synchronized with video scene playback.
 * Supports: biological-sunlight, chloroplast-thylakoid, molecular-cycle, biosphere-energy,
 *           flow-network, particle-orbit, coordinate-graph, atomic/orbital, neural/data-learning,
 *           pythagorean/geometric, story-* scene types, and universal fallback.
 */
export default function DynamicVideoCanvas({
  scene,
  isPlaying,
  playbackProgress,
  theme = 'emerald',
  className = ''
}) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const stateRef = useRef({
    time: 0,
    particles: [],
    bubbleParticles: []
  });

  // Theme palettes
  const palettes = {
    emerald: {
      bg: '#0F1E17',
      primary: '#5F9F7A',
      secondary: '#3AA6A0',
      accent: '#F4C95D',
      glow: 'rgba(95, 159, 122, 0.4)',
      text: '#E7F2EB'
    },
    cosmos: {
      bg: '#0A0A14',
      primary: '#8E44AD',
      secondary: '#00E5FF',
      accent: '#FFAE33',
      glow: 'rgba(142, 68, 173, 0.4)',
      text: '#EDE7F6'
    },
    cyber: {
      bg: '#0B132B',
      primary: '#48CAE4',
      secondary: '#0077B6',
      accent: '#00F5D4',
      glow: 'rgba(72, 202, 228, 0.4)',
      text: '#E0FAFF'
    },
    tech: {
      bg: '#141E28',
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B',
      glow: 'rgba(59, 130, 246, 0.4)',
      text: '#F1F5F9'
    },
    sunset: {
      bg: '#1C1018',
      primary: '#E11D48',
      secondary: '#F97316',
      accent: '#FBBF24',
      glow: 'rgba(225, 29, 72, 0.4)',
      text: '#FFF1F2'
    }
  };

  const currentTheme = palettes[theme] || palettes.emerald;

  // Initialize particles and bubble particles once
  useEffect(() => {
    const particles = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * 800,
        y: Math.random() * 500,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 3 + 1.5,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.05 + 0.02
      });
    }
    stateRef.current.particles = particles;

    // Initialize bubble particles for ocean scenes
    const bubbles = [];
    for (let i = 0; i < 20; i++) {
      bubbles.push({
        x: Math.random() * 800,
        y: Math.random() * 500,
        radius: Math.random() * 5 + 3,
        speed: Math.random() * 1.5 + 0.5,
        wobble: Math.random() * Math.PI * 2
      });
    }
    stateRef.current.bubbleParticles = bubbles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    // Helper to draw rounded rectangles (polyfill for browsers lacking ctx.roundRect)
    const drawRoundRect = (x, y, w, h, r) => {
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        const rr = Math.min(r, w / 2, h / 2);
        ctx.moveTo(x + rr, y);
        ctx.lineTo(x + w - rr, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
        ctx.lineTo(x + w, y + h - rr);
        ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
        ctx.lineTo(x + rr, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
        ctx.lineTo(x, y + rr);
        ctx.quadraticCurveTo(x, y, x + rr, y);
        ctx.closePath();
      }
    };

    const render = () => {
      stateRef.current.time += isPlaying ? 0.03 : 0.008;
      const t = stateRef.current.time;

      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic Background Glow Gradient
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.1
      );
      grad.addColorStop(0, currentTheme.glow);
      grad.addColorStop(1, currentTheme.bg);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Ambient Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Floating Particles Background
      const particles = stateRef.current.particles;
      particles.forEach((p) => {
        if (isPlaying) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.fillStyle = currentTheme.primary;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 2 + p.x));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 4. Scene-Specific Core Visual Simulation
      const animType = scene?.animationType || 'flow-network';

      // =====================================================================
      // BIOLOGICAL: Sunlight / Chloroplast / Molecular-Cycle
      // =====================================================================
      if (animType.includes('sunlight') || animType.includes('chloroplast') || animType.includes('molecular-cycle')) {
        const cx = width / 2;
        const cy = height / 2;

        // Radiating sunlight beams
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4 + t * 0.4;
          const rayLen = 140 + Math.sin(t * 3 + i) * 20;
          ctx.strokeStyle = currentTheme.accent;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = 0.5 + 0.3 * Math.sin(t * 2 + i);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(angle) * rayLen, cy + Math.sin(angle) * rayLen);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Chloroplast Cell Outer Membrane
        ctx.strokeStyle = currentTheme.primary;
        ctx.fillStyle = 'rgba(57, 114, 87, 0.35)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 120 + Math.sin(t) * 4, 75 + Math.cos(t) * 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Internal Thylakoid Grana Discs
        const grana = [-45, 0, 45];
        grana.forEach((gx) => {
          for (let gy = -25; gy <= 25; gy += 16) {
            ctx.fillStyle = currentTheme.secondary;
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            drawRoundRect(cx + gx - 20, cy + gy - 5, 40, 10, 4);
            ctx.fill();
            ctx.stroke();
          }
        });

        // Floating Oxygen (O2) & Glucose molecules
        for (let i = 0; i < 5; i++) {
          const ox = cx + Math.cos(t * 1.5 + i * 1.3) * (150 + i * 15);
          const oy = cy + Math.sin(t * 1.5 + i * 1.3) * (90 + i * 12);
          ctx.fillStyle = currentTheme.accent;
          ctx.beginPath();
          ctx.arc(ox, oy, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#111';
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('O₂', ox, oy + 3);
        }
      }
      // =====================================================================
      // BLACK HOLE SCENE 1: Stellar Collapse & Singularity Birth
      // =====================================================================
      else if (animType === 'black-hole-collapse' || animType.includes('collapse')) {
        const cx = width / 2;
        const cy = height / 2;

        // Inward gravitational matter vortex particles
        for (let i = 0; i < 28; i++) {
          const startDist = 180 + (i * 7);
          const currentDist = ((startDist - t * 45) % 190);
          const angle = i * 0.45 + (190 - currentDist) * 0.04;
          const px = cx + Math.cos(angle) * currentDist;
          const py = cy + Math.sin(angle) * (currentDist * 0.55);

          ctx.fillStyle = i % 2 === 0 ? '#FFAE33' : '#00E5FF';
          ctx.globalAlpha = Math.max(0.1, currentDist / 190);
          ctx.beginPath();
          ctx.arc(px, py, 2.5 + (1 - currentDist / 190) * 3, 0, Math.PI * 2);
          ctx.fill();

          // Inward vector trail
          ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 174, 51, 0.4)' : 'rgba(0, 229, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(cx + Math.cos(angle - 0.2) * (currentDist + 15), cy + Math.sin(angle - 0.2) * ((currentDist + 15) * 0.55));
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Expanding Gravitational Shockwave Rings
        for (let s = 1; s <= 3; s++) {
          const waveR = ((t * 40 + s * 55) % 170) + 20;
          ctx.strokeStyle = 'rgba(142, 68, 173, ' + (1 - waveR / 190) * 0.6 + ')';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, waveR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Dying Pulsing Supergiant Core Shrinking into Singularity
        const coreR = Math.max(12, 35 - Math.sin(t * 1.5) * 8);
        const starGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreR);
        starGrad.addColorStop(0, '#FFFFFF');
        starGrad.addColorStop(0.3, '#FFAE33');
        starGrad.addColorStop(0.7, '#E74C3C');
        starGrad.addColorStop(1, 'rgba(142, 68, 173, 0.8)');
        ctx.fillStyle = starGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();

        // Central Ultra-Dense Singularity Dot
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Informational HUD
        ctx.fillStyle = currentTheme.accent;
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⭐ Supermassive Core Inward Infall → Singularity (M > 2.17 M☉)', cx, cy + 120);
      }
      // =====================================================================
      // BLACK HOLE SCENE 2: Event Horizon & Relativistic Accretion Disk
      // =====================================================================
      else if (animType === 'black-hole-event-horizon' || animType.includes('event-horizon') || animType.includes('black-hole') || animType.includes('blackhole')) {
        const cx = width / 2;
        const cy = height / 2;

        // Warping space rings
        for (let r = 180; r >= 40; r -= 25) {
          ctx.strokeStyle = currentTheme.secondary;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.25 + 0.15 * Math.sin(t * 2 + r);
          ctx.beginPath();
          ctx.ellipse(cx, cy, r + Math.sin(t + r) * 6, (r / 2.2) + Math.cos(t + r) * 4, t * 0.3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Glowing Relativistic Accretion Plasma Disk
        const accGrad = ctx.createRadialGradient(cx, cy, 35, cx, cy, 145);
        accGrad.addColorStop(0, '#000000');
        accGrad.addColorStop(0.3, '#FFAE33');
        accGrad.addColorStop(0.65, '#8E44AD');
        accGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = accGrad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 140, 52, -0.22 + Math.sin(t * 0.5) * 0.04, 0, Math.PI * 2);
        ctx.fill();

        // Relativistic Polar Jet Streams
        const jetGrad = ctx.createLinearGradient(cx, cy - 145, cx, cy + 145);
        jetGrad.addColorStop(0, 'rgba(0, 229, 255, 0.8)');
        jetGrad.addColorStop(0.5, 'transparent');
        jetGrad.addColorStop(1, 'rgba(0, 229, 255, 0.8)');
        ctx.strokeStyle = jetGrad;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 35);
        ctx.lineTo(cx + Math.sin(t * 3) * 4, cy - 150);
        ctx.moveTo(cx, cy + 35);
        ctx.lineTo(cx - Math.sin(t * 3) * 4, cy + 150);
        ctx.stroke();

        // Photon Sphere Ring (1.5 Rs)
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.8 + 0.2 * Math.sin(t * 4);
        ctx.beginPath();
        ctx.arc(cx, cy, 46, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Event Horizon (Pitch Black Singularity Shadow)
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#FFAE33';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🛑 Event Horizon (Rs = 2GM/c²) • Relativistic Accretion Disk', cx, cy + 120);
      }
      // =====================================================================
      // BLACK HOLE SCENE 3: Spacetime Funnel & Gravitational Time Dilation
      // =====================================================================
      else if (animType === 'black-hole-spacetime-warp' || animType.includes('spacetime-warp')) {
        const cx = width / 2;
        const cy = height * 0.48;

        // 3D Perspective Warped Spacetime Grid Funnel
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
        ctx.lineWidth = 1;
        const gridRings = 7;
        for (let gr = 1; gr <= gridRings; gr++) {
          const depthProgress = gr / gridRings;
          const ry = cy + depthProgress * 70;
          const rxRad = 190 * (1 - depthProgress * 0.65);
          const ryRad = 55 * (1 - depthProgress * 0.65);

          ctx.beginPath();
          ctx.ellipse(cx, ry, rxRad, ryRad, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Funnel Inward Grid Lines
        for (let ga = 0; ga < 12; ga++) {
          const angle = (ga * Math.PI * 2) / 12 + t * 0.15;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * 190, cy + Math.sin(angle) * 55);
          ctx.quadraticCurveTo(cx, cy + 40, cx + Math.cos(angle) * 40, cy + 70 + Math.sin(angle) * 15);
          ctx.stroke();
        }

        // Singularity vortex point at bottom of funnel
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#FFAE33';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy + 70, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Ticking Clocks: Comparison of Time Dilation
        // 1. Distant Observer Clock (Fast Ticking)
        const c1x = cx - 180;
        const c1y = cy - 40;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(c1x, c1y, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Clock hand 1 (Fast)
        const h1Angle = t * 3;
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(c1x, c1y);
        ctx.lineTo(c1x + Math.cos(h1Angle) * 16, c1y + Math.sin(h1Angle) * 16);
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 9px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Earth Time (1.0x)', c1x, c1y + 36);

        // 2. Near Horizon Clock (Ultra Slow Ticking)
        const c2x = cx + 180;
        const c2y = cy - 40;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.strokeStyle = '#F4C95D';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(c2x, c2y, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Clock hand 2 (Slow)
        const h2Angle = t * 0.3;
        ctx.strokeStyle = '#F4C95D';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(c2x, c2y);
        ctx.lineTo(c2x + Math.cos(h2Angle) * 16, c2y + Math.sin(h2Angle) * 16);
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 9px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Near Horizon (0.1x)', c2x, c2y + 36);

        // Label
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌀 Spacetime Curvature & Gravitational Time Dilation', cx, cy + 120);
      }
      // =====================================================================
      // NEWTON'S 1ST LAW: Law of Inertia (physics-inertia)
      // =====================================================================
      else if (animType.includes('inertia')) {
        const cx = width / 2;
        const cy = height * 0.5;

        // Frictionless Track
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 200, cy + 30);
        ctx.lineTo(cx + 200, cy + 30);
        ctx.stroke();

        // Gliding Payload Cart (Constant Velocity)
        const cartX = cx + Math.sin(t * 1.5) * 140;
        const cartY = cy + 10;

        ctx.fillStyle = '#3B82F6';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        drawRoundRect(cartX - 35, cartY - 20, 70, 35, 6);
        ctx.fill();
        ctx.stroke();

        // Cart Wheels
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(cartX - 20, cartY + 18, 6, 0, Math.PI * 2);
        ctx.arc(cartX + 20, cartY + 18, 6, 0, Math.PI * 2);
        ctx.fill();

        // Constant Velocity Vector Arrow
        const dir = Math.cos(t * 1.5) >= 0 ? 1 : -1;
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cartX, cartY - 30);
        ctx.lineTo(cartX + dir * 45, cartY - 30);
        ctx.lineTo(cartX + dir * 35, cartY - 36);
        ctx.moveTo(cartX + dir * 45, cartY - 30);
        ctx.lineTo(cartX + dir * 35, cartY - 24);
        ctx.stroke();

        ctx.fillStyle = '#F59E0B';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('v = constant (ΣF = 0)', cartX, cartY - 42);

        // Label
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillText('⚡ Newton\'s 1st Law: Law of Inertia (An object maintains motion without external force)', cx, cy + 85);
      }
      // =====================================================================
      // NEWTON'S 2ND LAW: Force & Acceleration (physics-fma)
      // =====================================================================
      else if (animType.includes('fma') || animType.includes('force-mass')) {
        const cx = width / 2;
        const cy = height * 0.48;

        const blockX = cx - 20;
        const blockY = cy + 10;
        const blockSize = 60;

        // Ground line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 200, cy + 42);
        ctx.lineTo(cx + 200, cy + 42);
        ctx.stroke();

        // Mass block
        ctx.fillStyle = 'rgba(59, 130, 246, 0.35)';
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 3;
        drawRoundRect(blockX - blockSize / 2, blockY - blockSize / 2, blockSize, blockSize, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Mass (m)', blockX, blockY + 5);

        // Applied Force Arrow
        const fLen = 80 + Math.sin(t * 3) * 20;
        ctx.strokeStyle = '#F59E0B';
        ctx.fillStyle = '#F59E0B';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(blockX - blockSize / 2 - fLen, blockY);
        ctx.lineTo(blockX - blockSize / 2, blockY);
        ctx.stroke();

        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillText('Force F →', blockX - blockSize / 2 - fLen / 2, blockY - 12);

        // Acceleration Result Vector a
        ctx.strokeStyle = '#10B981';
        ctx.fillStyle = '#10B981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(blockX + blockSize / 2 + 10, blockY);
        ctx.lineTo(blockX + blockSize / 2 + 75, blockY);
        ctx.stroke();

        ctx.fillText('Accel a = F/m →', blockX + blockSize / 2 + 45, blockY - 12);

        // Label
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillText('🚀 Newton\'s 2nd Law: F = m · a ⟺ a = F / m (Force produces proportional acceleration)', cx, cy + 85);
      }
      // =====================================================================
      // NEWTON'S 3RD LAW: Action & Reaction (physics-action-reaction)
      // =====================================================================
      else if (animType.includes('action-reaction')) {
        const cx = width / 2;
        const cy = height * 0.45;

        // Rocket Body
        ctx.fillStyle = '#E0F2FE';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 65);
        ctx.lineTo(cx + 25, cy + 15);
        ctx.lineTo(cx - 25, cy + 15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Upward Thrust Vector (+F)
        ctx.strokeStyle = '#10B981';
        ctx.fillStyle = '#10B981';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 75);
        ctx.lineTo(cx, cy - 130);
        ctx.stroke();

        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('+F (Upward Thrust Reaction)', cx, cy - 140);

        // Exhaust Fire
        for (let f = 0; f < 14; f++) {
          const flameY = cy + 20 + ((t * 80 + f * 12) % 95);
          const flameX = cx + (Math.sin(f + t * 5) * 16);
          ctx.fillStyle = f % 2 === 0 ? '#EF4444' : '#F59E0B';
          ctx.globalAlpha = 1 - (flameY - cy - 20) / 95;
          ctx.beginPath();
          ctx.arc(flameX, flameY, 4 + Math.sin(f) * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Label
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillText('🎯 Newton\'s 3rd Law: Action & Reaction (F_action = -F_reaction)', cx, cy - 158);
      }
      // =====================================================================
      // PYTHAGOREAN: Interactive Triangle & Squares
      // =====================================================================
      else if (animType.includes('pythagorean') || animType.includes('geometric') || animType.includes('coordinate')) {
        const cx = width / 2 - 20;
        const cy = height / 2 + 20;
        const legA = 70;
        const legB = 90;

        const p1 = { x: cx - legB / 2, y: cy + legA / 2 };
        const p2 = { x: cx + legB / 2, y: cy + legA / 2 };
        const p3 = { x: cx - legB / 2, y: cy - legA / 2 };

        // Draw Right Triangle
        ctx.fillStyle = 'rgba(95, 159, 122, 0.25)';
        ctx.strokeStyle = currentTheme.primary;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right angle marker
        ctx.strokeStyle = currentTheme.accent;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p1.x, p1.y - 14, 14, 14);

        // Square on Base b
        ctx.fillStyle = 'rgba(58, 166, 160, 0.25)';
        ctx.strokeStyle = currentTheme.secondary;
        ctx.lineWidth = 2;
        ctx.fillRect(p1.x, p1.y, legB, 40);
        ctx.strokeRect(p1.x, p1.y, legB, 40);

        // Square on Leg a
        ctx.fillStyle = 'rgba(244, 201, 93, 0.25)';
        ctx.strokeStyle = currentTheme.accent;
        ctx.fillRect(p1.x - 40, p3.y, 40, legA);
        ctx.strokeRect(p1.x - 40, p3.y, 40, legA);

        // Dynamic Hypotenuse wave pulse
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Labels
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 13px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('a', p1.x - 22, cy);
        ctx.fillText('b', cx, p1.y + 28);
        ctx.fillText('c', cx + 15, cy - 15);
        ctx.fillText('a² + b² = c²', cx + 40, cy - 60 + Math.sin(t * 2) * 4);
      }
      // =====================================================================
      // ATOMIC: Quantum Orbital Engine
      // =====================================================================
      else if (animType.includes('atomic') || animType.includes('orbital')) {
        const cx = width / 2;
        const cy = height / 2;

        const angles = [0, Math.PI / 3, (2 * Math.PI) / 3];
        angles.forEach((ang, idx) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(ang + t * 0.15);
          ctx.strokeStyle = currentTheme.secondary;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.ellipse(0, 0, 130, 45, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Electron particle along orbital
          const eAngle = t * (2 + idx * 0.5);
          const ex = Math.cos(eAngle) * 130;
          const ey = Math.sin(eAngle) * 45;
          ctx.fillStyle = currentTheme.accent;
          ctx.beginPath();
          ctx.arc(ex, ey, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });

        // Dense Central Nucleus
        const nucleons = [
          { x: 0, y: 0, c: '#E74C3C' },
          { x: -9, y: -6, c: '#95A5A6' },
          { x: 8, y: -7, c: '#E74C3C' },
          { x: -8, y: 8, c: '#E74C3C' },
          { x: 9, y: 7, c: '#95A5A6' },
          { x: 0, y: 11, c: '#95A5A6' }
        ];

        nucleons.forEach((n) => {
          ctx.fillStyle = n.c;
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx + n.x + Math.sin(t * 3 + n.x) * 1.5, cy + n.y + Math.cos(t * 3 + n.y) * 1.5, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
      }
      // =====================================================================
      // NEURAL: AI Neural Network Synapse Flow
      // =====================================================================
      else if (animType.includes('neural') || animType.includes('data-learning') || animType.includes('gradient')) {
        const layers = [3, 4, 4, 2];
        const layerSpacing = width / (layers.length + 1);
        const nodePositions = [];

        layers.forEach((count, lIdx) => {
          const lx = (lIdx + 1) * layerSpacing;
          const nodeSpacing = height / (count + 1);
          const currentLayerNodes = [];
          for (let nIdx = 0; nIdx < count; nIdx++) {
            const ny = (nIdx + 1) * nodeSpacing;
            currentLayerNodes.push({ x: lx, y: ny });
          }
          nodePositions.push(currentLayerNodes);
        });

        // Synaptic Connections with pulses
        for (let l = 0; l < nodePositions.length - 1; l++) {
          const fromLayer = nodePositions[l];
          const toLayer = nodePositions[l + 1];

          fromLayer.forEach((fromNode, fIdx) => {
            toLayer.forEach((toNode, tIdx) => {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(fromNode.x, fromNode.y);
              ctx.lineTo(toNode.x, toNode.y);
              ctx.stroke();

              const pulseProg = (t * 1.2 + fIdx * 0.3 + tIdx * 0.2) % 1;
              const px = fromNode.x + (toNode.x - fromNode.x) * pulseProg;
              const py = fromNode.y + (toNode.y - fromNode.y) * pulseProg;

              ctx.fillStyle = currentTheme.accent;
              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fill();
            });
          });
        }

        // Draw Artificial Neurons
        nodePositions.forEach((layer, lIdx) => {
          layer.forEach((node) => {
            ctx.fillStyle = lIdx === 0 ? currentTheme.secondary : lIdx === layers.length - 1 ? currentTheme.accent : currentTheme.primary;
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 11, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          });
        });
      }
      // =====================================================================
      // BIOSPHERE-ENERGY: Global Ecosystem View
      // =====================================================================
      else if (animType.includes('biosphere') || animType.includes('energy')) {
        const cx = width / 2;
        const cy = height * 0.5;

        // Radiant Living Earth Globe
        const earthR = 60 + Math.sin(t * 2) * 3;
        ctx.fillStyle = '#0284C7';
        ctx.beginPath();
        ctx.arc(cx, cy, earthR, 0, Math.PI * 2);
        ctx.fill();

        // Green Continents
        ctx.fillStyle = '#22C55E';
        ctx.beginPath();
        ctx.arc(cx - 15, cy - 10, 26, 0, Math.PI * 2);
        ctx.arc(cx + 20, cy + 12, 22, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting Energy Cycle Icons
        const orbitR = 130;
        const cycleItems = [
          { text: '☀️ Sunlight', angle: 0, color: '#FDE047' },
          { text: '💧 Water', angle: (Math.PI * 2) / 4, color: '#38BDF8' },
          { text: '🌱 Glucose', angle: (Math.PI * 4) / 4, color: '#4ADE80' },
          { text: '🎈 Oxygen', angle: (Math.PI * 6) / 4, color: '#F9A8D4' }
        ];

        // Orbit circle
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
        ctx.stroke();

        cycleItems.forEach((item) => {
          const a = item.angle + t * 0.4;
          const ix = cx + Math.cos(a) * orbitR;
          const iy = cy + Math.sin(a) * orbitR;

          // Arrow line from earth to node
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ix, iy);
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Node pill
          ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 1.5;
          drawRoundRect(ix - 50, iy - 14, 100, 28, 8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FEF08A';
          ctx.font = 'bold 10px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(item.text, ix, iy + 4);
        });

        // "Photosynthesis" label
        ctx.fillStyle = currentTheme.accent;
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌍 Global Biosphere Energy Cycle', cx, cy + earthR + 30);
      }
      // =====================================================================
      // PARTICLE ORBIT: Dynamic Orbiting Concept Particles
      // =====================================================================
      else if (animType.includes('particle') || animType.includes('orbit')) {
        const cx = width / 2;
        const cy = height / 2;

        // Central core
        ctx.fillStyle = currentTheme.primary;
        ctx.strokeStyle = currentTheme.accent;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, 30 + Math.sin(t * 2) * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Orbiting particles
        for (let i = 0; i < 6; i++) {
          const orbitR = 70 + i * 25;
          const speed = 0.8 + i * 0.2;
          const angle = t * speed + (i * Math.PI) / 3;

          // Orbit path
          ctx.strokeStyle = `rgba(255,255,255,0.06)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
          ctx.stroke();

          // Particle
          const px = cx + Math.cos(angle) * orbitR;
          const py = cy + Math.sin(angle) * orbitR;
          ctx.fillStyle = i % 2 === 0 ? currentTheme.accent : currentTheme.secondary;
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fill();

          // Trail
          for (let tr = 1; tr <= 4; tr++) {
            const trAngle = angle - tr * 0.15;
            const trx = cx + Math.cos(trAngle) * orbitR;
            const try2 = cy + Math.sin(trAngle) * orbitR;
            ctx.fillStyle = i % 2 === 0 ? currentTheme.accent : currentTheme.secondary;
            ctx.globalAlpha = 0.3 - tr * 0.06;
            ctx.beginPath();
            ctx.arc(trx, try2, 5 - tr, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }

        // Core label
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Core Mechanism', cx, cy + 50);
      }
      // =====================================================================
      // STORY: Photorespiration / RuBisCO Chef Scene
      // =====================================================================
      else if (animType === 'story-photorespiration-rubisco') {
        // Hot Desert Background with heat shimmer
        const heatGrad = ctx.createLinearGradient(0, 0, 0, height);
        heatGrad.addColorStop(0, '#FB923C');
        heatGrad.addColorStop(0.4, '#F97316');
        heatGrad.addColorStop(1, '#92400E');
        ctx.fillStyle = heatGrad;
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height * 0.5;

        // Big Orange Sun
        const sunX = width * 0.8;
        const sunY = height * 0.18;
        ctx.fillStyle = '#FDE047';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 32 + Math.sin(t * 4) * 3, 0, Math.PI * 2);
        ctx.fill();

        // Heat Shimmer Waves
        ctx.strokeStyle = 'rgba(251, 146, 60, 0.3)';
        ctx.lineWidth = 3;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          for (let x = 0; x < width; x += 30) {
            const y = height * (0.25 + i * 0.15) + Math.sin(t * 3 + x * 0.05) * 8;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // RuBisCO Cartoon Chef Character
        ctx.fillStyle = '#E2E8F0';
        drawRoundRect(cx - 40, cy - 20, 80, 70, 16);
        ctx.fill();
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Chef Hat
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx, cy - 35, 24, 0, Math.PI * 2);
        ctx.fill();
        drawRoundRect(cx - 28, cy - 22, 56, 12, 4);
        ctx.fill();

        // Enzyme Eyes
        ctx.strokeStyle = '#1E293B';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx - 14, cy - 2, 5, 0, Math.PI * 2);
        ctx.arc(cx + 14, cy - 2, 5, 0, Math.PI * 2);
        ctx.stroke();

        // Enzyme Name Badge
        ctx.fillStyle = '#0284C7';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("RuBisCO Enzyme", cx, cy + 22);

        // CO2 on Left
        ctx.fillStyle = '#C084FC';
        ctx.beginPath();
        ctx.arc(cx - 120 + Math.sin(t * 2) * 8, cy - 10, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText("CO₂ (Good)", cx - 120 + Math.sin(t * 2) * 8, cy - 6);

        // O2 on Right
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(cx + 120 + Math.cos(t * 2) * 8, cy - 10, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText("O₂ (Accident)", cx + 120 + Math.cos(t * 2) * 8, cy - 6);
      }
      // =====================================================================
      // STORY: Desert CAM Cactus & C4 Corn Adaptations
      // =====================================================================
      else if (animType === 'story-desert-cam-c4') {
        // Starry Night Sky
        const nightGrad = ctx.createLinearGradient(0, 0, 0, height);
        nightGrad.addColorStop(0, '#030712');
        nightGrad.addColorStop(0.6, '#0B132B');
        nightGrad.addColorStop(1, '#1C1917');
        ctx.fillStyle = nightGrad;
        ctx.fillRect(0, 0, width, height);

        // Twinkling Stars
        stateRef.current.particles.forEach((pt, idx) => {
          const starAlpha = 0.3 + Math.sin(t * 2 + idx) * 0.4;
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, starAlpha)})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y * 0.6, pt.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        });

        // Glowing Crescent Moon
        const moonX = width * 0.82;
        const moonY = height * 0.18;
        ctx.fillStyle = '#FEF08A';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#030712';
        ctx.beginPath();
        ctx.arc(moonX + 8, moonY - 4, 20, 0, Math.PI * 2);
        ctx.fill();

        // Desert Dune Ground
        ctx.fillStyle = '#78350F';
        ctx.beginPath();
        ctx.moveTo(0, height * 0.72);
        ctx.quadraticCurveTo(width * 0.4, height * 0.65, width, height * 0.75);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        // Saguaro Cactus
        const cacX = width * 0.62;
        const cacY = height * 0.72;
        ctx.fillStyle = '#15803D';
        ctx.strokeStyle = '#22C55E';
        ctx.lineWidth = 3;
        drawRoundRect(cacX - 16, cacY - 140, 32, 140, 14);
        ctx.fill();
        ctx.stroke();
        drawRoundRect(cacX - 45, cacY - 95, 32, 16, 6);
        ctx.fill();
        drawRoundRect(cacX - 45, cacY - 125, 16, 40, 6);
        ctx.fill();

        // Night Stomata Glowing
        for (let i = 0; i < 4; i++) {
          const sy = cacY - 110 + i * 25;
          ctx.fillStyle = '#4ADE80';
          ctx.beginPath();
          ctx.arc(cacX, sy, 4 + Math.sin(t * 3 + i) * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Corn Stalk (C4 Kranz Anatomy)
        const cornX = width * 0.28;
        ctx.strokeStyle = '#EAB308';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(cornX, height * 0.75);
        ctx.lineTo(cornX, height * 0.38);
        ctx.stroke();

        // Corn Leaves
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = '#65A30D';
          ctx.beginPath();
          ctx.ellipse(cornX - 25, height * 0.48 + i * 35, 35, 10, -0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(cornX + 25, height * 0.52 + i * 35, 35, 10, 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // =====================================================================
      // STORY: Limiting Factors (Blackman's Law)
      // =====================================================================
      else if (animType === 'story-limiting-factors') {
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
        bgGrad.addColorStop(0, '#1E293B');
        bgGrad.addColorStop(0.7, '#0F172A');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height * 0.5;

        // 4 Factor Gauges
        const factors = [
          { name: '☀️ Sunlight', level: 0.85, color: '#FDE047', x: cx - 180 },
          { name: '💧 Water', level: 0.35, color: '#38BDF8', x: cx - 60 },
          { name: '💨 CO₂', level: 0.75, color: '#C084FC', x: cx + 60 },
          { name: '🌡️ Temp', level: 0.9, color: '#F97316', x: cx + 180 }
        ];

        factors.forEach((f) => {
          const barH = 120;
          const barY = cy - 40;

          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.strokeStyle = f.color;
          ctx.lineWidth = 2;
          drawRoundRect(f.x - 22, barY, 44, barH, 8);
          ctx.fill();
          ctx.stroke();

          // Fill Level
          const fillH = barH * f.level;
          ctx.fillStyle = f.color;
          drawRoundRect(f.x - 18, barY + (barH - fillH) + 4, 36, fillH - 8, 6);
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(f.name, f.x, barY + barH + 22);
        });

        // Bottleneck Warning
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 2;
        drawRoundRect(cx - 150, height * 0.82, 300, 32, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FEF2F2';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("⚠️ Lowest factor (Water 💧) limits overall growth!", cx, height * 0.82 + 20);
      }
      // =====================================================================
      // STORY: Ocean Phytoplankton & 50%+ Oxygen
      // =====================================================================
      else if (animType === 'story-ocean-phytoplankton') {
        const seaGrad = ctx.createLinearGradient(0, 0, 0, height);
        seaGrad.addColorStop(0, '#0284C7');
        seaGrad.addColorStop(0.4, '#0369A1');
        seaGrad.addColorStop(1, '#0C4A6E');
        ctx.fillStyle = seaGrad;
        ctx.fillRect(0, 0, width, height);

        // Sun Rays in water
        for (let i = 0; i < 7; i++) {
          const rayX = (width * i) / 6;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.beginPath();
          ctx.moveTo(rayX, 0);
          ctx.lineTo(rayX + 60, 0);
          ctx.lineTo(rayX - 30, height);
          ctx.lineTo(rayX - 90, height);
          ctx.closePath();
          ctx.fill();
        }

        // Glowing Phytoplankton
        for (let i = 0; i < 28; i++) {
          const px = (width * 0.1 + ((i * 47) % (width * 0.8))) + Math.sin(t * 1.5 + i) * 15;
          const py = (height * 0.2 + ((i * 31) % (height * 0.6))) + Math.cos(t * 1.5 + i) * 10;
          const pGlow = 4 + Math.sin(t * 3 + i) * 2;
          ctx.fillStyle = '#4ADE80';
          ctx.beginPath();
          ctx.arc(px, py, pGlow, 0, Math.PI * 2);
          ctx.fill();
        }

        // Rising Oxygen Bubbles
        const bubbles = stateRef.current.bubbleParticles || [];
        bubbles.forEach((bp) => {
          if (isPlaying) {
            bp.y -= bp.speed;
            if (bp.y < -10) bp.y = height + 10;
          }
          const bx = bp.x + Math.sin(t * 2 + bp.wobble) * 6;
          ctx.fillStyle = 'rgba(224, 242, 254, 0.7)';
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bx, bp.y, bp.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });

        // Swimming Fish Silhouette
        const fishX = ((t * 40) % (width + 100)) - 50;
        ctx.fillStyle = '#0284C7';
        ctx.beginPath();
        ctx.ellipse(fishX, height * 0.55, 22, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(fishX - 20, height * 0.55);
        ctx.lineTo(fishX - 32, height * 0.55 - 8);
        ctx.lineTo(fishX - 32, height * 0.55 + 8);
        ctx.closePath();
        ctx.fill();
      }
      // =====================================================================
      // STORY: Future Bio-Tech (Artificial Leaf & Vertical LED Farm)
      // =====================================================================
      else if (animType === 'story-future-artificial-tech') {
        const techGrad = ctx.createLinearGradient(0, 0, width, height);
        techGrad.addColorStop(0, '#0F172A');
        techGrad.addColorStop(0.5, '#1E1B4B');
        techGrad.addColorStop(1, '#020617');
        ctx.fillStyle = techGrad;
        ctx.fillRect(0, 0, width, height);

        // Left Side: Artificial Bionic Leaf Reactor
        const bionicX = width * 0.3;
        const bionicY = height * 0.55;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 3;
        drawRoundRect(bionicX - 60, bionicY - 80, 120, 140, 12);
        ctx.fill();
        ctx.stroke();

        // Photo-Anode
        ctx.fillStyle = '#059669';
        ctx.strokeStyle = '#34D399';
        ctx.lineWidth = 2;
        drawRoundRect(bionicX - 25, bionicY - 50, 50, 80, 8);
        ctx.fill();
        ctx.stroke();

        // Clean Hydrogen Fuel Bubbles
        for (let i = 0; i < 6; i++) {
          const hProg = (t * 1.5 + i * 0.3) % 1;
          const hx = bionicX - 15 + Math.sin(t * 2 + i) * 20;
          const hy = bionicY + 20 - hProg * 90;
          ctx.fillStyle = '#67E8F9';
          ctx.beginPath();
          ctx.arc(hx, hy, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#082F49';
          ctx.font = 'bold 6px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('H₂', hx, hy + 2);
        }

        // Right Side: Vertical LED Farm
        const farmX = width * 0.72;
        for (let row = 0; row < 3; row++) {
          const rowY = height * 0.32 + row * 55;
          ctx.fillStyle = '#E879F9';
          ctx.fillRect(farmX - 70, rowY - 14, 140, 4);

          for (let p = 0; p < 5; p++) {
            const px = farmX - 50 + p * 25;
            ctx.fillStyle = '#4ADE80';
            ctx.beginPath();
            ctx.ellipse(px, rowY + 12, 8, 12, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Labels
        ctx.fillStyle = '#38BDF8';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔬 Artificial Leaf Reactor', bionicX, bionicY + 90);
        ctx.fillStyle = '#E879F9';
        ctx.fillText('🌿 Vertical LED Farm', farmX, height * 0.32 + 3 * 55 + 10);
      }
      // =====================================================================
      // STORY: Master Storybook Synthesis (Full Cycle)
      // =====================================================================
      else if (animType === 'story-master-synthesis' || animType === 'story-synthesis-summary') {
        const fullGrad = ctx.createRadialGradient(width / 2, height / 2, 60, width / 2, height / 2, width);
        fullGrad.addColorStop(0, '#064E3B');
        fullGrad.addColorStop(0.5, '#0F2E1E');
        fullGrad.addColorStop(1, '#022C22');
        ctx.fillStyle = fullGrad;
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height * 0.5;

        // Earth Globe
        const earthR = 60 + Math.sin(t * 2) * 3;
        ctx.fillStyle = '#0284C7';
        ctx.beginPath();
        ctx.arc(cx, cy, earthR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#22C55E';
        ctx.beginPath();
        ctx.arc(cx - 15, cy - 10, 26, 0, Math.PI * 2);
        ctx.arc(cx + 20, cy + 12, 22, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting Cycle Icons
        const orbitR = 140;
        const cycleItems = [
          { text: '☀️ Sunlight', angle: 0 },
          { text: '💧 Fresh Water', angle: (Math.PI * 2) / 4 },
          { text: '🌱 Plant Glucose', angle: (Math.PI * 4) / 4 },
          { text: '🎈 Clean Oxygen', angle: (Math.PI * 6) / 4 }
        ];

        cycleItems.forEach((item) => {
          const a = item.angle + t * 0.4;
          const ix = cx + Math.cos(a) * orbitR;
          const iy = cy + Math.sin(a) * orbitR;

          ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
          ctx.strokeStyle = '#4ADE80';
          ctx.lineWidth = 1.5;
          drawRoundRect(ix - 55, iy - 14, 110, 28, 8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FEF08A';
          ctx.font = 'bold 10px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(item.text, ix, iy + 4);
        });
      }
      // =====================================================================
      // STORY: Leaf Zoom Cellular (Microscopic Camera Journey)
      // =====================================================================
      else if (animType === 'story-leaf-zoom-cellular') {
        // 5-phase cinematic camera journey: Plant → Leaf → Veins → Cells → Stomata
        const progress = playbackProgress || 0;
        const phase = progress < 0.2 ? 0 : progress < 0.4 ? 1 : progress < 0.6 ? 2 : progress < 0.8 ? 3 : 4;

        // Background gradient shifts with phase
        const phaseColors = [
          ['#064E3B', '#022C22'], // Whole plant
          ['#065F46', '#064E3B'], // Leaf surface
          ['#047857', '#065F46'], // Veins
          ['#059669', '#047857'], // Cells
          ['#10B981', '#059669']  // Stomata
        ];
        const bgGrad2 = ctx.createRadialGradient(width / 2, height / 2, 30, width / 2, height / 2, width);
        bgGrad2.addColorStop(0, phaseColors[phase][0]);
        bgGrad2.addColorStop(1, phaseColors[phase][1]);
        ctx.fillStyle = bgGrad2;
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;

        if (phase <= 1) {
          // Whole plant / Leaf
          ctx.strokeStyle = '#78350F';
          ctx.lineWidth = 12;
          ctx.beginPath();
          ctx.moveTo(cx, cy + 100);
          ctx.lineTo(cx, cy - 20);
          ctx.stroke();

          ctx.fillStyle = '#22C55E';
          ctx.beginPath();
          ctx.ellipse(cx - 30, cy - 50, 50, 30, -0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(cx + 30, cy - 40, 45, 28, 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(cx, cy - 70, 40, 25, 0, 0, Math.PI * 2);
          ctx.fill();

          // Sun
          ctx.fillStyle = '#FDE047';
          ctx.beginPath();
          ctx.arc(width * 0.8, height * 0.15, 25, 0, Math.PI * 2);
          ctx.fill();
        } else if (phase === 2) {
          // Leaf veins close-up
          ctx.fillStyle = '#22C55E';
          ctx.beginPath();
          ctx.ellipse(cx, cy, width * 0.35, height * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();

          // Mid-rib
          ctx.strokeStyle = '#15803D';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(cx - width * 0.3, cy);
          ctx.lineTo(cx + width * 0.3, cy);
          ctx.stroke();

          // Branch veins
          for (let i = -4; i <= 4; i++) {
            if (i === 0) continue;
            ctx.strokeStyle = '#166534';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx + i * 30, cy);
            ctx.lineTo(cx + i * 30 + (i > 0 ? 25 : -25), cy + (i > 0 ? -40 : 40));
            ctx.stroke();
          }
        } else if (phase === 3) {
          // Cells grid
          const cellSize = 35;
          const cols = Math.ceil(width / cellSize);
          const rows = Math.ceil(height / cellSize);
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              ctx.strokeStyle = '#15803D';
              ctx.lineWidth = 1;
              ctx.fillStyle = `rgba(34, 197, 94, ${0.15 + Math.sin(t * 2 + r + c) * 0.1})`;
              ctx.beginPath();
              ctx.rect(c * cellSize, r * cellSize, cellSize, cellSize);
              ctx.fill();
              ctx.stroke();

              // Chloroplasts inside cells
              if ((r + c) % 3 === 0) {
                ctx.fillStyle = '#059669';
                ctx.beginPath();
                ctx.ellipse(c * cellSize + cellSize / 2, r * cellSize + cellSize / 2, 8, 5, t * 0.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        } else {
          // Stomata close-up
          ctx.fillStyle = '#22C55E';
          ctx.fillRect(0, 0, width, height);

          // Guard cells
          ctx.fillStyle = '#15803D';
          ctx.beginPath();
          ctx.ellipse(cx - 20, cy, 18, 50, 0.15, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(cx + 20, cy, 18, 50, -0.15, 0, Math.PI * 2);
          ctx.fill();

          // Stoma opening
          const openW = 12 + Math.sin(t * 2) * 4;
          ctx.fillStyle = '#042F2E';
          ctx.beginPath();
          ctx.ellipse(cx, cy, openW, 35, 0, 0, Math.PI * 2);
          ctx.fill();

          // CO2 entering, O2 exiting
          ctx.fillStyle = '#C084FC';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('CO₂ →', cx - 70, cy + Math.sin(t * 3) * 5);
          ctx.fillStyle = '#38BDF8';
          ctx.fillText('← O₂', cx + 70, cy + Math.cos(t * 3) * 5);

          // Label
          ctx.fillStyle = '#FEF08A';
          ctx.font = 'bold 12px system-ui, sans-serif';
          ctx.fillText('Stomata — Gas Exchange', cx, cy + 80);
        }
      }
      // =====================================================================
      // UNIVERSAL FALLBACK: Dynamic Concept Network & Nature Scene
      // =====================================================================
      else {
        const cx = width / 2;
        const cy = height / 2;

        // Central concept hub
        ctx.fillStyle = currentTheme.primary;
        ctx.strokeStyle = currentTheme.accent;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, 36 + Math.sin(t * 2) * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Render scene diagram nodes if provided
        const nodes = scene?.diagramNodes || [
          { label: 'Origin', color: currentTheme.secondary, x: 25, y: 35 },
          { label: 'Core Mechanism', color: currentTheme.primary, x: 50, y: 70 },
          { label: 'Synthesis', color: currentTheme.accent, x: 75, y: 35 }
        ];

        nodes.forEach((n, idx) => {
          const nx = (n.x / 100) * width;
          const ny = (n.y / 100) * height;

          // Connecting line
          ctx.strokeStyle = n.color || currentTheme.secondary;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.stroke();

          // Satellite node
          ctx.fillStyle = n.color || currentTheme.secondary;
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(nx, ny, 16 + Math.sin(t * 3 + idx) * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Label Text
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, nx, ny + 32);
        });
      }

      // Continue animation loop
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [scene, isPlaying, playbackProgress, theme, currentTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block rounded-2xl ${className}`}
    />
  );
}
