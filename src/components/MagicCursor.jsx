import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════
   MAGIC CURSOR — Quill pen with sparkle trail
   Replaces the default cursor site-wide
═══════════════════════════════════════════════ */
const MagicCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const trailRef = useRef([]);
  const [sparkles, setSparkles] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const sparkleId = useRef(0);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Spawn sparkle occasionally
      if (Math.random() < 0.18) {
        const id = sparkleId.current++;
        const colors = ['#A78BFA','#EC4899','#FDE68A','#C4B5FD','#F9A8D4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 4 + Math.random() * 6;
        const angle = Math.random() * 360;
        const dist = 8 + Math.random() * 18;
        setSparkles(p => [...p.slice(-18), {
          id, x: e.clientX, y: e.clientY, color, size, angle, dist,
          created: Date.now(),
        }]);
      }
    };

    const onEnter = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const role = e.target.getAttribute('role');
      const isInteractive = ['a','button','input','select','textarea','label'].includes(tag) || role === 'button' || e.target.closest('a,button');
      setIsHovering(!!isInteractive);
    };

    const onDown = () => setIsClicking(true);
    const onUp   = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // Smooth cursor follow loop
    let raf;
    const loop = () => {
      if (cursorRef.current) {
        const { x, y } = posRef.current;
        cursorRef.current.style.transform = `translate(${x}px, ${y}px) ${isClicking ? 'scale(0.85)' : 'scale(1)'}`;
      }
      // Dot follows with slight lag
      dotPosRef.current.x += (posRef.current.x - dotPosRef.current.x) * 0.18;
      dotPosRef.current.y += (posRef.current.y - dotPosRef.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPosRef.current.x}px, ${dotPosRef.current.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Cleanup sparkles
    const cleanup = setInterval(() => {
      const now = Date.now();
      setSparkles(p => p.filter(s => now - s.created < 700));
    }, 100);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <>
      {/* ── Sparkle trail particles ── */}
      {sparkles.map(s => {
        const age = (Date.now() - s.created) / 700;
        const opacity = Math.max(0, 1 - age * 1.4);
        const tx = Math.cos((s.angle * Math.PI) / 180) * s.dist * age;
        const ty = Math.sin((s.angle * Math.PI) / 180) * s.dist * age - 10 * age;
        return (
          <div key={s.id} className="fixed pointer-events-none z-[9998]"
            style={{
              left: s.x - s.size / 2,
              top: s.y - s.size / 2,
              width: s.size,
              height: s.size,
              opacity,
              transform: `translate(${tx}px, ${ty}px) rotate(${s.angle}deg) scale(${1 - age * 0.5})`,
              transition: 'none',
            }}>
            <svg viewBox="0 0 10 10" fill="none" width="100%" height="100%">
              <polygon points="5,0 6,3.5 9.5,5 6,6.5 5,10 4,6.5 0.5,5 4,3.5"
                fill={s.color} opacity=".9"/>
            </svg>
          </div>
        );
      })}

      {/* ── Trailing dot (lagging) ── */}
      <div ref={dotRef} className="fixed pointer-events-none z-[9998]"
        style={{
          top: -4, left: -4,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #EC4899, #8B5CF6)',
          opacity: 0.5,
          filter: 'blur(1px)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}/>

      {/* ── Main cursor: Quill pen SVG ── */}
      <div ref={cursorRef} className="fixed pointer-events-none z-[9999]"
        style={{
          top: -2, left: -2,
          willChange: 'transform',
          transition: 'none',
        }}>
        <svg
          width={isHovering ? 32 : 28}
          height={isHovering ? 32 : 28}
          viewBox="0 0 32 32" fill="none"
          style={{
            transform: `rotate(-20deg) ${isClicking ? 'scale(0.85)' : ''}`,
            transition: 'width 0.15s, height 0.15s',
            filter: `drop-shadow(0 0 ${isHovering ? '8px' : '4px'} ${isHovering ? '#EC4899' : '#A78BFA'})`,
          }}>
          {/* Quill feather body */}
          <path d="M 28 2 C 20 4, 8 12, 6 28 C 10 22, 16 18, 22 16 C 18 20, 14 24, 13 29 C 15 25, 20 20, 26 14 C 22 18, 18 22, 16 27 C 20 18, 26 10, 28 2 Z"
            fill="url(#quillGrad)" opacity=".95"/>
          {/* Quill spine */}
          <line x1="27" y1="3" x2="6" y2="28" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
          {/* Nib */}
          <path d="M 6 28 L 4 30 L 8 28 Z" fill={isHovering ? '#EC4899' : '#FDE68A'}/>
          {/* Ink drop */}
          {isClicking && (
            <circle cx="5" cy="30" r="2" fill="#A78BFA" opacity=".8"/>
          )}
          <defs>
            <linearGradient id="quillGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={isHovering ? '#F9A8D4' : '#C4B5FD'}/>
              <stop offset="50%" stopColor={isHovering ? '#EC4899' : '#A78BFA'}/>
              <stop offset="100%" stopColor="#6D28D9"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Click ripple */}
        {isClicking && (
          <div className="absolute -inset-3 rounded-full border border-[#A78BFA]/60 animate-ping"
            style={{ animationDuration: '0.4s' }}/>
        )}
      </div>
    </>
  );
};

export default MagicCursor;
