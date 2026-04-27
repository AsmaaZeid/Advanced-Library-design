/* ═══════════════════════════════════════════════════════
   CHARACTERS.jsx  — Owly & Wormy
   Pure SVG, no emojis, anime-influenced cute style
═══════════════════════════════════════════════════════ */

/* ── OWLY THE NIGHT OWL ── */
export const OwlyCharacter = ({ size = 120, animate = true }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter:'drop-shadow(0 10px 24px rgba(109,40,217,.4))', overflow:'visible' }}>
    <defs>
      <radialGradient id="owlBodyGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#2A1F55"/>
        <stop offset="100%" stopColor="#150E2B"/>
      </radialGradient>
      <radialGradient id="owlBellyGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.4"/>
      </radialGradient>
      <radialGradient id="owlEyeL" cx="38%" cy="36%" r="60%">
        <stop offset="0%" stopColor="#C4B5FD"/>
        <stop offset="45%" stopColor="#8B5CF6"/>
        <stop offset="100%" stopColor="#4C1D95"/>
      </radialGradient>
      <radialGradient id="owlEyeR" cx="38%" cy="36%" r="60%">
        <stop offset="0%" stopColor="#F9A8D4"/>
        <stop offset="45%" stopColor="#EC4899"/>
        <stop offset="100%" stopColor="#9D174D"/>
      </radialGradient>
      <linearGradient id="owlWingL" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2A1F55"/>
        <stop offset="100%" stopColor="#1E1540"/>
      </linearGradient>
      <linearGradient id="owlWingR" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A1F55"/>
        <stop offset="100%" stopColor="#1E1540"/>
      </linearGradient>
    </defs>

    {/* ── Twinkling stars around owl ── */}
    {[[105,10],[8,18],[112,55],[4,62],[100,100]].map(([x,y],i)=>(
      <polygon key={i}
        points={`${x},${y-4} ${x+1.2},${y-1.2} ${x+4},${y} ${x+1.2},${y+1.2} ${x},${y+4} ${x-1.2},${y+1.2} ${x-4},${y} ${x-1.2},${y-1.2}`}
        fill={i%2===0?'#A78BFA':'#F9A8D4'} opacity="0.85"
        style={{ animation:`twinkle ${1.4+i*.4}s ${i*.25}s ease-in-out infinite` }}/>
    ))}

    {/* ── Wings ── */}
    <path d="M 35 72 Q 10 62 8 88 Q 9 102 28 98 Q 36 96 42 88 Z"
      fill="url(#owlWingL)"
      style={{ animation:`wing-bob 3s ease-in-out infinite`, transformOrigin:'35px 80px' }}/>
    <path d="M 85 72 Q 110 62 112 88 Q 111 102 92 98 Q 84 96 78 88 Z"
      fill="url(#owlWingR)"
      style={{ animation:`wing-bob 3s .5s ease-in-out infinite`, transformOrigin:'85px 80px' }}/>
    {/* Wing feather details */}
    {[0,1,2].map(i=>(
      <path key={`wfl${i}`} d={`M ${15+i*6} ${82+i*3} Q ${20+i*6} ${76+i*2} ${26+i*5} ${80+i*3}`}
        stroke="#A78BFA" strokeWidth=".8" fill="none" opacity=".4"/>
    ))}
    {[0,1,2].map(i=>(
      <path key={`wfr${i}`} d={`M ${105-i*6} ${82+i*3} Q ${100-i*6} ${76+i*2} ${94-i*5} ${80+i*3}`}
        stroke="#A78BFA" strokeWidth=".8" fill="none" opacity=".4"/>
    ))}

    {/* ── Body ── */}
    <ellipse cx="60" cy="95" rx="26" ry="30" fill="url(#owlBodyGrad)"/>
    {/* belly */}
    <ellipse cx="60" cy="100" rx="16" ry="20" fill="url(#owlBellyGrad)"/>
    {/* belly lines */}
    {[0,1,2,3].map(i=>(
      <path key={i} d={`M ${50+i*2} ${86+i*5} Q 60 ${84+i*5} ${70-i*2} ${86+i*5}`}
        stroke="#A78BFA" strokeWidth=".6" fill="none" opacity={.25+i*.05}/>
    ))}

    {/* ── Head ── */}
    <circle cx="60" cy="52" r="34" fill="url(#owlBodyGrad)"/>
    {/* Head texture ring */}
    <circle cx="60" cy="52" r="33" fill="none" stroke="#A78BFA" strokeWidth=".5" opacity=".2"/>

    {/* ── Ear tufts ── */}
    <path d="M 32 26 Q 28 10 36 14 Q 34 22 40 26 Z" fill="#1E1540" stroke="#8B5CF6" strokeWidth=".6"/>
    <path d="M 88 26 Q 92 10 84 14 Q 86 22 80 26 Z" fill="#1E1540" stroke="#8B5CF6" strokeWidth=".6"/>
    <path d="M 33 27 Q 31 17 35 19" stroke="#8B5CF6" strokeWidth=".8" fill="none" opacity=".5"/>
    <path d="M 87 27 Q 89 17 85 19" stroke="#8B5CF6" strokeWidth=".8" fill="none" opacity=".5"/>

    {/* ── Face disc ── */}
    <ellipse cx="60" cy="54" rx="28" ry="26" fill="#1E1540" opacity=".35"/>

    {/* ── LEFT EYE (violet) ── */}
    <circle cx="46" cy="50" r="11" fill="white"/>
    <circle cx="46" cy="51" r="9" fill="url(#owlEyeL)"
      style={{ animation:`eye-blink 5s ease-in-out infinite` }}/>
    <circle cx="46" cy="51" r="5.5" fill="#2E1065"/>
    <circle cx="43.5" cy="48.5" r="2.2" fill="white" opacity=".95"/>
    <circle cx="48" cy="53" r="1.1" fill="white" opacity=".6"/>
    {/* Eye ring */}
    <circle cx="46" cy="50" r="10.5" fill="none" stroke="#8B5CF6" strokeWidth=".8" opacity=".4"/>

    {/* ── RIGHT EYE (rose) ── */}
    <circle cx="74" cy="50" r="11" fill="white"/>
    <circle cx="74" cy="51" r="9" fill="url(#owlEyeR)"
      style={{ animation:`eye-blink 5s .8s ease-in-out infinite` }}/>
    <circle cx="74" cy="51" r="5.5" fill="#500724"/>
    <circle cx="71.5" cy="48.5" r="2.2" fill="white" opacity=".95"/>
    <circle cx="76" cy="53" r="1.1" fill="white" opacity=".6"/>
    <circle cx="74" cy="50" r="10.5" fill="none" stroke="#EC4899" strokeWidth=".8" opacity=".4"/>

    {/* ── Eyebrows ── */}
    <path d="M 37 40 Q 43 36 52 39" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M 68 39 Q 77 36 83 40" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" fill="none"/>

    {/* ── Beak ── */}
    <polygon points="60,57 55,65 65,65" fill="#F59E0B"/>
    <line x1="55" y1="62" x2="65" y2="62" stroke="#D97706" strokeWidth=".8" opacity=".6"/>

    {/* ── Blush ── */}
    <ellipse cx="36" cy="58" rx="7" ry="4.5" fill="#EC4899" opacity=".22"
      style={{ animation:`blush 3s ease-in-out infinite` }}/>
    <ellipse cx="84" cy="58" rx="7" ry="4.5" fill="#EC4899" opacity=".22"
      style={{ animation:`blush 3s .5s ease-in-out infinite` }}/>

    {/* ── Feet ── */}
    <g fill="#F59E0B">
      <rect x="50" y="122" width="5" height="8" rx="2.5"/>
      <rect x="58" y="122" width="5" height="8" rx="2.5"/>
      <rect x="66" y="122" width="5" height="8" rx="2.5"/>
      {/* Talons */}
      <rect x="46" y="128" width="6" height="3" rx="1.5" transform="rotate(-15 46 128)"/>
      <rect x="69" y="128" width="6" height="3" rx="1.5" transform="rotate(15 69 128)"/>
    </g>

    {/* ── Book under wing ── */}
    <g transform="translate(6,95) rotate(-10)"
      style={{ animation:'float-gentle 4s ease-in-out infinite' }}>
      <rect width="26" height="33" rx="3" fill="#6D28D9"/>
      <rect width="5" height="33" rx="1.5" fill="#4C1D95"/>
      <rect x="7" y="7" width="14" height="1.8" rx=".9" fill="#C4B5FD" opacity=".8"/>
      <rect x="7" y="12" width="10" height="1.8" rx=".9" fill="#C4B5FD" opacity=".6"/>
      <rect x="7" y="17" width="13" height="1.8" rx=".9" fill="#C4B5FD" opacity=".6"/>
      <rect x="7" y="22" width="9" height="1.8" rx=".9" fill="#C4B5FD" opacity=".45"/>
      {/* star on cover */}
      <polygon points="19,4 20,7 23,7 21,9 22,12 19,10 16,12 17,9 15,7 18,7"
        fill="#FDE68A" opacity=".85"/>
    </g>
  </svg>
);


/* ── WORMY THE BOOKWORM ── */
export const WormyCharacter = ({ size = 140, animate = true }) => (
  <svg width={size} height={size * .68} viewBox="0 0 140 95" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter:'drop-shadow(0 8px 20px rgba(219,39,119,.35))', overflow:'visible' }}>
    <defs>
      <radialGradient id="wBodyA" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#8B5CF6"/>
        <stop offset="100%" stopColor="#6D28D9"/>
      </radialGradient>
      <radialGradient id="wBodyB" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#8B5CF6"/>
      </radialGradient>
      <radialGradient id="wHead" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#7C3AED"/>
        <stop offset="100%" stopColor="#5B21B6"/>
      </radialGradient>
      <radialGradient id="wEyeL" cx="38%" cy="36%" r="60%">
        <stop offset="0%" stopColor="#FDE68A"/>
        <stop offset="50%" stopColor="#F59E0B"/>
        <stop offset="100%" stopColor="#92400E"/>
      </radialGradient>
      <radialGradient id="wEyeR" cx="38%" cy="36%" r="60%">
        <stop offset="0%" stopColor="#FDE68A"/>
        <stop offset="50%" stopColor="#F59E0B"/>
        <stop offset="100%" stopColor="#92400E"/>
      </radialGradient>
    </defs>

    {/* Sparkles */}
    {[[128,10],[6,22],[132,55],[2,58]].map(([x,y],i)=>(
      <polygon key={i}
        points={`${x},${y-3.5} ${x+1},${y-1} ${x+3.5},${y} ${x+1},${y+1} ${x},${y+3.5} ${x-1},${y+1} ${x-3.5},${y} ${x-1},${y-1}`}
        fill={i%2===0?'#FDE68A':'#F9A8D4'} opacity=".85"
        style={{ animation:`twinkle ${1.3+i*.45}s ${i*.2}s ease-in-out infinite` }}/>
    ))}

    {/* ── Body segments (4) tail→head ── */}
    {[3,2,1,0].map(i=>(
      <ellipse key={i}
        cx={112-i*26} cy={i===0?46:50}
        rx={i===0?14:13} ry={i===0?13:12}
        fill={i%2===0?'url(#wBodyA)':'url(#wBodyB)'}
        stroke="#C4B5FD" strokeWidth=".5" strokeOpacity=".35"
        style={{ animation:`worm-wave ${1+i*.18}s ${i*.12}s ease-in-out infinite` }}/>
    ))}

    {/* Segment dividers */}
    {[1,2,3].map(i=>(
      <ellipse key={i} cx={112-i*26} cy={50} rx={3} ry={11}
        fill="#4C1D95" opacity=".4"/>
    ))}

    {/* ── Tiny legs ── */}
    {[0,1,2,3].map(i=>(
      <g key={i}>
        <path d={`M ${108-i*26} 60 Q ${104-i*26} 72 ${100-i*26} 75`}
          stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d={`M ${116-i*26} 60 Q ${120-i*26} 72 ${124-i*26} 75`}
          stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* little feet */}
        <ellipse cx={100-i*26} cy={76} rx={4} ry={2} fill="#6D28D9" opacity=".6"/>
        <ellipse cx={124-i*26} cy={76} rx={4} ry={2} fill="#6D28D9" opacity=".6"/>
      </g>
    ))}

    {/* ── Tail curl ── */}
    <path d="M 115 52 Q 130 40 128 28 Q 126 18 118 22 Q 114 26 120 30"
      stroke="#A78BFA" strokeWidth="5" strokeLinecap="round" fill="none"
      style={{ animation:`tail-sway 2.5s ease-in-out infinite`, transformOrigin:'115px 52px' }}/>

    {/* ── Head ── */}
    <circle cx="18" cy="46" r="22" fill="url(#wHead)"/>
    <circle cx="18" cy="46" r="21.5" fill="none" stroke="#C4B5FD" strokeWidth=".6" opacity=".3"/>

    {/* ── Eyes (big anime-style) ── */}
    <ellipse cx="10" cy="42" rx="7.5" ry="8.5" fill="white"/>
    <ellipse cx="10" cy="43" rx="6" ry="7" fill="url(#wEyeL)"
      style={{ animation:`eye-blink 4.5s ease-in-out infinite` }}/>
    <ellipse cx="10" cy="43" rx="3.5" ry="4.5" fill="#78350F"/>
    <ellipse cx="8.2" cy="40.5" rx="1.8" ry="2.2" fill="white" opacity=".95"/>
    <ellipse cx="11.5" cy="45" rx=".9" ry="1.1" fill="white" opacity=".6"/>

    <ellipse cx="26" cy="42" rx="7.5" ry="8.5" fill="white"/>
    <ellipse cx="26" cy="43" rx="6" ry="7" fill="url(#wEyeR)"
      style={{ animation:`eye-blink 4.5s .6s ease-in-out infinite` }}/>
    <ellipse cx="26" cy="43" rx="3.5" ry="4.5" fill="#78350F"/>
    <ellipse cx="24.2" cy="40.5" rx="1.8" ry="2.2" fill="white" opacity=".95"/>
    <ellipse cx="27.5" cy="45" rx=".9" ry="1.1" fill="white" opacity=".6"/>

    {/* ── Glasses ── */}
    <rect x="2.5" y="36" width="15" height="13" rx="5.5"
      fill="none" stroke="#FDE68A" strokeWidth="1.6"/>
    <rect x="19.5" y="36" width="15" height="13" rx="5.5"
      fill="none" stroke="#FDE68A" strokeWidth="1.6"/>
    <line x1="17.5" y1="42.5" x2="19.5" y2="42.5" stroke="#FDE68A" strokeWidth="1.6"/>
    <line x1="2.5" y1="42.5" x2="-1" y2="40" stroke="#FDE68A" strokeWidth="1.6"/>
    <line x1="34.5" y1="42.5" x2="38" y2="40" stroke="#FDE68A" strokeWidth="1.6"/>

    {/* ── Eyebrows ── */}
    <path d="M 3 34 Q 9 30 16 33" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M 19 33 Q 26 30 33 34" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" fill="none"/>

    {/* ── Antenna ── */}
    <line x1="12" y1="24" x2="8" y2="12" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="8" cy="10" r="4" fill="#EC4899"/>
    <circle cx="7" cy="8.5" r="1.5" fill="white" opacity=".7"/>
    <line x1="22" y1="25" x2="26" y2="13" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="27" cy="11" r="3" fill="#8B5CF6"/>

    {/* ── Smile ── */}
    <path d="M 9 54 Q 18 62 28 54" stroke="#FDE68A" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <ellipse cx="18" cy="57" rx="5" ry="2" fill="#EC4899" opacity=".25"/>

    {/* ── Blush ── */}
    <ellipse cx="4" cy="50" rx="5.5" ry="3.5" fill="#EC4899" opacity=".22"
      style={{ animation:`blush 3s ease-in-out infinite` }}/>
    <ellipse cx="32" cy="50" rx="5.5" ry="3.5" fill="#EC4899" opacity=".22"
      style={{ animation:`blush 3.5s .4s ease-in-out infinite` }}/>

    {/* ── Book stack being carried on the back ── */}
    <g transform="translate(52,24) rotate(6)"
      style={{ animation:'float-gentle 3.5s ease-in-out infinite' }}>
      <rect width="30" height="9" rx="2" fill="#6D28D9"/>
      <rect y="8" width="30" height="9" rx="2" fill="#EC4899"/>
      <rect y="16" width="30" height="9" rx="2" fill="#F59E0B"/>
      <rect y="24" width="30" height="9" rx="2" fill="#8B5CF6"/>
      {/* book spines */}
      <rect width="4" height="9" rx="1" fill="#4C1D95"/>
      <rect y="8" width="4" height="9" rx="1" fill="#9D174D"/>
      <rect y="16" width="4" height="9" rx="1" fill="#92400E"/>
      <rect y="24" width="4" height="9" rx="1" fill="#3730A3"/>
    </g>
  </svg>
);

export default { OwlyCharacter, WormyCharacter };
