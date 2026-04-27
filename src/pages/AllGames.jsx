import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const GameCard = ({ game, darkMode }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/games/${game.title}`)}
      className="group relative w-full h-80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3"
      style={{ boxShadow: darkMode ? '0 8px 32px rgba(109,40,217,.25)' : '0 8px 32px rgba(109,40,217,.12)' }}>

      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${game.image})` }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,10,32,.97) 0%, rgba(45,27,85,.65) 50%, transparent 100%)' }}/>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, rgba(109,40,217,.2) 0%, rgba(219,39,119,.1) 100%)' }}/>

      {[0,1,2].map(i => (
        <div key={i} className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ top:`${15+i*25}%`, right:`${8+i*3}%`, transitionDelay:`${i*80}ms` }}>
          <svg width="10" height="10" viewBox="0 0 20 20">
            <polygon points="10,0 12,7 19,7 13,11 16,18 10,14 4,18 7,11 1,7 8,7" fill="#FDE68A" opacity=".9"/>
          </svg>
        </div>
      ))}

      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <span className="self-start px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full mb-3 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white">
          {game.title.split(' ')[0]}
        </span>
        <h3 style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-2xl font-bold mb-2 leading-tight group-hover:text-shimmer transition-all">
          {game.title}
        </h3>
        <p className="text-sm text-white/65 mb-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
          {game.description}
        </p>
        <div className="flex items-center gap-2 text-[#C4B5FD] font-semibold text-sm">
          <span>Explore Roadmap</span>
          <span className="group-hover:translate-x-1 transition-transform">✦</span>
        </div>
      </div>
    </div>
  );
};

const AllGames = ({ darkMode }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleGames, setVisibleGames] = useState([]);

  const isDark = darkMode;
  const pageStyle = isDark ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';

  const games = [
    { title:"Master Web Development", description:"Deep dive into HTML, CSS, JavaScript, and the React ecosystem.", image:"https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800" },
    { title:"Data Scientist", description:"Master Python, Statistics, and Machine Learning algorithms.", image:"https://images.unsplash.com/photo-1551288049-bbda4833effb?auto=format&fit=crop&q=80&w=800" },
    { title:"History Explorer", description:"A journey through Ancient civilizations to Modern geopolitical shifts.", image:"https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800" },
    { title:"Fitness & Nutrition", description:"Science-based approach to training, metabolic health, and recovery.", image:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" },
    { title:"AI Engineer Path", description:"Neural Networks, LLMs, and Scalable AI System Architecture.", image:"https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
  ];

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setVisibleGames(games.filter(g => g.title.toLowerCase().includes(q)));
  }, [searchQuery]);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 overflow-x-hidden ${pageStyle}`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-[90px] ${isDark?'bg-[#8B5CF6]/10':'bg-[#8B5CF6]/06'}`}/>
        <div className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[80px] ${isDark?'bg-[#EC4899]/07':'bg-[#EC4899]/04'}`}/>
      </div>

      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${isDark?'bg-[#0F0A20]/92 border-[#2A1F55]':'bg-[#FAF7FF]/92 border-[#E9DEFF]'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
              <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-xl italic ${isDark?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
          <button onClick={() => navigate(-1)} className={`text-sm font-medium nav-link ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>← Back</button>
        </div>
      </nav>

      <div className="relative pt-16 h-[52vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-[-15%] left-[-10%] w-[45%] h-[70%] rounded-full blur-[100px] ${isDark?'bg-[#6D28D9]/20':'bg-[#8B5CF6]/12'} animate-pulse`}/>
          <div className={`absolute bottom-[-15%] right-[-10%] w-[45%] h-[70%] rounded-full blur-[100px] ${isDark?'bg-[#EC4899]/15':'bg-[#EC4899]/08'} animate-pulse`} style={{ animationDelay:'700ms' }}/>
        </div>
        {[...Array(18)].map((_,i)=>(
          <div key={i} className="absolute rounded-full" style={{ left:`${(i*14+4)%100}%`, top:`${(i*9+3)%100}%`, width:i%4===0?'3px':'2px', height:i%4===0?'3px':'2px', background:i%2===0?'#A78BFA':'#F9A8D4', animation:`twinkle ${1.5+(i%5)*.6}s ${i*.15}s ease-in-out infinite`, opacity:.7 }}/>
        ))}
        <div className="relative z-10 text-center px-6">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-xs font-bold tracking-widest uppercase backdrop-blur-sm ${isDark?'border-[#A78BFA]/30 bg-[#8B5CF6]/10 text-[#C4B5FD]':'border-[#A78BFA]/40 bg-[#8B5CF6]/08 text-[#6D28D9]'}`}>
            <span style={{ animation:'twinkle 2s ease-in-out infinite' }}>✦</span>
            Interactive Learning
            <span style={{ animation:'twinkle 2s .5s ease-in-out infinite' }}>✦</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif" }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-5 text-shimmer">
            Game Library
          </h1>
          <p className={`max-w-2xl mx-auto text-lg leading-relaxed ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`} style={{ fontFamily:"'Lora',serif" }}>
            Curated roadmaps designed for mastery. Select a path and begin your journey.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-8 mb-16 relative z-20">
        <div className={`relative flex items-center p-2 rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all focus-within:ring-2 focus-within:ring-[#8B5CF6]/40 ${isDark?'bg-[#1E1540]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF]'}`}
          style={{ boxShadow: isDark?'0 8px 40px rgba(109,40,217,.2)':'0 8px 40px rgba(109,40,217,.1)' }}>
          <div className="pl-5 text-[#A78BFA]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for a skill or roadmap..."
            className={`w-full px-4 py-3.5 bg-transparent outline-none text-base font-medium placeholder-[#A78BFA]/60 ${isDark?'text-[#F3EEF8]':'text-[#2E1065]'}`}/>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className={`text-xs uppercase tracking-[.3em] font-bold mb-1 ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Available Roadmaps</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-2xl font-black">{visibleGames.length} Paths</h2>
          </div>
        </div>

        {visibleGames.length === 0 ? (
          <div className={`py-20 text-center border-2 border-dashed rounded-3xl ${isDark?'border-[#2A1F55] text-[#A78BFA]':'border-[#E9DEFF] text-[#8B5CF6]'}`}>
            <p className="text-2xl font-light opacity-50">No matching paths found.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleGames.map((game, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay:`${i*80}ms` }}>
                <GameCard game={game} darkMode={isDark}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGames;
