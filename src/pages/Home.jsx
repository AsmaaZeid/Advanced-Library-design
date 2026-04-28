import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import hero from '../assets/hero.png';
import BookSection from '../components/BookSection';
import GameSection from '../components/GameSection';
import Footer from '../components/Footer';
import { OwlyCharacter, WormyCharacter } from '../components/Characters';

/* ── Falling petals ── */
const Petals = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(12)].map((_,i) => (
      <div key={i} className="petal absolute" style={{ left:`${(i*8.5)%100}%`, width:`${7+(i%4)*3}px`, height:`${7+(i%4)*3}px`, animationDuration:`${7+(i%5)*2}s`, animationDelay:`${(i*.9)%8}s`, top:'-20px' }}>
        <svg viewBox="0 0 20 20" fill="none">
          <ellipse cx="10" cy="10" rx="4" ry="9" fill={i%3===0?'#EC4899':i%3===1?'#A78BFA':'#F9A8D4'} opacity=".55" transform={`rotate(${i*30} 10 10)`}/>
          <ellipse cx="10" cy="10" rx="4" ry="9" fill={i%3===0?'#DB2777':i%3===1?'#8B5CF6':'#F472B6'} opacity=".35" transform={`rotate(${i*30+90} 10 10)`}/>
        </svg>
      </div>
    ))}
  </div>
);

/* ── Starfield ── */
const Stars = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(35)].map((_,i) => (
      <div key={i} className="absolute rounded-full" style={{ left:`${(i*14.3+4)%100}%`, top:`${(i*7.7+2)%100}%`, width:i%5===0?'3px':i%3===0?'2px':'1.5px', height:i%5===0?'3px':i%3===0?'2px':'1.5px', background:i%4===0?'#EC4899':i%4===1?'#A78BFA':i%4===2?'#FDE68A':'rgba(255,255,255,.9)', animation:`twinkle ${1.5+(i%5)*.6}s ${(i*.14)%3}s ease-in-out infinite`, opacity:.7 }}/>
    ))}
  </div>
);

/* ── Book Intro ── */
const BookIntro = ({ onDone }) => {
  const [phase, setPhase] = useState('idle');
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 500);
    const t2 = setTimeout(() => { setPhase('done'); setTimeout(onDone, 700); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`book-intro-overlay ${phase==='done'?'done':''}`}>
      <Stars/>
      {[0,1,2,3,4].map(i=>(
        <div key={i} className="absolute pointer-events-none opacity-40"
          style={{ left:`${25+38*Math.cos(i/5*Math.PI*2)}%`, top:`${28+22*Math.sin(i/5*Math.PI*2)}%`, animation:`float-slow ${3+i*.5}s ${i*.4}s ease-in-out infinite` }}>
          <svg width="14" height="14" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="4" ry="9" fill={i%2===0?'#EC4899':'#A78BFA'} opacity=".7" transform={`rotate(${i*36} 10 10)`}/></svg>
        </div>
      ))}
      <div className="text-center relative z-10">
        <div className={`book-3d mx-auto mb-8 ${phase==='opening'?'open':''}`} style={{ display:'inline-block' }}>
          <div className="book-spine"/>
          <div className="book-cover">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" style={{ marginBottom:8 }}>
              <rect x="5" y="7" width="40" height="36" rx="4" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1.2"/>
              <rect x="7" y="7" width="6" height="36" rx="2" fill="#150E2B"/>
              <rect x="15" y="15" width="22" height="2" rx="1" fill="#A78BFA" opacity=".75"/>
              <rect x="15" y="20" width="17" height="2" rx="1" fill="#C4B5FD" opacity=".55"/>
              <rect x="15" y="25" width="20" height="2" rx="1" fill="#A78BFA" opacity=".55"/>
              <polygon points="25,3 27,9 33,9 28,13 30,19 25,15 20,19 22,13 17,9 23,9" fill="#EC4899" opacity=".9"/>
            </svg>
            <div style={{ fontFamily:"'Playfair Display',serif", color:'#C4B5FD', fontSize:16, fontStyle:'italic', fontWeight:700 }}>BiblioTech</div>
            <div style={{ color:'#A78BFA', fontSize:9, letterSpacing:'3px', marginTop:5, textTransform:'uppercase' }}>✦ Magical Library ✦</div>
            <div style={{ marginTop:12, display:'flex', gap:3 }}>
              {[1,2,3,4,5].map(i=>(
                <div key={i} style={{ width:3, height:14+i*6, background:`rgba(167,139,250,${.22+i*.11})`, borderRadius:2 }}/>
              ))}
            </div>
          </div>
          <div className="book-inner">
            <div className="book-inner-text">
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:11, color:'#4C1D95', fontStyle:'italic', lineHeight:1.9 }}>
                "A reader lives a thousand lives<br/>before she dies."
              </div>
              <div style={{ fontSize:9, color:'#8B5CF6', marginTop:8, letterSpacing:'2px' }}>— George R.R. Martin</div>
            </div>
          </div>
        </div>
        <div style={{ color:'#A78BFA', fontSize:10, letterSpacing:'4px', textTransform:'uppercase', opacity:phase==='opening'?1:0, transition:'opacity .5s .8s ease' }}>
          ✨ Opening your library... ✨
        </div>
      </div>
    </div>
  );
};

/* ════════════════════ MAIN HOME ════════════════════ */
const Home = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(() => {
    const flag = sessionStorage.getItem('showBookIntro');
    if (flag === 'true') {
      sessionStorage.removeItem('showBookIntro');
      return true;
    }
    return false;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [counts, setCounts] = useState({ books: 0, users: 0, borrows: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showComm, setShowComm] = useState(false);
  const statsRef = useRef(null);
  const commRef = useRef(null);

  const dummyBooks = Array.from({length:12},(_,i)=>({ id:i+1, title:`Book Title ${i+1}`, price:14.99+i, rating:3.5+Math.random()*1.5, author:'Author Name', description:'' }));

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!(user || token));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const statsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        startCounter();
        setHasAnimated(true);
      }
    }, { threshold: 0.2 });

    const commObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShowComm(true);
    }, { threshold: 0.2 });

    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (commRef.current) commObserver.observe(commRef.current);

    return () => {
      statsObserver.disconnect();
      commObserver.disconnect();
    };
  }, [hasAnimated]);

  const startCounter = () => {
    const targets={books:15420,users:8432,borrows:35678};
    let step=0; const steps=80; const iv=2200/steps;
    const t=setInterval(()=>{
      step++; const p=1-Math.pow(1-step/steps,3);
      setCounts({books:Math.floor(targets.books*p),users:Math.floor(targets.users*p),borrows:Math.floor(targets.borrows*p)});
      if(step>=steps)clearInterval(t);
    },iv);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setSidebarOpen(false);
    navigate('/');
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * dummyBooks.length);
    const randomBook = dummyBooks[randomIndex];
    setSidebarOpen(false);
    navigate(`/book/${randomBook.id}`, { state: { book: randomBook } });
  };

  const categories=[
    {name:'History',ico:'🏛️'},{name:'Sci-Fi',ico:'🚀'},{name:'Self-help',ico:'💡'},
    {name:'Mystery',ico:'🔍'},{name:'Romance',ico:'✦'},{name:'Children',ico:'🌸'},
    {name:'Academic',ico:'🎓'},{name:'Business',ico:'💼'},{name:'Literature',ico:'📜'},{name:'Biography',ico:'👤'}
  ];

  const isDark = darkMode;
  const containerClass = isDark ? 'bg-[#0F0A20]' : 'bg-[#FAF7FF]';
  const altSection = isDark ? 'bg-[#150E2B]' : 'bg-[#F3EEF9]';
  const textColor = isDark ? 'text-[#F3EEF8]' : 'text-[#2E1065]';
  const mutedColor = isDark ? 'text-[#C4B5FD]' : 'text-[#7C3AED]';
  const cardClass = isDark ? 'bg-[#1E1540] border-[#2A1F55]' : 'bg-white border-[#E9DEFF]';
  const searchCls = `w-full px-4 pr-10 py-2 rounded-xl border outline-none text-sm transition-all focus:ring-2 ${isDark?'bg-[#1E1540] border-[#2A1F55] text-[#F3EEF8] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 placeholder-[#6D28D9]':'bg-white/90 border-[#E9DEFF] text-[#2E1065] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/10 placeholder-[#A78BFA]'}`;

  if(showIntro) return <BookIntro onDone={()=>setShowIntro(false)}/>;

  return (
    <div className={`w-full min-h-screen ${containerClass} ${textColor} transition-colors duration-300 relative`}>
      <Petals/>

      {/* ══ NAVBAR ══ */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        scrolled
          ?(isDark?'bg-[#0F0A20]/96 backdrop-blur-xl border-b border-[#2A1F55] shadow-[0_4px_30px_rgba(109,40,217,.18)]':'bg-white/96 backdrop-blur-xl border-b border-[#E9DEFF] shadow-lg')
          :'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">

            {/* LOGO */}
            <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex-shrink-0 group">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all group-hover:scale-105 ${isDark?'hover:bg-[#1E1540]':'hover:bg-[#F3EEF9]'}`}>
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
                  <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
                  <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
                  <rect x="11" y="9" width="11" height="1.5" rx=".75" fill="#C4B5FD" opacity=".8"/>
                  <rect x="11" y="12.5" width="8" height="1.5" rx=".75" fill="#C4B5FD" opacity=".6"/>
                  <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
                </svg>
                <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-xl italic ${isDark?'text-[#F3EEF8]':'text-[#4C1D95]'}`}>BiblioTech</span>
              </div>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-1">
              {[{l:'Browse',to:'/search'},{l:'Communities',to:'/groups'},{l:'Games',to:'/all-games'},...(isLoggedIn?[{l:'Profile',to:'/profile'}]:[])].map(i=>(
                <Link key={i.l} to={i.to} className={`nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all ${isDark?'text-[#C4B5FD] hover:text-white hover:bg-[#1E1540]':'text-[#6D28D9] hover:text-[#4C1D95] hover:bg-[#F3EEF9]'}`}>{i.l}</Link>
              ))}
            </div>

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="flex-1 max-w-sm mx-2">
              <div className="relative">
                <input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search books, authors..." className={searchCls}/>
                <button type="submit" className="absolute right-3 top-2.5 text-[#A78BFA] hover:scale-110 transition-transform">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
              </div>
            </form>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              {setDarkMode&&(
                <button onClick={()=>setDarkMode(!isDark)} className={`w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-all ${isDark?'bg-[#1E1540] text-yellow-300':'bg-[#F3EEF9] text-[#6D28D9]'}`}>
                  {isDark?'☀️':'🌙'}
                </button>
              )}
              {!isLoggedIn&&<><Link to="/login" className={`hidden sm:block text-sm font-medium nav-link ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 btn-magic">Join Free</Link></>}
              <button onClick={()=>setSidebarOpen(true)} className={`group w-10 h-10 flex flex-col items-center justify-center rounded-xl gap-1.5 transition-all ${isDark?'bg-[#1E1540] hover:bg-[#2A1F55]':'bg-[#F3EEF9] hover:bg-[#E9DEFF]'}`}>
                {[0,1,2].map(i=><span key={i} className={`block h-[2px] rounded-full bg-gradient-to-r from-[#A78BFA] to-[#EC4899] transition-all ${i===1?'w-3 group-hover:w-5':'w-5'}`}/>)}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ══ SIDEBAR ══ */}
      <div className={`fixed inset-0 z-[60] ${sidebarOpen?'pointer-events-auto':'pointer-events-none'}`}>
        <div onClick={()=>setSidebarOpen(false)} className={`absolute inset-0 overlay-blur transition-opacity duration-300 ${sidebarOpen?'opacity-100 bg-black/65':'opacity-0'}`}/>
        <aside className={`absolute right-0 top-0 h-full w-[22rem] max-w-[92vw] overflow-y-auto transition-transform duration-300 ease-in-out ${sidebarOpen?'translate-x-0':'translate-x-full'} ${isDark?'bg-[#0F0A20] border-l border-[#2A1F55]':'bg-[#FAF7FF] border-l border-[#E9DEFF]'}`}
          style={{ boxShadow:'-16px 0 50px rgba(109,40,217,.3)' }}>

          <div className={`sticky top-0 z-10 px-6 py-5 border-b backdrop-blur-xl ${isDark?'bg-[#0F0A20]/95 border-[#2A1F55]':'bg-[#FAF7FF]/95 border-[#E9DEFF]'}`}>
            <div className="flex items-center justify-between">
              <Link to="/" onClick={()=>setSidebarOpen(false)} className="flex items-center gap-3 group">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
                  <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
                  <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
                </svg>
                <div>
                  <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-xl italic ${isDark?'text-[#F3EEF8]':'text-[#4C1D95]'}`}>BiblioTech</span>
                  <p className={`text-[9px] tracking-[.22em] uppercase ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Magical Library ✦</p>
                </div>
              </Link>
              <button onClick={()=>setSidebarOpen(false)} className={`w-9 h-9 rounded-xl flex items-center justify-center hover:rotate-90 transition-all duration-300 ${isDark?'bg-[#1E1540] text-[#C4B5FD]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>✕</button>
            </div>
          </div>

          <div className="px-6 py-6 space-y-7">
            {/* Auth */}
            <div className={`rounded-2xl p-5 border ${isDark?'bg-gradient-to-br from-[#1E1540] to-[#0F0A20] border-[#2A1F55]':'bg-gradient-to-br from-[#F3EEF9] to-white border-[#E9DEFF] shadow-md'}`}>
              {isLoggedIn?(
                <><p className={`text-[10px] uppercase tracking-[.2em] font-bold mb-1 ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Your Space</p>
                <h3 className="font-bold text-lg mb-3">Welcome back! ✨</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/profile" onClick={()=>setSidebarOpen(false)}><button className={`w-full py-2.5 rounded-xl text-sm font-semibold hover:-translate-y-0.5 transition-all ${isDark?'bg-[#2A1F55] text-white':'bg-[#F3EEF9] text-[#4C1D95]'}`}>My Profile</button></Link>
                  <button onClick={handleLogout} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white hover:-translate-y-0.5 transition-all">Logout</button>
                </div></>
              ):(
                <><p className={`text-[10px] uppercase tracking-[.2em] font-bold mb-1 ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Begin Your Journey</p>
                <h3 className="font-bold text-lg mb-1">Join the Library ✨</h3>
                <p className={`text-xs mb-4 ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Unlock your full reading experience.</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={()=>setSidebarOpen(false)}><button className={`w-full py-2.5 rounded-xl text-sm font-semibold border hover:-translate-y-0.5 transition-all ${isDark?'bg-[#1E1540] text-white border-[#2A1F55]':'bg-white text-[#4C1D95] border-[#E9DEFF]'}`}>Login</button></Link>
                  <Link to="/register" onClick={()=>setSidebarOpen(false)}><button className="w-full py-2.5 rounded-xl text-sm font-semibold btn-magic hover:-translate-y-0.5 transition-all">Sign Up</button></Link>
                </div></>
              )}
            </div>

            {/* Browse */}
            <div>
              <p className={`text-[10px] uppercase tracking-[.3em] font-bold mb-3 ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Browse</p>
              {[{l:'Best Sellers',to:'/search?type=collection&q=best-sellers',s:'★'},{l:'New Releases',to:'/search?type=collection&q=new-releases',s:'✦'},{l:'Popular Books',to:'/search?type=collection&q=popular-books',s:'♥'},{l:'Game Library',to:'/all-games',s:'✧'},{l:'Romance',to:'/search?type=genre&q=romance',s:'✿'},{l:'Academic',to:'/search?type=genre&q=academics',s:'◆'},{l:'Advanced Search',to:'/advanced',s:'⊕'}].map(i=>(
                <Link key={i.l} to={i.to} onClick={()=>setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:-translate-x-1 ${isDark?'hover:bg-[#1E1540] text-[#C4B5FD]':'hover:bg-[#F3EEF9] text-[#4C1D95]'}`}>
                  <span className="text-[#A78BFA] w-4 text-center text-sm">{i.s}</span>
                  <span className="font-medium text-sm flex-1">{i.l}</span>
                  <span className="text-[#A78BFA] text-xs">›</span>
                </Link>
              ))}
              <button onClick={handleRandom} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:-translate-x-1 ${isDark?'hover:bg-[#1E1540] text-[#C4B5FD]':'hover:bg-[#F3EEF9] text-[#4C1D95]'}`}>
                <span className="text-[#EC4899] w-4 text-center text-sm">✧</span>
                <span className="font-medium text-sm flex-1">Random Book</span>
              </button>
            </div>

            {/* Characters */}
            <div className={`rounded-2xl p-5 text-center border ${isDark?'bg-[#1E1540] border-[#2A1F55]':'bg-[#F3EEF9] border-[#E9DEFF]'}`}>
              <div className="flex items-end justify-center gap-6">
                <div style={{ animation:'float 4.5s ease-in-out infinite' }}><OwlyCharacter size={78}/></div>
                <div style={{ animation:'float 4.5s 1.5s ease-in-out infinite' }}><WormyCharacter size={90}/></div>
              </div>
              <p className={`text-xs italic mt-3 ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`} style={{ fontFamily:"'Lora',serif" }}>"Every book is a new adventure!"</p>
            </div>
          </div>
        </aside>
      </div>

      {/* ══ HERO ══ */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'radial-gradient(ellipse at 30% 60%, rgba(109,40,217,.25) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(219,39,119,.12) 0%, transparent 45%), linear-gradient(160deg,#0F0A20 0%,#150E2B 50%,#1E1540 100%)'
            : 'radial-gradient(ellipse at 30% 60%, rgba(139,92,246,.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(236,72,153,.08) 0%, transparent 45%), linear-gradient(160deg,#FAF7FF 0%,#F3EEF9 50%,#EDE5FF 100%)'
        }}/>
        <Stars/>

        {/* Soft rotating rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] pointer-events-none opacity-[0.08]">
          <div className="absolute inset-0 rounded-full border border-[#A78BFA] animate-spin-slow"/>
          <div className="absolute inset-16 rounded-full border border-[#EC4899]" style={{ animation:'spin-slow 15s linear infinite reverse' }}/>
          <div className="absolute inset-32 rounded-full border border-[#FDE68A]" style={{ animation:'spin-slow 20s linear infinite' }}/>
        </div>

        {/* CHARACTERS */}
        <div className="hidden lg:block absolute bottom-20 left-8" style={{ animation:'float 5s ease-in-out infinite' }}>
          <OwlyCharacter size={155}/>
          <p className={`text-center text-xs font-bold italic mt-1 ${isDark?'text-[#C4B5FD]':'text-[#8B5CF6]'}`} style={{ fontFamily:"'Lora',serif" }}>Owly</p>
        </div>
        <div className="hidden lg:block absolute bottom-16 right-6" style={{ animation:'float 5s 2s ease-in-out infinite' }}>
          <WormyCharacter size={155}/>
          <p className={`text-center text-xs font-bold italic mt-1 ${isDark?'text-[#F9A8D4]':'text-[#EC4899]'}`} style={{ fontFamily:"'Lora',serif" }}>Wormy</p>
        </div>

        {/* HERO TEXT */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-16">
          <div className="animate-fade-in max-w-4xl">
            <h1 style={{ fontFamily:"'Playfair Display',serif" }}
              className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[.95] tracking-tight ${isDark?'text-white':'text-[#2E1065]'}`}>
              Discover your<br/>
              next obsession,<br/>
              <span className={`italic font-normal text-[.8em] ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>one page at a time</span>
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/search" className={`group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base shadow-xl transition-all hover:-translate-y-1 active:scale-95 ${isDark?'bg-white text-[#4C1D95]':'bg-[#4C1D95] text-white'}`}>
                <span>Explore Books</span><span className="group-hover:translate-x-1 transition-transform">✦</span>
              </Link>
              <Link to="/register" className={`px-8 py-4 rounded-2xl font-bold text-base border backdrop-blur-sm transition-all hover:-translate-y-1 active:scale-95 ${isDark?'border-[#A78BFA]/40 bg-[#8B5CF6]/20 text-[#C4B5FD]':'border-[#A78BFA]/50 bg-[#8B5CF6]/10 text-[#6D28D9]'}`}>
                Join Free ✨
              </Link>
            </div>
          </div>
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in ${isDark?'text-[#A78BFA]/50':'text-[#8B5CF6]/50'}`} style={{ animationDelay:'1.5s' }}>
            <span className="text-[10px] tracking-[.3em] uppercase">Scroll</span>
            <div className="w-px h-7 bg-gradient-to-b from-[#A78BFA]/50 to-transparent" style={{ animation:'float 1.5s ease-in-out infinite' }}/>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statsRef} className={`py-20 px-6 ${altSection}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className={`text-xs uppercase tracking-[.3em] font-bold mb-2 ${mutedColor}`}>✦ By the numbers</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-3xl font-bold">A library that grows with you</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {l:'Total Books',v:counts.books,icon:<svg width="38" height="38" viewBox="0 0 38 38" fill="none"><rect x="4" y="4" width="30" height="30" rx="5" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1.2"/><rect x="6.5" y="4" width="7" height="30" rx="2" fill="#150E2B"/><rect x="16" y="12" width="13" height="2" rx="1" fill="#A78BFA" opacity=".8"/><rect x="16" y="17" width="9" height="2" rx="1" fill="#C4B5FD" opacity=".6"/><rect x="16" y="22" width="11" height="2" rx="1" fill="#A78BFA" opacity=".6"/></svg>},
              {l:'Active Readers',v:counts.users,icon:<svg width="38" height="38" viewBox="0 0 38 38" fill="none"><circle cx="15" cy="14" r="7" fill="#2A1F55" stroke="#EC4899" strokeWidth="1.2"/><path d="M 5 33 Q 5 24 15 24 Q 25 24 25 33" stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx="28" cy="12" r="5" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><path d="M 22 30 Q 22 24 28 24 Q 34 24 34 30" stroke="#A78BFA" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>},
              {l:'Books Borrowed',v:counts.borrows,icon:<svg width="38" height="38" viewBox="0 0 38 38" fill="none"><path d="M 7 9 L 7 32 Q 7 34 9 34 L 29 34 Q 31 34 31 32 L 31 14 L 23 5 L 9 5 Q 7 5 7 9 Z" fill="#2A1F55" stroke="#FDE68A" strokeWidth="1.1"/><path d="M 23 5 L 23 14 L 31 14" fill="#150E2B" stroke="#FDE68A" strokeWidth="1"/><rect x="12" y="18" width="14" height="2" rx="1" fill="#FDE68A" opacity=".7"/><rect x="12" y="23" width="10" height="2" rx="1" fill="#EC4899" opacity=".6"/></svg>},
            ].map((s,i)=>(
              <div key={i} className={`relative overflow-hidden p-8 rounded-3xl text-center border transition-all hover:-translate-y-2 ${cardClass}`}
                style={{ boxShadow:isDark?'0 0 30px rgba(109,40,217,.08)':'0 8px 30px rgba(109,40,217,.07)' }}>
                <div className="flex justify-center mb-3" style={{ animation:`float ${3+i*.5}s ${i*.5}s ease-in-out infinite` }}>{s.icon}</div>
                <div className="text-5xl font-black" style={{ background:'linear-gradient(135deg,#A78BFA,#EC4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{s.v.toLocaleString()}+</div>
                <div className={`text-sm font-semibold uppercase tracking-widest mt-2 ${mutedColor}`}>{s.l}</div>
                <div className="absolute -bottom-6 -right-6 w-22 h-22 rounded-full bg-gradient-to-br from-[#8B5CF6]/8 to-[#EC4899]/8"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CHARACTERS SECTION ══ */}
      <section className={`py-16 px-6 ${containerClass}`}>
        <div className="max-w-5xl mx-auto text-center mb-10">
          <p className={`text-xs uppercase tracking-[.3em] font-bold mb-2 ${mutedColor}`}>✦ Meet your companions</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-3xl font-bold">Your Library Guides</h2>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`group p-8 rounded-3xl border transition-all hover:-translate-y-2 ${cardClass}`}
            style={{ boxShadow:isDark?'0 0 40px rgba(109,40,217,.08)':'' }}>
            <div className="flex items-center gap-5">
              <div style={{ animation:'float 5s ease-in-out infinite', flexShrink:0 }}><OwlyCharacter size={100}/></div>
              <div>
                <h3 style={{ fontFamily:"'Playfair Display',serif" }} className="text-xl font-bold mb-2">Owly the Night Owl</h3>
                <p className={`text-sm leading-relaxed mb-3 ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Your wise library guardian. Owly's two different-coloured eyes see every story — one violet, one rose. He guards the shelves by night and picks your next great read.</p>
                <div className="flex flex-wrap gap-2">
                  {['Fantasy','Mystery','Classics'].map(t=><span key={t} className={`text-xs px-2.5 py-1 rounded-full font-semibold ${isDark?'bg-[#2A1F55] text-[#C4B5FD]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className={`group p-8 rounded-3xl border transition-all hover:-translate-y-2 ${cardClass}`}
            style={{ boxShadow:isDark?'0 0 40px rgba(219,39,119,.08)':'' }}>
            <div className="flex items-center gap-5">
              <div style={{ animation:'float 5s 2s ease-in-out infinite', flexShrink:0 }}><WormyCharacter size={115}/></div>
              <div>
                <h3 style={{ fontFamily:"'Playfair Display',serif" }} className="text-xl font-bold mb-2">Wormy the Bookworm</h3>
                <p className={`text-sm leading-relaxed mb-3 ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>The spectacled bookworm who carries a full stack wherever he wriggles! Wormy has devoured every genre and will always find the perfect recommendation for you.</p>
                <div className="flex flex-wrap gap-2">
                  {['Romance','Sci-Fi','Self-help'].map(t=><span key={t} className={`text-xs px-2.5 py-1 rounded-full font-semibold ${isDark?'bg-[#2A1F55] text-[#F9A8D4]':'bg-[#FFF0F7] text-[#DB2777]'}`}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMMUNITY ══ */}
      <section ref={commRef} className={`py-16 px-6 ${altSection}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-10 rounded-3xl border transition-all duration-1000 ${showComm?'translate-x-0 opacity-100':'opacity-0 -translate-x-12'} ${cardClass}`}>
            <p className={`text-xs uppercase tracking-[.25em] font-bold mb-4 ${mutedColor}`}>✦ Community</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-4xl font-bold mb-4 text-shimmer">Reader Communities</h2>
            <p className={`text-base leading-relaxed mb-6 ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Don't read alone. Join our global network of book lovers. <strong>Create your own community</strong>, host <strong>Discussion Boards</strong>, and connect with readers who share your passion.</p>
            <div className="flex flex-wrap gap-2">
              {['#DiscussionBoard','#CreateCommunity','#BookClub','#ReadingGoals'].map(t=>(
                <span key={t} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${isDark?'bg-[#2A1F55]/50 border-[#2A1F55] text-[#C4B5FD]':'bg-[#F3EEF9] border-[#E9DEFF] text-[#6D28D9]'}`}>{t}</span>
              ))}
            </div>
          </div>
          <div className={`relative min-h-[300px] rounded-3xl overflow-hidden transition-all duration-1000 delay-300 ${showComm?'translate-x-0 opacity-100':'translate-x-12 opacity-0'}`}
            style={{ background:isDark?'linear-gradient(135deg,#1E1540,#2A1F55)':'linear-gradient(135deg,#4C1D95,#7C3AED,#DB2777)' }}>
            <Stars/>
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center text-white">
              <div style={{ animation:'float 4s ease-in-out infinite', marginBottom:16 }}><WormyCharacter size={80}/></div>
              <h3 style={{ fontFamily:"'Playfair Display',serif" }} className="text-3xl font-bold mb-3">Join the community</h3>
              <p className="mb-8 text-white/80" style={{ fontFamily:"'Lora',serif" }}>Thousands of active reading groups waiting for you.</p>
              <Link to="/groups" className="px-8 py-4 bg-white text-[#4C1D95] rounded-2xl font-bold shadow-xl hover:-translate-y-1 transition-all active:scale-95">View all communities ✦</Link>
            </div>
          </div>
        </div>
      </section>

      <GameSection darkMode={darkMode}/>
      <div className={containerClass}>
        <BookSection title="Best Sellers" books={dummyBooks} darkMode={darkMode}/>
        <BookSection title="Popular Books" books={dummyBooks} darkMode={darkMode}/>
        <BookSection title="Recent Books" books={dummyBooks} darkMode={darkMode}/>
      </div>

      {/* ══ CATEGORIES ══ */}
      <section className={`py-20 px-6 ${altSection}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className={`text-xs uppercase tracking-[.3em] font-bold mb-2 ${mutedColor}`}>✦ Find your next read</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-4xl font-bold">Browse by Genre</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map(c=>(
              <Link key={c.name} to={`/search?type=genre&q=${c.name.toLowerCase()}`}
                className={`category-pill group flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all ${isDark?'bg-[#1E1540] border-[#2A1F55] hover:bg-[#2A1F55] hover:border-[#A78BFA]':'bg-white border-[#E9DEFF] hover:bg-gradient-to-br hover:from-[#6D28D9] hover:to-[#DB2777] hover:border-transparent hover:text-white shadow-sm'}`}>
                <span className="text-xl group-hover:scale-110 transition-transform">{c.ico}</span>
                <span className="text-xs font-semibold">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className={`py-20 px-6 ${containerClass}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className={`text-xs uppercase tracking-[.3em] font-bold mb-2 ${mutedColor}`}>✦ Reach us</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-4xl font-bold">Send a message</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p className={`text-base leading-relaxed mb-8 ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Feel free to reach out with questions, feedback, or suggestions. We reply faster than Wormy can finish a chapter!</p>
              <div className={`flex items-center gap-4 p-4 rounded-2xl border mb-8 ${cardClass}`}>
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none"><rect x="2" y="5" width="24" height="18" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1.1"/><path d="M 2 8 L 14 16 L 26 8" stroke="#EC4899" strokeWidth="1.4" fill="none"/></svg>
                <div>
                  <p className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${mutedColor}`}>Email</p>
                  <p className="font-medium text-sm">LibCore.lebanon@gmail.com</p>
                </div>
              </div>
              <div className="flex items-end gap-4">
                <div style={{ animation:'float 4s ease-in-out infinite' }}><OwlyCharacter size={85}/></div>
                <div className={`px-4 py-3 rounded-2xl rounded-bl-none text-sm italic max-w-xs border ${cardClass}`} style={{ fontFamily:"'Lora',serif" }}>
                  <span className={isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}>"We reply faster than Wormy can finish a chapter! ✨"</span>
                </div>
              </div>
            </div>
            <div className={`p-8 rounded-3xl border ${cardClass}`}>
              <label className={`block text-[10px] uppercase tracking-widest font-bold mb-1.5 ${mutedColor}`}>Your message</label>
              <textarea rows="5" placeholder="Write your message here..."
                className={`w-full p-4 rounded-2xl border outline-none resize-none transition-all focus:ring-2 mb-4 ${isDark?'bg-[#0F0A20] border-[#2A1F55] text-[#F3EEF8] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 placeholder-[#4C1D95]':'bg-[#F3EEF9] border-[#E9DEFF] text-[#2E1065] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/10 placeholder-[#8B5CF6]'}`}/>
              <button className="w-full py-4 rounded-2xl font-bold text-white text-sm uppercase tracking-widest btn-magic shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
                Send Message ✦
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode}/>
    </div>
  );
};
export default Home;
