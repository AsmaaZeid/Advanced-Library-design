import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import hero from "../assets/hero.png";

const StatCard = ({ icon, label, value, darkMode }) => {
  const dm = darkMode;
  return (
    <div className={`p-5 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${dm?'bg-[#2A1F55]/40 border-[#2A1F55]':'bg-[#F3EEF9] border-[#E9DEFF]'}`}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
        style={{ background:'linear-gradient(135deg,#6D28D9,#EC4899)' }}>
        {icon}
      </div>
      <div>
        <p className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>{label}</p>
        <p className="font-bold text-sm">{value}</p>
      </div>
    </div>
  );
};

const GameDetails = ({ darkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dm = darkMode;
  const bg = dm ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';

  const game = {
    title:"Master Web Development",
    description:"Follow a structured roadmap from beginner to advanced and become a professional web developer. This journey takes you through HTML, CSS, JavaScript, and modern frameworks like React.",
    members:1240, difficulty:"Intermediate", duration:"3 - 6 Months",
    topics:["HTML5","Tailwind CSS","JavaScript ES6+","React & Redux","Node.js"],
    image: hero,
  };

  const [joined, setJoined] = useState(false);
  const [members, setMembers] = useState(game.members);

  const handleToggle = () => { setMembers(p => joined ? p-1 : p+1); setJoined(!joined); };

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-500 ${bg}`}>
      {/* Soft glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-32 -left-20 w-80 h-80 rounded-full blur-[80px] ${dm?'bg-[#8B5CF6]/08':'bg-[#8B5CF6]/05'}`}/>
        <div className={`absolute -bottom-32 -right-20 w-80 h-80 rounded-full blur-[80px] ${dm?'bg-[#EC4899]/06':'bg-[#EC4899]/04'}`}/>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${dm?'bg-[#0F0A20]/92 border-[#2A1F55]':'bg-[#FAF7FF]/92 border-[#E9DEFF]'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
              <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-xl italic ${dm?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
          <button onClick={()=>navigate(-1)} className={`text-sm font-medium nav-link ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>← Back</button>
        </div>
      </nav>

      {/* IMMERSIVE HERO */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000"
          style={{ backgroundImage:`url(${game.image})` }}>
          <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, rgba(15,10,32,.15) 0%, rgba(30,21,64,.65) 55%, rgba(15,10,32,1) 100%)' }}/>
        </div>

        {/* Stars overlay */}
        {[...Array(14)].map((_,i)=>(
          <div key={i} className="absolute rounded-full" style={{ left:`${(i*14+4)%100}%`, top:`${(i*9+3)%90}%`, width:'2px', height:'2px', background:i%2===0?'#A78BFA':'#F9A8D4', animation:`twinkle ${1.5+(i%5)*.6}s ${i*.15}s ease-in-out infinite`, opacity:.6 }}/>
        ))}

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 text-white"
            style={{ background:'linear-gradient(135deg,#6D28D9,#EC4899)', width:'fit-content' }}>
            Path Overview ✦
          </span>
          <h1 style={{ fontFamily:"'Playfair Display',serif" }}
            className="text-5xl md:text-7xl font-black text-white mb-3 leading-tight drop-shadow-2xl">
            {game.title}
          </h1>
        </div>
      </div>

      {/* FLOATING PANEL */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className={`lg:col-span-2 p-8 md:p-10 rounded-3xl border backdrop-blur-2xl shadow-2xl ${dm?'bg-[#1E1540]/85 border-[#2A1F55]':'bg-white/92 border-[#E9DEFF]'}`}
            style={{ boxShadow: dm?'0 20px 60px rgba(109,40,217,.15)':'0 20px 60px rgba(109,40,217,.08)' }}>
            <p className={`text-xs uppercase tracking-[.3em] font-bold mb-2 ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ About this Journey</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-3xl font-black mb-5">Path Overview</h2>
            <p className={`text-base leading-relaxed mb-8 ${dm?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>{game.description}</p>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard darkMode={dm} label="Learners" value={members.toLocaleString()+'+'} icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              }/>
              <StatCard darkMode={dm} label="Level" value={game.difficulty} icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              }/>
              <StatCard darkMode={dm} label="Duration" value={game.duration} icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              }/>
            </div>

            {/* Topics */}
            <p className={`text-xs uppercase tracking-[.3em] font-bold mb-4 ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Core Competencies</p>
            <div className="flex flex-wrap gap-3">
              {game.topics.map((t,i)=>(
                <span key={i} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:scale-105 ${dm?'bg-[#2A1F55]/60 border-[#2A1F55] text-[#C4B5FD]':'bg-[#F3EEF9] border-[#E9DEFF] text-[#6D28D9]'}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Join card */}
            <div className={`p-8 rounded-3xl border shadow-xl ${dm?'bg-[#1E1540] border-[#2A1F55]':'bg-white border-[#E9DEFF]'}`}
              style={{ boxShadow: dm?'0 0 40px rgba(109,40,217,.12)':'0 8px 40px rgba(109,40,217,.08)' }}>
              <p className={`text-xs uppercase tracking-[.25em] font-bold mb-2 ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Ready to Start?</p>
              <h3 style={{ fontFamily:"'Playfair Display',serif" }} className="text-xl font-black mb-3">Join this Path</h3>
              <p className={`text-sm leading-relaxed mb-6 ${dm?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Join thousands of others tracking their progress in this path.</p>

              <button onClick={handleToggle}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95 mb-3 ${
                  joined
                    ? 'border-2 border-dashed border-red-400/40 text-red-400 hover:bg-red-500 hover:text-white hover:border-transparent'
                    : 'btn-magic text-white shadow-lg'
                }`}>
                {joined ? '✕  Leave Path' : '✦  Join Path'}
              </button>

              <button onClick={()=>navigate(`/roadmap/${id}`)}
                className={`w-full py-4 rounded-2xl font-bold text-sm border transition-all hover:-translate-y-0.5 active:scale-95 ${dm?'bg-[#2A1F55]/60 border-[#2A1F55] text-[#C4B5FD] hover:bg-[#2A1F55]':'bg-[#F3EEF9] border-[#E9DEFF] text-[#6D28D9] hover:bg-[#EDE5FF]'}`}>
                ✦ Open Roadmap
              </button>
            </div>

            {/* Certification card */}
            <div className={`p-8 rounded-3xl border overflow-hidden relative ${dm?'bg-gradient-to-br from-[#6D28D9]/20 to-[#EC4899]/10 border-[#2A1F55]':'bg-gradient-to-br from-[#F3EEF9] to-[#FFF0F7] border-[#E9DEFF]'}`}>
              <div className="relative z-10">
                <div className="text-2xl mb-3" style={{ animation:'float-gentle 3s ease-in-out infinite' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
                    <polyline points="8,14 12,18 20,10" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-sm mb-1">Professional Certification</h3>
                <p className={`text-xs leading-relaxed ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>Earn a badge upon completion of all modules.</p>
              </div>
              {/* Decorative glow */}
              <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-gradient-to-br from-[#6D28D9]/20 to-[#EC4899]/20 blur-xl"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
